"use client";
import React from 'react';

type MenuItem = {
  id: string; // used for default href `#id` when href not provided
  label: string;
  icon: React.ReactNode;
  href?: string; // external or custom link
  onClick?: () => void; // optional custom handler
};

interface FloatingMenuProps {
  items: MenuItem[];
  className?: string;
}

/**
 * FloatingMenu
 * - Renders a vertical floating menu fixed to the right side of the viewport.
 * - On hover, the label slides out next to the icon.
 * - Pass items with an id, label and icon (ReactNode). If href is omitted, it will use `#${id}`.
 */
export default function FloatingMenu({ items, className = '' }: FloatingMenuProps) {
  // Helper to build click handlers consistently for both desktop and mobile
  const buildOnClick = (item: MenuItem, isInternal: boolean) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
      return;
    }
    if (!isInternal) return; // custom/external link, let browser handle
    e.preventDefault();
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mobile hamburger sheet state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  //@ts-ignore
  React.useEffect(() => {
    // lock body scroll when open
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop / Tablet (md and up): vertical menu on the right */}
      <nav
        aria-label="Floating menu"
        className={`hidden md:flex fixed right-2 md:pt-12 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 ${className}`}
      >
        {items.map((item) => {
          const isInternal = !item.href && !item.onClick;
          const href = item.href ?? (item.onClick ? '#' : `#${item.id}`);
          const onClick = buildOnClick(item, isInternal);
          return (
            <a
              key={item.id}
              href={href}
              onClick={onClick}
              className="group relative flex items-center justify-end focus:outline-none"
              aria-label={item.label}
            >
              {/* Tooltip label */}
              <span
                className="pointer-events-none absolute right-14 whitespace-nowrap rounded-md bg-white/90 text-slate-900 text-sm font-medium px-3 py-1 shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 will-change-transform"
              >
                {item.label}
              </span>

              {/* Icon button */}
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-cyan-800 shadow-lg ring-1 ring-black/5 transition-colors hover:bg-cyan-700 hover:text-white"
              >
                {item.icon}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile: hamburger trigger and full-screen modal bottom sheet */}
      <nav aria-label="Mobile floating menu" className={`md:hidden fixed inset-x-0 bottom-0 z-30 ${className}`}>
        {/* Floating hamburger button */}
        <div className="pointer-events-none flex items-end justify-end pb-4 pr-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-700 text-white shadow-lg ring-1 ring-black/10 focus:outline-none"
            aria-label="Open menu"
          >
            {/* Hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Overlay and sheet */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            {/* Dim background */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

            {/* Bottom sheet */}
            <div className="absolute inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl bg-white shadow-xl ring-1 ring-black/10">
              {/* Sheet header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h2 className="text-base font-semibold text-slate-900"></h2>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 text-slate-700"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  {/* Close icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Items grid */}
              <div className="no-scrollbar grid grid-cols-2 gap-3 p-4 overflow-y-auto max-h-[calc(80vh-52px)]">
                {items.map((item) => {
                  const isInternal = !item.href && !item.onClick;
                  const href = item.href ?? (item.onClick ? '#' : `#${item.id}`);
                  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    const handler = buildOnClick(item, isInternal);
                    handler(e);
                    setMobileOpen(false);
                  };
                  return (
                    <a
                      key={item.id}
                      href={href}
                      onClick={onClick}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-slate-900 hover:bg-slate-50 active:bg-slate-100"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium leading-tight">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

