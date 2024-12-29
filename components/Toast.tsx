'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setOpacity(1)
    }, 1000)

    const hideTimer = setTimeout(() => {
      setOpacity(0)
    }, 4000)

    const closeTimer = setTimeout(() => {
      onClose()
    }, 4300)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(closeTimer)
    }
  }, [onClose])

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

