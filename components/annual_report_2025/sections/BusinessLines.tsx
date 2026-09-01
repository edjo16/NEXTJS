'use client';
import { useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import SectionWrapper from '../primitives/SectionWrapper';
import LinkCTA from '../primitives/LinkCTA';
import type { BusinessLineVM } from '@/types/annualReport2025';
import Kicker from '../primitives/Kicker';
import Icon from '../primitives/Icon';
import MessageBox from '../primitives/MessageBox';
import { BriefcaseBusiness } from 'lucide-react';

export interface BusinessLinesHeader {
  kickerNum?: string;
  kickerLabel?: string;
  title?: string;
  subtitle?: string;
  line_message?:string
}

export default function BusinessLines({
  lines,
  header,
  onOpenReport,
}: {
  lines: BusinessLineVM[];
  header?: BusinessLinesHeader;
  onOpenReport?: () => void;
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusTab((active + 1) % lines.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusTab((active - 1 + lines.length) % lines.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTab(lines.length - 1);
    }
  };

  if (lines.length === 0) return null;
  const line = lines[active];

  return (
    <section
      id="lines2025"
      aria-labelledby={header?.title ? `line-title` : undefined}
      className="bg-ar-paper py-8 px-8 text-ar-ink max-[720px]:py-8"
      style={{ fontFamily: 'Poppins' }}
    >
      <div id="k-content">
        <header className="mb-4">
          <Kicker title={header?.title} />
          {header?.title && (
            <p className="mt-2 text-3xl font-semibold text-ocre-600">
              {header.subtitle}
            </p>
          )}
        </header>
      </div>
      <div
        role="tablist"
        aria-label="Business lines"
        onKeyDown={onKey}
        className="inline-flex max-w-full gap-0 overflow-x-auto overflow-y-hidden border-b border-ar-line [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#9ca3af transparent' }}
      >
        {lines && lines.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-sm transition border-b-2 -mb-px relative',
              i === active
                ? 'text-primary-500'
                : 'border-transparent text-ar-muted hover:text-ar-ink'
            )}
          >
            <Icon name={l.icon} size={16} />
            {l.title}
            {i === active && (
              <motion.span
                layoutId="activeTab2025"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          id={`${base}-panel-${active}`}
          aria-labelledby={`${base}-tab-${active}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-8 grid grid-cols-[320px_1fr_1.5fr] gap-8 max-[1080px]:grid-cols-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative min-h-[260px] overflow-hidden bg-ar-navy-900"
          >
            {line.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={line.imageUrl} alt="" className="h-full w-full object-cover" />
            )}
          </motion.div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-primary-500 text-xl"
            >
              {line.title}
            </motion.h3>
            {line.content && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-2 text-ar-muted"
              >
                {line.content}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
            {line && line.cards.map((card, k) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + k * 0.1 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="border-l border-ar-line pl-4 max-[720px]:border-l-0 max-[720px]:pl-0"
              >
                <p className="text-primary-500 text-lg font-semibold">{card.subtitle}</p>
                <p className="mt-1 text-sm">{card.title}</p>
                {card.paragraph && <p className="mt-0.5 text-xs">{card.paragraph}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <MessageBox
        icon={<BriefcaseBusiness className="h-10 w-10" />}
        className="mt-4"
      >
        {header?.line_message}
      </MessageBox>
    </section>
  );
}
