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
    <div style={{ position: 'relative' }}> {/* 确保父容器是相对定位 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}> {/* 一个覆盖整个屏幕的层 */}
        <Header />
      </div>
      <User style={{ position: 'fixed', top: '20px', right: '20px', zIndex: -1 }} /> {/* User组件在最底层 */}
      <div style={{ position: 'relative', zIndex: 2 }}> {/* 确保Text组件在User组件之上 */}
        <Text />
      </div>
    </div>
  );
}
