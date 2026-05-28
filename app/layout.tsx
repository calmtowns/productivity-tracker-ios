import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Planner Minimal',
  description: 'Минималистичный планёр задач в стиле Pinterest',
  appleWebApp: { capable: true, title: 'Planner', statusBarStyle: 'default' },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false, viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFAF6' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0905' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
