import type { FC } from 'react'
import type { CardData } from '../../types'
import { formatCurrency } from '../../utils/currency-formatter'

interface CardBalanceBlockProps {
  readonly cardData: CardData
}

export const CardBalanceBlock: FC<CardBalanceBlockProps> = ({ cardData }) => {
  const available = cardData.limit - cardData.balance
  return (
    <section className="wallet-dashboard-card">
      <p className="text-[13px] font-medium leading-tight tracking-tight text-black">
        Card Balance
      </p>
      <p className="mt-1.5 text-[28px] font-bold leading-none tracking-tight text-black">
        {formatCurrency(cardData.balance, 'credit')}
      </p>
      <p className="mt-1.5 text-[13px] font-normal leading-snug text-[#8E8E93]">
        {formatCurrency(available, 'credit')} Available
      </p>
    </section>
  )
}

