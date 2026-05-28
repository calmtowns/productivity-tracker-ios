import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Доброй ночи'
  if (h < 12) return 'Доброе утро'
  if (h < 17) return 'Добрый день'
  if (h < 21) return 'Добрый вечер'
  return 'Доброй ночи'
}
export function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
export function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  if (date.getDate()===today.getDate()&&date.getMonth()===today.getMonth()&&date.getFullYear()===today.getFullYear()) return 'Сегодня'
  const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
  return `${date.getDate()} ${months[date.getMonth()]}`
}
export function isPastDate(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date(); today.setHours(0,0,0,0)
  return date < today
}
export function generateId(): string {
  return Math.random().toString(36).slice(2,9) + Date.now().toString(36)
}
