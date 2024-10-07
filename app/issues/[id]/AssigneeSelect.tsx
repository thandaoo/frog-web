'use client'

import React from 'react'
import { Select } from '@radix-ui/themes'
import Skeleton from '@/app/components/Skeleton'
import { User } from '@prisma/client'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //cache the data for 60 secs
    retry: 3 // try 3 more times to fetch the data, then set the error
  })

  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
