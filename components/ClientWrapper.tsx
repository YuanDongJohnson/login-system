'use client';

import React, { useState, ReactNode } from 'react';

interface ClientWrapperProps {
  children: [ReactNode, ReactNode];
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [activeTab, setActiveTab] = useState<'phone' | 'password'>('phone');

  // Ensure children is an array with exactly two elements
  if (!Array.isArray(children) || children.length !== 2) {
    console.error('ClientWrapper expects exactly two children');
    return null;
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
