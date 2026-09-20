import { prisma } from "@/lib/prisma"

export default async function Home() {
  const users = await prisma.user.findMany({
    include: { posts: true },
  })

  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900">
      <h1 className="text-2xl font-bold mb-4">Social Hub: System Operational</h1>
      <p className="text-sm text-slate-600 mb-2">Connected Database Users: {users.length}</p>
      <div className="bg-white rounded border border-slate-200 p-4 shadow-sm max-w-md">
        {users.length === 0 ? (
          <p className="text-sm text-slate-500">No users found in database yet. Day 1 & Day 2 foundations complete!</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="text-sm font-medium">
                {u.name ?? u.email} — {u.posts.length} posts
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
