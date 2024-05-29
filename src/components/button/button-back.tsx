'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { MdArrowBackIosNew } from 'react-icons/md'

export const ButtonBack = ({ color, size }: { color: string; size: string }) => {
  const router = useRouter()
  return (
    <button onClick={() => router.back()}>
      <MdArrowBackIosNew color={color} size={size} />
    </button>
  )
}
