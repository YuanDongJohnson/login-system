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
    try {
      // 首先，调用我们的自定义登出路由
      const response = await fetch('/auth/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Logout failed')
      }

      // 如果服务器端登出成功，清除客户端状态
      await supabase.auth.signOut()
      
      // 重定向到登录页面
      router.push('/login')
    } catch (error) {
      console.error('Error during logout:', error)
      // 这里可以添加错误处理，比如显示一个错误消息给用户
    }
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

