'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
export function useOnboarding() {
  const [done, setDone] = useState(true)
  useEffect(() => { setDone(storage.get<boolean>('onboarding_done', false)) }, [])
  const complete = () => { storage.set('onboarding_done', true); setDone(true) }
  return { done, complete }
}
