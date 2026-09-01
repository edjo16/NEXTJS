import { cn } from '@/lib/utils';

export default function Kicker({
  title,
  className
}: {
  title?: string;
  className?:string;
}) {
  if (!title) return null;
  return (
    <p
      className={cn(
        'mb-4 text-[14px] font-semibold uppercase tracking-[0.14em]',
        'text-primary-500',
        className
      )}
    >
      {title}
    </p>
  );
}
