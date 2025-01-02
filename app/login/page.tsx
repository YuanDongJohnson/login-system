import Link from 'next/link';
import Header from '@/components/Header/Header';
import { PhoneLoginForm } from '@/components/PhoneLoginForm';
import { PasswordLoginForm } from '@/components/PasswordLoginForm';
import { signIn as signInAction } from '../action';
import ClientWrapper from '@/components/ClientWrapper';
import GoogleSignInButton from '@/components/GoogleSignInButton';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div>
      <Header />
      <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
      >
        回首页
      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <ClientWrapper>
          <PhoneLoginForm />
          <PasswordLoginForm searchParams={searchParams} signInAction={signInAction} />
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">或</span>
            </div>
          </div>
          
          <GoogleSignInButton />
        </ClientWrapper>
      </div>
    </div>
  );
}

