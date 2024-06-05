'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { RxPerson } from 'react-icons/rx'
import { TbCloudUpload } from 'react-icons/tb'
import { BsWhatsapp, BsMessenger, BsFacebook, BsPlayCircle, BsPlusCircleFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai'
import { RiArrowRightSLine, RiErrorWarningLine } from 'react-icons/ri'
import { HiOutlineLocationMarker, HiOutlinePlus } from 'react-icons/hi'
import { BiDotsHorizontal, BiShare, BiWorld } from 'react-icons/bi'
import { CgBox } from 'react-icons/cg'
import LocationList from './location-list'
import useNotifPost from '@/store/notif-post'
import { customRevalidation } from '@/actions/custom-revalidation'

interface Props {
  locations: {
    city_name: string
  }[]
}

const AddPostBody = ({ locations }: Props) => {
  const [caption, setCaption] = useState<string>('')
  const [isChooseVideo, setIsChooseVideo] = useState<boolean>(false)
  const [videoPost, setVideoPost] = useState<string | null | File>('')
  const [thumbnail, setThummbnail] = useState<string | null | File>('')
  const [cover, setCover] = useState<ArrayBuffer | string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [location, setLocation] = useState<string>('')
  const [showListLocation, setShowLocation] = useState<boolean>(false)

  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const { updateNotif } = useNotifPost()

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file && file.size <= 2000000) {
      setIsChooseVideo(true)
      setVideoPost(file)
    } else {
      alert('Video size should not exceed 2MB, Select another video!')
      setIsChooseVideo(false)
      setVideoPost(null)
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 2000000) {
      setThummbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCover(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Cover image size should not exceed 1MB, Select another image!')
      setThummbnail(null)
      setCover(null)
    }
  }

  const handleCloseListLocation = () => {
    setShowLocation(false)
  }

  const handleSelectLocation = (loc: string) => {
    setLocation(loc)
    handleCloseListLocation()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!videoPost || !thumbnail) {
      alert('Video post and Cover are required!')
      return
    }

    updateNotif({
      isLoadingUpload: true,
      thumbnail: cover as string,
    })
    router.push('/')

    try {
      const formData = new FormData()
      formData.append('caption', caption)
      formData.append('location', location)
      formData.append('thumbnail', thumbnail as string)
      formData.append('video', videoPost as string)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        body: formData,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })

      if (response.ok) {
        customRevalidation('/')
        updateNotif({
          isLoadingUpload: false,
          thumbnail: '',
          message: 'Successfully uploaded your video!',
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      updateNotif({
        isLoadingUpload: false,
        thumbnail: '',
        message: 'Failed to uploaded your video!',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full pb-16 bg-white">
      <div>
        <div className="px-3 py-4 border">
          <div className="flex justify-between">
            <textarea
              name="caption"
              id="caption"
              placeholder="Make content more informative by adding more detailed descriptions of up to 4000 characters."
              className="w-3/4 h-20 outline-none resize-none placeholder:text-sm"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="flex flex-col w-1/5 gap-1">
              <div className="relative w-full h-12 overflow-hidden bg-black rounded-md">
                <label htmlFor="video-post">
                  {isChooseVideo ? (
                    <span>
                      <AiFillCheckCircle
                        className="absolute inset-x-0 inset-y-0 w-5 h-5 mx-auto my-auto bg-white rounded-full"
                        color="green"
                      />
                    </span>
                  ) : (
                    <span>
                      <BsPlusCircleFill
                        className="absolute inset-x-0 inset-y-0 w-5 h-5 mx-auto my-auto bg-white rounded-full"
                        color="#FE2C55"
                      />
                    </span>
                  )}
                  <input
                    type="file"
                    accept=".mp4"
                    name="video-post"
                    id="video-post"
                    className="hidden"
                    onChange={handleVideoSelect}
                  />
                </label>
              </div>
              <div className="relative flex items-center justify-center w-full h-12 overflow-hidden bg-black rounded-md">
                {cover ? (
                  <Image
                    src={`${cover}`}
                    width={100}
                    height={120}
                    alt="cover"
                    className="object-cover absolute w-full aspect-[9/16]"
                  />
                ) : null}
                <label htmlFor="thumbnail-cover" className="z-50">
                  <span>
                    <p className="text-xs text-center text-white">Choose cover</p>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name="thumbnail-cover"
                    id="thumbnail-cover"
                    className="hidden"
                    onChange={handleChangeImage}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium"># Tag</p>
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium">
              @ Mentions
            </p>
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium flex justify-center gap-1 items-center">
              <BsPlayCircle /> <span>Video</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-center gap-2">
            <RxPerson className="font-semibold" />
            <span className="text-sm font-medium">Tag others</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <button
          type="button"
          onClick={() => setShowLocation(true)}
          className="flex items-center justify-between w-full px-3 mt-4"
        >
          <span className="flex items-center gap-2">
            <HiOutlineLocationMarker className="font-semibold" />
            <span className="flex items-center gap-1 text-sm font-medium">
              <span>Location</span>
              <span>
                <RiErrorWarningLine size="13" color="#A4A4A4" />
              </span>
            </span>
          </span>
          <RiArrowRightSLine size="25" />
        </button>
        {location.length ? (
          <div className="flex items-center gap-1 px-3 mt-2 mb-4 text-xs font-bold">
            {location}
            <AiOutlineClose onClick={() => setLocation('')} className="cursor-pointer" />
          </div>
        ) : null}
        <div className="flex items-center gap-2 mt-2 px-3 text-[#A4A4A4]">
          <button
            type="button"
            onClick={() => handleSelectLocation('di pantai')}
            className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium"
          >
            di pantai
          </button>
          <button
            type="button"
            onClick={() => handleSelectLocation('konoha')}
            className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium"
          >
            KONOHA
          </button>
          <button
            type="button"
            onClick={() => handleSelectLocation('Dimana-mana')}
            className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium"
          >
            Dimana-mana
          </button>
          <button
            type="button"
            onClick={() => handleSelectLocation('diteras')}
            className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium"
          >
            diteras
          </button>
        </div>
        <div className="flex items-center justify-between px-3 mt-4 text-[#A4A4A4]">
          <div className="flex items-center gap-2">
            <HiOutlinePlus className="font-semibold" />
            <span className="text-sm font-medium">Add link</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-center gap-2">
            <BiWorld className="font-semibold" />
            <span className="text-sm font-medium">Everyone can see this post</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-start justify-between px-3 mt-4">
          <div className="flex items-start gap-2">
            <BiDotsHorizontal className="font-semibold" />
            <span className="flex flex-col text-sm font-medium">
              <span>More options</span>
              <span className="text-xs text-[#A4A4A4]">Tap to manage comments, Duet and stitch preferences</span>
            </span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-start gap-2">
            <BiShare className="font-semibold scale-x-[-1]" />
            <span className="flex flex-col text-sm font-medium">
              <span>Share to</span>
              <span className="text-xs text-[#A4A4A4]">Other platforms</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsWhatsapp color="#A4A4A4" />
            </div>
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsMessenger color="#A4A4A4" />
            </div>
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsFacebook color="#A4A4A4" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3">
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <p className="text-sm font-medium">I agree to all privacy and policies</p>
        </div>
        <div className="flex items-center gap-2 ">
          <button
            className="w-1/2 bg-[rgba(22,24,35,0.12)] text-black py-2 rounded-md font-semibold flex items-center justify-center gap-2"
            type="button"
          >
            <CgBox />
            <span>Draft</span>
          </button>
          <button
            disabled={!isChecked}
            className={`${
              isChecked ? 'bg-opacity-100' : 'bg-opacity-40'
            } w-1/2 text-white bg-[#FE2C55] py-2 rounded-md font-semibold flex items-center justify-center gap-2`}
            type="submit"
          >
            <TbCloudUpload />
            <span>Posting</span>
          </button>
        </div>
      </div>
      {showListLocation ? (
        <LocationList handleClose={handleCloseListLocation} handleSelect={handleSelectLocation} locations={locations} />
      ) : null}
    </form>
  )
}

export default AddPostBody
