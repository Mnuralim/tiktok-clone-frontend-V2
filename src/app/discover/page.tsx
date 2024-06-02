import { auth } from '@/auth'
import { getAllUsers } from '@/lib/user'
import React from 'react'
import DiscoverHeader from './components/discover-header'
import DiscoverBody from './components/discover-body'
import { notFound } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  const users = await getAllUsers()

  if (!users) notFound()

  return (
    <section className="bg-white h-dvh overflow-y-auto">
      <DiscoverHeader />
      <DiscoverBody currentUser={session?.user} users={users} />
    </section>
  )
}

export default Page
