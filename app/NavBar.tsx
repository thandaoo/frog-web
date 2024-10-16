'use client'

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text
} from '@radix-ui/themes'
import { signIn, signOut, useSession } from 'next-auth/react'

import { GiFrogFoot } from 'react-icons/gi'
import Link from 'next/link'
import Skeleton from '@/app/components/Skeleton'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  return (
    <nav className='px-6 py-4 border-b'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <GiFrogFoot />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()
  const handleSignOut = () => {
    signOut({ callbackUrl: window.location.origin })
  }
  const handleSignIn = () => {
    const redirectTo = '/issues/list'
    signIn('google', { redirectTo: redirectTo })
  }
  if (status === 'loading') return <Skeleton width='3rem' />

  if (status === 'unauthenticated')
    return (
      // <Link className='nav-link' href='/api/auth/signin'>
      //   Login
      // </Link>
      <Button className='hover:cursor-pointer' onClick={handleSignIn}>
        Login
      </Button>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='end'>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className='flex flex-1'>
            {/* <Link href='/api/auth/signout'>Logout</Link> */}
            <button className='w-full py-2 ' onClick={handleSignOut}>
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

const NavLinks = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues/list', label: 'Issues' }
  ]
  const currentPath = usePathname() // this is from Browser API, thus we need 'use client'

  return (
    <ul className='flex space-x-5'>
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link': true,
              '!text-zinc-700':
                link.href.substring(2) ===
                currentPath.substring(2, link.href.length)
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default NavBar
