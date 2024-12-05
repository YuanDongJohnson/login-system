import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error, session } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 登录成功，重定向到text页面
      return NextResponse.redirect(new URL('/text', origin).toString());
    }
  }

  // 如果code不存在或者登录失败，重定向到错误页面
  return NextResponse.redirect(new URL('/auth/login-error', origin).toString());
}
