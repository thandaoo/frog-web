import { Box, Grid } from '@radix-ui/themes'

import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'

interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue) notFound() // no need return cuz the return type is 'never'
  return (
    <Grid columns={{ initial: '1', sm: '2' }} gap='5'>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
