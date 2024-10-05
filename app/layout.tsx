import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'

import { Container, Theme } from '@radix-ui/themes'

import Footer from './components/Footer'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavBar from './NavBar'

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
        <Theme accentColor='grass' grayColor='gray'>
          <NavBar />
          <main className='p-5'>
            <Container>{children}</Container>
          </main>
          <Footer />
        </Theme>
      </body>
    </html>
  )
}
