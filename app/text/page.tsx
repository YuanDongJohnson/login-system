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
    <div style={{ position: 'relative' }}> {/* 设置一个相对定位的容器 */}
      <div style={{ position: 'fixed', top: '0', right: '0', zIndex: '9999' }}> {/* 设置固定定位的div，位于页面最上层 */}
        <Header style={{ width: '100%' }} /> {/* 设置Header宽度为100% */}
        <User style={{ position: 'absolute', top: '0', right: '0' }} /> {/* User组件定位在Header的右边 */}
      </div>
      <Text />
    </div>
  );
}
