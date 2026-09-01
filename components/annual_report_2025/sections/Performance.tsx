import { motion } from 'framer-motion';
import Delta from '../primitives/Delta';
import Icon from '../primitives/Icon';
import Kicker from '../primitives/Kicker';
import LinkCTA from '../primitives/LinkCTA';
import MessageBox from '../primitives/MessageBox';
import BarChartGroup from '../charts/BarChartGroup';
import StaggerContainer from '../primitives/StaggerContainer';
import StaggerItem from '../primitives/StaggerItem';
import type { FinancialPerformanceData, FinancialPerformance, FinancialPerformanceSecond, PerfSeriesVM } from '@/types/annualReport2025';
import { ChartColumnIncreasing } from 'lucide-react';

const SERIES_ORDER = ['Net Income', 'Net Written Premium', 'Net Retained Premium'];

function groupByType(raw: FinancialPerformance[]): PerfSeriesVM[] {
  const map = new Map<string, FinancialPerformance[]>();
  for (const item of raw) {
    if (!map.has(item.type)) map.set(item.type, []);
    map.get(item.type)!.push(item);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => {
      const ia = SERIES_ORDER.indexOf(a);
      const ib = SERIES_ORDER.indexOf(b);
      return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
    })
    .map(([label, items]) => {
      const sorted = items.sort((a, b) => a.year - b.year);
      const points = sorted.map((p) => ({
        yearLabel: String(p.year),
        value: Number(p.value),
        isHighlight: p.year === Math.max(...sorted.map((x) => x.year)),
      }));
      const max = sorted.find((p) => p.max != null)?.max ?? Math.max(...points.map((p) => p.value));
      return {
        key: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        unit: 'USD M',
        max,
        points,
      };
    });
}

function Kpi({ kpi }: { kpi: FinancialPerformanceSecond }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-l border-ar-line p-6  max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:pl-0 max-[720px]:pt-4"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ar-surface text-primary-500">
        <Icon name={kpi.icon} size={32} />
      </span>
      <div>
        <p className="font-ar-mono text-[11px] uppercase tracking-[0.1em] text-ar-muted2">
          {kpi.title}
        </p>
        <p className="ar-tnum mt-1 text-[28px] font-semibold text-primary-500">
          {kpi.value}
        </p>
        {kpi.year && (
          <p className="mt-1 font-ar-mono text-[11px] text-ar-muted">
            {kpi.year}
          </p>
        )}
      </div>
      <Delta
        value={`${kpi.growth >= 0 ? '+' : '-'}${Math.abs(kpi.growth)} ${kpi.symbol}`}
        direction={kpi.direction ?? (kpi.growth >= 0 ? 'up' : 'down')}
        className="text-md"
      />
    </motion.div>
  );
}

export default function Performance({
  performance,
  onOpenReport,
}: {
  performance?: FinancialPerformanceData;
  onOpenReport?: () => void;
}) {
  const series = performance ? groupByType(performance.perfomance_view) : [];

  return (
    <section
      id="performance"
      aria-labelledby={performance?.title ? `performance-title` : undefined}
      className="bg-ar-paper py-8 px-8 text-ar-ink max-[720px]:py-8"
      style={{ fontFamily: 'Poppins' }}
    >
      <div className="mx-auto max-w-content">
        <header className="mb-4">
          <Kicker title={performance?.title} />
          {performance?.subtitle && (
            <p className="mt-2 text-3xl font-semibold text-ocre-600">
              {performance.subtitle}
            </p>
          )}
        </header>
        <div className="grid grid-cols-[minmax(180px,1fr)_3fr] gap-8 max-[1080px]:grid-cols-1 max-[1080px]:gap-6">
          <div id="k-content">
            {performance?.content && (
              <p className="mt-2 text-xl w-auto md:max-w-[330px]">
                {performance?.content}
              </p>
            )}
          </div>
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-3 gap-5 max-[1080px]:grid-cols-1">
            {series.map((s) => (
              <StaggerItem key={s.key}>
                <BarChartGroup series={s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {performance && performance.perfomance_view_second?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 grid grid-cols-3 gap-y-6 rounded-2xl border border-ar-line bg-white shadow-sh-sm [&>*:nth-child(3n+1)]:border-l-0 max-[720px]:grid-cols-1 max-[720px]:[&>*:first-child]:border-t-0"
          >
            {performance.perfomance_view_second.map((k, i) => (
              <Kpi key={i} kpi={k} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <MessageBox
            icon={<ChartColumnIncreasing className="h-10 w-10" />}
            className="mt-4"
          >
            {performance?.performance_message}
          </MessageBox>
        </motion.div>
      </div>
    </section>
  );
}
