import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsPlay } from 'react-icons/bs'

interface Props {
  posts: IPost[]
  username: string
}

const Post = ({ posts, username }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-[1px] pb-20">
      {posts.length ? (
        posts.map((post) => (
          <Link href={`/user/${username}/${post.id}`} key={post.id} className="aspect-[9/12] relative">
            <video src={post.videoUrl} className="w-full h-full object-cover object-center" autoPlay muted />
            <div className="flex items-center text-white absolute bottom-1 left-1">
              <BsPlay size={20} />
              <span className="font-semibold text-sm">{10}</span>
            </div>
          </Link>
        ))
      ) : (
        <div>no post available</div>
      )}
    </div>
  )
}

export default Post
