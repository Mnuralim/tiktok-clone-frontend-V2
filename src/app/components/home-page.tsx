import React from 'react'
import { getAllPosts } from '@/lib/post'
import PostList from './post-list'

const HomePage = async () => {
  const posts = await getAllPosts()

  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

export default HomePage
