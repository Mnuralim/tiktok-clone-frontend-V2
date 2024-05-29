const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

export const getAllPostComments = async (postId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/comments/${postId}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    const comments: IComment[] = data.data
    return comments
  } catch (error) {
    console.log(error)
    throw new Error('Something wrong')
  }
}
