'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 假设 createClient 不需要参数
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // 这里可能需要处理登录成功后的逻辑，例如设置cookie等
  return { error: null }
}

export async function signOut() {
  // 假设 createClient 不需要参数
  const supabase = createClient()
  await supabase.auth.signOut()
  // 使用 Next.js 的 redirect 函数进行客户端重定向
  return redirect('/login')
}
