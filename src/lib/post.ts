const API_URL = process.env.API_URL

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      cache: 'no-store',
    })
    const data = await response.json()
    const post: IPost[] = data.data.posts
    return post
  } catch (error) {
    throw new Error('Something wrong')
  }
}
