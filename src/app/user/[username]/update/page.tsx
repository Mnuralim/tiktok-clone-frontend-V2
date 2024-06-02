import React from 'react'
import UpdateHeader from './components/update-header'
import UpdateBody from './components/update-body'
import { getUserByUsername } from '@/lib/user'
import { auth } from '@/auth'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    username: string
  }
}

const Page = async ({ params }: Props) => {
  const session = await auth()
  const user = await getUserByUsername(params.username, session?.user.accessToken as string)
  if (!user) notFound()
  return (
    <section className="h-dvh overflow-y-auto bg-white">
      <UpdateHeader />
      <UpdateBody user={user} accessToken={session?.user.accessToken as string} />
    </section>
  )
}

export default Page
