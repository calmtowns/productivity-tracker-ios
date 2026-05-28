'use client'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { FilterMode, Task } from '@/types'
import TaskCard from './TaskCard'
import EmptyState from '@/components/empty-states/EmptyState'
import { cn } from '@/lib/utils'
const FILTERS: { id: FilterMode; label: string }[] = [{ id: 'all', label: 'Все' }, { id: 'active', label: 'Активные' }, { id: 'completed', label: 'Выполненные' }]
export default function TasksView({ tasks, filter, onFilterChange, onToggle, onDelete, onAdd }: { tasks: Task[]; filter: FilterMode; onFilterChange: (f: FilterMode) => void; onToggle: (id: string) => void; onDelete: (id: string) => void; onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800 dark:text-cream-50">Задачи</h1>
        <button onClick={onAdd} className="flex items-center gap-1.5 bg-amber-800 dark:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-2xl active:scale-95 transition-transform shadow-card"><Plus size={15} />Новая</button>
      </div>
      <div className="flex gap-2 bg-cream-100 dark:bg-stone-800 p-1 rounded-2xl">
        {FILTERS.map(f => (<button key={f.id} onClick={() => onFilterChange(f.id)} className={cn('flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200', filter === f.id ? 'bg-white dark:bg-stone-700 text-amber-800 dark:text-amber-400 shadow-card' : 'text-stone-500 dark:text-stone-400')}>{f.label}</button>))}
      </div>
      {tasks.length === 0 ? (
        <EmptyState icon={filter === 'completed' ? '🎉' : '📋'} title={filter === 'completed' ? 'Выполненных нет' : 'Задач пока нет'} subtitle={filter === 'completed' ? 'Выполненные задачи появятся здесь' : 'Добавь первую задачу и начни день продуктивно'} action={filter !== 'completed' ? { label: 'Добавить задачу', onClick: onAdd } : undefined} />
      ) : (
        <div className="flex flex-col gap-2.5">{tasks.map((task, i) => (<motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}><TaskCard task={task} onToggle={() => onToggle(task.id)} onDelete={() => onDelete(task.id)} /></motion.div>))}</div>
      )}
    </div>
  )
}
