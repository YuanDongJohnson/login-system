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
      return redirect('/reset-password?message=密码不匹配，请重试');
    }

    const supabase = createClient();

    try {
      if (searchParams.code) {
        const { error } = await supabase.auth.exchangeCodeForSession(
          searchParams.code
        );

        if (error) {
          console.error('Error exchanging code for session:', error);
          return redirect('/reset-password?message=无法重置密码，链接过期!');
        }
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error('Error updating password:', error);
        return redirect('/reset-password?message=无法重置密码，请重试!');
      }

      return redirect('/login?message=你的密码已重置，请重新登入');
    } catch (error) {
      console.error('Unexpected error during password reset:', error);
      return redirect('/reset-password?message=发生意外错误，请重试');
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
            minLength={8}
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
            minLength={8}
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

