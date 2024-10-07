import { Button, Flex, Heading, Section } from '@radix-ui/themes'

import IssueActions from './issues/list/IssueActions'
import Link from 'next/link'
import Pagination from './components/Pagination'

export default function Home () {
  return (
    <Section className='space-y-5 flex flex-col items-center  bg-slate-100'>
      <Heading size='8'>Welcome to Frog!</Heading>
      <Flex gapX='5'>
        <Button variant='surface'>
          <Link href='/issues/list'>Go to Issue</Link>
        </Button>
        <IssueActions />
      </Flex>
      <Pagination itemsPerPage={20} itemsTotal={100} currentPage={1} />
    </Section>
  )
}
