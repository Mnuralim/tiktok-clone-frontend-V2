const API_URL = process.env.API_URL

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      cache: 'no-store',
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }
    const posts: IPost[] = data.data
    return posts
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Internal server error')
  }
}

export const getPostById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      cache: 'no-store',
    })
    const data = await response.json()
    if (response.status === 500) {
      throw new Error(data.message)
    }
    const post: IPost | undefined = data.data
    return post
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Internal server error')
  }
}
