import '@radix-ui/themes/styles.css'
import './globals.css'

import Footer from './components/footer'
import type { Metadata } from 'next'
import NavBar from './NavBar'
import { Theme } from '@radix-ui/themes'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
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
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <NavBar />
          <main className='px-8 py-10'>{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  )
}
