'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import TabBar from '@/components/layout/TabBar'
import HomeView from '@/components/home/HomeView'
import TasksView from '@/components/tasks/TasksView'
import CalendarView from '@/components/calendar/CalendarView'
import NotesView from '@/components/notes/NotesView'
import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import AddNoteModal from '@/components/notes/AddNoteModal'
import { useTasks } from '@/hooks/useTasks'
import { useNotes } from '@/hooks/useNotes'
import { useOnboarding } from '@/hooks/useOnboarding'
import { useTheme } from '@/hooks/useTheme'
import type { TabId } from '@/types'

export default function Page() {
  const [tab, setTab] = useState<TabId>('home')
  const [taskModal, setTaskModal] = useState(false)
  const [noteModal, setNoteModal] = useState(false)
  const { done: onboardingDone, complete: completeOnboarding } = useOnboarding()
  const { isDark, toggle: toggleTheme } = useTheme()
  const { tasks, filteredTasks, progress, filter, setFilter, addTask, toggleTask, deleteTask, getTasksForDate } = useTasks()
  const { notes, addNote, deleteNote } = useNotes()

  if (!onboardingDone) return <OnboardingFlow onComplete={completeOnboarding} />

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-stone-950">
      <button onClick={toggleTheme} className="fixed top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm shadow-card border border-cream-200 dark:border-stone-700" aria-label="Переключить тему">
        {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-stone-400" />}
      </button>
      <main className="max-w-lg mx-auto px-4 pt-16 pb-28 min-h-screen">
        <AnimatePresence mode="wait">
          {tab === 'home' && <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}><HomeView tasks={tasks} progress={progress} onToggle={toggleTask} onDelete={deleteTask} onAddTask={() => setTaskModal(true)} /></motion.div>}
          {tab === 'tasks' && <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}><TasksView tasks={filteredTasks} filter={filter} onFilterChange={setFilter} onToggle={toggleTask} onDelete={deleteTask} onAdd={() => setTaskModal(true)} /></motion.div>}
          {tab === 'calendar' && <motion.div key="calendar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}><CalendarView getTasksForDate={getTasksForDate} /></motion.div>}
          {tab === 'notes' && <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}><NotesView notes={notes} onDelete={deleteNote} onAdd={() => setNoteModal(true)} /></motion.div>}
        </AnimatePresence>
      </main>
      <TabBar active={tab} onChange={setTab} />
      <AddTaskModal isOpen={taskModal} onClose={() => setTaskModal(false)} onAdd={addTask} />
      <AddNoteModal isOpen={noteModal} onClose={() => setNoteModal(false)} onAdd={addNote} />
    </div>
  )
}
