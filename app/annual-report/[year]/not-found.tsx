import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-gray-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Annual Report not available</h1>
      <p className="mt-2 max-w-md text-gray-600">
        The report you are looking for does not exist or has not been published yet.
      </p>
      <Link
        href="/annual-report"
        className="mt-6 inline-flex items-center rounded-full bg-primary-500 px-5 py-2.5 text-sm font-medium text-white"
      >
        Go to the latest report
      </Link>
    </div>
  );
}
