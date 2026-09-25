"use client"

import { useActionState } from "react"
import { createFeedback, type CreateFeedbackState } from "@/app/actions"
import { SubmitButton } from "@/components/submit-button"

const initialState: CreateFeedbackState = {}

export function NewFeedbackForm() {
  const [state, formAction] = useActionState(createFeedback, initialState)

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={3}
          maxLength={120}
          defaultValue={state.values?.title}
          placeholder="What should we build?"
          aria-describedby={state.errors?.title ? "title-error" : undefined}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {state.errors?.title && (
          <p id="title-error" className="mt-1 text-xs text-red-600">
            {state.errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Details <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={1000}
          defaultValue={state.values?.description}
          placeholder="Why does it matter?"
          aria-describedby={state.errors?.description ? "description-error" : undefined}
          className="mt-1 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {state.errors?.description && (
          <p id="description-error" className="mt-1 text-xs text-red-600">
            {state.errors.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton
          pendingText="Submitting…"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          Submit feedback
        </SubmitButton>
        <p
          aria-live="polite"
          className={`text-sm ${state.errors?.form ? "text-red-600" : "text-emerald-700"}`}
        >
          {state.errors?.form ?? (state.success ? "Thanks! Your feedback was added." : "")}
        </p>
      </div>
    </form>
  )
}
