import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LinkCTA({
  href = '#',
  children,
  className,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const classes = cn(
    'group inline-flex items-center gap-1.5 font-ar-mono text-[12px] font-medium uppercase tracking-[0.08em] transition-colors',
    'text-ar-navy-700 hover:text-ar-orange-600',
    className
  );

  const inner = (
    <>
      {children}
      <ArrowRight
        size={14}
        className="transition-transform duration-200 group-hover:translate-x-[3px]"
        aria-hidden
      />
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
