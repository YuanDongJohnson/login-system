'use client';
import { useState } from 'react';
import Link from 'next/link';

interface PasswordLoginFormProps {
  searchParams: { message: string };
  onSubmit: (formData: FormData) => Promise<void>;
}

export function PasswordLoginForm({ searchParams, onSubmit }: PasswordLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    await onSubmit(formData);
    setIsLoading(false);
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
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" disabled={isLoading}>
        {isLoading ? '登录中...' : '登录/注册'}
      </button>

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

