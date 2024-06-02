import { getUserByUsername } from '@/lib/user'
import React from 'react'
import ProfileHeader from './components/profile-header'
import { auth } from '@/auth'
import ProfileBody from './components/profile-body'
import { Session } from 'next-auth'
import Tab from './components/tab'
import Post from './components/post'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    username: string
  }
  searchParams: {
    tab: string
  }
}

const Page = async ({ params, searchParams }: Props) => {
  const session = await auth()
  const user = await getUserByUsername(params.username, session?.user.accessToken as string)
  if (!user) notFound()

  const formattedLikesData = user.likes.map((item) => item.video)
  const formattedSavedVideoData = user.savedVideos.map((item) => item.video)

  return (
    <section id="profile" className="bg-white h-dvh overflow-y-auto">
      <ProfileHeader name={user?.name || user?.username} />
      <ProfileBody user={user} session={session as Session} />
      <Tab />
      <Post
        username={user.username}
        posts={
          searchParams.tab === 'post'
            ? user.videos
            : searchParams.tab === 'like'
            ? formattedLikesData
            : formattedSavedVideoData
        }
      />
    </section>
  )
}

export default Page
