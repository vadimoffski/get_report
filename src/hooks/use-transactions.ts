import { useEffect, useState } from 'react'
import type { WalletData, CardData, Transaction } from '../types'

interface UseTransactionsResult {
  readonly cardData: CardData | null
  readonly transactions: Transaction[]
  readonly loading: boolean
}

export const useTransactions = (): UseTransactionsResult => {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    const executeLoad = async (): Promise<void> => {
      try {
        const module = await import('../data/transactions.json')
        const data = module.default as WalletData
        if (!isMounted) {
          return
        }
        setWalletData(data)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    void executeLoad()
    return () => {
      isMounted = false
    }
  }, [])

  return {
    cardData: walletData?.cardData ?? null,
    transactions: walletData?.transactions ?? [],
    loading,
  }
}

