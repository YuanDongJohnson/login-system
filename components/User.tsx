import { createClient } from '@/utils/supabase/server';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function User() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!session) {
    return null; // Or redirect to login page
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
