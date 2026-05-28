'use client'
import { motion } from 'framer-motion'
import { Home, CheckSquare, Calendar, BookOpen } from 'lucide-react'
import type { TabId } from '@/types'
import { cn } from '@/lib/utils'
const TABS = [
  { id: 'home' as TabId, label: 'Главная', Icon: Home },
  { id: 'tasks' as TabId, label: 'Задачи', Icon: CheckSquare },
  { id: 'calendar' as TabId, label: 'Календарь', Icon: Calendar },
  { id: 'notes' as TabId, label: 'Заметки', Icon: BookOpen },
]
export default function TabBar({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-cream-50/90 dark:bg-stone-900/90 backdrop-blur-xl border-t border-cream-200 dark:border-stone-800">
      <div className="flex max-w-lg mx-auto px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={() => onChange(id)} className="flex-1 flex flex-col items-center gap-0.5 py-2.5 relative">
              {isActive && <motion.div layoutId="tab-bar-indicator" className="absolute inset-x-3 top-0 h-0.5 bg-amber-700 dark:bg-amber-500 rounded-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <Icon size={22} className={cn('transition-colors duration-200', isActive ? 'text-amber-800 dark:text-amber-400' : 'text-stone-400 dark:text-stone-600')} />
              <span className={cn('text-[10px] font-medium transition-colors duration-200', isActive ? 'text-amber-800 dark:text-amber-400' : 'text-stone-400 dark:text-stone-600')}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
