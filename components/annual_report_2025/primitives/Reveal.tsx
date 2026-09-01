'use client';
import MotionReveal from './MotionReveal';
import { cn } from '@/lib/utils';

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <MotionReveal direction="up" duration={0.7} className={cn(className)}>
      {children}
    </MotionReveal>
  );
}
