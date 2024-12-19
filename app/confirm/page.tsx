import Header from '@/components/Header/Header';
import { useEffect } from 'react';

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  useEffect(() => {
    // 设置3秒后跳转到登录页面
    const timer = setTimeout(() => {
      window.location.href = '/login';
    }, 3000);

    // 清除定时器，防止组件卸载后执行跳转
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />

      <div className="w-full px-8 sm:max-w-lg mx-auto mt-8">
        <p className="text-foreground">注册成功！{searchParams.message}</p>
      </div>
    </div>
  );
}
