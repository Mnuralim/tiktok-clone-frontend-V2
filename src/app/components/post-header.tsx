'use client'
import Link from 'next/link'
import React from 'react'
import { LuSearch } from 'react-icons/lu'
import { useRouter, useSearchParams } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'

const HeaderPost = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const followingTab = searchParams.get('post')
  const handleSelectTab = (tab: string) => {
    replace(`/?post=${tab}`)
  }

  return (
    <div className="w-full max-w-xl mx-auto flex text-white items-center justify-between px-5">
      <AiOutlineMenu size="25" />
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleSelectTab('following')}
          className="text-[17px] font-semibold flex flex-col items-center gap-1"
        >
          <span className={followingTab === 'following' ? '' : 'text-slate-300'}>Following</span>
          <span
            className={`inline-block w-7 h-1 bg-slate-300 ${followingTab === 'following' ? '' : 'opacity-0'}`}
          ></span>
        </button>
        <button
          onClick={() => handleSelectTab('')}
          className="text-[17px] font-semibold flex flex-col items-center gap-1"
        >
          <span className={followingTab !== 'following' ? '' : 'text-slate-300'}>For You</span>
          <span className={`inline-block w-7 h-1 bg-slate-300 ${!followingTab ? '' : 'opacity-0'}`}></span>
        </button>
      </div>
      <Link href={'/search'}>
        <LuSearch size="25" />
      </Link>
    </div>
  )
}

export default HeaderPost
