import type { FC } from 'react'
import { formatPoints } from '../../utils/points-formatter'

interface DailyPointsBlockProps {
  readonly points: number
}

export const DailyPointsBlock: FC<DailyPointsBlockProps> = ({ points }) => {
  return (
    <section className="wallet-dashboard-card">
      <p className="text-[13px] font-medium leading-tight tracking-tight text-black">Daily Points</p>
      <p className="mt-1.5 text-[13px] font-normal leading-snug text-[#8E8E93]">
        {formatPoints(points)}
      </p>
    </section>
  )
}

