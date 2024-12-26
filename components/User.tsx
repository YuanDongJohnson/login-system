import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function User() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  // 获取用户标识符（手机号或邮箱）
  const userIdentifier = session?.user.phone || session?.user.email;

  return (
    session && (
      <div className="flex items-center gap-4">
        你好, {userIdentifier}!
        <form action={signOut}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            登出
          </button>
        </form>
      </div>
    )
  );
}

