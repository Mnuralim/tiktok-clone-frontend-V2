'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import { BiCopy } from 'react-icons/bi'
import { RiArrowRightSLine } from 'react-icons/ri'
import { customRevalidation } from '@/actions/custom-revalidation'
import { usePathname } from 'next/navigation'
import { LuLoader2 } from 'react-icons/lu'
import EditMenu from './edit-menu'

interface Props {
  user: Iuser
  accessToken: string
}

const UpdateBody = ({ user, accessToken }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showEditMenu, setShowEditMenu] = useState<string>('')
  const [name, setName] = useState<string | null>(user.name)
  const [bio, setBio] = useState<string | null>(user.bio)
  const [copied, setCopied] = useState<boolean>(false)

  const pathname = usePathname()

  const handleUpdateUser = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (showEditMenu === 'Name' && name) {
        formData.append('name', name)
      }
      if (showEditMenu === 'Bio' && bio) {
        formData.append('bio', bio)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
      if (response.ok) {
        customRevalidation(pathname)
        setShowEditMenu('')
      }
    } catch (error) {
      alert('Internal server error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const file = e.target.files?.[0]
    try {
      const formData = new FormData()
      formData.append('image', file as File)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
      if (response.ok) {
        customRevalidation(pathname)
      }
    } catch (error) {
      alert('Internal server error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenEditMenu = (menu: string) => {
    setShowEditMenu(menu)
  }

  const handleCloseEditMenu = () => {
    setShowEditMenu('')
    setBio(user.bio)
    setName(user.name)
  }

  const handleChangeValue = (value: string) => {
    if (showEditMenu === 'Name') {
      if (value.length <= 30) {
        setName(value)
      }
    } else {
      if (value.length <= 80) {
        setBio(value)
      }
    }
  }

  const textToCopy = `tiktok.com/${user.username}`
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-10 px-3">
      <div className="flex justify-center items-center flex-col gap-2">
        <div className="w-20 h-20 rounded-full overflow-hidden relative">
          <Image
            src={user.profilePicUrl}
            width={200}
            height={200}
            alt="profile"
            className="object-cover w-full h-full aspect-square object-center"
            priority
          />
          <label
            htmlFor="pic"
            className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <LuLoader2 className="animate-spin" color="white" size={25} />
            ) : (
              <HiOutlineCamera color="white" size={25} />
            )}
          </label>
          <input id="pic" type="file" hidden accept="image/*" onChange={handleImageChange} />
        </div>
        <p className="text-xs font-semibold">Change image</p>
      </div>
      <p className="my-5 text-[#A4A4A4] font-bold text-xs">About You</p>
      <div className="flex flex-col gap-3">
        <button onClick={() => handleOpenEditMenu('Name')} className="flex items-center justify-between">
          <span className="font-medium text-sm">Name</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{name}</span>
            <RiArrowRightSLine size="25" color="#A4A4A4" />
          </div>
        </button>
        <div>
          <button disabled className="w-full flex items-center justify-between ">
            <span className="font-medium text-sm">Username</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-[#A4A4A4]">{user.username}</span>
              <RiArrowRightSLine size="25" color="#A4A4A4" />
            </div>
          </button>
          <div className="flex justify-end items-center gap-1 mt-4 mr-1">
            <p>{textToCopy}</p>
            <button onClick={handleCopy}>
              {copied ? <p className="text-xs text-[#A4A4A4]">copied!</p> : <BiCopy />}
            </button>
          </div>
        </div>
        <button onClick={() => handleOpenEditMenu('Bio')} className="w-full flex items-center justify-between">
          <span className="font-medium text-sm">Bio</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{bio}</span>
            <RiArrowRightSLine size="25" color="#A4A4A4" />
          </div>
        </button>
      </div>
      {showEditMenu === 'Name' || showEditMenu === 'Bio' ? (
        <div className="absolute top-0 z-50 w-full left-0">
          <EditMenu
            handleUpdateUser={handleUpdateUser}
            handleCloseEditMenu={handleCloseEditMenu}
            type={showEditMenu}
            handleChangeValue={handleChangeValue}
            value={showEditMenu === 'Name' ? name : bio}
            isLoading={isLoading}
          />
        </div>
      ) : null}
    </div>
  )
}

export default UpdateBody
