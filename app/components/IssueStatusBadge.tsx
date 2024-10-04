import { Badge } from '@radix-ui/themes'
import React from 'react'
import { Status } from '@prisma/client'

interface Props {
  status: Status
}
//* Record: Utility type in TypeScript to define <KEY, VALUE> pair with particular types
const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
