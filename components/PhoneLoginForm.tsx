'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

export function PhoneLoginForm() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const getQRcode = async () => {
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
    }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
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
          onClick={getQRcode}
          disabled={isSendingCode}
          className="bg-indigo-700 rounded-md px-2 py-2 text-foreground mb-4 h-10 w-28 sm:w-32 flex items-center justify-center"
        >
          <span className="text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {isSendingCode ? '发送中...' : '获取验证码'}
          </span>
        </button>
      </div>
      <button 
        className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2"
        disabled={isLoading}
      >
        {isLoading ? '登录中...' : '登录/注册'}
      </button>
      {toastMessage && <Toast message={toastMessage} />}
    </form>
  );
}

