'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { createClient } from '@/utils/supabase/client';

export default function Signup() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const signUp = async (formData: FormData) => {
    setToastMessage(null);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setToastMessage('密码不匹配');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setToastMessage('无法注册用户');
    } else {
      setToastMessage(`请查看邮箱 (${email}) 以完成注册流程`);
    }
  };

  return (
    <div>
      <Header />

      <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
      >
        回首页
      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            signUp(new FormData(e.currentTarget));
          }}
        >
          <label className="text-md" htmlFor="email">
            输入电子邮箱
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
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
      </div>

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}

