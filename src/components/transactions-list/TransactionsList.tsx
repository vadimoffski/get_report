import type { FC } from 'react'
import type { CardData, Transaction } from '../../types'
import { calculateSeasonDailyPoints } from '../../utils/season-points-calculator'
import { CardBalanceBlock } from './CardBalanceBlock'
import { NoPaymentDueBlock } from './NoPaymentDueBlock'
import { DailyPointsBlock } from './DailyPointsBlock'
import { TransactionItem } from './TransactionItem'

interface TransactionsListProps {
  readonly cardData: CardData
  readonly transactions: Transaction[]
  readonly onSelectTransaction: (transaction: Transaction) => void
}

export const TransactionsList: FC<TransactionsListProps> = ({
  cardData,
  transactions,
  onSelectTransaction,
}) => {
  const limitedTransactions = transactions.slice(0, 10)
  const seasonPoints = calculateSeasonDailyPoints(new Date())
  return (
    <main className="flex h-full w-full min-w-0 flex-col safe-bottom">
      <section className="mb-6 grid w-full min-w-0 auto-rows-min grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
        <div className="col-start-1 row-start-1 min-w-0">
          <CardBalanceBlock cardData={cardData} />
        </div>
        <div className="col-start-2 row-span-2 row-start-1 flex min-h-0 min-w-0 w-full self-stretch">
          <NoPaymentDueBlock cardData={cardData} />
        </div>
        <div className="col-start-1 row-start-2 min-w-0">
          <DailyPointsBlock points={seasonPoints} />
        </div>
      </section>
      <section className="min-h-0 min-w-0 flex-1">
        <h2 className="mb-3 text-[22px] font-bold leading-tight tracking-tight text-black">
          Latest Transactions
        </h2>
        <div className="overflow-hidden rounded-[1.125rem] bg-white shadow-[0_1px_3px_rgb(0_0_0/0.06)] outline outline-1 outline-black/[0.05] transition-[box-shadow,outline-color] duration-300 ease-in-out hover:shadow-[0_4px_14px_rgb(0_0_0/0.08)] hover:outline-black/[0.08]">
          {limitedTransactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              isLast={index === limitedTransactions.length - 1}
              onPress={onSelectTransaction}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
