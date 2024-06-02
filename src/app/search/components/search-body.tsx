'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import FollowButton from '../../../components/button/follow-button'
import { useRouter, useSearchParams } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  users: Iuser[]
  currentUserId: string
}

const SearchBody = ({ users, currentUserId }: Props) => {
  const [historySearch, setHistorySearch] = useState<Iuser[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get('q')

  const saveHistory = (user: Iuser, username: string) => {
    const isAdded = historySearch.find((el) => el.id === user.id)
    if (!isAdded) {
      const updateHistory = [user, ...historySearch]
      localStorage.setItem('historySearch', JSON.stringify(updateHistory))
    }
    router.push(`/user/${username}`)
  }

  const handleDeleteHistory = (id: string) => {
    const filterHistorySearch = historySearch.filter((el) => el.id !== id)
    setHistorySearch(filterHistorySearch)
    localStorage.setItem('historySearch', JSON.stringify(filterHistorySearch))
  }

  useEffect(() => {
    const historySearch = localStorage.getItem('historySearch')
    if (historySearch) {
      setHistorySearch(JSON.parse(historySearch))
    }
  }, [])

  const selectedUsers = q ? users : historySearch

  return (
    <div className="flex flex-col gap-3 mt-5">
      {selectedUsers.length ? (
        selectedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div
              onClick={() => saveHistory(user, user.username)}
              className="flex items-center w-full gap-3 cursor-pointer"
            >
              <Image
                src={user.profilePicUrl}
                alt="profile-image"
                width={50}
                height={50}
                className="object-cover aspect-square object-center w-12 h-12 rounded-full"
              />
              <div className="flex flex-col items-start">
                <h2 className="font-semibold">{user.username}</h2>
                <p className="text-xs text-[rgba(22,24,35,0.5)]">{user.name}</p>
                <div className="flex items-center text-sm text-[rgba(22,24,35,0.5)]">
                  <p>{user.followers.length} followers</p>
                  <BsDot />
                  <p>10 video</p>
                </div>
              </div>
            </div>

            {selectedUsers === users && user.id !== currentUserId ? (
              <FollowButton user={user} currentUserId={currentUserId} width={100} height={32} />
            ) : null}
            {selectedUsers === historySearch ? (
              <button onClick={() => handleDeleteHistory(user.id)}>
                <AiOutlineClose />
              </button>
            ) : null}
          </div>
        ))
      ) : q ? (
        <div>{`No results found for '${q}'`}</div>
      ) : null}
    </div>
  )
}

export default SearchBody
