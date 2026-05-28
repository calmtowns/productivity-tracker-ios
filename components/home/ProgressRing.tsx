'use client'
import { motion } from 'framer-motion'
interface ProgressRingProps { progress: number; size?: number; stroke?: number }
export default function ProgressRing({ progress, size = 88, stroke = 7 }: ProgressRingProps) {
  const r = (size - stroke) / 2
  const circ = r * 2 * Math.PI
  const offset = circ - progress * circ
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ overflow: 'visible' }}>
        <defs><linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#D97706" /><stop offset="100%" stopColor="#92400E" /></linearGradient></defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-cream-200 dark:text-stone-700" />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ring-grad)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      </svg>
      <div className="absolute flex flex-col items-center select-none">
        <span className="text-xl font-bold text-stone-800 dark:text-cream-50 leading-none">{Math.round(progress * 100)}%</span>
        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium mt-0.5">готово</span>
      </div>
    </div>
  )
}
