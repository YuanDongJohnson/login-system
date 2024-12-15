import React from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode[] }) {
  const [activeTab, setActiveTab] = React.useState<'phone' | 'password'>('phone');

  // 确保 children 不是 null 或 undefined，并且至少有两个元素
  if (!children || children.length < 2) {
    return null; // 或者返回一个错误提示组件
  }

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
      {activeTab === 'phone' ? children[0] : children[1]}
    </>
  );
}
