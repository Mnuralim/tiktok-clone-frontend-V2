import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotifPostState {
  notif: {
    isLoadingUpload?: boolean
    message?: string
    thumbnail?: string
  }
  updateNotif: ({
    isLoadingUpload,
    message,
    thumbnail,
  }: {
    isLoadingUpload?: boolean
    message?: string
    thumbnail?: string
  }) => void
}

const useNotifPost = create(
  persist<NotifPostState>(
    (set, get) => ({
      notif: {
        isLoadingUpload: false,
        message: '',
        thumbnail: '',
      },
      updateNotif: (notif) => {
        set({ notif: notif })
      },
    }),
    {
      name: 'notif-post',
    }
  )
)

export default useNotifPost
