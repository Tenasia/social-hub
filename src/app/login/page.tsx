import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = { title: "Sign in · Social Hub" }

export default async function LoginPage() {
  if (await auth()) redirect("/")
  return <AuthForm mode="login" />
}
