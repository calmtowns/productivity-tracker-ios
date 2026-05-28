'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const saved = storage.get<boolean>('dark_mode', false)
    setIsDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])
  const toggle = () => {
    setIsDark(prev => { const next = !prev; storage.set('dark_mode', next); document.documentElement.classList.toggle('dark', next); return next })
  }
  return { isDark, toggle }
}
