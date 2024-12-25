
import Header from '@/components/Header/Header';

import './globals.css'; // 确保引入了全局CSS文件



export default function Signup({

  searchParams,

}: {

  searchParams: { message: string };

}) {

  return (

    <div className="font-geist">

      <Header />



      <div className="w-full px-8 sm:max-w-lg mx-auto mt-8">

        <p className="text-foreground">{searchParams.message}</p>

      </div>

    </div>

  );

}
