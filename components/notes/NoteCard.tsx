'use client'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import type { Note } from '@/types'

const COLOR_MAP: Record<string, string> = {
  cream: 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30',
  rose:  'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30',
  sage:  'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30',
  sky:   'bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30',
  sand:  'bg-stone-50 border-stone-200 dark:bg-stone-800 dark:border-stone-700',
}

interface NoteCardProps {
  note: Note
  onDelete: () => void
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const colors = COLOR_MAP[note.color] ?? COLOR_MAP.cream
  const dateStr = new Date(note.updatedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })

  return (
    <motion.div layout className={`group relative rounded-2xl p-4 border ${colors}`}>
      <button
        onClick={e => { e.stopPropagation(); onDelete() }}
        className="absolute top-3 right-3 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
        aria-label="Удалить заметку"
      >
        <Trash2 size={13} className="text-stone-400" />
      </button>
      {note.title && (
        <h3 className="text-sm font-semibold text-stone-800 dark:text-cream-50 mb-1.5 pr-5 leading-snug">{note.title}</h3>
      )}
      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-5 whitespace-pre-wrap">{note.content}</p>
      <p className="text-[10px] text-stone-300 dark:text-stone-600 mt-2">{dateStr}</p>
    </motion.div>
  )
}
