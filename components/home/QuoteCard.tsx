'use client'
import { motion } from 'framer-motion'
import type { Quote } from '@/lib/quotes'
export default function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="bg-amber-50/70 dark:bg-stone-800/60 rounded-2xl p-4 border border-amber-100 dark:border-stone-700/60">
      <span className="text-2xl leading-none text-amber-700/30 dark:text-amber-500/30 font-serif select-none">❝</span>
      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mt-1 font-serif italic">{quote.text}</p>
      <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">— {quote.author}</p>
    </motion.div>
  )
}
