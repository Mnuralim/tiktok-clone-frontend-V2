const API_URL = process.env.API_URL

export const loginGoogle = async (tokenId: string) => {
  const response = await fetch(`${API_URL}/auths/login-google/?tokenId=${tokenId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
