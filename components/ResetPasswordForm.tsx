'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Toast from './Toast'

interface ResetPasswordFormProps {
  resetPassword: (formData: FormData) => Promise<{ error?: string }>
}

export default function ResetPasswordForm({ resetPassword }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await resetPassword(formData)
    if (result.error) {
      setError(result.error)
    } else {
      router.push('/text?message=' + encodeURIComponent('您的密码已成功重置。请登录。'))
    }
  }

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
      onSubmit={handleSubmit}
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
      />
      <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
        重置
      </button>
      {error && <Toast message={error} />}
    </form>
  )
}

