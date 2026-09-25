import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Return the user on success, or null to make signIn() throw CredentialsSignin.
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase()
        const password = String(credentials?.password ?? "")
        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.passwordHash) return null
        if (!(await compare(password, user.passwordHash))) return null

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  // Credentials only works with JWT sessions (no session table needed).
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    // The JWT stores the user id as `sub`; expose it on session.user.id.
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
})
