
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

        <div className="fixed top-0 left-0 right-0 z-50 bg-black">

          <Header />

        </div>

        

        {/* Black line under header */}

        <div className="fixed top-[60px] left-0 right-0 h-[1px] bg-black z-40" />



        {/* Title section fixed below the black line with a gap */}

        <div className="fixed top-[81px] left-0 right-0 bg-[#fff0f7] p-4 z-30">

          <h1 className="text-2xl font-bold text-black">老吳動物模型手工坊</h1>

          <h2 className="text-xl text-black">正宗純手工制造</h2>

        </div>



        {/* Main content with proper spacing */}

        <main className="pt-[160px]">

          <ClientContent />

        </main>

      </div>

    );

  } catch (error) {

    console.error('Error in TextPage:', error);

    return redirect('/login');

  }

}
