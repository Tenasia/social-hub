import Link from "next/link"
import { deleteFeedback, upvoteFeedback } from "@/app/actions"
import type { FeedbackItemWithAuthor } from "@/lib/feedback"
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/feedback-status"
import { StatusSelect } from "@/components/status-select"
import { SubmitButton } from "@/components/submit-button"

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" })

const upvoteClass =
  "flex w-14 flex-col items-center rounded-md border border-slate-200 py-2 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"

export function FeedbackCard({
  item,
  currentUserId,
}: {
  item: FeedbackItemWithAuthor
  currentUserId: string | null
}) {
  const isAuthor = currentUserId === item.authorId
  const upvoteContent = (
    <>
      <span aria-hidden className="text-xs leading-none">▲</span>
      <span className="mt-1 text-sm font-semibold tabular-nums">{item.upvotes}</span>
    </>
  )

  return (
    <li className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {currentUserId ? (
        <form action={upvoteFeedback.bind(null, item.id)}>
          <SubmitButton aria-label={`Upvote ${item.title}`} className={upvoteClass}>
            {upvoteContent}
          </SubmitButton>
        </form>
      ) : (
        <Link href="/login" aria-label={`Sign in to upvote ${item.title}`} className={`${upvoteClass} self-start`}>
          {upvoteContent}
        </Link>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-slate-900">{item.title}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[item.status]}`}
          >
            {STATUS_LABELS[item.status]}
          </span>
        </div>
        {item.description && (
          <p className="mt-1 text-sm whitespace-pre-line text-slate-600">{item.description}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>
            {item.author.name ?? item.author.email} · {dateFormat.format(item.createdAt)}
          </span>
          {isAuthor && (
            <>
              <StatusSelect id={item.id} status={item.status} />
              <form action={deleteFeedback.bind(null, item.id)}>
                <SubmitButton pendingText="Deleting…" className="text-slate-400 hover:text-red-600">
                  Delete
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </div>
    </li>
  )
}
