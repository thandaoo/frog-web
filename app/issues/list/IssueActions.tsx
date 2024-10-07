import { Button, Flex } from '@radix-ui/themes'

import IssueStatusFilter from './IssueStatusFilter'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <Flex justify='between' mb='5'>
      <IssueStatusFilter />
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
