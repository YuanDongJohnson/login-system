'use client'

import { useState } from 'react';
import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Toast = dynamic(() => import('@/components/Toast'), { ssr: false });

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  // const supabase = createClient(); // Moved supabase client creation inside resetPassword function

  const resetPassword = async (formData: FormData) => {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return { error: '密码不匹配' };
    }

    if (searchParams.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return { error: '无法重置密码。链接已过期！' };
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return { error: '无法重置密码。请重试！' };
    }

    router.push('/text?message=' + encodeURIComponent('您的密码已成功重置。请登录。'));
    return {};
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await resetPassword(formData);
    if (result?.error) {
      setErrorMessage(result.error);
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
            handleSubmit(new FormData(e.currentTarget));
          }}
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
          <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
            重置
          </button>
          {(errorMessage || searchParams?.message) && (
            <Toast message={errorMessage || decodeURIComponent(searchParams.message)} />
          )}
        </form>
      </div>
    </div>
  );
}

