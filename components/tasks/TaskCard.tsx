'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Trash2, RefreshCw } from 'lucide-react'
import type { Task } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatDisplayDate } from '@/lib/utils'

const PRIORITY_LABEL: Record<Task['priority'], string | null> = {
  normal: null,
  important: 'Важно',
  urgent: 'Срочно',
}

interface TaskCardProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const x = useMotionValue(0)
  const deleteOpacity = useTransform(x, [-80, -20], [1, 0])

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-end pr-4 bg-red-50 dark:bg-red-950/30">
        <motion.div style={{ opacity: deleteOpacity }}>
          <Trash2 size={20} className="text-red-400" />
        </motion.div>
      </div>

      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ right: 0, left: -96 }}
        dragElastic={{ left: 0.08, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -56) {
            onDelete()
          } else {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 28 })
          }
        }}
        className="relative bg-white dark:bg-stone-800 rounded-2xl p-4 shadow-card cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start gap-3">
          <button
            onClick={onToggle}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-stone-300 dark:border-stone-600 hover:border-amber-500'
            }`}
          >
            {task.completed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium leading-snug transition-all duration-200 ${
              task.completed ? 'line-through text-stone-400 dark:text-stone-600' : 'text-stone-800 dark:text-cream-50'
            }`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-stone-400 dark:text-stone-500">{formatDisplayDate(task.date)}</span>
              {PRIORITY_LABEL[task.priority] && (
                <Badge variant={task.priority}>{PRIORITY_LABEL[task.priority]}</Badge>
              )}
              {task.wasRolledOver && !task.completed && (
                <Badge variant="rolled"><RefreshCw size={9} />перенесено</Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
