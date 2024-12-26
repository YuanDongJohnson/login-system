
import { createClient } from '@/utils/supabase/client'; // 使用客户端的 createClient

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'; // 使用 Next.js 的 useRouter



export default function User() {

  const [userIdentifier, setUserIdentifier] = useState<string | null>(null);

  const supabase = createClient();

  const router = useRouter();



  useEffect(() => {

    const getSession = async () => {

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {

        setUserIdentifier(session.user.email || session.user.phone || null);

      }

    };

    getSession();

  }, []);



  const signOut = async () => {

    await supabase.auth.signOut();

    router.push('/login');

  };



  // 检查当前路由是否为重置密码页面

  const isResetPasswordPage = router.asPath.includes('/reset-password');



  return (

    <>

      {!isResetPasswordPage && userIdentifier && (

        <div className="flex items-center gap-4">

          你好, {userIdentifier}!

          <button

            onClick={signOut}

            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"

          >

            登出

          </button>

        </div>

      )}

      {isResetPasswordPage && (

        <p>如果你忘记了密码，请输入你的注册邮箱来重置密码。</p>

      )}

    </>

  );

}
