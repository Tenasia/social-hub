"use client"

import { useActionState } from "react"
import Link from "next/link"
import { logIn, signUp, type AuthFormState } from "@/app/auth-actions"
import { SubmitButton } from "@/components/submit-button"

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup"
  const [state, formAction] = useActionState<AuthFormState, FormData>(
    isSignup ? signUp : logIn,
    {},
  )

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold text-slate-900">
        {isSignup ? "Create an account" : "Sign in"}
      </h1>

      <form action={formAction} className="mt-4 space-y-3">
        {isSignup && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input id="name" name="name" autoComplete="name" className={inputClass} />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={state.email}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={isSignup ? 8 : undefined}
            autoComplete={isSignup ? "new-password" : "current-password"}
            className={inputClass}
          />
        </div>

        <p aria-live="polite" className="min-h-5 text-sm text-red-600">
          {state.error}
        </p>

        <SubmitButton
          pendingText={isSignup ? "Creating account…" : "Signing in…"}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          {isSignup ? "Sign up" : "Sign in"}
        </SubmitButton>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        {isSignup ? "Already have an account? " : "New here? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-indigo-600 hover:underline"
        >
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  )
}
