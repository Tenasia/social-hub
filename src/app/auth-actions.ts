"use server"

import { hash } from "bcryptjs"
import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"

export type AuthFormState = {
  error?: string
  email?: string
}

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  }
}

async function signInOrError(email: string, password: string): Promise<AuthFormState> {
  try {
    // On success this throws Next's redirect, which must propagate.
    await signIn("credentials", { email, password, redirectTo: "/" })
    return {}
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password.", email }
    }
    throw error
  }
}

export async function logIn(_prevState: AuthFormState, formData: FormData) {
  const { email, password } = readCredentials(formData)
  return signInOrError(email, password)
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const { email, password } = readCredentials(formData)
  const name = String(formData.get("name") ?? "").trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address.", email }
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters.", email }
  }

  // Covers seeded accounts too: they exist without a password and can't be claimed.
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "An account with that email already exists.", email }
  }

  await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash: await hash(password, 10),
    },
  })

  return signInOrError(email, password)
}

export async function logOut() {
  await signOut({ redirectTo: "/" })
}
