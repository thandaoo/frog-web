'use client'

import { Issue, User } from '@prisma/client'
import toast, { Toaster } from 'react-hot-toast'

import React from 'react'
import { Select } from '@radix-ui/themes'
import Skeleton from '@/app/components/Skeleton'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //cache the data for 60 secs
    retry: 3 // try 3 more times fetching the data, then set the error
  })

  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'none'}
        onValueChange={userId => {
          axios
            .patch('/api/issues/' + issue.id, {
              assignedToUserId: userId || null
            })
            .catch(() => toast.error("Changes couldn't be saved."))
        }}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='none'>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
