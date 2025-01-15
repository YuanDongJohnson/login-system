'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

export function PhoneLoginForm() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const getVerificationCode = async () => {
    setIsSendingCode(true);
    setToastMessage(null);
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });
    setIsSendingCode(false);
    if (error) {
      setToastMessage(getChineseErrorMessage(error.message));
    } else {
      setToastMessage('验证码已发送至您的手机，请注意查收。');
      setCountdown(60);
    }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      setToastMessage('请输入验证码');
      return;
    }
    setToastMessage(null);
    setIsLoading(true);
    let { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: verificationCode,
      type: 'sms',
    });
    setIsLoading(false);
    if (error) {
      setToastMessage(getChineseErrorMessage(error.message));
    } else {
      setToastMessage('验证成功，正在登录...');
      router.push('/text');
    }
  };

  const getChineseErrorMessage = (error: string): string => {
    switch (error) {
      case 'Invalid phone number':
        return '无效的电话号码';
      case 'Invalid OTP':
        return '验证码错误，请重新输入';
      case 'Phone number not found':
        return '该电话号码未注册';
      default:
        return '操作失败，请稍后重试';
    }
  };

  return (
    <form onSubmit={signIn} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4 h-10"
        placeholder="手机号"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4 flex-grow h-10"
          placeholder="验证码"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={getVerificationCode}
          disabled={countdown > 0 || isSendingCode}
          className="bg-indigo-700 rounded-md px-2 py-1 text-foreground mb-4 h-10 text-xs sm:text-sm sm:px-4 sm:py-2 whitespace-nowrap"
        >
          {countdown > 0 ? `${countdown}秒后重试` : isSendingCode ? '发送中...' : '获取验证码'}
        </button>
      </div>
      <button 
        className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2"
        disabled={isLoading}
      >
        {isLoading ? '登录中...' : '登录'}
      </button>
      {toastMessage && <Toast message={toastMessage} />}
    </form>
  );
}

