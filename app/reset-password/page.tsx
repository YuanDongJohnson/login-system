import { getSupabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { message?: string; code?: string };
}) {
  const resetPassword = async (formData: FormData) => {
    'use server';

    const password = formData.get('password') as string;
    const confirm_password = formData.get('confirmPassword') as string;
    const code = searchParams.code;

    if (!code) {
      console.error('No reset code provided');
      return redirect('/reset-password?message=无效的重置链接');
    }

    if (password !== confirm_password) {
      return redirect('/reset-password?message=两次输入的密码不一致，请重新输入');
    }

    try {
      const supabase = getSupabase();

      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error('Error exchanging code for session:', sessionError);
        return redirect('/reset-password?message=链接过期或无效，无法重置密码');
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        console.error('Error updating password:', updateError);
        return redirect('/reset-password?message=无法重置密码，请稍后再试');
      }

      return redirect('/login?message=你的密码已重置，请登入');
    } catch (error) {
      console.error('Unexpected error during password reset:', error);
      return redirect('/reset-password?message=发生意外错误，请稍后再试');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            重置您的密码
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请输入您的新密码
          </p>
        </div>
        <form className="mt-8 space-y-6" action={resetPassword}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                新密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="新密码"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                确认新密码
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="确认新密码"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              重置密码
            </button>
          </div>
        </form>
        {searchParams?.message && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  {searchParams.message}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="text-sm text-center">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            返回登录页面
          </Link>
        </div>
      </div>
    </div>
  );
}

