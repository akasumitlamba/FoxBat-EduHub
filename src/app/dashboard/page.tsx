import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold font-headline">Dashboard Under Construction</h1>
      <p className="text-muted-foreground mt-2">This feature is temporarily unavailable. We're working on it!</p>
      <Link href="/" className="mt-4 text-primary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
