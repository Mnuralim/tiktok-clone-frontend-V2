import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

const FallbackSuspense = () => {
  return (
    <div className="bg-black left-0 top-0 w-full h-full fixed z-[100] flex items-center justify-center">
      <LuLoader2 className="animate-spin" color="white" size={35} />
    </div>
  )
}

export default FallbackSuspense
