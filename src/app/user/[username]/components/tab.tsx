'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { LuBookmark } from 'react-icons/lu'
import { CgMenuGridO } from 'react-icons/cg'
import { RiHeartAddLine } from 'react-icons/ri'

const Tab = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const activeTab = searchParams.get('tab')

  const handleSelectTab = (item: string) => {
    const params = new URLSearchParams(searchParams)
    if (item) {
      params.set('tab', item)
    } else {
      params.delete('tab')
    }
    replace(`${pathname}/?${params.toString()}`)
  }

  useEffect(() => {
    if (!activeTab) {
      replace(`${pathname}/?tab=post`)
    }
  }, [activeTab, replace, pathname])

  return (
    <div className="transform transition-all duration-500 ease-linear sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between border px-16 mt-3">
        <button
          onClick={() => handleSelectTab('post')}
          className={`border-b-2 border-b-black py-2 px-4 transform transition-all duration-200 ease-linear ${
            activeTab === 'post' ? 'border-opacity-100' : 'border-opacity-0'
          }`}
        >
          <CgMenuGridO size={24} color={`${activeTab === 'post' ? 'black' : 'rgba(22,24,35,0.5)'}`} />
        </button>
        <button
          onClick={() => handleSelectTab('like')}
          className={`border-b-2 border-b-black py-2 px-4 transform transition-all duration-200 ease-linear ${
            activeTab === 'like' ? 'border-opacity-100' : 'border-opacity-0'
          }`}
        >
          <RiHeartAddLine size={24} color={`${activeTab === 'like' ? 'black' : 'rgba(22,24,35,0.5)'}`} />
        </button>
        <button
          onClick={() => handleSelectTab('saved')}
          className={`border-b-2 border-b-black py-2 px-4 transform transition-all duration-200 ease-linear ${
            activeTab === 'saved' ? 'border-opacity-100' : 'border-opacity-0'
          }`}
        >
          <LuBookmark size={24} color={`${activeTab === 'saved' ? 'black' : 'rgba(22,24,35,0.5)'}`} />
        </button>
      </div>
    </div>
  )
}

export default Tab
