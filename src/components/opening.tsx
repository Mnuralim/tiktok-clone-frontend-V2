import React from 'react'
import { LuLoader } from 'react-icons/lu'

const Opening = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black flex items-center justify-center">
      <LuLoader className="animate-spin" color="white" size={35} />
    </div>
  )
}

export default Opening
