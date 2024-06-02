'use client'
import Link from 'next/link'
import { RiCompass3Fill } from '@react-icons/all-files/ri/RiCompass3Fill'
import { RiHome4Fill } from '@react-icons/all-files/ri/RiHome4Fill'
import { RiHome4Line } from '@react-icons/all-files/ri/RiHome4Line'
import { FiCompass } from '@react-icons/all-files/fi/FiCompass'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import { PiChatCenteredTextBold, PiChatCenteredTextFill } from 'react-icons/pi'
import { RxPerson } from 'react-icons/rx'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'

const BottomBar = () => {
  const pathName = usePathname()
  const params = useParams()
  const { data: session } = useSession()

  if (
    pathName === '/add-post' ||
    pathName === '/login' ||
    pathName === `/user/${params.username}/update` ||
    pathName === '/setting'
  ) {
    return null
  }
  return (
    <footer className="fixed bottom-0 left-0 z-10 w-full">
      <div
        className={`max-w-xl mx-auto flex justify-between  items-center px-4 py-2 ${
          pathName === '/' || pathName.startsWith(`/user/${params.username}/`)
            ? 'text-white bg-black'
            : 'bg-white border-t border-t-[#A4A4A4] border-opacity-45'
        }`}
      >
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
        <Link className="flex flex-col items-center" href={`/user/${session?.user.username}`}>
          {pathName === `/user/${session?.user.username}` ? (
            <>
              <BsFillPersonFill size={24} />
              <span className="text-[10px] font-semibold">Profile</span>
            </>
          ) : (
            <>
              <RxPerson size={24} />
              <span className="text-[10px]">Profile</span>
            </>
          )}
        </Link>
      </div>
    </footer>
  )
}

export default BottomBar
