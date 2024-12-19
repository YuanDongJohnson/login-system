import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchParams {
  message?: string;
  code?: string;
}

// 定义Session类型和AuthError类型，根据实际的类型定义
type Session = any; // 请替换为实际的Session类型
type AuthError = any; // 请替换为实际的AuthError类型

export default function ResetPassword({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();

  // 使用async/await来等待Promise解析完成
  const handleSession = async () => {
    const sessionOrError = await createClient().auth.getSession();
    if ('data' in sessionOrError && sessionOrError.data.session) {
      return sessionOrError.data.session;
    } else if ('error' in sessionOrError && sessionOrError.error) {
      console.error(sessionOrError.error);
      router.push(`/reset-password?message=登录发生错误`);
      return null;
    }
    return null;
  };

  // 等待session解析完成
  const session = handleSession();

  // 使用useEffect来处理session的检查和重定向
  useEffect(() => {
    if (session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!searchParams.code) {
    router.push('/login');
    return null; // 防止后续代码执行
  }

  const resetPassword = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      return router.push(`/reset-password?message=两次输入的密码不一致，请重新输入`);
    }

    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);

    if (error) {
      return router.push(`/reset-password?message=链接过期,无法重置密码`);
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      console.log(updateError);
      return router.push(`/reset-password?message=无法重置密码,再试一次`);
    }

    router.push(`/login?message=你的密码已重置,请登入`);
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
        {searchParams.code ? (
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
        ) : (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            您没有权限访问此页面。请通过电子邮件提供的链接访问。
          </p>
        )}
      </div>
    </div>
  );
}

// 使用useEffect钩子
import { useEffect } from 'react';

const useCheckSession = (session, router) => {
  useEffect(() => {
    if (session) {
      router.push('/login');
    }
  }, [session, router]);
};
