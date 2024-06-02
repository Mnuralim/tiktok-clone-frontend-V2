import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  users: Iuser[]
  currentUser?: {
    id: string
    name: string
    email: string
    username: string
    accessToken: string
  }
}

const DiscoverBody = ({ users, currentUser }: Props) => {
  return (
    <div className="mb-32">
      <div className="flex flex-col gap-3 mt-5 px-3">
        {users.map((user) =>
          user.username === currentUser?.username ? null : (
            <Link key={user.id} href={`/user/${user.username}`} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={user.profilePicUrl}
                  alt="profile-image"
                  width={50}
                  height={50}
                  className="rounded-full object-cover aspect-square object-center w-12 h-12"
                />
                <div className="flex items-start flex-col">
                  <h2 className="font-semibold">{user.name}</h2>

                  <div className="flex items-center gap-1">
                    <p className="text-xs text-[rgba(22,24,35,0.5)]">@{user.username},</p>
                    <p className="text-xs text-[rgba(22,24,35,0.5)]">
                      {user.followers.length} {user.followers.length <= 1 ? 'follower' : 'followers'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default DiscoverBody
