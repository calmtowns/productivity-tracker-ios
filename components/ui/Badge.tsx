import { cn } from '@/lib/utils'
type Variant = 'normal' | 'important' | 'urgent' | 'success' | 'rolled'
const MAP: Record<Variant, string> = {
  normal:    'bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400',
  important: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400',
  urgent:    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  success:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  rolled:    'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
}
export default function Badge({ variant = 'normal', children, className }: { variant?: Variant; children: React.ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-medium', MAP[variant], className)}>{children}</span>
}
