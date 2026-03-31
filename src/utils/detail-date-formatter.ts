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

export const formatDetailDateTime = (dateString: string): string => {
  const date = parseLocalDate(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
