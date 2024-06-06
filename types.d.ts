interface IPost {
  id: string
  userId: string
  caption: string
  location: string
  videoUrl: string
  thumbnailUrl: string
  user: Iuser
  likes: ILike[]
  savedBy: {
    userId: string
  }[]
  _count: { likes: number; comments: number; savedBy: number }
  createdAt: string
  updatedAt: string
}

interface ILike {
  id: string
  userId: string
  videoId: string
  createdAt: string
}

interface IComment {
  id: string
  userId: string
  user: Iuser
  videoId: string
  commentText: string
  createdAt: string
}

interface Iuser {
  id: string
  username: string
  email: string
  name: string | null
  profilePicUrl: string
  bio: string | null
  followers: {
    followerId: string
  }[]
  following: {
    followingId: string
  }[]
  videos: IPost[]
  likes: {
    video: IPost
  }[]
  savedVideos: {
    video: IPost
  }[]
  createdAt: string
  updatedAt: string
}

interface INotification {
  id: string
  userId: string
  type: NotificationType
  message: string
  actorProfilePicUrl?: string
  actorUsername?: string
  additionalInfo?: {
    postId?: string
    postCover?: string
    commentId?: string
    user?: Iuser
  }
  createdAt: string
  read: boolean
}
