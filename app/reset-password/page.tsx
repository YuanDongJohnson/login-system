import Header from '@/components/Header/Header'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ResetPasswordForm from '@/components/ResetPasswordForm'

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string }
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return redirect('/text')
  }

  const resetPassword = async (formData: FormData) => {
    'use server'

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      return { error: '密码不匹配' }
    }

    if (searchParams.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      )

      if (error) {
        return { error: '无法重置密码。链接已过期！' }
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      console.log(error)
      return { error: '无法重置密码。请重试！' }
    }

    return {}
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
        <ResetPasswordForm resetPassword={resetPassword} />
      </div>
    </div>
  )
}

