'use client';
import { useState } from 'react';
import { signIn } from '../actions'; // 确保路径正确
import Link from 'next/link';

interface PasswordLoginFormProps {
  searchParams: { message: string };
}

export function PasswordLoginForm({ searchParams }: PasswordLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      await signIn(formData);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={handleSignIn}
    >
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        type="email"
        name="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        type="password"
        name="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" type="submit">
        登录/注册
      </button>
      {errorMessage && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {errorMessage}
        </p>
      )}
      <Link
        href="/forgot-password"
        className="text-sm text-indigo-400 text-center mt-2"
      >
        <a>忘记密码</a>
      </Link>
    </form>
  );
}
