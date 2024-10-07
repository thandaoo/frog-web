'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { ChevronLeftIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'

import React from 'react'

interface Props {
  totalItems: number // total no. of items
  itemsPerPage: number // no. of items pr page
  currentPage: number // current page number
}

const Pagination = ({ totalItems, itemsPerPage, currentPage }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronLeftIcon className='rotate-180' />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowLeftIcon className='rotate-180' />
      </Button>
    </Flex>
  )
}

export default Pagination
