
import Header from '@/components/Header/Header';

import { createClient } from '@/utils/supabase/server';

import Link from 'next/link';

import { headers } from 'next/headers';

import { useState } from 'react'; // 使用 useState 来管理状态

import Toast from '@/components/Toast'; // 确保这是客户端组件



export default function Signup() {

  const [toastMessage, setToastMessage] = useState<string | null>(null);



  const supabase = createClient();



  const {

    data: { session },

  } = await supabase.auth.getSession();



  if (session) {

    return redirect('/text');

  }



  const signUp = async (event: React.FormEvent) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const origin = headers().get('origin');

    const email = formData.get('email') as string;

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      setToastMessage('密码不匹配');

      return;

    }



    // 检查用户是否已存在

    const { data, error: existsError } = await supabase.auth.usersByEmail(email);



    if (data && data.length > 0) {

      setToastMessage('此帐号已注册');

      return;

    }



    if (existsError) {

      setToastMessage('检查用户时发生错误');

      return;

    }



    const { error } = await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo: `
{origin}/auth/callback`,

      },

    });



    if (error) {

      setToastMessage('无法注册用户');

      return;

    }



    setToastMessage(`请查看邮箱 (
{email}) 以完成注册流程`);

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



        <Link

          href="/login"

          className="rounded-md no-underline text-foreground text-sm"

        >

          已经有帐号？去登录

        </Link>

      </div>



      {toastMessage && (

        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      )}

    </div>

  );

}
