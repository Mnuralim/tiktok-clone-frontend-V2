'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsArrowUpCircleFill } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { customRevalidation } from '@/actions/custom-revalidation'

interface Props {
  postId: string
  handleTriger: () => void
}

const CommentBar = ({ postId, handleTriger }: Props) => {
  const [comment, setComment] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session } = useSession()
  const userSession = session?.user

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({
          commentText: comment,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      })
      if (response.ok) {
        setComment('')
        handleTriger()
        customRevalidation('/')
      }
    } catch (error) {
      alert('Internal error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute bottom-0 z-10 flex items-center w-full max-w-xl gap-3 px-3 py-2 bg-white border-t ">
      <Image
        src={'/img/google.png'}
        width={35}
        height={35}
        alt="profile"
        className="rounded-full object-fill w-[35px] h-[35px]"
      />
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          autoFocus
          type="text"
          className="w-full bg-[#f1f1f1] outline-none py-2 rounded-xl pl-3 pr-8"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.length ? (
          <button type="submit" className="absolute z-20 bottom-3 right-2">
            {isLoading ? (
              <AiOutlineLoading3Quarters size="18" className="animate-spin" />
            ) : (
              <BsArrowUpCircleFill size="18" color="#FE2C55" />
            )}
          </button>
        ) : null}
      </form>
    </div>
  )
}

export default CommentBar
