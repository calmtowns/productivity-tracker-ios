'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 bg-cream-50 dark:bg-stone-900 rounded-t-[28px] shadow-2xl max-w-lg mx-auto',
              className
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className="flex items-center justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-cream-200 dark:border-stone-800">
              <h2 className="text-base font-semibold text-stone-800 dark:text-cream-50">{title}</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-cream-200 dark:hover:bg-stone-800 transition-colors"
              >
                <X size={18} className="text-stone-400" />
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '78vh' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
