import type { FC } from 'react'
import type { Transaction } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { formatCurrency } from '../../utils/currency-formatter'
import { formatDate } from '../../utils/date-formatter'
import { formatDetailDateTime } from '../../utils/detail-date-formatter'

interface TransactionDetailProps {
  readonly transaction: Transaction
  readonly onBack: () => void
}

const getTypeLabelForDetail = (type: Transaction['type']): string => {
  return type === 'payment' ? 'Payment' : 'Credit'
}

export const TransactionDetail: FC<TransactionDetailProps> = ({
  transaction,
  onBack,
}) => {
  const statusLabel = transaction.pending ? 'Pending' : 'Approved'
  return (
    <main className="flex h-full w-full min-w-0 flex-col safe-bottom">
      <header className="mb-1">
        <button
          type="button"
          aria-label="Back to transactions"
          className="-ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#007AFF] transition-[opacity,transform] duration-200 ease-out hover:opacity-80 active:scale-95 active:opacity-70 motion-reduce:active:scale-100"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
        </button>
      </header>
      <section className="mb-10 px-1 text-center">
        <p className="text-[40px] font-bold leading-none tracking-tight text-black">
          {formatCurrency(transaction.amount, transaction.type)}
        </p>
        <p className="mt-2 text-[17px] font-normal leading-snug text-[#8E8E93]">
          {transaction.name}
        </p>
        <p className="mt-1 text-[15px] font-normal leading-snug text-[#8E8E93]">
          {formatDetailDateTime(transaction.date)}
        </p>
      </section>
      <section className="mb-4 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgb(0_0_0/0.06)] outline outline-1 outline-black/[0.06] transition-[box-shadow,outline-color] duration-300 ease-in-out hover:shadow-[0_4px_14px_rgb(0_0_0/0.08)] hover:outline-black/[0.1]">
        <p className="text-[17px] text-black">
          <span className="font-bold">Status:</span>{' '}
          <span className="font-normal">{statusLabel}</span>
        </p>
        <p className="mt-1 text-[15px] leading-snug text-[#8E8E93]">
          {transaction.description}
        </p>
        <div className="my-3 border-t border-[#E5E5EA]" />
        <div className="flex items-center justify-between text-[17px] font-bold text-black">
          <span>Total</span>
          <span className="tabular-nums">
            {formatCurrency(transaction.amount, 'credit')}
          </span>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-4 text-[15px] shadow-[0_1px_3px_rgb(0_0_0/0.06)] outline outline-1 outline-black/[0.06] transition-[box-shadow,outline-color] duration-300 ease-in-out hover:shadow-[0_4px_14px_rgb(0_0_0/0.08)] hover:outline-black/[0.1]">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8E8E93]">
          Details
        </h2>
        <DetailRow label="Type" value={getTypeLabelForDetail(transaction.type)} />
        <DetailRow
          label="Amount"
          value={formatCurrency(transaction.amount, transaction.type)}
        />
        <DetailRow label="Name" value={transaction.name} />
        <DetailRow label="Description" value={transaction.description} />
        <DetailRow label="Date" value={formatDate(transaction.date)} />
        <DetailRow label="Icon" value={transaction.icon} />
        <DetailRow
          label="Pending"
          value={transaction.pending === true ? 'Yes' : 'No'}
        />
        {transaction.authorizedUser ? (
          <DetailRow label="Authorized User" value={transaction.authorizedUser} />
        ) : null}
        {transaction.cardNumberUsed ? (
          <DetailRow label="Card Number Used" value={transaction.cardNumberUsed} />
        ) : null}
        {transaction.location ? (
          <DetailRow label="Location" value={transaction.location} />
        ) : null}
        {typeof transaction.percentage === 'number' ? (
          <DetailRow
            label="Cash Back"
            value={`${transaction.percentage}%`}
          />
        ) : null}
      </section>
    </main>
  )
}

interface DetailRowProps {
  readonly label: string
  readonly value: string
}

const DetailRow: FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#F2F2F7] py-2.5 last:border-b-0">
      <p className="shrink-0 text-[#8E8E93]">{label}</p>
      <p className="max-w-[60%] text-right font-medium text-black">{value}</p>
    </div>
  )
}
