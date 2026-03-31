export type TransactionType = 'payment' | 'credit'

export interface Transaction {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly type: TransactionType
  readonly amount: number
  readonly icon: string
  readonly iconBgColor?: string
  readonly date: string
  readonly pending?: boolean
  readonly authorizedUser?: string
  readonly cardNumberUsed?: string
  readonly location?: string
  readonly percentage?: number
}

export interface CardData {
  /** Maximum card limit (e.g. 1500). Balance may vary (test data). */
  readonly limit: number
  readonly balance: number
  readonly paymentDue: boolean
}

export interface WalletData {
  readonly cardData: CardData
  readonly transactions: Transaction[]
}

