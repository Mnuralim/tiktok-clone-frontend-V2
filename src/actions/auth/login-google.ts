'use server'

const API_URL = process.env.API_URL as string

export const loginGoogle = async (tokenId: string) => {
  const response = await fetch(`${API_URL}/auths/login-google`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  })

  return response
}
