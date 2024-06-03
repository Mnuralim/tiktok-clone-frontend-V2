import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsPlay } from 'react-icons/bs'

interface Props {
  posts: IPost[]
  username: string
}

const Post = ({ posts, username }: Props) => {
  if (!posts.length) {
    return (
      <div className="flex items-center justify-center flex-col w-full h-fit mt-24 gap-2">
        <p className="font-semibold">No post available</p>
        <Link href={'/add-post'} className="bg-[#FE2C55] text-white font-semibold py-0.5 text-sm px-4 rounded-sm">
          Mulai
        </Link>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-[1px] pb-20">
      {posts.map((post) => (
        <Link href={`/user/${username}/${post.id}`} key={post.id} className="aspect-[9/12] relative">
          <video src={post.videoUrl} className="w-full h-full object-cover object-center" autoPlay muted />
          <div className="flex items-center text-white absolute bottom-1 left-1">
            <BsPlay size={20} />
            <span className="font-semibold text-sm">{10}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Post
