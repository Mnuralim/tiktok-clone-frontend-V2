'use client'
import React from 'react'
import { FaHeart } from '@react-icons/all-files/fa/FaHeart'
import { BsChatSquareDotsFill } from '@react-icons/all-files/bs/BsChatSquareDotsFill'
import { PiShareFatFill } from 'react-icons/pi'
import Link from 'next/link'
import Image from 'next/image'
import { BsPlusCircleFill } from '@react-icons/all-files/bs/BsPlusCircleFill'
import { useSession } from 'next-auth/react'
import { customRevalidation } from '@/actions/custom-revalidation'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  post: IPost
  isVideoPlaying: boolean
}

const PostAction = ({ post, isVideoPlaying }: Props) => {
  const { push } = useRouter()
  const pathName = usePathname()
  const { data: session } = useSession()
  const currentUser = session?.user
  const alreadyLike = post.likes.find((p) => p.userId === currentUser?.id)

  const handleLike = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
        method: 'PATCH',
        body: JSON.stringify({
          postId: post.id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Internal server error')
      }
      customRevalidation('/')
    } catch (error) {
      alert('Internal server error')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Link className="relative mb-1 bg-white rounded-full w-11 h-11 aspect-square" href={`/${post.user.username}`}>
        <Image
          alt="profile"
          src={post.user.profilePicUrl}
          width={100}
          height={100}
          className="object-contain p-[1px] rounded-full"
        />
        <BsPlusCircleFill
          className="absolute inset-x-0 w-5 h-5 mx-auto bg-white rounded-full -bottom-2"
          color="#FE2C55"
        />
      </Link>
      <button onClick={handleLike} className="flex flex-col items-center cursor-pointer">
        <FaHeart size="28" color={`${alreadyLike ? '#FE2C55' : 'white'}`} />
        <span className="text-sm font-semibold text-white">{post.likes.length}</span>
      </button>
      <div className="flex flex-col items-center">
        <button onClick={() => push(`${pathName}/?comment=${post.id}`)} id="comment-btn">
          <BsChatSquareDotsFill size="28" color="white" />
        </button>
        <span className="text-sm font-semibold text-white">{post.comments.length}</span>
      </div>
      <div className="flex flex-col items-center">
        <PiShareFatFill size="28" color="white" />
        <span className="text-sm font-semibold text-white">122</span>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-600">
        <Image
          alt="profile"
          src={post.user.profilePicUrl}
          width={28}
          height={28}
          className={`object-contain p-[1px] rounded-full shadow-2xl shadow-black ${
            isVideoPlaying ? 'animate-spin' : ''
          }`}
        />
      </div>
    </div>
  )
}

export default PostAction
