const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

export const getAllNotification = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/users/notifications`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }

    const notifications: INotification[] = data.data
    return notifications
  } catch (error) {
    throw new Error('Something wrong')
  }
}
