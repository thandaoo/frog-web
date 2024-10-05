'use client'

import 'easymde/dist/easymde.min.css'

import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage, Spinner } from '@/app/components'

import { Issue } from '@prisma/client'
import SimpleMDE from 'react-simplemde-editor'
import axios from 'axios'
import { issueSchema } from '@/app/validationSchemas'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data)
      else await axios.post('/api/issues', data)
      router.push('/issues/list')
      router.refresh() //force to refresh the content of the current route
    } catch {
      setSubmitting(false)
      setError('An unexpected error occurred')
    }
  })

  return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          {issue ? 'Save Issue' : 'Submit New Issue'}
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
