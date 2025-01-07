
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

<div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'black' }}>

  {/* Content goes here */}

          <Header />

        </div>

        



        {/* Main content with proper spacing */}

        

          <ClientContent />


      </div>

    );

  } catch (error) {

    console.error('Error in TextPage:', error);

    return redirect('/login');

  }

}
