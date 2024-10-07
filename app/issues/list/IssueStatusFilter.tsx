'use client'

import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: Status.OPEN },
    { label: 'In Progress', value: Status.IN_PROGRESS },
    { label: 'Closed', value: Status.CLOSED }
  ]
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by Status..' />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.value} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
