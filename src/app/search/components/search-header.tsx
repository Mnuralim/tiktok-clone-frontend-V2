'use client'
import { ButtonBack } from '@/components/button/button-back'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDebouncedCallback } from 'use-debounce'

const SearchHeader = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 400)

  return (
    <div className="flex justify-between items-center gap-3 sticky w-full bg-white top-0 py-3">
      <ButtonBack size="20" color="black" />
      <div className="relative w-full">
        <input
          className="w-full bg-[rgba(22,24,35,0.12)] py-1.5 rounded-md outline-none pl-8"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('q') || ''}
        />
        <FiSearch className="absolute top-2.5 left-2" />
      </div>
    </div>
  )
}

export default SearchHeader
