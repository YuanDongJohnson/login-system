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
        <div className="relative">
          <Header className="w-full" />
          <div className="absolute top-0 right-0 z-20 p-2">
            <User />
          </div>
        </div>
      </div>
      <div className="pt-16 px-4">
        <div className="flex flex-col items-center">
          <Text />
        </div>
      </div>
    </div>
  );
}

