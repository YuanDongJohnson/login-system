
'use client';



import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Toast from '@/components/Toast';



interface SignupFormProps {

  signUp: (formData: FormData) => Promise<{ error: string | null }>;

}



export function SignupForm({ signUp }: SignupFormProps) {

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const router = useRouter();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      setToastMessage('密码不匹配，请重新输入');

      return; // 阻止表单进一步提交

    }



    // 清除错误信息，以便进行下一步操作

    setToastMessage(null);



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



      {toastMessage && (

        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      )}

    </>

  );

}
