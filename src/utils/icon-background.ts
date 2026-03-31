const DARK_ICON_BACKGROUNDS = [
  '#1c1c1e',
  '#2d2d2d',
  '#3a3a3c',
  '#1e3a5f',
  '#3d2c54',
  '#2a2419',
  '#1a3d32',
] as const

/**
 * Deterministic "random" dark background per transaction id (per test task).
 */
export const pickDarkIconBackground = (transactionId: string): string => {
  let hash = 0
  for (let i = 0; i < transactionId.length; i += 1) {
    hash = (hash * 31 + transactionId.charCodeAt(i)) >>> 0
  }
  const index = hash % DARK_ICON_BACKGROUNDS.length
  return DARK_ICON_BACKGROUNDS[index]
}
