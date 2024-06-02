const API_URL = process.env.LOCATION_API_URL
const KEY = process.env.KEY_LOCATION

export const getAllLocation = async () => {
  try {
    const response = await fetch(`${API_URL}/city`, {
      cache: 'no-store',
      headers: {
        key: KEY as string,
      },
    })

    const data = await response.json()
    if (response.ok) {
      const location: { city_name: string }[] = data.rajaongkir.results
      return location
    }
    return []
  } catch (error) {
    throw new Error('Something wrong')
  }
}
