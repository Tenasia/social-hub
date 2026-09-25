"use client"

import { useFormStatus } from "react-dom"

// useFormStatus reads the pending state of the nearest parent <form>,
// so this works inside Server Component forms too.
export function SubmitButton({
  children,
  pendingText,
  className,
  ...props
}: React.ComponentProps<"button"> & { pendingText?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
      {...props}
    >
      {pending && pendingText ? pendingText : children}
    </button>
  )
}
