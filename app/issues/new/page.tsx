'use client'

import 'easymde/dist/easymde.min.css'

import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import axios from 'axios'
import { createIssueSchema } from '@/app/validationSchemas'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type IssueForm = z.infer<typeof createIssueSchema>

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
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
        <TextField.Root placeholder='Title' {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          Submit New Issue
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
