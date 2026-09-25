import Link from "next/link"
import { auth } from "@/auth"
import { logOut } from "@/app/auth-actions"
import { SubmitButton } from "@/components/submit-button"

export async function SiteHeader() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Social<span className="text-indigo-600">Hub</span>
        </Link>

        {user ? (
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <span className="truncate text-slate-600">{user.name ?? user.email}</span>
            <form action={logOut}>
              <SubmitButton className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Sign out
              </SubmitButton>
            </form>
          </div>
        ) : (
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/login" className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-500"
            >
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
