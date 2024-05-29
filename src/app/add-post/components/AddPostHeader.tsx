import { ButtonBack } from '@/components/button/button-back'
import React from 'react'

const AddPostHeader = () => {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white">
      <ButtonBack color="black" size="20" />
      <h2 className="text-base font-semibold">Posting</h2>
      <span></span>
    </div>
  )
}

export default AddPostHeader
