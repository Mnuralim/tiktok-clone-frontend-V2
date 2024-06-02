const API_URL = process.env.API_URL

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      cache: 'no-store',
    })
    const data = await response.json()
    if (response.ok) {
      const posts: IPost[] = data.data
      return posts
    }
    return []
  } catch (error) {
    throw new Error('Something wrong')
  }
}

export const getPostById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      cache: 'no-store',
    })
    const data = await response.json()
    if (response.ok) {
      const post: IPost = data.data
      return post
    }
  } catch (error) {
    throw new Error('Something wrong')
  }
}
