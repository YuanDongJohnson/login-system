
import { GeistSans } from 'geist/font/sans';

import './globals.css';



export const metadata = {

  title: '欢迎来到老吴手工艺品展馆',

  description: '',

};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="zh" className={GeistSans.className}>

      <body className="bg-background text-foreground">

        <main className="min-h-screen">{children}</main>

      </body>

    </html>

  );

}
