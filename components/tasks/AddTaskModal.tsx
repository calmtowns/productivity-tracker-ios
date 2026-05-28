'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import type { Priority } from '@/types'
import { todayStr } from '@/lib/utils'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { title: string; description: string; date: string; priority: Priority }) => void
}

const PRIORITIES: { value: Priority; label: string; icon: string }[] = [
  { value: 'normal',    label: 'Обычная', icon: '○' },
  { value: 'important', label: 'Важная',  icon: '!' },
  { value: 'urgent',    label: 'Срочная', icon: '⚡' },
]

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [date,        setDate]        = useState(todayStr())
  const [priority,    setPriority]    = useState<Priority>('normal')

  const reset = () => { setTitle(''); setDescription(''); setDate(todayStr()); setPriority('normal') }

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd({ title: title.trim(), description: description.trim(), date, priority })
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose() }} title="Новая задача">
      <div className="p-5 flex flex-col gap-4 pb-8">
        <input
          type="text"
          placeholder="Название задачи..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
          className="w-full text-base bg-cream-100 dark:bg-stone-800 rounded-xl px-4 py-3 text-stone-800 dark:text-cream-50 placeholder:text-stone-400 outline-none focus:ring-2 ring-amber-300 dark:ring-amber-700 transition"
        />
        <textarea
          placeholder="Описание (необязательно)..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full text-sm bg-cream-100 dark:bg-stone-800 rounded-xl px-4 py-3 text-stone-800 dark:text-cream-50 placeholder:text-stone-400 outline-none focus:ring-2 ring-amber-300 dark:ring-amber-700 resize-none transition"
        />
        <div>
          <label className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2 block">Дата</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full text-sm bg-cream-100 dark:bg-stone-800 rounded-xl px-4 py-3 text-stone-800 dark:text-cream-50 outline-none focus:ring-2 ring-amber-300 dark:ring-amber-700 transition"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2 block">Приоритет</label>
          <div className="flex gap-2">
            {PRIORITIES.map(p => (
              <button
                key={p.value}
                onClick={() => setPriority(p.value)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-medium transition-all ${
                  priority === p.value
                    ? 'bg-amber-800 text-white shadow-md scale-[1.03]'
                    : 'bg-cream-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                }`}
              >
                <span className="text-base">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full py-4 bg-amber-800 dark:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform mt-1"
        >
          <Check size={18} />
          Добавить задачу
        </button>
      </div>
    </Modal>
  )
}
