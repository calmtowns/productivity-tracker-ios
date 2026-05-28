'use client'
import { useState, useEffect, useCallback } from 'react'
import { Task, FilterMode, Priority } from '@/types'
import { storage } from '@/lib/storage'
import { generateId, todayStr, isPastDate } from '@/lib/utils'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterMode>('all')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = storage.get<Task[]>('tasks', [])
    const today = todayStr()
    const lastRollover = storage.get<string>('lastRollover', '')
    let updated = saved
    if (lastRollover !== today) {
      let changed = false
      updated = saved.map(t => {
        if (!t.completed && isPastDate(t.date)) { changed = true; return { ...t, date: today, wasRolledOver: true } }
        return t
      })
      if (changed) storage.set('tasks', updated)
      storage.set('lastRollover', today)
    }
    setTasks(updated)
    setReady(true)
  }, [])

  useEffect(() => { if (!ready) return; storage.set('tasks', tasks) }, [tasks, ready])

  const addTask = useCallback((data: { title: string; description: string; date: string; priority: Priority }) => {
    const task: Task = { id: generateId(), title: data.title, description: data.description, date: data.date, completed: false, priority: data.priority, wasRolledOver: false, createdAt: new Date().toISOString() }
    setTasks(prev => [task, ...prev])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }, [])

  const deleteTask = useCallback((id: string) => { setTasks(prev => prev.filter(t => t.id !== id)) }, [])

  const getTasksForDate = useCallback((dateStr: string) => tasks.filter(t => t.date === dateStr), [tasks])

  const today = todayStr()
  const todayTasks = tasks.filter(t => t.date === today)
  const filteredTasks = tasks.filter(t => { if (filter === 'active') return !t.completed; if (filter === 'completed') return t.completed; return true })
  const progress = todayTasks.length === 0 ? 0 : todayTasks.filter(t => t.completed).length / todayTasks.length

  return { tasks, filteredTasks, todayTasks, filter, setFilter, progress, addTask, toggleTask, deleteTask, getTasksForDate }
}
