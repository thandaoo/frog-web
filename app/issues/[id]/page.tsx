import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import Link from 'next/link'
import { Pencil2Icon } from '@radix-ui/react-icons'
import ReactMarkDown from 'react-markdown'
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
        <Heading>{issue.title}</Heading>
        <Flex gap='4'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose prose-stone mt-4'>
          <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
