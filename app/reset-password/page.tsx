import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { console } from 'console';
import { useRouter } from 'next/navigation';

const resetPassword = async (formData: FormData) => {
  'use server';

  const password = formData.get('password') as string;
  const confirm_password = formData.get('confirmPassword') as string;

  console.log('Password reset attempt initiated');

  // 确认密码是否匹配
  if (password !== confirm_password) {
    console.log('Password mismatch');
    return redirect('/reset-password?message=两次输入的密码不一致，请重新输入');
  }

  try {
    const supabase = createClient();
    
    console.log('Attempting to exchange code for session');
    const { data, error } = await supabase.auth.exchangeCodeForSession(formData.get('code') as string);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return redirect('/reset-password?message=链接过期或无效，无法重置密码');
    }

    console.log('Code exchanged successfully, attempting to update password');
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      console.error('Error updating password:', updateError);
      return redirect('/reset-password?message=无法重置密码，请稍后再试');
    }

    console.log('Password updated successfully');
    return redirect('/login?message=你的密码已重置，请登入');
  } catch (error) {
    console.error('Unexpected error during password reset:', error);
    return redirect('/reset-password?message=发生意外错误，请稍后再试');
  }
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex w-full max-w-2xl flex-col items-center px-6 py-12 space-y-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-foreground">重置密码</h1>
        <p className="text-center text-muted-foreground">请输入新的密码</p>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          action={resetPassword}
        >
          <input type="hidden" name="code" value={searchParams.get('code') || ''} />
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
      </div>
    </div>
  );
}
