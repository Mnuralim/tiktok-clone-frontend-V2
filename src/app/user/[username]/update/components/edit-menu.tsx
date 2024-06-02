import React from 'react'
import HeaderEditMenu from './header-edit-menu'
import { LuLoader2 } from 'react-icons/lu'

interface Props {
  handleUpdateUser: () => Promise<void>
  handleCloseEditMenu: () => void
  handleChangeValue: (value: string) => void
  type: string
  value: string | null
  isLoading: boolean
}

const EditMenu = ({ handleUpdateUser, handleCloseEditMenu, type, value, handleChangeValue, isLoading }: Props) => {
  return (
    <div className="w-full max-w-xl mx-auto h-dvh bg-white px-3 relative">
      <HeaderEditMenu
        handleUpdateUser={handleUpdateUser}
        handleCloseEditMenu={handleCloseEditMenu}
        type={type}
        value={value || ''}
      />
      <div className="mt-5">
        <label htmlFor="name" className="text-sm text-[#A4A4A4] font-bold">
          {type}
        </label>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="w-full outline-none border-b border-b-[#A4A4A4] py-1 border-opacity-20"
          value={value || ''}
          autoFocus
          onChange={(e) => handleChangeValue(e.target.value)}
        />
      </div>
      <p className="text-sm text-[#A4A4A4]">
        {value ? value.length : 0}/{type === 'Name' ? 30 : 80}
      </p>
      {type === 'Name' ? (
        <p className="text-sm text-[#A4A4A4]">Your nickname can only be changed once every 7 days.</p>
      ) : null}
      {isLoading ? (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <LuLoader2 className="animate-spin" color="white" size={35} />
        </div>
      ) : null}
    </div>
  )
}

export default EditMenu
