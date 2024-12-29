'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  delay?: number
  duration?: number
}

export default function Toast({ message, delay = 1000, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      setOpacity(1)
    }, delay)

    const hideTimer = setTimeout(() => {
      setOpacity(0)
    }, delay + duration)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, delay + duration + 300) // 300ms for fade out animation

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [delay, duration])

  if (!isVisible) return null

  return (
    <div 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md"
      style={{
        transition: 'opacity 300ms ease-in-out',
        opacity: opacity
      }}
    >
      {message}
    </div>
  )
}

