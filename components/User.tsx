
import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';



export default async function User() {

  const supabase = createClient();



  // 获取当前会话信息

  const {

    data: { session },

  } = await supabase.auth.getSession();



  // 定义登出函数

  const signOut = async () => {

    await supabase.auth.signOut();

    return redirect('/login');

  };



  // 确定显示的用户名

  let displayName = session?.user?.email || session?.user?.phone || '用户';



  return (

    session && (

      <div className="flex items-center gap-4">

        {session.user.email ? (

          <p>你好, {session.user.email}!</p>

        ) : session.user.phone ? (

          <p>你好, {session.user.phone}!</p>

        ) : (

          <p>你好, {displayName}!</p>

        )}

        <form onSubmit={signOut}>

          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">

            登出

          </button>

        </form>

      </div>

    )

  );

}
