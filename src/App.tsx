import type { FC } from 'react'
import { useState } from 'react'
import type { Transaction } from './types'
import { useTransactions } from './hooks/use-transactions'
import { TransactionsList } from './components/transactions-list/TransactionsList'
import { TransactionDetail } from './components/transaction-detail/TransactionDetail'

const App: FC = () => {
  const { cardData, transactions, loading } = useTransactions()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(
    null,
  )

  if (loading || !cardData) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
        <p className="text-sm text-[#8E8E93]">Loading wallet...</p>
      </div>
    )
  }

  if (selectedTransaction) {
    return (
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <TransactionDetail
          transaction={selectedTransaction}
          onBack={() => setSelectedTransaction(null)}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <TransactionsList
        cardData={cardData}
        transactions={transactions}
        onSelectTransaction={(transaction) => setSelectedTransaction(transaction)}
      />
    </div>
  )
}

export default App
