import Header from '@/components/Header/Header';

export default function Confirm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div>
      <Header />

      <div className="w-full px-8 sm:max-w-lg mx-auto mt-8">
        <p className="text-foreground">{decodeURIComponent(searchParams.message)}</p>
      </div>
    </div>
  );
}
