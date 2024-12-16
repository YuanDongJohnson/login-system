import Link from 'next/link';
import Header from '@/components/Header/Header';
import { PhoneLoginForm } from '@/components/PhoneLoginForm';
import { PasswordLoginForm } from '@/components/PasswordLoginForm';
import { signIn as signInAction } from '../action';
import ClientWrapper from '@/components/ClientWrapper';

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
        </ClientWrapper>
      </div>
    </div>
  );
}
