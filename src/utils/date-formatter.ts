const MS_PER_DAY = 24 * 60 * 60 * 1000

const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const parseLocalDate = (dateString: string): Date => {
  const datePart = dateString.split('T')[0] ?? dateString
  const segments = datePart.split('-')
  if (segments.length === 3) {
    const year = Number(segments[0])
    const month = Number(segments[1])
    const day = Number(segments[2])
    return new Date(year, month - 1, day)
  }
  return new Date(dateString)
}

/** Inclusive rolling window: days 2–7 before today show weekday; older show M/D/yy. */
const ROLLING_LAST_WEEK_MAX_DIFF = 7

/**
 * List dates: Today, Yesterday; within the last week (2–7 days ago) → weekday name;
 * older entries → numeric date (M/D/yy). Uses local calendar dates for YYYY-MM-DD strings.
 */
export const formatDate = (dateString: string, now: Date = new Date()): string => {
  const date = parseLocalDate(dateString)
  const startOfToday = getStartOfDay(now)
  const startOfTarget = getStartOfDay(date)
  const diffInDays = Math.round(
    (startOfToday.getTime() - startOfTarget.getTime()) / MS_PER_DAY,
  )
  if (diffInDays === 0) {
    return 'Today'
  }
  if (diffInDays === 1) {
    return 'Yesterday'
  }
  if (diffInDays >= 2 && diffInDays <= ROLLING_LAST_WEEK_MAX_DIFF) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
}
