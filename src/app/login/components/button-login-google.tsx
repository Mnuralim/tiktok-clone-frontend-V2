'use client'
import { signInGoogle } from '@/actions/auth/sign-google'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ButtonLoginGoogle = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  return (
    <form action={() => signInGoogle(callbackUrl)}>
      <button type="submit" className="flex justify-between w-full px-2 py-2 border rounded-lg">
        <Image src={'/img/google.png'} alt="google" width={25} height={25} />
        <span className="font-medium">Continue with Google</span>
        <span></span>
      </button>
    </form>
  )
}

export default ButtonLoginGoogle
