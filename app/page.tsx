import { Button, Flex, Heading, Section } from '@radix-ui/themes'

import Link from 'next/link'
import Pagination from './components/Pagination'

export default function Home ({
  searchParams
}: {
  searchParams: { page: string }
}) {
  return (
    <Section className='space-y-5 flex flex-col items-center  bg-slate-100'>
      <Heading size='8'>Welcome to Frog!</Heading>
      <Flex gapX='5'>
        <Button size='4' variant='surface'>
          <Link href='/issues/list'>Go to Issues</Link>
        </Button>
      </Flex>
      <Pagination
        itemsPerPage={20}
        totalItems={100}
        currentPage={parseInt(searchParams.page)}
      />
    </Section>
  )
}
