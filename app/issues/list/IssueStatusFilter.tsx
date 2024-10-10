'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: Status.OPEN },
    { label: 'In Progress', value: Status.IN_PROGRESS },
    { label: 'Closed', value: Status.CLOSED }
  ]

  const router = useRouter()

  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'all'}
      onValueChange={status => {
        const params = new URLSearchParams()
        if (status && status !== 'all') params.append('status', status)
        if (searchParams) params.append('orderBy', searchParams.get('orderBy')!)

        const query = params.size ? '?' + params.toString() : ''

        router.push('/issues/list' + query)
      }}
    >
      <Select.Trigger placeholder='Filter by Status..' />
      <Select.Content>
        <Select.Group>
          {statuses.map(status => (
            <Select.Item
              key={status.value || 'all'}
              value={status.value || 'all'}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
