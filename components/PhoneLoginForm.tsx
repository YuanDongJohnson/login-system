'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

export function PhoneLoginForm() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const getQRcode = async () => {
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });
    if (error) {
      setToastMessage(error.message);
    } else {
      setToastMessage('验证码已发送至您的手机，请注意查收。');
    }
    setShowToast(true);
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: verificationCode,
      type: 'sms',
    });
    if (error) {
      setToastMessage(error.message);
      setShowToast(true);
    } else {
      setToastMessage('验证成功，正在登录...');
      setShowToast(true);
      setTimeout(() => {
        router.push('/text');
      }, 2000);
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
          className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-4 h-10 text-sm"
        >
          获取验证码
        </button>
      </div>
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
        登录/注册
      </button>
      <Toast message={toastMessage} show={showToast} onHide={() => setShowToast(false)} />
    </form>
  );
}

