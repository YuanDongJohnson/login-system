'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function User() {
  const [session, setSession] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        setSession(data.session)
      }
    }
    getSession()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!session) {
    return null
  }

  const userIdentifier = session.user.phone || (session.user.email && !session.user.email_change_confirm_status ? session.user.email : null)

  return (
    <div className="flex items-center gap-4">
      你好, {userIdentifier}!
      <button 
        onClick={signOut}
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        登出
      </button>
    </div>
  )
}

