"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { isFeedbackStatus } from "@/lib/feedback-status"

export type CreateFeedbackState = {
  errors?: { title?: string; description?: string; form?: string }
  values?: { title: string; description: string }
  success?: boolean
}

// Server Actions are public POST endpoints, so every one re-checks the
// session instead of trusting that the UI hid the button.
async function getSessionUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}

async function requireUserId() {
  const userId = await getSessionUserId()
  if (!userId) throw new Error("You must be signed in.")
  return userId
}

export async function createFeedback(
  _prevState: CreateFeedbackState,
  formData: FormData,
): Promise<CreateFeedbackState> {
  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()

  const authorId = await getSessionUserId()
  if (!authorId) {
    return { errors: { form: "Please sign in to post feedback." }, values: { title, description } }
  }

  const errors: CreateFeedbackState["errors"] = {}
  if (title.length < 3) errors.title = "Title must be at least 3 characters."
  if (title.length > 120) errors.title = "Title must be 120 characters or less."
  if (description.length > 1000) errors.description = "Description must be 1000 characters or less."
  if (errors.title || errors.description) {
    return { errors, values: { title, description } }
  }

  await prisma.feedbackItem.create({
    data: {
      title,
      description: description || null,
      authorId,
    },
  })

  revalidatePath("/")
  return { success: true }
}

export async function upvoteFeedback(id: string) {
  await requireUserId()
  await prisma.feedbackItem.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
  })
  revalidatePath("/")
}

export async function updateFeedbackStatus(id: string, status: unknown) {
  // Arguments come straight off the network, so validate even typed ones.
  if (!isFeedbackStatus(status)) throw new Error("Invalid status")
  const authorId = await requireUserId()

  // Filtering on authorId makes this a no-op for anyone but the author.
  const { count } = await prisma.feedbackItem.updateMany({
    where: { id, authorId },
    data: { status },
  })
  if (count === 0) throw new Error("Feedback not found or not yours.")
  revalidatePath("/")
}

export async function deleteFeedback(id: string) {
  const authorId = await requireUserId()

  const { count } = await prisma.feedbackItem.deleteMany({ where: { id, authorId } })
  if (count === 0) throw new Error("Feedback not found or not yours.")
  revalidatePath("/")
}
