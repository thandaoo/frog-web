import 'react-loading-skeleton/dist/skeleton.css'

import { Box, Card, Flex } from '@radix-ui/themes'

import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex className='space-x-3' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose prose-stone mt-4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailsPage
