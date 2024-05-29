interface IPost {
  id: string
  userId: string
  caption: string
  location: string
  videoUrl: string
  thumbnailUrl: string
  user: Iuser
  likes: ILike[]
  comments: {
    id: string
  }[]
  createdAt: Date
  updatedAt: Date
}

interface ILike {
  id: string
  userId: string
  videoId: string
  createdAt: Date
}

interface Iuser {
  id: 'clwqces2i0000ncn77qlxxc2k'
  username: 'cryptomism33'
  email: 'cryptomism33@gmail.com'
  name: null
  profilePicUrl: 'https://lh3.googleusercontent.com/a/ACg8ocJI1C1NnbKegUyD1pSWZpmtdTKN9_tN_PUWD7qF-eLNV545ew=s96-c'
  bio: null
  createdAt: '2024-05-28T11:57:26.298Z'
  updatedAt: '2024-05-28T11:57:26.298Z'
}

interface IComment {
  id: string
  userId: string
  user: Iuser
  videoId: string
  commentText: string
  createdAt: Date
}
