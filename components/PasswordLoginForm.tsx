
'use client';



import { useState } from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';

import Header from '@/components/Header/Header';

import { createClient } from '@/utils/supabase/server';

import Toast from './Toast'; // 确保 Toast 组件的路径正确



interface PasswordLoginFormProps {

  searchParams: { message: string };

  signInAction: (formData: FormData) => Promise<{ error: string | null }>;

}



export function PasswordLoginForm({ searchParams, signInAction }: PasswordLoginFormProps) {

  const router = useRouter();

  const [toastMessage, setToastMessage] = useState<string | null>(null);



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {

      const result = await signInAction(formData);

      if (result.error) {

        setToastMessage(result.error);

      } else {

        router.push('/text');

      }

    } catch (error) {

      console.error('Login error:', error);

      setToastMessage('登录失败，请重试。');

    }

  };



  return (

    <div>

      <Header />



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



        {toastMessage && (

          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        )}



        {searchParams?.message && (

          <Toast message={decodeURIComponent(searchParams.message)} onClose={() => setToastMessage(null)} />

        )}



        <Link href="/forgot-password" className="text-sm text-indigo-400 text-center mt-2">

          忘记密码

        </Link>

      </form>

    </div>

  );

}
