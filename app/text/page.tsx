import Header from '@/components/Header/Header';
import { Text } from '@/components/Text';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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
      <Header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        backgroundColor: '#fff', // 可以根据需要调整背景颜色
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // 可以根据需要调整阴影效果
      }} />
      <Text />
    </div>
  );
}
