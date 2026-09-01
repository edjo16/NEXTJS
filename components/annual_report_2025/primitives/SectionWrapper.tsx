import { cn } from '@/lib/utils';
import Kicker from './Kicker';

export default function SectionWrapper({
  id,
  kickerNum,
  kickerLabel,
  title,
  subtitle,
  content,
  children,
  className,
  headerClassName,
}: {
  id: string;
  kickerNum?: string;
  kickerLabel?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  const hasHeader = Boolean(kickerNum || kickerLabel || title || subtitle || content);
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn(
        'py-24 max-[1080px]:py-16 max-[720px]:py-16',
        'bg-ar-paper text-ar-ink',
        className
      )}
    >
      <div className="mx-auto max-w-content px-6">
        {hasHeader && (
          <header className={cn('mb-10 max-w-3xl', headerClassName)}>
            <Kicker title={title} />
            {title && (
              <h2
                id={`${id}-title`}
                className="font-ar-serif text-[clamp(30px,3.4vw,44px)] font-medium leading-[1.08] tracking-[-0.015em]"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('mt-3 text-[17px] leading-relaxed', 'text-ar-muted')}>
                {subtitle}
              </p>
            )}
            {content && (
              <p className={cn('mt-3 text-[14px] leading-relaxed', 'text-ar-muted')}>
                {content}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
