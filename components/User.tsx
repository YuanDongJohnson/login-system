
import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';



export default async function User() {

  const supabase = createClient();



  // 获取当前会话信息

  const {

    data: { session },

  } = await supabase.auth.getSession();



  // 定义登出函数

  const signOut = async (email, phone) => {

    // 尝试使用邮箱登出

    try {

      await supabase.auth.api.signOut({ email });

    } catch (error) {

      // 如果邮箱登出失败，尝试使用手机号登出

      try {

        await supabase.auth.api.signOut({ phone });

      } catch (error) {

        // 如果两种登出方式都失败，抛出错误

        throw new Error('登出失败，请稍后再试');

      }

    }

    // 登出成功后重定向到登录页面

    return redirect('/login');

  };



  return (

    session && (

      <div className="flex items-center gap-4">

        你好, {session.user.email}!

        <form action={() => signOut(session.user.email, session.user.phone)}>

          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">

            登出

          </button>

        </form>

      </div>

    )

  );

}
