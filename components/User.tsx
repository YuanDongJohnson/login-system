import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function User() {
  const supabase = createClient();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const signOut = async (event) => {
      'use server';

      event.preventDefault(); // 阻止表单默认提交行为

      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect('/login');
    };

    return (
      session && (
        <div className="flex items-center gap-4">
          你好,欢迎 {session.user.email}!
          <form onSubmit={signOut}>
            <button
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              type="submit"
            >
              登出
            </button>
          </form>
        </div>
      )
    );
  } catch (error) {
    console.error('Error getting session:', error);
    return <div>无法获取会话信息</div>;
  }
}
