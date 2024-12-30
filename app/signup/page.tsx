
import Header from '@/components/Header/Header';

import { createClient } from '@/utils/supabase/server';

import Link from 'next/link';

import { redirect } from 'next/navigation';

import { headers } from 'next/headers';

import Toast from '@/components/Toast';



export default async function Signup({

  searchParams,

}: {

  searchParams: { message: string };

}) {

  const supabase = createClient();



  const {

    data: { session },

  } = await supabase.auth.getSession();



  if (session) {

    return redirect('/text');

  }



  const signUp = async (event) => {

    event.preventDefault(); // 阻止表单默认提交行为



    const formData = new FormData(event.target);

    const origin = headers().get('origin');

    const email = formData.get('email') as string;

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      return Toast.show('密码不匹配', 'error');

    }



    try {

      const { error } = await supabase.auth.signUp({

        email,

        password,

        options: {

          emailRedirectTo: `
{origin}/auth/callback`,

        },

      });



      if (error) {

        return Toast.show('无法注册用户', 'error');

      }



      Toast.show(`请查看邮箱 (
{email}) 以完成注册流程`, 'success');

    } catch (error) {

      Toast.show('注册过程中发生错误', 'error');

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



      {searchParams?.message && (

        <Toast message={decodeURIComponent(searchParams.message)} />

      )}

    </div>

  );

}
