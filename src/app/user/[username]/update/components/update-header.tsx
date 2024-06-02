import { ButtonBack } from '@/components/button/button-back'
import React from 'react'

const UpdateHeader = () => {
  return (
    <header className="flex sticky top-0 w-full items-center bg-white justify-between border-b py-2 px-3">
      <ButtonBack size="20" color="black" />
      <h2 className="font-semibold text-[18px]">Edit profile</h2>
      <span className="w-7"></span>
    </header>
  )
}

export default UpdateHeader
