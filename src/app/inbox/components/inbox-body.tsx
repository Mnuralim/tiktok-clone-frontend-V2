import getMonthAndDay from '@/utils/get-month-date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  notifications: INotification[]
}

const InboxBody = ({ notifications }: Props) => {
  return (
    <div className="flex flex-col gap-3 px-3 mt-5">
      {notifications.map((notification) => (
        <Link
          href={`/user/${notification.actorUsername}/${notification?.additionalInfo?.postId}?comment=${notification?.additionalInfo?.postId}`}
          key={notification.id}
          className="grid grid-cols-8 gap-2.5"
        >
          <div className="col-span-1">
            <Image
              src={notification.actorProfilePicUrl || ''}
              alt="image-profile"
              width={200}
              height={200}
              className="w-full h-full aspect-square rounded-full"
            />
          </div>
          <div className="col-span-6">
            <h1 className="font-bold">{notification.actorUsername}</h1>
            <p className="text-sm text-[#A4A4A4] line-clamp-3">
              {notification.message}{' '}
              <span>
                {getMonthAndDay(notification.createdAt).month}/{getMonthAndDay(notification.createdAt).day}
              </span>
            </p>
          </div>
          <div className="col-span-1">
            <Image
              src={notification?.additionalInfo?.postCover || ''}
              alt="image-profile"
              width={200}
              height={200}
              className="w-full h-full aspect-square rounded-md"
            />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default InboxBody
