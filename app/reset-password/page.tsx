'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import Link from 'next/link'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('密码不匹配')
      return
    }

    const formData = new FormData()
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)
    if (code) formData.append('code', code)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('密码已成功重置')
        // 延迟跳转，让用户看到成功消息
        setTimeout(() => router.push('/login?message=密码已重置，请使用新密码登录'), 2000)
      } else {
        setMessage(data.error || '重置密码时出错')
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      setMessage('发生意外错误，请重试')
    }
  }

  return (
    <div>
      <Header />

      <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
      >
        回首页
      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          onSubmit={resetPassword}
        >
          <label className="text-md" htmlFor="password">
            输入新密码
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="text-md" htmlFor="confirmPassword">
            确认新密码
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" type="submit">
            重置密码
          </button>

          {message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

