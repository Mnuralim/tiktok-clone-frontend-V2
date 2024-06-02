import PostCard from '@/components/post-card'
import React from 'react'

interface Props {
  post: IPost
}

const UserPost = ({ post }: Props) => {
  return (
    <div className="w-full h-full">
      <PostCard post={post} />
    </div>
  )
}

export default UserPost
