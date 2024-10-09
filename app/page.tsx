import { Flex, Grid } from '@radix-ui/themes'

import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from '@/LatestIssues'
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
  {
    /* <Section className='space-y-3 flex flex-col items-center  bg-slate-100'>
        <Heading size='8'>Welcome to Frog!</Heading>
        <Flex gapX='5'>
          <Button size='3' variant='surface'>
            <Link href='/issues/list'>Go to Issues</Link>
          </Button>
        </Flex>
      </Section> */
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Frog - homepage',
  description: 'View a summary of project and issues'
}
