import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = { title: "Sign up · Social Hub" }

export default async function SignupPage() {
  if (await auth()) redirect("/")
  return <AuthForm mode="signup" />
}
