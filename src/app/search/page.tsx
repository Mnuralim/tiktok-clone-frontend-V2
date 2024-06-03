import { auth } from '@/auth'
import { getAllUsers } from '@/lib/user'
import React, { Suspense } from 'react'
import SearchHeader from './components/search-header'
import SearchBody from './components/search-body'
import LoadUserData from './components/load-user-data'

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
      <Suspense fallback={<LoadUserData />}>
        <SearchBody users={users} currentUserId={session?.user.id as string} />
      </Suspense>
    </section>
  )
}

export default Page
