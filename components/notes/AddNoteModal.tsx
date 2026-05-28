'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import type { NoteColor } from '@/types'

interface AddNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { title: string; content: string; color: NoteColor }) => void
}

const COLORS: { value: NoteColor; bg: string }[] = [
  { value: 'cream', bg: 'bg-amber-200' },
  { value: 'rose',  bg: 'bg-rose-200' },
  { value: 'sage',  bg: 'bg-emerald-200' },
  { value: 'sky',   bg: 'bg-sky-200' },
  { value: 'sand',  bg: 'bg-stone-300' },
]

export default function AddNoteModal({ isOpen, onClose, onAdd }: AddNoteModalProps) {
  const [title,   setTitle]   = useState('')
  const [content, setContent] = useState('')
  const [color,   setColor]   = useState<NoteColor>('cream')

  const reset = () => { setTitle(''); setContent(''); setColor('cream') }

  const handleSubmit = () => {
    if (!content.trim()) return
    onAdd({ title: title.trim(), content: content.trim(), color })
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose() }} title="Новая заметка">
      <div className="p-5 flex flex-col gap-4 pb-8">
        <input
          type="text"
          placeholder="Заголовок (необязательно)..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-base bg-cream-100 dark:bg-stone-800 rounded-xl px-4 py-3 text-stone-800 dark:text-cream-50 placeholder:text-stone-400 outline-none focus:ring-2 ring-amber-300 dark:ring-amber-700 transition"
        />
        <textarea
          placeholder="Напиши что-нибудь..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={7}
          autoFocus
          className="w-full text-sm bg-cream-100 dark:bg-stone-800 rounded-xl px-4 py-3 text-stone-800 dark:text-cream-50 placeholder:text-stone-400 outline-none focus:ring-2 ring-amber-300 dark:ring-amber-700 resize-none transition"
        />
        <div>
          <label className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 block">Цвет карточки</label>
          <div className="flex gap-3">
            {COLORS.map(c => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center transition-transform ${
                  color === c.value ? 'scale-125 ring-2 ring-offset-1 ring-amber-700' : 'scale-100'
                }`}
              >
                {color === c.value && <Check size={14} className="text-stone-700" />}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-full py-4 bg-amber-800 dark:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Check size={18} />
          Сохранить
        </button>
      </div>
    </Modal>
  )
}
