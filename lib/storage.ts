const PREFIX = 'pm_'

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback
    try {
      const v = window.localStorage.getItem(PREFIX + key)
      return v !== null ? (JSON.parse(v) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {}
  },
}
