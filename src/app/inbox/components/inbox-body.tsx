import getMonthAndDay from '@/utils/get-month-date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import { BsChatSquareFill } from 'react-icons/bs'
import CalcTime from '@/components/calc-time'
import { parseToDate } from '@/utils/parse-to-date'
import FollowButton from '@/components/button/follow-button'

interface Props {
  notifications: INotification[]
}

const InboxBody = ({ notifications }: Props) => {
  return (
    <div className="flex flex-col gap-3 px-3 mt-5">
      {notifications.map((notification) => (
        <div key={notification.id} className="grid grid-cols-8 gap-2.5 items-center">
          <Link
            href={
              notification.type === 'comment'
                ? `/user/${notification.actorUsername}/${notification?.additionalInfo?.postId}?comment=${notification?.additionalInfo?.postId}`
                : `/user/${notification.actorUsername}/${notification?.additionalInfo?.postId}`
            }
            className="col-span-1 relative"
          >
            <Image
              src={notification.actorProfilePicUrl || ''}
              alt="image-profile"
              width={200}
              height={200}
              className="w-full h-auto aspect-square rounded-full"
            />
            {notification.type === 'follow' ? null : (
              <div className="bg-white absolute bottom-0 right-0 w-[35%] rounded-full flex items-center justify-center aspect-square h-auto z-50 overflow-hidden p-0.5">
                {notification.type === 'like' ? (
                  <div className="w-full h-full bg-[#FE2C55] rounded-full flex items-center justify-center">
                    <FaHeart color="white" size={'65%'} />
                  </div>
                ) : notification.type === 'comment' ? (
                  <div className="w-full h-full bg-sky-500 rounded-full flex items-center justify-center">
                    <BsChatSquareFill color="white" size={'55%'} />
                  </div>
                ) : null}
              </div>
            )}
          </Link>
          <Link
            href={
              notification.type === 'comment'
                ? `/user/${notification.actorUsername}/${notification?.additionalInfo?.postId}?comment=${notification?.additionalInfo?.postId}`
                : `/user/${notification.actorUsername}/${notification?.additionalInfo?.postId}`
            }
            className={notification.type === 'follow' ? 'col-span-5' : 'col-span-6'}
          >
            <h1 className="font-semibold">{notification.actorUsername}</h1>
            <div className="flex items-center flex-wrap gap-1">
              <span className="text-sm">{notification.message} </span>
              <div className="text-[#A4A4A4] text-sm">
                {new Date().getTime() - new Date(notification.createdAt).getTime() > 24 * 60 * 60 * 1000 ? (
                  getMonthAndDay(notification.createdAt).month / getMonthAndDay(notification.createdAt).day
                ) : (
                  <div className="inline-block">
                    <div className="flex items-center gap-0.5">
                      <CalcTime createdAt={parseToDate(notification.createdAt)} />
                      <span>ago</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <div className={`flex justify-end ${notification.type === 'follow' ? 'col-span-2 ' : 'col-span-1'}`}>
            {notification.type === 'follow' ? (
              <FollowButton
                currentUserId={notification.userId}
                height={33}
                width={'full'}
                user={notification.additionalInfo?.user as Iuser}
              />
            ) : (
              <Image
                src={notification?.additionalInfo?.postCover || ''}
                alt="image-profile"
                width={200}
                height={200}
                className="w-full h-auto aspect-square rounded-md"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default InboxBody
