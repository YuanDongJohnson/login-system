'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/Toast';

interface PasswordLoginFormProps {
  searchParams: { message: string };
  signInAction: (formData: FormData) => Promise<{ error: string | null }>;
}

export function PasswordLoginForm({ searchParams, signInAction }: PasswordLoginFormProps) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToastMessage(null);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signInAction(formData);
      if (result.error) {
        setToastMessage(getChineseErrorMessage(result.error));
      } else {
        router.push('/text');
      }
    } catch (error) {
      console.error('Login error:', error);
      setToastMessage('登录失败，请再次确认帐号密码！');
    }
  };

  const getChineseErrorMessage = (error: string): string => {
    switch (error) {
      case 'Invalid credentials':
        return '用户名或密码错误';
      case 'User not found':
        return '用户不存在';
      default:
        return '登录失败，请重试';
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={handleSubmit}
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
        登录
      </button>

      {toastMessage && <Toast message={toastMessage} />}

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}

      <Link href="/forgot-password" className="text-sm text-indigo-400 text-center mt-2">
        忘记密码
      </Link>
    </form>
  );
}

