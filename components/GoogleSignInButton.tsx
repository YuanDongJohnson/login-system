'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google Sign In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full bg-red-600 text-white rounded-md px-4 py-2 text-foreground mb-2 hover:bg-red-700 transition-colors"
    >
      {isLoading ? '登录中...' : '使用谷歌账号登录'}
    </button>
  );
}

