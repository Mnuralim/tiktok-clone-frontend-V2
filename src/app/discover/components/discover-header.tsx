import { ButtonBack } from '@/components/button/button-back'
import React from 'react'

const DiscoverHeader = () => {
  return (
    <header className="flex sticky top-0 w-full items-center bg-white justify-between border-b py-2 px-3">
      <ButtonBack size="20" color="black" />
      <h2 className="font-semibold text-[18px]">Discover</h2>
      <span></span>
    </header>
  )
}

export default DiscoverHeader
