
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Toast from '@/components/Toast';



interface SignupFormProps {

  signUp: (formData: FormData) => Promise<{ error: string | null }>;

}



export function SignupForm({ signUp }: SignupFormProps) {

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);



  const router = useRouter();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setToastMessage(null);

    const formData = new FormData(event.currentTarget);



    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      setToastMessage('密码不匹配，请重新输入');

      setPasswordMismatch(true); // 控制密码不匹配的提示

      return;

    }



    setPasswordMismatch(false); // 重置密码不匹配的状态



    try {

      const { error } = await signUp(formData);

      if (error) {

        setToastMessage(error);

      } else {

        const email = formData.get('email') as string;

        setToastMessage(`请查看邮箱 (${email}) 以完成注册流程`);

      }

    } catch (error) {

      console.error('Signup error:', error);

      setToastMessage('注册失败，请重试。');

    }

  };



  return (

    <>

      <form

        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"

        onSubmit={handleSubmit}

      >

        <label className="text-md" htmlFor="email">

          输入电子邮箱

        </label>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          name="email"

          type="email"

          placeholder="you@example.com"

          required

        />

        <label className="text-md" htmlFor="password">

          输入密码

        </label>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          type="password"

          name="password"

          placeholder="••••••••"

          required

        />

        <label className="text-md" htmlFor="confirmPassword">

          确认密码

        </label>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          type="password"

          name="confirmPassword"

          placeholder="••••••••"

          required

        />

        {passwordMismatch && (

          // 使用 'use client' 确保只在客户端渲染

          <>{' '}

            <p className="text-red-500 text-sm mb-2">

              密码不匹配，请重新输入

            </p>

          </>

        )} 

        <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">

          注册

        </button>

      </form>



      <Link

        href="/login"

        className="rounded-md no-underline text-foreground text-sm"

      >

        已经有帐号？去登录

      </Link>



      {toastMessage && <Toast message={toastMessage} />}

    </>

  );

}
