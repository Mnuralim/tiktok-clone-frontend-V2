'use client'
import PostCard from '@/components/post-card'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'
import HeaderPost from './post-header'
import useNotifPost from '@/store/notif-post'
import LoadingBar from './loading-bar'
import LoadingIndicator from './loading-indicator'
import PostMessageAlert from './post-message-alert'
import 'swiper/css'

interface Props {
  posts: IPost[]
}

const PostList = ({ posts }: Props) => {
  const { notif, updateNotif } = useNotifPost()

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (!notif.isLoadingUpload) {
      intervalId = setInterval(() => {
        updateNotif({
          message: '',
        })
      }, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [notif.isLoadingUpload, updateNotif])

  return (
    <div className="h-dvh">
      <div className="fixed inset-x-0 left-0 z-10 top-2">
        <HeaderPost />
      </div>
      {notif.isLoadingUpload ? (
        <div className="fixed left-0 z-50 w-full -top-[6px]">
          <div className="w-full max-w-xl px-3 mx-auto mt-[50px]">
            <LoadingBar />
            <LoadingIndicator thumbnail={notif.thumbnail as string} />
          </div>
        </div>
      ) : null}

      {!notif.isLoadingUpload && notif.message ? (
        <div className="fixed top-0 left-0 z-50 w-full">
          <div className="w-full max-w-xl px-3 mx-auto">
            <PostMessageAlert message={notif.message} />
          </div>
        </div>
      ) : null}

      <Swiper direction={'vertical'} modules={[Pagination, Mousewheel]} mousewheel={true} className="w-full h-full">
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="w-full h-full">
            <PostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PostList
