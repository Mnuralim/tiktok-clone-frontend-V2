export default function getMonthAndDay(timestamp: string) {
  const date = new Date(timestamp)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  return { month, day }
}
