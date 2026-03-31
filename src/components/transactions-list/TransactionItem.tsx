import type { CSSProperties, FC, MouseEventHandler } from 'react'
import type { Transaction } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { getIconComponent } from '../../utils/icon-mapper'
import { formatCurrency } from '../../utils/currency-formatter'
import { formatDate } from '../../utils/date-formatter'
import { pickDarkIconBackground } from '../../utils/icon-background'

const PAYMENT_ICON_GRADIENT =
  'linear-gradient(135deg, #ffaf40 0%, #ee5253 45%, #5f27cd 100%)'

interface TransactionItemProps {
  readonly transaction: Transaction
  readonly isLast: boolean
  readonly onPress: (transaction: Transaction) => void
}

export const TransactionItem: FC<TransactionItemProps> = ({
  transaction,
  isLast,
  onPress,
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onPress(transaction)
  }
  const icon = getIconComponent(transaction.icon)
  const isBullseye = transaction.icon === 'bullseye'
  const fallbackDark = pickDarkIconBackground(transaction.id)
  const iconBoxStyle: CSSProperties =
    transaction.type === 'payment'
      ? { background: PAYMENT_ICON_GRADIENT }
      : isBullseye
        ? { backgroundColor: '#ffffff', boxShadow: 'inset 0 0 0 1px #E5E5EA' }
        : {
            backgroundColor: transaction.iconBgColor ?? fallbackDark,
          }
  const iconClassName =
    isBullseye && transaction.type !== 'payment'
      ? 'h-5 w-5 text-[#c92323]'
      : 'h-5 w-5 text-white'
  const metaLine = [
    transaction.authorizedUser ? `${transaction.authorizedUser} \u2014 ` : '',
    formatDate(transaction.date),
  ].join('')
  return (
    <button
      type="button"
      className="group flex w-full min-h-[56px] min-w-0 flex-row items-stretch bg-white text-left transition-[background-color,transform] duration-200 ease-out hover:bg-[#F5F5F7] active:bg-[#EBEBED] active:scale-[0.995] motion-reduce:transition-none motion-reduce:active:scale-100"
      onClick={handleClick}
    >
      <div className="flex shrink-0 items-center pl-4 pr-2 py-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          style={iconBoxStyle}
        >
          <FontAwesomeIcon icon={icon} className={iconClassName} />
        </div>
      </div>
      <div
        className={`flex min-w-0 flex-1 items-center justify-between gap-2 border-[#C6C6C8] py-3.5 pr-4 pl-1 ${
          isLast ? '' : 'border-b border-[#C6C6C8]'
        }`}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold leading-snug tracking-tight text-black">
            {transaction.name}
          </p>
          <p className="mt-0.5 truncate text-[13px] font-normal leading-snug text-[#8E8E93]">
            {transaction.pending ? 'Pending ' : ''}
            {transaction.description}
          </p>
          <p className="mt-0.5 text-[13px] font-normal leading-snug text-[#8E8E93]">
            {metaLine}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="flex flex-col items-end gap-1">
            <p className="text-[17px] font-normal tabular-nums leading-snug text-black">
              {formatCurrency(transaction.amount, transaction.type)}
            </p>
            {typeof transaction.percentage === 'number' ? (
              <span className="rounded-md bg-[#E5E5EA] px-1.5 py-0.5 text-[11px] font-normal text-[#8E8E93]">
                {transaction.percentage}%
              </span>
            ) : null}
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-3.5 w-3.5 shrink-0 text-[#C7C7CC] transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  )
}
