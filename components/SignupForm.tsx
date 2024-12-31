
'use client';



import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Toast from '@/components/Toast'; // 确保这是正确的路径



interface SignupFormProps {

  signUp: (formData: FormData) => Promise<{ error: string | null }>;

}



export function SignupForm({ signUp }: SignupFormProps) {

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({

    email: '',

    password: '',

    confirmPassword: '',

  });

  const router = useRouter();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const { email, password, confirmPassword } = formValues;



    if (password !== confirmPassword) {

      setToastMessage('密码不匹配，请重新输入');

      setFormValues({ ...formValues, password: '', confirmPassword: '' }); // 重置密码字段

      return; // 阻止表单提交

    }



    try {

      const { error } = await signUp(new FormData([event.currentTarget]));

      if (error) {

        setToastMessage(error);

      } else {

        const email = formValues.email;

        setToastMessage(`请查看邮箱 (${email}) 以完成注册流程`);

      }

    } catch (error) {

      console.error('Signup error:', error);

      setToastMessage('注册失败，请重试。');

    }

  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });

  };



  useEffect(() => {

    if (!toastMessage) return;

    const timer = setTimeout(() => {

      setToastMessage(null);

      setFormValues({ email: formValues.email, password: '', confirmPassword: '' });

    }, 3300);



    return () => {

      clearTimeout(timer);

    };

  }, [toastMessage, formValues.email]);



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

          value={formValues.email}

          onChange={handleChange}

          required

        />

        <label className="text-md" htmlFor="password">

          输入密码

        </label>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          name="password"

          type="password"

          placeholder="••••••••"

          value={formValues.password}

          onChange={handleChange}

          required

        />

        <label className="text-md" htmlFor="confirmPassword">

          确认密码

        </label>

        <input

          className="rounded-md px-4 py-2 bg-inherit border mb-6"

          name="confirmPassword"

          type="password"

          placeholder="••••••••"

          value={formValues.confirmPassword}

          onChange={handleChange}

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
