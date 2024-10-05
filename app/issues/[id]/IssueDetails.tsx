import { Card, Flex, Heading, Text } from '@radix-ui/themes'

import { Fragment } from 'react'
import { Issue } from '@prisma/client'
import { IssueStatusBadge } from '@/app/components'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Fragment>
      <Heading>{issue.title}</Heading>
      <Flex gap='4' mt='2' className='items-center'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full mt-5'>
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </Fragment>
  )
}

export default IssueDetails
