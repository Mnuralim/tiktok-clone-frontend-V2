const API_URL = process.env.LOCATION_API_URL
const KEY = process.env.KEY_LOCATION

export const getAllLocation = async () => {
  try {
    const response = await fetch(`${API_URL}/city`, {
      headers: {
        key: KEY as string,
      },
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error('Unknow error')
    }
    const location: { city_name: string }[] = data.rajaongkir.results
    return location
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Internal server error')
  }
}
