import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import {issueSchema} from '@/app/validationSchemas'
import prisma from '@/prisma/client'

export async function POST (request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, {status: 401})

  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  })

  return NextResponse.json(newIssue, { status: 201 })
}
