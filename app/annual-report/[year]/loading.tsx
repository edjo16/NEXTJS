import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-content space-y-10 px-6 py-24">
      <Skeleton className="h-[60vh] w-full rounded-2xl bg-ar-surface2" />
      <Skeleton className="h-40 w-full rounded-2xl bg-ar-surface2" />
      <Skeleton className="h-72 w-full rounded-2xl bg-ar-surface2" />
    </div>
  );
}
