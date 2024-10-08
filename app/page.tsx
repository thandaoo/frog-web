import { Button, Flex, Heading, Section } from '@radix-ui/themes'

import IssueSummary from './IssueSummary'
import LatestIssues from '@/LatestIssues'
import Link from 'next/link'
import prisma from '@/prisma/client'

export default async function Home () {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' }
  })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' }
  })
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' }
  })

  return (
    <Flex direction='column' gap='4'>
      <Section className='space-y-3 flex flex-col items-center  bg-slate-100'>
        <Heading size='8'>Welcome to Frog!</Heading>
        <Flex gapX='5'>
          <Button size='3' variant='surface'>
            <Link href='/issues/list'>Go to Issues</Link>
          </Button>
        </Flex>
      </Section>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  )
}
