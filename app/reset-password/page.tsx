import { getSupabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { message: string; code: string };
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
      <div className="flex w-full max-w-2xl flex-col items-center px-6 py-12 space-y-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-foreground">重置密码</h1>
        <p className="text-center text-muted-foreground">请输入新的密码</p>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          action={resetPassword}
        >
          <label htmlFor="password" className="text-sm font-medium">
            密码
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="请输入密码"
            required
          />
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            确认密码
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="请再次输入密码"
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            重置密码
          </button>
        </form>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}

