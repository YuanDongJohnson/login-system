'use client';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PhoneLoginForm } from '@/components/PhoneLoginForm';
import { PasswordLoginForm } from '@/components/PasswordLoginForm';
import { useRouter } from 'next/navigation';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [activeTab, setActiveTab] = useState<'phone' | 'password'>('phone');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const getQRcode = async () => {
    if (!supabase) return;
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });
    if (error) {
      alert(error.message);
    } else {
      alert('短信已发送至您的手机中，请注意查收。');
    }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    let { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: verificationCode,
      type: 'sms',
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/text');
    }
  };

  const handlePasswordSubmit = async (formData: FormData) => {
    if (!supabase) return;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/text');
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
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === 'phone'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('phone')}
          >
            验证码
          </button>
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === 'password'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('password')}
          >
            密码
          </button>
        </div>

        {activeTab === 'phone' ? (
          <PhoneLoginForm
            getQRcode={getQRcode}
            signIn={signIn}
            phone={phone}
            setPhone={setPhone}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
          />
        ) : (
          <PasswordLoginForm searchParams={searchParams} onSubmit={handlePasswordSubmit} />
        )}
      </div>
    </div>
  );
}

