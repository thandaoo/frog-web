'use client'

import 'easymde/dist/easymde.min.css'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'

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
  return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch {
            setError('An unexpected error occurred')
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')} />
        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <Text color='red' as='p'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
