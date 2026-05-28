'use client'
import { motion } from 'framer-motion'
export default function EmptyState({ icon, title, subtitle, action }: { icon: string; title: string; subtitle: string; action?: { label: string; onClick: () => void } }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', duration: 0.5, delay: 0.05 }} className="flex flex-col items-center py-14 px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-stone-800 flex items-center justify-center text-4xl mb-4 shadow-inner">{icon}</div>
      <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-300 mb-1">{title}</h3>
      <p className="text-sm text-stone-400 dark:text-stone-500 leading-relaxed max-w-xs">{subtitle}</p>
      {action && <button onClick={action.onClick} className="mt-5 px-6 py-3 bg-amber-800 dark:bg-amber-700 text-white text-sm font-semibold rounded-2xl active:scale-95 transition-transform shadow-card">{action.label}</button>}
    </motion.div>
  )
}
