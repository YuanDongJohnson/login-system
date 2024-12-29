import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
const Toast = dynamic(() => import('@/components/Toast'), { ssr: false });

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/text');
  }

  const resetPassword = async (formData: FormData) => {
    'use server';

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect('/reset-password?message=' + encodeURIComponent('密码不匹配'));
    }

    if (searchParams.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return redirect(
          '/reset-password?message=' + encodeURIComponent('无法重置密码。链接已过期！')
        );
      }
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
            <Toast message={decodeURIComponent(searchParams.message)} />
          )}
        </form>
      </div>
    </div>
  );
}
