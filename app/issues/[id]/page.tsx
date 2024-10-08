import { Box, Flex, Grid } from '@radix-ui/themes'

import AssigneeSelect from './AssigneeSelect'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import { auth } from '@/auth'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'

interface Props {
  params: { id: string }
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId }
  })
)

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await auth()
  const issue = await fetchUser(parseInt(params.id))
  if (!issue) notFound() // no need return cuz the return type is 'never'
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}
export async function generateMetadata ({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id))
  return {
    title: 'Issue: ' + issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailsPage
