export type Priority = 'normal' | 'important' | 'urgent'
export type NoteColor = 'cream' | 'rose' | 'sage' | 'sky' | 'sand'
export type FilterMode = 'all' | 'active' | 'completed'
export type TabId = 'home' | 'tasks' | 'calendar' | 'notes'

export interface Task {
  id: string
  title: string
  description: string
  date: string
  completed: boolean
  priority: Priority
  wasRolledOver: boolean
  createdAt: string
}

export interface Note {
  id: string
  title: string
  content: string
  color: NoteColor
  createdAt: string
  updatedAt: string
}
