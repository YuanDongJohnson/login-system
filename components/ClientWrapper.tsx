import React from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState<'phone' | 'password'>('phone');

  // 定义两个状态来存储子组件
  const [phoneComponent, setPhoneComponent] = React.useState<React.ReactNode>(null);
  const [passwordComponent, setPasswordComponent] = React.useState<React.ReactNode>(null);

  // 克隆 children 并分配到两个状态中
  React.useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      if (index === 0) {
        setPhoneComponent(child);
      } else if (index === 1) {
        setPasswordComponent(child);
      }
    });
  }, [children]);

  return (
    <>
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
      {activeTab === 'phone' && phoneComponent}
      {activeTab === 'password' && passwordComponent}
    </>
  );
}
