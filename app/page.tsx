import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-3xl font-bold">Systems Handbook</h1>
      <p className="text-fd-muted-foreground">
        Verified notes on system design and backend engineering, built for learning and revision.
      </p>
      <Link
        href="/docs/about/how-this-handbook-works"
        className="font-medium underline underline-offset-4"
      >
        Open the Handbook →
      </Link>
    </main>
  );
}
