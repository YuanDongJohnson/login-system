import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')
  const code = formData.get('code')

  if (password !== confirmPassword) {
    return NextResponse.json({ error: '密码不匹配' }, { status: 400 })
  }

  const supabase = createClient()

  if (typeof code !== 'string') {
    return NextResponse.json({ error: '无效的重置码' }, { status: 400 })
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Error exchanging code for session:', error)
    return NextResponse.json({ error: '无效或过期的重置链接' }, { status: 400 })
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: password as string })

  if (updateError) {
    console.error('Error updating password:', updateError)
    return NextResponse.json({ error: '更新密码时出错' }, { status: 500 })
  }

  return NextResponse.json({ message: '密码已成功重置' })
}

