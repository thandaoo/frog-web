'use client'

import { GiFrogFoot } from 'react-icons/gi'
import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues/list', label: 'Issues' }
  ]
  const currentPath = usePathname() // this is from Browser API, thus we need 'use client'

  return (
    <nav className='flex space-x-5 px-6 py-4 items-center border-b'>
      <Link href='/'>
        <GiFrogFoot />
      </Link>
      <ul className='flex space-x-5'>
        {links.map(link => (
          <Link
            key={link.href}
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
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
