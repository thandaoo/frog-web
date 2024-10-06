'use client'

import { Box, Container, Flex } from '@radix-ui/themes'

import { GiFrogFoot } from 'react-icons/gi'
import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const NavBar = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues/list', label: 'Issues' }
  ]
  const currentPath = usePathname() // this is from Browser API, thus we need 'use client'
  const { status, data: session } = useSession()

  return (
    <nav className='px-6 py-4 border-b'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <GiFrogFoot />
            </Link>
            <ul className='flex space-x-5'>
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      'text-zinc-700':
                        link.href.substring(2) ===
                        currentPath.substring(2, link.href.length),

                      'text-zinc-400': link.href !== currentPath,
                      'hover:text-zinc-500 transition-colors': true
                    })}
                    // className={`${
                    //   link.href === currentPath ? 'text-zinc-300' : 'text-zinc-500'
                    // } hover:text-zinc-100 transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href='/api/auth/signout'>Logout</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
