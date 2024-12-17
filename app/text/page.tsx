import Header from '@/components/Header/Header';
import { Text } from '@/components/Text';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import User from '@/components/User';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Text />
        <User style={{ alignSelf: 'flex-end' }} />
      </div>
    </div>
  );
}
