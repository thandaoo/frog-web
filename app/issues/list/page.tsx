import { Issue, Status } from '@prisma/client'
import { Link, Table } from '@radix-ui/themes'

import { ArrowUpIcon } from '@radix-ui/react-icons'
import IssueActions from './IssueActions'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import NextLink from 'next/link'
import prisma from '@/prisma/client'

const IssuesPage = async ({
  searchParams
}: {
  searchParams: { status: Status; orderBy: keyof Issue; sortingOrder: string }
}) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]
  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]:
          searchParams.sortingOrder === 'asc' ? 'desc' : 'asc'
      }
    : undefined
  const issues = await prisma.issue.findMany({
    where: {
      status: status
    },
    orderBy: orderBy
  })

  return (
    <div className='max-w-xl'>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sortingOrder:
                        searchParams.sortingOrder === 'asc' ? 'desc' : 'asc'
                    }
                  }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy &&
                    (searchParams.sortingOrder === 'asc' ? (
                      <ArrowUpIcon className='inline' />
                    ) : (
                      <ArrowUpIcon className='inline rotate-180' />
                    ))}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export const dynamic = 'force-dynamic' // to opt out Full Route Cache

export default IssuesPage
