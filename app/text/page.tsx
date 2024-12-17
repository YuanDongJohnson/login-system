import Header from '@/components/Header/Header';
import { Text } from '@/components/Text';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import User from '../User';

export default async function TextPage() {
  // 创建 Supabase 客户端实例
  const supabase = createClient();

  // 获取当前会话信息
  const { data: { session } } = await supabase.auth.getSession();

  // 检查用户是否已登录
  if (!session) {
    // 如果未登录，重定向到首页
    return redirect('/login');
  }

  // 用户已登录，渲染页面内容
  return (
    <div>
      <Header />
      {/* 添加一个绝对定位的div来放置User组件，仅向右平移 */}
      <div style={{ position: 'absolute', top: '0', right: '16px', zIndex: 1000 }}>
        <User />
      </div>
      <Text />
    </div>
  );
}
