
import Header from '@/components/Header/Header';

import { createClient } from '@/utils/supabase/server';

import Link from 'next/link';

import { useRouter } from 'next/router';

import { useState } from 'react';

import Toast from '@/components/Toast';



export default function Signup({ searchParams }) {

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');



  const supabase = createClient();



  const {

    data: { session },

  } = supabase.auth.getSession();



  if (session) {

    router.push('/text');

    return null; // 确保在认证后不渲染任何内容

  }



  const signUp = async (event) => {

    event.preventDefault(); // 阻止表单默认提交行为



    const formData = new FormData(event.target);

    const email = formData.get('email');

    const password = formData.get('password');

    const confirmPassword = formData.get('confirmPassword');



    if (password !== confirmPassword) {

      setErrorMessage('密码不匹配');

      return;

    }



    const { error } = await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo: window.location.origin + '/auth/callback',

      },

    });



    if (error) {

      setErrorMessage('无法注册用户');

    } else {

      setErrorMessage(`请查看邮箱 (${email}) 以完成注册流程`);

    }

  };



  return (

    <div>

      <Header />

      <Link href="/" className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4">

        回首页

      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">

        <form

          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"

          onSubmit={signUp}

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

        <Link href="/login" className="rounded-md no-underline text-foreground text-sm">

          已经有帐号？去登录

        </Link>

      </div>

      {errorMessage && <Toast message={errorMessage} />}

    </div>

  );

}
