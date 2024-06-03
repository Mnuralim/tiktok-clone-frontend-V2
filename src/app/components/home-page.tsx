import React from 'react'
import { getAllPosts } from '@/lib/post'
import PostList from './post-list'
import { auth } from '@/auth'

interface Props {
  query: string
}

const HomePage = async ({ query }: Props) => {
  const session = await auth()
  const posts = await getAllPosts(session?.user.accessToken as string, query)

  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

export default HomePage
