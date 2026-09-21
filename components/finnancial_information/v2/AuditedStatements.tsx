'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronUp, FileText } from 'lucide-react';
import ImageBack from '@/components/common/ImageBack';
import type { FinnancialStatements, financialAuditors } from '@/types/finnancialInformation';
import { groupStatements } from './utils';

interface AuditedStatementsProps {
  title?: string;
  statements?: FinnancialStatements[];
  auditors?: financialAuditors[];
}

const PREVIEW_COUNT = 3;

export default function AuditedStatements({ title, statements, auditors }: AuditedStatementsProps) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const groups = useMemo(() => groupStatements(statements, auditors), [statements, auditors]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!groups.length) return null;

  return (
    <section aria-labelledby="audited-statements" className="h-full rounded-2xl bg-celeste-50 p-5 sm:p-6">
      <h2 id="audited-statements" className="font-serif text-2xl font-semibold text-primary-900">
        {title || 'Audited Financial Statements'}
      </h2>
      <span className="mt-2 block h-1 w-10 rounded-full bg-secondary-500" />
      <p className="mt-3 text-sm text-gray-600">
        Access our audited financial statements and independent auditor&apos;s reports. All figures are presented in US
        dollars unless otherwise stated.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((g, gi) => {
          const isOpen = !!expanded[g.key];
          const visible = isOpen ? g.statements : g.statements.slice(0, PREVIEW_COUNT);
          const hiddenCount = g.statements.length - PREVIEW_COUNT;
          const range = g.firstYear === g.lastYear ? g.lastYear : `${g.firstYear} – ${g.lastYear}`;

          return (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
              className="flex flex-col rounded-xl border border-gray-50 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex min-h-[40px] items-center justify-between gap-3 border-b border-gray-50 pb-3">
                <span className="whitespace-nowrap text-sm font-bold text-primary-900">{range}</span>
                {g.logo ? (
                  <ImageBack
                    src={g.logo}
                    alt={`${g.name} logo`}
                    activeTransition={false}
                    className="h-8 w-24 [&_img]:h-8 [&_img]:w-auto [&_img]:object-contain [&_img]:ml-auto"
                  />
                ) : (
                  <span className="text-sm font-semibold capitalize text-gray-700">{g.name}</span>
                )}
              </div>

              <ul className="flex-1 space-y-1">
                {visible.map((s) => (
                  <li key={s.id ?? s.year}>
                    <a
                      href={`${apiUrl}/assets/${s.audited_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-md px-1 py-1 text-xs text-gray-700 sm:text-sm transition-colors hover:bg-celeste-50 hover:text-primary-500"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-primary-500" aria-hidden />
                      <span>{s.year} Financial Statements</span>
                    </a>
                  </li>
                ))}
                {!isOpen && hiddenCount > 0 && (
                  <li className="px-1 text-xs text-gray-500">… and {hiddenCount} previous year{hiddenCount > 1 ? 's' : ''}</li>
                )}
              </ul>

              {g.statements.length > PREVIEW_COUNT ? (
                <button
                  type="button"
                  onClick={() => setExpanded((e) => ({ ...e, [g.key]: !isOpen }))}
                  aria-expanded={isOpen}
                  className="mt-4 inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-primary-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-500"
                >
                  {isOpen ? 'Show less' : 'View Statements'}
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              ) : (
                <a
                  href={`${apiUrl}/assets/${g.statements[0]?.audited_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-primary-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-500"
                >
                  View Statements
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
