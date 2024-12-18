'use client'

import { createClient } from '@/utils/supabase/client'; // 确保路径正确
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
      <div className="flex items-center gap-4">
       {userIdentifier} 你好!
        <button 
          onClick={signOut}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          登出
        </button>
      </div>
    )
  )
}
