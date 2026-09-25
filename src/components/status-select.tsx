"use client"

import { useOptimistic, useTransition } from "react"
import { updateFeedbackStatus } from "@/app/actions"
import { FeedbackStatus, STATUS_LABELS } from "@/lib/feedback-status"

// Not wrapped in a <form>: React resets forms after a successful action, and
// resetting a <select> snaps it back to the first option. Calling the action
// from onChange avoids that, and useOptimistic shows the new value right away
// until the revalidated `status` prop arrives.
export function StatusSelect({ id, status }: { id: string; status: FeedbackStatus }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status)
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <label className="sr-only" htmlFor={`status-${id}`}>
        Status
      </label>
      <select
        id={`status-${id}`}
        value={optimisticStatus}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as FeedbackStatus
          startTransition(async () => {
            setOptimisticStatus(next)
            await updateFeedbackStatus(id, next)
          })
        }}
        className="rounded-md border border-slate-300 bg-white py-1 pl-2 pr-7 text-xs text-slate-700 disabled:opacity-60"
      >
        {Object.values(FeedbackStatus).map((value) => (
          <option key={value} value={value}>
            {STATUS_LABELS[value]}
          </option>
        ))}
      </select>
    </>
  )
}
