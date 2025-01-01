'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';

interface ResetPasswordFormProps {
  resetPassword: (formData: FormData) => Promise<{ error: string | null }>;
  code: string | null;
}

export function ResetPasswordForm({ resetPassword, code }: ResetPasswordFormProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToastMessage(null);
    const formData = new FormData(event.currentTarget);
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setToastMessage(null); // Reset the toast message
      setTimeout(() => setToastMessage('密码不匹配，请重新输入'), 0); // Re-trigger the toast
      return;
    }

    try {
      const { error } = await resetPassword(formData);
      if (error) {
        setToastMessage(error);
      } else {
        router.push('/text?message=' + encodeURIComponent('您的密码已成功重置。请登录。'));
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setToastMessage('重置密码失败，请重试。');
    }
  };

  return (
    <>
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
        <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" type="submit">
          重置
        </button>
      </form>
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}

