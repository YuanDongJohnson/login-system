
import Header from '@/components/Header/Header';

import { createClient } from '@/utils/supabase/server';

import Link from 'next/link';

import { redirect } from 'next/navigation';



export default async function ResetPassword({

  searchParams,

}: {

  searchParams: { message: string; code: string };

}) {

  const supabase = createClient();



  // 检查用户是否已经登录

  const {

    data: { session },

  } = await supabase.auth.getSession();



  if (!session) {

    return redirect('/login');

  }



  // 检查令牌是否有效

  if (searchParams.code) {

    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);



    if (error) {

      // 如果令牌无效或过期，重定向到登录页面

      return redirect(`/login?message=${encodeURIComponent('无法重置密码。链接已过期或无效！')}`);

    }

  }



  const resetPassword = async (formData: FormData) => {

    'use server';



    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      return redirect('/reset-password?message=' + encodeURIComponent('密码不匹配'));

    }



    const { error } = await supabase.auth.updateUser({

      password,

    });



    if (error) {

      console.log(error);

      return redirect(

        '/reset-password?message=' + encodeURIComponent('无法重置密码。请重试！')

      );

    }



    return redirect(

      '/text?message=' + encodeURIComponent('您的密码已成功重置。请登录。')

    );

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

          action={resetPassword}

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

          <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">

            重置

          </button>



          {searchParams?.message && (

            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">

              {decodeURIComponent(searchParams.message)}

            </p>

          )}

        </form>

      </div>

    </div>

  );

}
