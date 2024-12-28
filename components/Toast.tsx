'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0)
    }, 5000)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5300) // 5秒后开始渐隐，300ms后完全隐藏

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md"
      style={{
        transition: 'opacity 300ms ease-in-out',
        opacity: opacity
      }}
    >
      {message}
    </div>
  )
}

