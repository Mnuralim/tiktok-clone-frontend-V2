import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="text-white fixed left-0 top-0 bg-black w-full h-full flex items-center justify-center z-[1000]">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center">
          <p className="font-bold text-8xl">4</p>
          <p className="font-bold text-7xl">😊</p>
          <p className="font-bold text-8xl">4</p>
        </div>
        <p className="text-[#A4A4A4]">Can&apos;t find this page</p>
        <Link href={'/'} className="text-white bg-[#FE2C55] rounded px-6 py-2 font-semibold">
          Watch now
        </Link>
      </div>
    </div>
  )
}

export default NotFound
