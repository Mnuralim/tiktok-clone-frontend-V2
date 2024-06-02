import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { loginGoogle } from './actions/auth/login-google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
  },
  providers: [Google],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === 'google') {
        const response = await loginGoogle(account.id_token as string)
        if (response.ok) {
          const resParsed = await response.json()
          const data = await resParsed.data
          token.accessToken = data.accesToken
          user.id = data.id
          token.username = data.username
        }
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken as string
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
})
