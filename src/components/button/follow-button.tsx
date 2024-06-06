'use client'
import { customRevalidation } from '@/actions/custom-revalidation'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface Props {
  currentUserId: string
  user: Iuser
  width: number | string
  height: number
}

const FollowButton = ({ currentUserId, user, height, width }: Props) => {
  const { data: session } = useSession()
  const [isFollow, setIsFollow] = useState<boolean>(() => user.followers.some((u) => u.followerId === currentUserId))

  useEffect(() => {
    setIsFollow(user.followers.some((u) => u.followerId === currentUserId))
  }, [user.followers, currentUserId])

  const handleFollowUser = async () => {
    setIsFollow((prev) => !prev)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/follow/${user.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      })

      if (response.ok) {
        customRevalidation('/search')
      }
    } catch (error) {
      setIsFollow(isFollow)
      alert('Internal server error')
    }
  }

  return (
    <button
      onClick={handleFollowUser}
      style={{
        width: width === 'full' ? '80%' : `${width}px`,
        height: `${height}px`,
      }}
      className={`font-semibold rounded-lg  text-sm ${
        isFollow ? 'bg-[rgba(22,24,35,0.12)] text-black' : ' text-white bg-[#FE2C55]'
      }`}
    >
      {isFollow ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowButton
