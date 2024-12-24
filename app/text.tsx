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
      {/* 使用样式将Header固定在顶部 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header />
      </div>
      {/* 为了确保Header不会遮挡页面内容，给页面主体添加padding-top */}
      <div style={{ paddingTop: '60px' }}>
        <Text />
      </div>
    </div>
  );
}
