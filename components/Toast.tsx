'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  const [opacity, setOpacity] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setOpacity(1)
    }, 1000)

    const hideTimer = setTimeout(() => {
      setOpacity(0)
    }, 4000)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 4300)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [])

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

