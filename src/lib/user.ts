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
    if (!response.ok) {
      throw new Error(data.message)
    }

    const users: Iuser[] = data.data
    return users
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
    if (response.status === 500 || response.status === 401) {
      throw new Error(data.message)
    }
    const user: Iuser = data.data
    return user
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Internal server error')
  }
}
