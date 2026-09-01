import { type ReactNode } from 'react';

export default function MessageBox({
  icon,
  children,
  className = '',
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-slate-100 p-6 flex gap-4 justify-between items-center ${className}`}>
      <div className="flex items-center gap-6">
        {icon && <span className="h-10 w-10 shrink-0 text-primary-500">{icon}</span>}
        {/* <p className="max-w-3xl text-sm leading-relaxed text-ar-muted">{children}</p> */}
        <span className="inline" dangerouslySetInnerHTML={{ __html: children as any }}/>
      </div>
    </div>
  );
}
