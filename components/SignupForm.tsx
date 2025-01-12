'use client'

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, reloadCaptcha } from 'react-simple-captcha';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { RefreshCw } from 'lucide-react';

interface SignupFormProps {
  signUp: (formData: FormData) => Promise<{ error: string | null }>;
}

const schema = yup.object().shape({
  email: yup.string().email('请输入有效的邮箱地址').required('邮箱是必填项'),
  password: yup.string().min(8, '密码至少8个字符').required('密码是必填项'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], '两次输入的密码必须一致')
    .required('请确认密码'),
  captcha: yup.string().required('请输入验证码')
});

type FormData = yup.InferType<typeof schema>;

export function SignupForm({ signUp }: SignupFormProps) {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmitWithCaptcha = async (data: FormData) => {
    if (!validateCaptcha(data.captcha)) {
      setError('captcha', { type: 'manual', message: '验证码不正确' });
      setToastMessage('验证码不正确，请重新输入');
      return;
    }

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const { error } = await signUp(formData);
      if (error) {
        setToastMessage(error);
      } else {
        setToastMessage(`请查看邮箱 (${data.email}) 以完成注册流程`);
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
        onSubmit={handleSubmit(handleSubmitWithCaptcha)}
      >
        <label className="text-md" htmlFor="email">
          输入电子邮箱
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          {...register('email')}
          placeholder="you@example.com"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="text-md" htmlFor="password">
          输入密码
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          {...register('password')}
          type="password"
          placeholder="••••••••"
          required
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <label className="text-md" htmlFor="confirmPassword">
          确认密码
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          required
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        <label className="text-md" htmlFor="captcha">
          验证码
        </label>
        <div className="flex items-center gap-2 mb-2">
          <LoadCanvasTemplate />
          <button
            type="button"
            onClick={() => reloadCaptcha()}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
          >
            <RefreshCw size={16} />
            刷新验证码
          </button>
        </div>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          {...register('captcha')}
          placeholder="输入验证码"
          required
        />
        {errors.captcha && <p className="text-red-500">{errors.captcha.message}</p>}

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

