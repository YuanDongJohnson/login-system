
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



  // 如果用户未登录，重定向到登录页面

  if (!session) {

    return redirect('/login');

  }



  const resetPassword = async (event: React.FormEvent) => {

    event.preventDefault(); // 阻止表单默认提交行为



    const formData = new FormData(event.currentTarget);

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      // 密码不匹配，重定向并编码中文字符

      return redirect(`/reset-password?message=
{encodeURIComponent('密码不匹配')}`);

    }



    if (searchParams.code) {

      const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);



      if (error) {

        // 如果令牌无效或过期，重定向到登录页面，并编码中文字符

        return redirect(`/reset-password?message=
{encodeURIComponent('无法重置密码。链接已过期或无效！')}`);

      }

    }



    const { error } = await supabase.auth.updateUser({

      password,

    });



    if (error) {

      console.log(error);

      // 无法重置密码，重定向并编码中文字符

      return redirect(`/reset-password?message=
{encodeURIComponent('无法重置密码。请重试！')}`);

    }



    // 密码重置成功，重定向并编码中文字符

    return redirect(`/text?message=
{encodeURIComponent('您的密码已成功重置。请登录。')}`);

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

          onSubmit={resetPassword} // 使用onSubmit事件处理表单提交

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
