'use client'
import { signInGoogle } from '@/actions/auth/sign-google'
import Image from 'next/image'
import React from 'react'

const ButtonLoginGoogle = () => {
  return (
    <form action={signInGoogle}>
      <button type="submit" className="w-full flex justify-between border py-2 px-2 rounded-lg">
        <Image src={'/img/google.png'} alt="google" width={25} height={25} />
        <span className="font-medium">Continue with Google</span>
        <span></span>
      </button>
    </form>
  )
}

export default ButtonLoginGoogle
