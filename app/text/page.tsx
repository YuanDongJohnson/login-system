import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/Header';
import ClientContent from './ClientContent';

export default async function TextPage() {
  const supabase = createClient();

  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return redirect('/login');
    }

    return (
      <div className="min-h-screen">
        {/* Header with black background but not fixed */}
        <div className="w-full bg-black z-50">
          <Header />
        </div>

        {/* Main content without extra top padding */}
        <main className="pt-4">
          <ClientContent />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error in TextPage:', error);
    return redirect('/login');
  }
}

