'use client'
import Link from 'next/link'
import { RiCompass3Fill } from '@react-icons/all-files/ri/RiCompass3Fill'
import { RiHome4Fill } from '@react-icons/all-files/ri/RiHome4Fill'
import { RiHome4Line } from '@react-icons/all-files/ri/RiHome4Line'
import { FiCompass } from '@react-icons/all-files/fi/FiCompass'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import { PiChatCenteredTextBold, PiChatCenteredTextFill } from 'react-icons/pi'
import { RxPerson } from 'react-icons/rx'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSession } from 'next-auth/react'

const BottomBar = () => {
  const pathName = usePathname()
  const { data: session } = useSession()

  if (pathName === '/add-post' || pathName === '/login') {
    return null
  }

  return (
    <footer className="fixed bottom-0 left-0 z-10 text-white w-full">
      <div className=" max-w-xl mx-auto flex justify-between items-center px-4 py-2 bg-black">
        <Link className="flex flex-col items-center" href={'/'}>
          {pathName === '/' ? <RiHome4Fill size={24} color="white" /> : <RiHome4Line size={24} />}
          <span className="text-[10px]">Home</span>
        </Link>
        <Link className="flex flex-col items-center" href={'/discover'}>
          {pathName === '/discover' ? (
            <>
              <RiCompass3Fill size={24} />
              <span className="text-[10px] font-semibold">Discover</span>
            </>
          ) : (
            <>
              <FiCompass size={24} />
              <span className="text-[10px]">Discover</span>
            </>
          )}
        </Link>
        <Link href={'/add-post'} className="flex items-center">
          <BiSolidMessageSquareAdd size={24} />
        </Link>
        <Link className="flex flex-col items-center" href={'/inbox'}>
          {pathName === '/inbox' ? (
            <>
              <PiChatCenteredTextFill size={24} />
              <span className="text-[10px] font-semibold">Inbox</span>
            </>
          ) : (
            <>
              <PiChatCenteredTextBold size={24} />
              <span className="text-[10px]">Inbox</span>
            </>
          )}
        </Link>
        <Link className="flex flex-col items-center" href={`/${session?.user.name}`}>
          <RxPerson size={24} />
          <span className="text-[10px]">Profile</span>
        </Link>
      </div>
    </footer>
  )
}

export default BottomBar
