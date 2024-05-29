const API_URL = process.env.NEXT_PUBLIC_LOCATION_API_URL
const KEY = process.env.NEXT_PUBLIC_KEY_LOCATION

export const getAllLocation = async () => {
  try {
    const response = await fetch(`${API_URL}/city`, {
      cache: 'no-store',
      headers: {
        key: KEY as string,
      },
    })
    const data = await response.json()
    const location: { city_name: string }[] = data.rajaongkir.results
    return location
  } catch (error) {
    throw new Error('Something wrong')
  }
}
