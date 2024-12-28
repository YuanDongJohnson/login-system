
import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const forgotPassword = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    if (error) {
      return redirect('/forgot-password?message=' + encodeURIComponent('无法发送重置密码邮件，请稍后再试。'));
    }

    return redirect('/forgot-password?message=' + encodeURIComponent('重置密码邮件已发送，请查看您的邮箱。'));
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
          action={forgotPassword}
        >
          <label className="text-md" htmlFor="email">
            输入您的电子邮箱
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
            发送重置密码邮件
          </button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {decodeURIComponent(searchParams.message)}
            </p>
          )}
        </form>

        <Link
          href="/login"
          className="rounded-md no-underline text-foreground text-sm"
        >
          返回登录
        </Link>
      </div>
    </div>
  );
}


