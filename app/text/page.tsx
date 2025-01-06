import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/Header';
import ClientContent from './ClientContent';

export default async function TextPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-[60px] left-0 right-0 bg-[#fff0f7] p-4 z-40 text-center">
        <h1 className="text-2xl font-bold text-black">老吳動物模型手工坊</h1>
        <h2 className="text-xl text-black">正宗純手工制造</h2>
      </div>
      <main className="pt-[140px]">
        <ClientContent />
      </main>
    </div>
  );
}

