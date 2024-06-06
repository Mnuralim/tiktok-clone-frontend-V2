'use client'
import { getAllPostComments } from '@/lib/comment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import CommentBar from './comment-bar'
import { getUserByUsername } from '@/lib/user'
import CalcTime from './calc-time'
import { parseToDate } from '@/utils/parse-to-date'
import { LuLoader } from 'react-icons/lu'

const CommentListWrapper = () => {
  const [comments, setComments] = useState<IComment[]>([])
  const [trigger, setTrigger] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const showComment = searchParams.get('comment')
  const scrollTopRef = useRef<HTMLDivElement>(null)

  const handleTrigger = () => {
    setTrigger((prev) => !prev)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (showComment && session && session.user && session.user.accessToken) {
      const fetchData = async () => {
        try {
          const [comments, user] = await Promise.all([
            await getAllPostComments(showComment, session.user.accessToken as string),
            await getUserByUsername(session.user.username as string, session.user.accessToken),
          ])

          if (user) {
            setImgUrl(user.profilePicUrl)
          }
          setComments(comments)
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch comments:', error)
          setLoading(false)
        }
      }

      fetchData()
    }
    return () => controller.abort()
  }, [showComment, session?.user.accessToken, trigger, session])

  useEffect(() => {
    if (scrollTopRef.current) {
      scrollTopRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [comments])

  const handleCloseComment = () => {
    replace(`${pathname}`)
    setLoading(true)
  }

  return (
    <div
      className={`fixed w-full h-full bg-black bg-opacity-50 left-0 transform transition-all ease-linear duration-300 z-50 flex flex-col justify-end`}
      style={{
        bottom: showComment ? '0' : '-110%',
      }}
    >
      <div id="comment-list" className="w-full max-w-xl mx-auto overflow-y-auto bg-white h-3/4 rounded-t-md">
        <div ref={scrollTopRef}></div>
        <div className="sticky top-0 flex items-center justify-between w-full px-3 py-3 bg-white rounded-md">
          <span></span>
          <h2 className="font-semibold">
            {comments.length} {comments.length <= 1 ? 'comment' : 'comments'}
          </h2>
          <button onClick={handleCloseComment}>
            <AiOutlineClose />
          </button>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center mt-5">
              <LuLoader className="animate-spin" color="black" size={35} />
            </div>
          ) : (
            <div className="flex flex-col gap-5 px-3 mt-8 mb-24">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div className="flex items-start gap-2">
                    <Image
                      src={comment.user.profilePicUrl}
                      width={35}
                      height={35}
                      alt="profile"
                      className="rounded-full object-cover object-center aspect-square w-[35px] h-[35px]"
                    />
                    <div className="w-full">
                      <h2 className="text-xs font-semibold text-[rgba(22,24,35,0.7)]">{comment.user.username}</h2>
                      <p className="text-sm">{comment.commentText}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex gap-3 items-center text-[rgba(22,24,35,0.7)]">
                          <div className="text-xs">
                            <CalcTime createdAt={parseToDate(comment.createdAt)} />
                          </div>
                          <p className="text-xs font-semibold ">Reply</p>
                        </div>
                        <div className="flex items-center gap-1 text-[rgba(22,24,35,0.7)]">
                          <button>
                            <AiOutlineHeart />
                          </button>
                          <p className="text-xs">20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CommentBar imgUrl={imgUrl} postId={showComment as string} handleTriger={handleTrigger} />
      </div>
    </div>
  )
}

export default CommentListWrapper
