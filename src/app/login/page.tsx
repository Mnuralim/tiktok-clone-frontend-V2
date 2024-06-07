import React from 'react'
import ButtonLoginGoogle from './components/button-login-google'

export const dynamic = 'force-dynamic'

const Page = () => {
  return (
    <section className="h-[100dvh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-between w-full h-full px-4 py-4 lg:w-2/3">
        <div className="">
          <div className="px-3 text-center">
            <h1 className="text-2xl font-bold">Sign up for TikTok</h1>
            <p className="text-[rgba(22,24,35,0.5)]">
              Create a profile, follow other accounts, make your own videos, and more.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 px-3">
          <ButtonLoginGoogle />
        </div>
        <div>
          <p className="text-[rgba(22,24,35,0.5)] text-xs text-center">
            By continuing, you agree to TikTok’s <span className="font-semibold text-black">Terms of Service</span> and
            confirm that you have read TikTok’s <span className="font-semibold text-black">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Page
