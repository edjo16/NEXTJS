const LINKS = [
  { label: 'Highlights', href: '#highlights' },
  { label: 'Performance', href: '#performance' },
  { label: 'Business Lines', href: '#business-lines' },
  { label: 'Global', href: '#global' },
  { label: 'Operations', href: '#operations' },
  { label: 'Governance', href: '#governance' },
];

export default function FooterReport({ year }: { year: number }) {
  return (
    <footer className="bg-ar-navy-900 text-white">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-6 py-10">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-white/30 font-ar-serif text-lg">
            A
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.14em]">ACTIVE RE</span>
            <span className="block font-ar-mono text-[9px] uppercase tracking-wide text-white/50">
              Active Capital Reinsurance, Ltd.
            </span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <p className="font-ar-mono text-[11px] uppercase tracking-wide text-white/40">
          © {year} Active Capital Reinsurance, Ltd.
        </p>
      </div>
    </footer>
  );
}
