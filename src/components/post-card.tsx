'use client'
import PostAction from '@/components/post-action'
import React, { useEffect, useRef, useState } from 'react'
import PostCaption from './post-caption'
import { FaPlay } from 'react-icons/fa'

interface Props {
  post: IPost
}

const PostCard = ({ post }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const vidRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handleVideoClick = () => {
    if (vidRef.current) {
      if (isPlaying) {
        vidRef.current.pause()
      } else {
        vidRef.current.play().catch((error) => {
          console.error('Video play interrupted:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        vidRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error('Video play interrupted:', error)
          })
      } else {
        vidRef.current?.pause()
        setIsPlaying(false)
      }
    }, options)

    const currentVideoRef = vidRef.current

    if (currentVideoRef) {
      observer.observe(currentVideoRef)
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef)
      }
    }
  }, [])

  return (
    <div ref={videoContainerRef} className="h-full w-full relative flex items-center  flex-col">
      <video
        src={post.videoUrl}
        ref={vidRef}
        autoPlay
        onClick={handleVideoClick}
        loop
        className="w-full h-[calc(100%-55px)] object-cover object-center md:rounded"
      />
      <div className="absolute right-[10px] z-10 bottom-16">
        <PostAction isVideoPlaying={isPlaying} post={post} />
      </div>
      <div className="absolute bottom-16 left-3 z-10">
        <PostCaption isVideoPlaying={isPlaying} post={post} />
      </div>
      <div className="gradient-overlay"></div>
      {isPlaying ? null : (
        <div className="absolute inset-1/2 transform -translate-x-[20px] -translate-y-[40px] pointer-events-none">
          <FaPlay size="50" color="white" />
        </div>
      )}
    </div>
  )
}

export default PostCard
