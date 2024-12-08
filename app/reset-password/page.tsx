import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import { useRouter } from 'next/router';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();
  const router = useRouter();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    router.push('/login');
  }

  const resetPassword = async (event) => {
    'use server';
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.exchangeCodeForSession(
      searchParams.code
    );

    if (error) {
      router.push(`/reset-password?message=无法重置密码,链接过期!`);
      return;
    }

    const { user } = await supabase.auth.getUser(); // 获取用户信息
    const { error: updateError } = await supabase.auth.updateUser(user.id, {
      password,
    });

    if (updateError) {
      console.log(updateError);
      router.push(`/reset-password?message=无法重置密码,请重试!`);
    } else {
      router.push(`/login?message=你的密码已重置,请重新登入`);
    }
  };

  return (
    <div>
      <Header />

      <button
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
        onClick={() => router.push('/')}
      >
        回首页
      </button>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          onSubmit={resetPassword}
        >
          <label className="text-md" htmlFor="password">
            设置新密码
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
