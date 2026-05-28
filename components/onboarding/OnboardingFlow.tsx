'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PAGES = [
  {
    emoji: '✨',
    gradient: 'from-amber-100 to-cream-50 dark:from-amber-900/30 dark:to-stone-900',
    title: 'Добро пожаловать',
    subtitle: 'Planner Minimal — твой личный минималистичный планёр для по-настоящему продуктивных дней',
  },
  {
    emoji: '📋',
    gradient: 'from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-stone-900',
    title: 'Управляй задачами',
    subtitle: 'Создавай, приоритизируй. Невыполненные задачи автоматически переносятся на следующий день',
  },
  {
    emoji: '📅',
    gradient: 'from-sky-100 to-blue-50 dark:from-sky-900/30 dark:to-stone-900',
    title: 'Следи за прогрессом',
    subtitle: 'Календарь с индикаторами, кольцо прогресса и статистика помогут не потерять темп',
  },
  {
    emoji: '📝',
    gradient: 'from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-stone-900',
    title: 'Сохраняй идеи',
    subtitle: 'Цветные заметки для идей, мыслей и списков — всё в одном уютном месте',
  },
]

export default function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [page, setPage] = useState(0)
  const current = PAGES[page]
  const isLast  = page === PAGES.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-cream-50 dark:bg-stone-950 flex flex-col select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.28 }}
          className="flex-1 flex flex-col items-center justify-center px-8 text-center"
        >
          <div className={`w-28 h-28 rounded-[28px] bg-gradient-to-br ${current.gradient} flex items-center justify-center text-5xl mb-8 shadow-card-md`}>
            {current.emoji}
          </div>
          <h1 className="text-2xl font-bold text-stone-800 dark:text-cream-50 mb-3">{current.title}</h1>
          <p className="text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">{current.subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <div className="pb-14 px-8 flex flex-col gap-4 items-center">
        <div className="flex gap-2">
          {PAGES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === page ? 24 : 8, backgroundColor: i === page ? '#92400E' : '#D6CBBF' }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
        <button
          onClick={() => isLast ? onComplete() : setPage(p => p + 1)}
          className="w-full max-w-sm py-4 bg-amber-800 dark:bg-amber-700 text-white font-semibold text-base rounded-2xl shadow-card-md active:scale-95 transition-transform"
        >
          {isLast ? 'Начать' : 'Далее'}
        </button>
        {!isLast && (
          <button onClick={onComplete} className="text-stone-400 dark:text-stone-600 text-sm py-1">Пропустить</button>
        )}
      </div>
    </div>
  )
}
