// Shown instantly while the page's Server Component awaits the database.
export default function Loading() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_20rem]" aria-busy="true" aria-label="Loading feedback">
      <div className="space-y-3">
        <div className="mb-4 h-7 w-44 animate-pulse rounded bg-slate-200" />
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="h-14 w-14 animate-pulse rounded-md bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
    </div>
  )
}
