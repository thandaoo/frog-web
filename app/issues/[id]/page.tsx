import { Card, Flex, Heading, Text } from '@radix-ui/themes'

import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import React from 'react'
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
    <div className='space-y-4'>
      <Heading>{issue.title}</Heading>
      <Flex gap='4'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose prose-stone mt-4'>
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  )
}

export default IssueDetailsPage
