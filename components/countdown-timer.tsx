'use client'

import { useEffect, useState } from 'react'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('00:00')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      // Calculate next drop time (every 5 minutes at :00 and :05)
      const currentMinute = minutes % 5
      const secondsIntoMinute = seconds
      const totalSecondsLeft = (5 - currentMinute) * 60 - secondsIntoMinute

      const remainingMinutes = Math.floor(totalSecondsLeft / 60)
      const remainingSeconds = totalSecondsLeft % 60

      setTimeLeft(
        `${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
      )
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Next Drop</p>
      <div className="text-5xl font-mono font-bold text-primary tracking-tight">{timeLeft}</div>
    </div>
  )
}
