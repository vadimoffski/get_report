const THOUSAND = 1000
const TEN_THOUSAND = 10000

export const formatPoints = (points: number): string => {
  if (points < THOUSAND) {
    return `${points}`
  }
  if (points < TEN_THOUSAND) {
    const value = Math.round((points / THOUSAND) * 10) / 10
    return `${value}K`
  }
  const rounded = Math.round(points / THOUSAND)
  return `${rounded}K`
}

