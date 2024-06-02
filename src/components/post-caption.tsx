import Link from 'next/link'
import React from 'react'
import { HiMusicNote } from 'react-icons/hi'
import { IoLocationSharp } from 'react-icons/io5'

interface Props {
  post: IPost
  isVideoPlaying: boolean
}
const PostCaption = ({ post, isVideoPlaying }: Props) => {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="flex gap-1 bg-black rounded bg-opacity-20 w-fit">
        <div className="w-5 h-5 my-1 ml-1 flex items-center justify-center rounded-sm bg-[#13BD90]">
          <IoLocationSharp />
        </div>
        <div>
          <p className="text-xs font-semibold">{post.location}</p>
          <p className="text-[10px] mr-1">112 people posted about this place</p>
        </div>
      </div>
      <Link href={`/user/${post.user.username}`} className="font-semibold text-[17px]">
        {post.user.username}
      </Link>
      <p className="text-sm max-w-[80%]">{post.caption}</p>
      <div className="flex items-center gap-1">
        <HiMusicNote />
        <div className="">
          <div className={`${isVideoPlaying ? '' : ''} text-sm font-medium`}>original sound- {post.user.username}</div>
        </div>
      </div>
    </div>
  )
}

export default PostCaption
