import React from 'react'
import InboxHeader from './components/inbox-header'
import { auth } from '@/auth'
import { getAllNotification } from '@/lib/notification'
import InboxBody from './components/inbox-body'

const Page = async () => {
  const session = await auth()
  const notifications = await getAllNotification(session?.user.accessToken as string)
  return (
    <section className="bg-white h-dvh overflow-y-auto">
      <InboxHeader />
      <InboxBody notifications={notifications} />
    </section>
  )
}

export default Page
