const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Season boundaries: Spring Mar 1, Summer Jun 1, Autumn Sep 1, Winter Dec 1.
 * Day index within season: Sep 1 = 1, Oct 2 (autumn) = 32 (30 days in Sep + 2).
 * Day 1: 2 points. Day 2: 3. Day 3+: round(P[i-2] + 0.6 * P[i-1]) (100% of day-before-previous + 60% of previous).
 */
const getSeasonStart = (date: Date): Date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  if (month >= 2 && month <= 4) {
    return new Date(year, 2, 1)
  }
  if (month >= 5 && month <= 7) {
    return new Date(year, 5, 1)
  }
  if (month >= 8 && month <= 10) {
    return new Date(year, 8, 1)
  }
  if (month >= 11) {
    return new Date(year, 11, 1)
  }
  return new Date(year - 1, 11, 1)
}

export const calculateSeasonDailyPoints = (now: Date = new Date()): number => {
  const seasonStart = getSeasonStart(now)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayIndex =
    Math.floor((todayStart.getTime() - seasonStart.getTime()) / MS_PER_DAY) + 1
  if (dayIndex < 1) {
    return 2
  }
  const points: number[] = []
  for (let i = 1; i <= dayIndex; i += 1) {
    if (i === 1) {
      points.push(2)
    } else if (i === 2) {
      points.push(3)
    } else {
      const twoDaysAgoPoints = points[i - 3]
      const previousDayPoints = points[i - 2]
      points.push(Math.round(twoDaysAgoPoints + 0.6 * previousDayPoints))
    }
  }
  return points[dayIndex - 1]
}
