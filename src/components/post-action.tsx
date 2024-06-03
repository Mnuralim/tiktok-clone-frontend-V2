'use client'
import React, { useEffect, useState } from 'react'
import { FaHeart } from '@react-icons/all-files/fa/FaHeart'
import { FaBookmark } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { customRevalidation } from '@/actions/custom-revalidation'
import { usePathname, useRouter } from 'next/navigation'
import { BsChatSquareDotsFill, BsPlusCircleFill } from 'react-icons/bs'

interface Props {
  post: IPost
  isVideoPlaying: boolean
}

const PostAction = ({ post, isVideoPlaying }: Props) => {
  const { push } = useRouter()
  const pathName = usePathname()
  const { data: session } = useSession()
  const currentUser = session?.user
  const [isLiked, setIsLiked] = useState<boolean>(post.likes.some((p) => p.userId === currentUser?.id))
  const [likesCount, setLikesCount] = useState<number>(post._count.likes)
  const [savedCount, setSavedCount] = useState<number>(post._count.likes)
  const [isSaved, setIsSaved] = useState<boolean>(post.savedBy.some((p) => p.userId === currentUser?.id))

  useEffect(() => {
    setIsLiked(post.likes.some((p) => p.userId === currentUser?.id))
    setLikesCount(post._count.likes)
    setSavedCount(post._count.savedBy)
    setIsSaved(post.savedBy.some((p) => p.userId === currentUser?.id))
  }, [post, currentUser])

  const handleLike = async () => {
    setIsLiked((prev) => !prev)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)

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
      setIsLiked((prev) => !prev)
      setLikesCount(isLiked ? likesCount + 1 : likesCount - 1)
      alert('Internal server error')
    }
  }

  const handleSavePost = async () => {
    setIsSaved((prev) => !prev)
    setSavedCount(isSaved ? savedCount - 1 : savedCount + 1)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/save/${post.id}`, {
        method: 'PATCH',
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
      setIsSaved((prev) => !prev)
      setSavedCount(isSaved ? savedCount + 1 : savedCount - 1)
      alert('Internal server error')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Link
        className="relative mb-1 bg-white rounded-full w-11 h-11 aspect-square"
        href={`/user/${post.user.username}`}
      >
        <Image
          alt="profile"
          src={post.user.profilePicUrl}
          width={100}
          height={100}
          className="object-cover object-center w-full h-full aspect-square p-[1px] rounded-full"
        />
        <BsPlusCircleFill
          className="absolute inset-x-0 w-5 h-5 mx-auto bg-white rounded-full -bottom-2"
          color="#FE2C55"
        />
      </Link>
      <button onClick={handleLike} className="flex flex-col items-center cursor-pointer">
        <FaHeart size="28" color={`${isLiked ? '#FE2C55' : 'white'}`} />
        <span className="text-sm font-semibold text-white">{likesCount}</span>
      </button>
      <div className="flex flex-col items-center">
        <button onClick={() => push(`${pathName}/?comment=${post.id}`)} id="comment-btn">
          <BsChatSquareDotsFill size="28" color="white" />
        </button>
        <span className="text-sm font-semibold text-white">{post._count.comments}</span>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={handleSavePost}>
          <FaBookmark size="28" color={isSaved ? '#FACE15' : 'white'} />
        </button>
        <span className="text-sm font-semibold text-white">{post._count.savedBy}</span>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-600">
        <Image
          alt="profile"
          src={post.user.profilePicUrl}
          width={28}
          height={28}
          className={`object-cover w-full h-full aspect-square p-[3px] rounded-full shadow-2xl shadow-black ${
            isVideoPlaying ? 'animate-spin-slow' : ''
          }`}
        />
      </div>
    </div>
  )
}

export default PostAction
