import Header from '@/components/Header/Header';
import { Text } from '@/components/Text';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import User from '../User';

export default async function TextPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header className="w-full" />
      </div>
      <div className="fixed top-4 right-4 z-20">
        <User />
      </div>
      <div className="pt-16">
        <Text />
      </div>
    </div>
  );
}

