'use client'

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User() {
  const [userIdentifier, setUserIdentifier] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserIdentifier(user?.phone || user?.email || null)
    }
    getUser()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    userIdentifier && (
      <div className="flex items-center gap-4 text-sm text-gray-100 bg-gray-800 bg-opacity-50 p-2 rounded-md">
        <span>亲爱的, {userIdentifier} 你好!</span>
        <button 
          onClick={signOut}
          className="py-1 px-2 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-xs"
        >
          登出
        </button>
      </div>
    )
  )
}

