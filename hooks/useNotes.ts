'use client'
import { useState, useEffect, useCallback } from 'react'
import { Note, NoteColor } from '@/types'
import { storage } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => { setNotes(storage.get<Note[]>('notes', [])); setReady(true) }, [])
  useEffect(() => { if (!ready) return; storage.set('notes', notes) }, [notes, ready])
  const addNote = useCallback((data: { title: string; content: string; color: NoteColor }) => {
    const note: Note = { id: generateId(), title: data.title, content: data.content, color: data.color, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    setNotes(prev => [note, ...prev])
  }, [])
  const deleteNote = useCallback((id: string) => { setNotes(prev => prev.filter(n => n.id !== id)) }, [])
  return { notes, addNote, deleteNote }
}
