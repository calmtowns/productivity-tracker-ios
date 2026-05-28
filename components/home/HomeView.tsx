'use client'
import { motion } from 'framer-motion'
import { Plus, RefreshCw, Sparkles } from 'lucide-react'
import ProgressRing from './ProgressRing'
import QuoteCard from './QuoteCard'
import TaskCard from '@/components/tasks/TaskCard'
import EmptyState from '@/components/empty-states/EmptyState'
import { getGreeting, todayStr } from '@/lib/utils'
import { getQuoteForDay } from '@/lib/quotes'
import type { Task } from '@/types'
interface HomeViewProps { tasks: Task[]; progress: number; onToggle: (id: string) => void; onDelete: (id: string) => void; onAddTask: () => void }
export default function HomeView({ tasks, progress, onToggle, onDelete, onAddTask }: HomeViewProps) {
  const today = todayStr()
  const todayTasks = tasks.filter(t => t.date === today)
  const rolledCount = todayTasks.filter(t => t.wasRolledOver && !t.completed).length
  const doneCount = todayTasks.filter(t => t.completed).length
  const quote = getQuoteForDay()
  const dateLabel = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <p className="text-xs text-stone-400 dark:text-stone-500 capitalize tracking-wide">{dateLabel}</p>
          <h1 className="text-2xl font-bold text-stone-800 dark:text-cream-50 mt-0.5">{getGreeting()} 👋</h1>
        </div>
        <div className="p-2.5 bg-amber-100 dark:bg-stone-800 rounded-full"><Sparkles size={19} className="text-amber-700 dark:text-amber-400" /></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }} className="bg-white dark:bg-stone-800 rounded-3xl p-5 shadow-card flex items-center gap-5">
        <ProgressRing progress={progress} />
        <div className="flex-1">
          <p className="text-[11px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest">Прогресс дня</p>
          <p className="text-2xl font-bold text-stone-800 dark:text-cream-50 mt-0.5 leading-none">{doneCount}<span className="text-base font-normal text-stone-400 dark:text-stone-500"> / {todayTasks.length}</span></p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">задач выполнено</p>
          {rolledCount > 0 && <div className="flex items-center gap-1 mt-2"><RefreshCw size={11} className="text-sky-500" /><span className="text-xs text-sky-600 dark:text-sky-400">{rolledCount} перенесено с вчера</span></div>}
        </div>
      </motion.div>
      <QuoteCard quote={quote} />
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest">Сегодня</h2>
          <button onClick={onAddTask} className="flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full active:scale-95 transition-transform"><Plus size={13} />Добавить</button>
        </div>
        {todayTasks.length === 0 ? (
          <EmptyState icon="✨" title="День пуст" subtitle="Добавь первую задачу и начни продуктивный день" action={{ label: 'Добавить задачу', onClick: onAddTask }} />
        ) : (
          <div className="flex flex-col gap-2.5">
            {todayTasks.map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <TaskCard task={task} onToggle={() => onToggle(task.id)} onDelete={() => onDelete(task.id)} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
