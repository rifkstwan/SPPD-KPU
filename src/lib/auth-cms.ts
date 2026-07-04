import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Clean environment variables of any surrounding quotes
for (const key of ["NEXTAUTH_URL", "AUTH_URL", "APP_URL", "AUTH_SECRET", "CMS_NEXTAUTH_SECRET"]) {
  if (process.env[key]) {
    process.env[key] = process.env[key]!.replace(/^["']|["']$/g, "")
  }
}

export const { handlers: cmsHandlers, auth: cmsAuth, signIn: cmsSignIn, signOut: cmsSignOut } = NextAuth({
  basePath: "/api/auth/cms",
  trustHost: true,
  secret: process.env.CMS_NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "cms_sppd_kpu_jateng_secret_key_default_2026",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || user.role !== "CMS_ADMIN") return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.nama,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { id?: string; role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/cms-login",
  },
  cookies: {
    sessionToken: {
      name: "cms-session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
})
