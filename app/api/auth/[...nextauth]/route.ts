import Google from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma/client'

const handlers = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  }
})

export { handlers as GET, handlers as POST }
