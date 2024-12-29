
'use client'



import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

import Link from 'next/link';

import Toast from '@/components/Toast';



export default function Signup() {

  const [message, setMessage] = useState('');

  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  const supabase = createClient();



  const signUp = async (formData: FormData) => {

    const email = formData.get('email') as string;

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      setMessage('密码不匹配');

      setShowToast(true);

      return;

    }



    const { data, error } = await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo: `
{window.location.origin}/auth/callback`,

      },

    });



    if (error) {

      setMessage('无法注册用户');

      setShowToast(true);

    } else if (data) {

      const confirmMessage = encodeURIComponent(`请查看邮箱 (
{email}) 以完成注册流程`);

      router.push(`/confirm?message=${confirmMessage}`);

    }

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

        <form

          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"

          onSubmit={(e) => {

            e.preventDefault();

            signUp(new FormData(e.currentTarget));

          }}

        >

          {/* 表单内容 */}

        </form>



        <Link

          href="/login"

          className="rounded-md no-underline text-foreground text-sm"

        >

          已经有帐号？去登录

        </Link>

      </div>



      {showToast && (

        <Toast message={message} onClose={() => setShowToast(false)} isVisible={showToast} />

      )}

    </div>

  );

}
