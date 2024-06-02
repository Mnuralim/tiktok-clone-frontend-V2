import { ButtonBack } from '@/components/button/button-back'
import Link from 'next/link'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const PostHeader = () => {
  return (
    <div className="absolute z-50 w-full max-w-xl flex items-center gap-1 px-3 top-2">
      <ButtonBack color="white" size="25" />
      <Link
        href={'/search'}
        className="w-full border rounded-md py-2 border-r-white flex items-center justify-between px-2 text-sm text-white font-semibold"
      >
        <div className="flex items-center gap-1">
          <BiSearch />
          <p>Find related content</p>
        </div>
        <p>Search</p>
      </Link>
    </div>
  )
}

export default PostHeader
