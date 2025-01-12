
// app/components/SignupForm.tsx

'use client';



import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Toast from '@/components/Toast';



interface SignupFormProps {

  signUp: (formData: FormData) => Promise<{ error: string | null }>;

}



export function SignupForm({ signUp }: SignupFormProps) {

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [captchaKey, setCaptchaKey] = useState('');

  const [captchaUrl, setCaptchaUrl] = useState('');

  const [userCaptcha, setUserCaptcha] = useState('');

  const router = useRouter();



  useEffect(() => {

    fetch('/api/captcha')

      .then((response) => response.json())

      .then((data) => {

        setCaptchaKey(data.key);

        setCaptchaUrl(`/api/captcha?
{new Date().getTime()}`); // 添加时间戳防止缓存

      });

  }, []);



  const handleCaptchaChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setUserCaptcha(event.target.value);

  };



  const handleCaptchaRefresh = () => {

    fetch('/api/captcha')

      .then((response) => response.json())

      .then((data) => {

        setCaptchaKey(data.key);

        setCaptchaUrl(`/api/captcha?
{new Date().getTime()}`); // 添加时间戳防止缓存

        setUserCaptcha(''); // 重置用户输入的验证码

      });

  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setToastMessage(null);

    const formData = new FormData(event.currentTarget);

    

    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;



    if (password !== confirmPassword) {

      setToastMessage(null); // 重置 toast 消息

      setTimeout(() => setToastMessage('密码不匹配，请重新输入'), 0); // 重新触发 toast

      return;

    }



    // 验证验证码

    const captchaResponse = await fetch('/api/verifyCaptcha', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify({ key: captchaKey, answer: userCaptcha }),

    });



    const captchaResult = await captchaResponse.json();

    if (!captchaResult.valid) {

      setToastMessage('验证码错误，请重新输入');

      handleCaptchaRefresh(); // 重新生成验证码

      return;

    }



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

        <div className="flex items-center mb-6">

          <img src={captchaUrl} alt="Captcha" className="w-32 h-8" />

          <button

            className="ml-2 text-sm text-indigo-700 hover:underline"

            onClick={handleCaptchaRefresh}

          >

            看不清，换一张

          </button>

        </div>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          type="text"

          name="captcha"

          placeholder="输入验证码"

          value={userCaptcha}

          onChange={handleCaptchaChange}

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



      {toastMessage && <Toast message={toastMessage} />}

    </>

  );

}
