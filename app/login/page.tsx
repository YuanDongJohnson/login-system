'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import Header from '@/components/Header/Header'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const [activeTab, setActiveTab] = useState<'phone' | 'password'>('phone')
  const supabase = createClient()

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
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === 'phone'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('phone')}
          >
            验证码
          </button>
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === 'password'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('password')}
          >
            密码
          </button>
        </div>

        {activeTab === 'phone' ? (
          <PhoneLoginForm />
        ) : (
          <PasswordLoginForm searchParams={searchParams} />
        )}
      </div>
    </div>
  )
}

function PhoneLoginForm() {
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const supabase = createClient()

  async function getQRcode() {
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    })
    if (error) {
      alert(error.message)
    } else {
      alert('短信已发送至您的手机中，请注意查收。')
    }
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    let { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: verificationCode,
      type: 'sms',
    })
    if (error) {
      alert(error.message)
    } else {
      window.location.href = '/text'
    }
  }

  return (
    <form onSubmit={signIn} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <div className="mb-4">
        <input
          className="rounded-md px-4 py-2 bg-inherit border w-full"
          type="tel"
          placeholder="手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="rounded-md px-4 py-2 bg-inherit border flex-1"
          type="text"
          placeholder="验证码"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={getQRcode}
          className="py-2 px-4 rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          获取验证码
        </button>
      </div>
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
        登录/注册
      </button>
    </form>
  )
}

function PasswordLoginForm({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=无法验证的用户')
    }

    return redirect('/text')
  }

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={signIn}
    >
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        name="email"
        placeholder="邮箱"
        required
      />
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        type="password"
        name="password"
        placeholder="密码"
        required
      />
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
        登录/注册
      </button>

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}

      <Link
        href="/forgot-password"
        className="text-sm text-indigo-400 text-center mt-2"
      >
        忘记密码
      </Link>
    </form>
  )
}

