"use client" // Error boundaries must be Client Components

import { useEffect } from "react"

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm">
      <h2 className="font-semibold text-slate-900">Something went wrong</h2>
      <p className="mt-1 text-sm text-slate-500">
        The board couldn&apos;t be loaded. Check that the database is reachable.
      </p>
      <button
        onClick={() => retry()}
        className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Try again
      </button>
    </div>
  )
}
