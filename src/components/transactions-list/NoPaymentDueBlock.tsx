import type { FC } from 'react'
import type { CardData } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface NoPaymentDueBlockProps {
  readonly cardData: CardData
}

export const NoPaymentDueBlock: FC<NoPaymentDueBlockProps> = ({ cardData }) => {
  if (cardData.paymentDue) {
    return null
  }
  return (
    <section className="wallet-dashboard-card flex h-full min-h-0 w-full flex-col justify-between">
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-tight tracking-tight text-black">
          No Payment Due
        </p>
        <p className="mt-1.5 text-[13px] font-normal leading-snug text-[#8E8E93]">
          You&apos;ve paid your balance.
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5E5EA] transition-transform duration-200 ease-out hover:scale-105 active:scale-95">
          <FontAwesomeIcon icon={faCheck} className="h-[18px] w-[18px] text-black" />
        </div>
      </div>
    </section>
  )
}
