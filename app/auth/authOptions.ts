import Google from 'next-auth/providers/google'
import { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma/client'

const authOptions: NextAuthConfig={
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
   callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
}

export default authOptions