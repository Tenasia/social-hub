import Link from "next/link"
import { auth } from "@/auth"
import { getFeedbackItems } from "@/lib/feedback"
import { FeedbackCard } from "@/components/feedback-card"
import { NewFeedbackForm } from "@/components/new-feedback-form"

// A Server Component: it runs only on the server, so it can await Prisma
// directly. No API route or client-side fetching needed.
export default async function Home() {
  const [session, items] = await Promise.all([auth(), getFeedbackItems()])
  const currentUserId = session?.user?.id ?? null
  const openCount = items.filter((i) => i.status !== "DONE").length

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_20rem]">
      <section aria-labelledby="board-heading">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 id="board-heading" className="text-xl font-semibold text-slate-900">
            Feedback board
          </h1>
          <p className="text-sm text-slate-500">
            {items.length} ideas · {openCount} not done yet
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="font-medium text-slate-700">No feedback yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Be the first to suggest something, or run <code>npm run db:seed</code>.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <FeedbackCard key={item.id} item={item} currentUserId={currentUserId} />
            ))}
          </ul>
        )}
      </section>

      <aside className="md:sticky md:top-6 md:self-start">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Suggest an idea</h2>
          {currentUserId ? (
            <NewFeedbackForm />
          ) : (
            <p className="text-sm text-slate-600">
              <Link href="/login" className="font-medium text-indigo-600 hover:underline">
                Sign in
              </Link>{" "}
              to post ideas and upvote.
            </p>
          )}
        </div>
      </aside>
    </div>
  )
}
