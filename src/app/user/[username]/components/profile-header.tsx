import Link from 'next/link'
import React from 'react'
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots'
import { ButtonBack } from '@/components/button/button-back'

interface Props {
  name: string
}

const ProfileHeader = ({ name }: Props) => {
  return (
    <div className="flex justify-between items-center border py-2 px-3 top-0 sticky w-full z-40 bg-white">
      <ButtonBack size="20" color="black" />
      <h2 className="font-semibold text-[18px]">{name}</h2>
      <Link href={'/setting'}>
        <BsThreeDots size={23} />
      </Link>
    </div>
  )
}

export default ProfileHeader
