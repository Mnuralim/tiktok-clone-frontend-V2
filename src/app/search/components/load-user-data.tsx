import React from 'react'
import { LuLoader } from 'react-icons/lu'

const LoadUserData = () => {
  return (
    <div className="flex justify-center mt-5">
      <LuLoader className="animate-spin" color="black" size={35} />
    </div>
  )
}

export default LoadUserData
