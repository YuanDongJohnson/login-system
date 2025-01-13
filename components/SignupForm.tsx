'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { Captcha, validateCaptcha } from '@/components/Captcha';

interface SignupFormProps {
  signUp: (formData: FormData) => Promise<{ error: string | null }>;
}

export function SignupForm({ signUp }: SignupFormProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const router = useRouter();
  const captchaInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToastMessage(null);
    setCaptchaError(null);
    const formData = new FormData(event.currentTarget);
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const captchaInput = formData.get('captcha') as string;

    if (password !== confirmPassword) {
      setToastMessage('密码不匹配，请重新输入');
      return;
    }

    if (!validateCaptcha(captchaInput, captchaText)) {
      setCaptchaError('验证码错误，请重新输入');
      if (captchaInputRef.current) {
        captchaInputRef.current.value = '';
      }
      return;
    }

    try {
      const { error } = await signUp(formData);
      if (error) {
        setToastMessage(error);
      } else {
        const email = formData.get('email') as string;
        setToastMessage(`请查看邮箱 (${email}) 以完成注册流程`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setToastMessage('注册失败，请重试。');
    }
  };

  const handleCaptchaRefresh = () => {
    setCaptchaError(null);
    if (captchaInputRef.current) {
      captchaInputRef.current.value = '';
    }
  };

  return (
    <>
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
        onSubmit={handleSubmit}
      >
        <label className="text-md" htmlFor="email">
          输入电子邮箱
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          输入密码
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <label className="text-md" htmlFor="confirmPassword">
          确认密码
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          required
        />
        <div className="flex items-start mb-6">
          <div className="flex-1 mr-4">
            <label className="text-md" htmlFor="captcha">
              验证码
            </label>
            <input
              ref={captchaInputRef}
              className="rounded-md px-4 py-2 bg-inherit border w-full"
              type="text"
              name="captcha"
              placeholder="输入验证码"
              required
              maxLength={4}
            />
            {captchaError && (
              <p className="text-red-500 text-sm mt-1">{captchaError}</p>
            )}
          </div>
          <div>
            <Captcha onRefresh={handleCaptchaRefresh} />
          </div>
        </div>
        <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
          注册
        </button>
      </form>

      <Link
        href="/login"
        className="rounded-md no-underline text-foreground text-sm"
      >
        已经有帐号？去登录
      </Link>

      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}

