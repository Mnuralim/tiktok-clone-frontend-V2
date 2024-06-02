import React from 'react'
import SettingHeader from './components/setting-header'
import SettingBody from './components/setting-body'

const Page = () => {
  return (
    <section id="setting" className="bg-white overflow-y-auto h-dvh">
      <SettingHeader />
      <SettingBody />
    </section>
  )
}

export default Page
