import React from 'react'

interface Props {
  handleUpdateUser: () => Promise<void>
  handleCloseEditMenu: () => void
  type: string
  value: string
}

const HeaderEditMenu = ({ handleUpdateUser, handleCloseEditMenu, type, value }: Props) => {
  const isDisable = value.length <= 0
  return (
    <header className="flex sticky top-0 w-full items-center bg-white justify-between border-b py-2">
      <button onClick={handleCloseEditMenu}>Cancel</button>
      <h2 className="font-semibold text-[18px]">{type}</h2>
      <button
        disabled={isDisable}
        onClick={handleUpdateUser}
        className={`${isDisable ? 'text-[#A4A4A4] cursor-not-allowed' : ''}`}
      >
        Save
      </button>
    </header>
  )
}

export default HeaderEditMenu
