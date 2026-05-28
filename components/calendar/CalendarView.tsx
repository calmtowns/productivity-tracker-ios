'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Task } from '@/types'
import { todayStr, cn } from '@/lib/utils'

const DAYS   = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

function pad(n: number) { return String(n).padStart(2, '0') }
function makeDateStr(y: number, m: number, d: number) { return `${y}-${pad(m+1)}-${pad(d)}` }

export default function CalendarView({ getTasksForDate }: { getTasksForDate: (s: string) => Task[] }) {
  const now  = new Date()
  const [year,     setYear]     = useState(now.getFullYear())
  const [month,    setMonth]    = useState(now.getMonth())
  const [selected, setSelected] = useState(todayStr())

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const rawFirst    = new Date(year, month, 1).getDay()
  const firstOffset = rawFirst === 0 ? 6 : rawFirst - 1
  const totalCells  = Math.ceil((firstOffset + daysInMonth) / 7) * 7

  const prevMonth = () => month === 0 ? (setYear(y => y-1), setMonth(11)) : setMonth(m => m-1)
  const nextMonth = () => month === 11 ? (setYear(y => y+1), setMonth(0)) : setMonth(m => m+1)

  const today = todayStr()
  const selectedTasks = getTasksForDate(selected)
  const selectedDate  = new Date(selected + 'T00:00:00')

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-cream-50">Календарь</h1>

      <div className="bg-white dark:bg-stone-800 rounded-3xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-cream-100 dark:hover:bg-stone-700 transition-colors">
            <ChevronLeft size={20} className="text-stone-400" />
          </button>
          <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300">{MONTHS[month]} {year}</h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-cream-100 dark:hover:bg-stone-700 transition-colors">
            <ChevronRight size={20} className="text-stone-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-medium text-stone-400 dark:text-stone-500 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: totalCells }).map((_, idx) => {
            const dayNum = idx - firstOffset + 1
            if (dayNum < 1 || dayNum > daysInMonth) return <div key={idx} />
            const dateStr = makeDateStr(year, month, dayNum)
            const tasks   = getTasksForDate(dateStr)
            const isToday = dateStr === today
            const isSel   = dateStr === selected
            const hasActive    = tasks.some(t => !t.completed)
            const hasCompleted = tasks.some(t => t.completed)
            return (
              <button key={idx} onClick={() => setSelected(dateStr)} className="flex flex-col items-center py-1">
                <div className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 font-medium',
                  isSel  ? 'bg-amber-800 text-white shadow-md' : '',
                  isToday && !isSel ? 'text-amber-700 dark:text-amber-400' : '',
                  !isSel && !isToday ? 'text-stone-600 dark:text-stone-400' : ''
                )}>
                  {dayNum}
                </div>
                <div className="flex gap-0.5 h-1.5 mt-0.5">
                  {hasActive    && <div className="w-1 h-1 rounded-full bg-amber-600" />}
                  {hasCompleted && <div className="w-1 h-1 rounded-full bg-emerald-500" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <section>
        <p className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-3">
          {selected === today ? 'Сегодня' : selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
          {' '}·{' '}
          <span className="font-normal text-stone-400 dark:text-stone-600">
            {selectedTasks.length > 0 ? `${selectedTasks.length} задач` : 'нет задач'}
          </span>
        </p>
        {selectedTasks.length === 0 ? (
          <p className="text-sm text-stone-400 dark:text-stone-600 text-center py-8">На этот день задач нет</p>
        ) : (
          <div className="flex flex-col gap-2">
            {selectedTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-stone-800 rounded-2xl p-3.5 shadow-card flex items-center gap-3"
              >
                <div className={cn(
                  'w-2 h-2 rounded-full flex-shrink-0',
                  task.completed ? 'bg-emerald-500' :
                  task.priority === 'urgent' ? 'bg-orange-500' :
                  task.priority === 'important' ? 'bg-amber-500' : 'bg-stone-300'
                )} />
                <span className={cn(
                  'text-sm flex-1',
                  task.completed ? 'line-through text-stone-400 dark:text-stone-600' : 'text-stone-800 dark:text-cream-50'
                )}>
                  {task.title}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
