import React from 'react'
import AddPostHeader from './components/AddPostHeader'
import AddPostBody from './components/AddPostBody'
import { getAllLocation } from '@/lib/location'

const Page = async () => {
  const locations = await getAllLocation()
  return (
    <section className="h-[100dvh] overflow-hidden">
      <AddPostHeader />
      <AddPostBody locations={locations} />
    </section>
  )
}

export default Page
