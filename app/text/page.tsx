
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

        {/* Header fixed at top with black background */}

<div style={{ position: 'fixed', top: -60px, left: 0, right: 0, zIndex: 1000, background: 'black' }}>

  {/* Content goes here */}

          <Header />

        </div>

        



        {/* Main content with proper spacing */}

        <main className="pt-[200px]">
       <ClientContent />
      
        </main>

          


      </div>

    );

  } catch (error) {

    console.error('Error in TextPage:', error);

    return redirect('/login');

  }

}
