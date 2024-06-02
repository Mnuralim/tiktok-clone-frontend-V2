import React from 'react'
import UserPost from './components/user-post'
import { getPostById } from '@/lib/post'
import PostHeader from './components/post-header'
import { notFound } from 'next/navigation'

interface Params {
  params: {
    postId: string
  }
}

const Page = async ({ params }: Params) => {
  const post = await getPostById(params.postId)
  if (!post) notFound()
  return (
    <section className="h-dvh">
      <PostHeader />
      <UserPost post={post} />
    </section>
  )
}

export default Page
