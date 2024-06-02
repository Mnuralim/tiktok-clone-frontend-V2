import Image from 'next/image'
import React from 'react'
import { Session } from 'next-auth'
import FollowButton from '@/components/button/follow-button'
import Link from 'next/link'

interface Props {
  user: Iuser
  session: Session
}

const ProfileBody = ({ user, session }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3 mt-5 overflow-y-auto">
      <Image
        src={user.profilePicUrl}
        width={96}
        height={96}
        alt="profile"
        className="rounded-full w-[96px] h-[96px] aspect-auto object-cover object-center"
      />
      <p className="font-semibold">@{user.username}</p>
      <div className="flex items-center justify-center w-full gap-10">
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{user.following.length}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Following</span>
        </div>
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{user.followers.length}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Followers</span>
        </div>
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{20}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Likes</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {session.user.username !== user.username ? (
          <FollowButton currentUserId={session.user.id} user={user} width={130} height={40} />
        ) : (
          <>
            <Link
              href={`/user/${user.username}/update`}
              className={`font-semibold flex items-center justify-center rounded-lg bg-[rgba(22,24,35,0.12)] px-4 h-10 text-black`}
            >
              Edit profile
            </Link>
            <button className={`font-semibold rounded-lg bg-[rgba(22,24,35,0.12)] px-4 h-10 text-black`}>
              Bagikan profile
            </button>
          </>
        )}
      </div>

      <p className="text-sm font-medium">{user.bio}oke</p>
    </div>
  )
}

export default ProfileBody
