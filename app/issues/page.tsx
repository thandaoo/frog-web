'use client'

import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesPage = () => {
  return (
    <div className='max-w-xl'>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </div>
  )
}

export default IssuesPage
