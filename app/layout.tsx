import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'

import Footer from './components/footer'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavBar from './NavBar'
import { Theme } from '@radix-ui/themes'

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
          <main className='p-5'>{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  )
}
