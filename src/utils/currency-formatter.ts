import type { TransactionType } from '../types'

const CURRENCY_LOCALE = 'en-US'
const CURRENCY_CODE = 'USD'

export const formatCurrency = (amount: number, type: TransactionType): string => {
  const sign = type === 'payment' ? '+' : ''
  const formatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${sign}${formatter.format(amount)}`
}

