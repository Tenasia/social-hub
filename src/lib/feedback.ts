import { cache } from "react"
import { prisma } from "@/lib/prisma"

// React.cache dedupes this query if several Server Components call it
// during the same request.
export const getFeedbackItems = cache(async () => {
  return prisma.feedbackItem.findMany({
    orderBy: [{ upvotes: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { name: true, email: true } },
    },
  })
})

export type FeedbackItemWithAuthor = Awaited<ReturnType<typeof getFeedbackItems>>[number]
