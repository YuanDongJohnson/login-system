import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchParams {
  message?: string;
  code?: string;
}

export default function ResetPassword({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();

  // 检查用户是否已登录，如果已登录则重定向到登录页面
  const { data: sessionData, error: sessionError } = createClient().auth.getSession();
  const session = sessionData?.data?.session || null;

  if (session) {
    router.push('/login');
    return null;
  }

  if (!searchParams.code) {
    router.push('/login');
    return null;
  }

  const resetPassword = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      return router.push(`/reset-password?message=两次输入的密码不一致，请重新输入`);
    }

    const supabase = createClient();
    try {
      const { session: newSession } = await supabase.auth.exchangeCodeForSession(searchParams.code);
      await supabase.auth.updateUser({ password });
      router.push(`/login?message=你的密码已重置，请登录`);
    } catch (error) {
      console.error('重置密码失败:', error);
      router.push(`/reset-password?message=重置密码失败，请再试一次`);
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
        {searchParams.code && (
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
            onSubmit={resetPassword}
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
            <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" type="submit">
              重置密码
            </button>

            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
