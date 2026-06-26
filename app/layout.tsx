import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '$AIRDROP — Where Is The Airdrop?',
  description: 'Pump said soon. The community kept waiting. $AIRDROP steps in. Every 5 minutes, creator fees buy PUMP and airdrop it to the top 50 holders.',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-06-26_11-17-49-ADRvjT68NPxLVR2NMQ9uDY6gseZBdU.jpg',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-06-26_11-17-49-ADRvjT68NPxLVR2NMQ9uDY6gseZBdU.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
