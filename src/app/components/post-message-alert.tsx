import React from 'react'

interface Props {
  message: string
}
const PostMessageAlert = ({ message }: Props) => {
  return (
    <div className="flex flex-col justify-center w-full px-3 bg-white rounded-md h-14 animate-toastIn">
      <h1 className="text-sm font-semibold">{message}</h1>
      {message === 'Successfully uploaded your video!' ? (
        <p className="text-sm">it will appear on your feed soon</p>
      ) : (
        <p>{'Please try again later!'}</p>
      )}
    </div>
  )
}

export default PostMessageAlert
