import { Button, Flex, Grid } from '@radix-ui/themes'

import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from '@/LatestIssues'
import Link from 'next/link'
import { Metadata } from 'next'
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
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <Flex direction='column' gap='5'>
        <LatestIssues />
        <Button size='3' variant='surface'>
          <Link href='/issues/list' className='w-full'>
            Go to Issues
          </Link>
        </Button>
      </Flex>
    </Grid>
  )
}
export const dynamic = 'force-dynamic' // to opt out Full Route Cache

export const metadata: Metadata = {
  title: 'Frog - homepage',
  description: 'View a summary of project and issues'
}
