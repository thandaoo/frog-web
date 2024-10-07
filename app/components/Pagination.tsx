import { Button, Flex, Text } from '@radix-ui/themes'
import { ChevronLeftIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons'

import React from 'react'

interface Props {
  itemsTotal: number
  itemsPerPage: number
  currentPage: number
}

const Pagination = ({ itemsTotal, itemsPerPage, currentPage }: Props) => {
  const pageCount = Math.ceil(itemsTotal / itemsPerPage)
  if (pageCount <= 1) return null
  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
        <ChevronLeftIcon className='rotate-180' />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
        <DoubleArrowLeftIcon className='rotate-180' />
      </Button>
    </Flex>
  )
}

export default Pagination
