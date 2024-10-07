import IssueTable, { IssueQuery, columnNames } from './IssueTable'

import { Flex } from '@radix-ui/themes'
import IssueActions from './IssueActions'
import Pagination from '@/app/components/Pagination'
import { Status } from '@prisma/client'
import prisma from '@/prisma/client'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]:
          searchParams.sortingOrder === 'asc' ? 'desc' : 'asc'
      }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const issuesPerPage = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * issuesPerPage, // how many issues to skipped from DB
    take: issuesPerPage // how many issues to take
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        totalItems={issueCount}
        itemsPerPage={issuesPerPage}
        currentPage={page}
      />
    </Flex>
  )
}
export const dynamic = 'force-dynamic' // to opt out Full Route Cache

export default IssuesPage
