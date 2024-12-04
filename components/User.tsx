
'use client'

import { createClient } from '@/utils/supabase/server';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function User() {
  const [session, setSession] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    fetchSession();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!session) {
    return null; // Or a loading indicator
  }

  return (
    <div className="flex items-center gap-4">
      你好,欢迎 {session.user.email}!
      <button 
        onClick={signOut}
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        登出
      </button>
    </div>
  );
}

