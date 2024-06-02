const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

export const getAllUsers = async (q?: string) => {
  const queryParams = new URLSearchParams({
    ...(q && { q }),
  })
  try {
    const response = await fetch(`${API_URL}/users?${queryParams}`, {
      cache: 'no-store',
    })
    const data = await response.json()
    if (response.ok) {
      const users: Iuser[] = data.data
      return users
    }

    return []
  } catch (error) {
    throw new Error('Something wrong')
  }
}

export const getUserByUsername = async (username: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/users/username/${username}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    if (response.ok) {
      const user: Iuser = data.data
      return user
    }
  } catch (error) {
    throw new Error('Something wrong')
  }
}
