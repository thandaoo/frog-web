'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { Fragment, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()

  const [error, setError] = useState(false)

  const deleteIssue = async () => {
    try {
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues')
      router.refresh()
    } catch {
      setError(true)
    }
  }

  return (
    <Fragment>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red' onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            variant='soft'
            color='gray'
            mt='2'
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Fragment>
  )
}

export default DeleteIssueButton
