'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User() {
  const [email, setEmail] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email ?? null)
    }
    getUser()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    email && (
      <div className="flex items-center gap-4">
        亲爱的, {email} 你好!
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
