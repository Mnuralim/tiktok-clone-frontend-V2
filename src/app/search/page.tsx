import { auth } from '@/auth'
import { getAllUsers } from '@/lib/user'
import React from 'react'
import SearchHeader from './components/search-header'
import SearchBody from './components/search-body'

interface Props {
  searchParams: {
    q: string
  }
}

const Page = async ({ searchParams }: Props) => {
  const q = searchParams.q || ''
  const session = await auth()
  const users = await getAllUsers(q)

  return (
    <section className="px-3 bg-white h-dvh">
      <SearchHeader />
      <SearchBody users={users} currentUserId={session?.user.id as string} />
    </section>
  )
}

export default Page
