'use client'
import React from 'react'

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-full bg-black flex items-center justify-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="font-bold text-7xl">😒</p>
        <p className="text-white font-bold capitalize text-xl">{error.message}</p>
        <p className="text-white text-center">Oops! Something went wrong on our end. Please try again later.</p>
        <button onClick={() => reset()} className="text-white bg-[#FE2C55] rounded px-6 py-2 font-semibold">
          Refresh
        </button>
      </div>
    </div>
  )
}

export default Error
