import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'

import { Container, Theme } from '@radix-ui/themes'

import AuthProvider from './auth/Provider'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavBar from './NavBar'
import QueryClientProvider from './QueryClientProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Frog',
  description: 'Your Project Management Tool'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor='grass' grayColor='gray'>
              <NavBar />
              <main className='p-5'>
                <Container>{children}</Container>
              </main>
              <Footer />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
