import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message?: string; code?: string; email?: string };
}) {
  const supabase = createClient();

  // 检查是否有有效的验证码和电子邮件地址
  const isValidResetRequest = () => {
    // 检查是否通过直接输入网址访问页面，即没有code和email参数
    if (!searchParams.code || !searchParams.email) {
      return false;
    }
    // 这里可以添加更多的验证逻辑，例如检查验证码是否过期等
    return true;
  };

  // 如果请求无效或用户已登录，则重定向到登录页面
  if (!isValidResetRequest()) {
    return redirect('/login');
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/login');
  }

  const resetPassword = async (formData: FormData) => {
    'use server';

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      return redirect(`/reset-password?message=两次输入的密码不一致`);
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/reset-password?message=无法重置密码，请再试一次`
      );
    }

    redirect(
      `/login?message=你的密码已重置，请登录`
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
          <label className="text-md" htmlFor="password">
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
            重置密码
          </button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
