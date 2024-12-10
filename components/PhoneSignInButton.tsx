'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function PhoneSignInButton() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const supabase = createClient()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ phone: phoneNumber })
    if (error) {
      console.error('Error sending OTP:', error)
    } else {
      setStep('otp')
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.verifyOtp({ phone: phoneNumber, token: otp, type: 'sms' })
    if (error) {
      console.error('Error verifying OTP:', error)
    } else {
      // Redirect or update UI as needed
      console.log('Phone authentication successful')
    }
  }

  return (
    <div className="mt-2">
      {step === 'phone' ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-2">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="输入手机号"
            className="rounded-md px-4 py-2 bg-inherit border"
            required
          />
          <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground">
            发送验证码
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="输入验证码"
            className="rounded-md px-4 py-2 bg-inherit border"
            required
          />
          <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground">
            验证
          </button>
        </form>
      )}
    </div>
  )
}

