import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 定义searchParams的类型
interface SearchParams {
  message?: string;
  code?: string;
}

export default function ResetPassword({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();

  const {
    data: { session },
  } = createClient().auth.getSession();

  // 如果用户已经登录，直接重定向到登录页面
  if (session) {
    router.push('/login');
    return null; // 防止后续代码执行
  }

  // 检查是否通过正确的方式访问重置密码页面
  // 直接输入网址的用户没有 searchParams.code，因此会被重定向到登录页面
  if (!searchParams.code) {
    router.push('/login');
    return null; // 防止后续代码执行
  }

  const resetPassword = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // 确认密码是否匹配
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
