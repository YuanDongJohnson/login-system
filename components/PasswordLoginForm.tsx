'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PasswordLoginFormProps {
  searchParams: { message: string };
  signInAction: (formData: FormData) => Promise<{ error: string | null }>;
}

export function PasswordLoginForm({ searchParams, signInAction }: PasswordLoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signInAction(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/text');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('登录失败，请重试。');
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

      {error && (
        <p className="mt-4 p-4 bg-red-100 text-red-600 text-center rounded">
          {error}
        </p>
      )}

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

