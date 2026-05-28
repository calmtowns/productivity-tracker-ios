'use client'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Note } from '@/types'
import NoteCard from './NoteCard'
import EmptyState from '@/components/empty-states/EmptyState'

interface NotesViewProps {
  notes: Note[]
  onDelete: (id: string) => void
  onAdd: () => void
}

export default function NotesView({ notes, onDelete, onAdd }: NotesViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800 dark:text-cream-50">Заметки</h1>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-amber-800 dark:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-2xl active:scale-95 transition-transform shadow-card"
        >
          <Plus size={15} />
          Новая
        </button>
      </div>
      {notes.length === 0 ? (
        <EmptyState
          icon="📝"
          title="Заметок пока нет"
          subtitle="Сохраняй идеи, мысли и важную информацию здесь"
          action={{ label: 'Создать заметку', onClick: onAdd }}
        />
      ) : (
        <div className="columns-2 gap-3">
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="break-inside-avoid mb-3"
            >
              <NoteCard note={note} onDelete={() => onDelete(note.id)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
