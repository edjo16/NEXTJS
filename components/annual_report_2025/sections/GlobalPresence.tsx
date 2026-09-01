import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../primitives/Icon';
import DonutChart from '../charts/DonutChart';
import { hex } from '../charts/tokens';
import type {
  GlobalPresenceData,
  DistributionRegionRaw,
  RegionVM,
} from '@/types/annualReport2025';
import Kicker from '../primitives/Kicker';
import { Globe } from 'lucide-react';
import MessageBox from '../primitives/MessageBox';
import StaggerContainer from '../primitives/StaggerContainer';
import StaggerItem from '../primitives/StaggerItem';

function mapRegionRawToVM(r: DistributionRegionRaw): RegionVM {
  return {
    name: r.name,
    percentage: r.percentage,
    amount: r.amount_label,
    colorToken: r.color_token,
  };
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="font-ar-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-500">
        {children}
      </h3>
      <span aria-hidden className="mt-2 block h-[3px] w-12 rounded-full bg-ar-orange-500" />
    </div>
  );
}

export default function GlobalPresence({
  data,
  regions,
  onOpenReport,
}: {
  data?: GlobalPresenceData;
  regions?: RegionVM[];
  onOpenReport?: () => void;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

  const regionList: RegionVM[] =
    regions ??
    (data?.distribution_region
      ? [...data.distribution_region]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map(mapRegionRawToVM)
      : data?.regions ?? []);

  const [hoveredRegion, setHoveredRegion] = useState<number | undefined>(undefined);

  const stats = data?.global_stat
    ? [...data.global_stat].sort((a, b) => a.sort_order - b.sort_order)
    : [];

  return (
    <section
      id="global-presence"
      aria-labelledby={data?.title ? `line-title` : undefined}
      className="bg-ar-paper py-8 px-8 text-ar-ink max-[720px]:py-8"
      style={{ fontFamily: 'Poppins' }}
    >
      <Kicker title={data?.title} />
      <div className="grid grid-cols-[2fr_3fr] gap-6 max-[1080px]:grid-cols-1 max-[1080px]:gap-6">
        {/* Content + GWP distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <header className="mb-4">
            {data?.title && (
              <p className="mt-2 text-3xl font-semibold text-ocre-600">
                {data.subtitle}
              </p>
            )}
            {data?.content && (
              <p className="mt-2 text-xl w-auto md:max-w-[330px]">
                {data.content}
              </p>
            )}
          </header>

          <div className="mt-8">
            <SubHeading>{data?.distribution_title}</SubHeading>
            <div className="grid grid-cols-[1.5fr_1fr] items-center gap-2 max-[480px]:grid-cols-1">
              <DonutChart
                regions={regionList}
                total={data?.total_gwp}
                activeIndex={hoveredRegion}
                onActiveChange={setHoveredRegion}
              />
              <StaggerContainer staggerDelay={0.06} as="ul" className="space-y-4">
                {regionList.map((r, i) => {
                  const isHovered = hoveredRegion === i;
                  return (
                    <StaggerItem
                      key={r.name}
                      as="li"
                      className={`flex items-start gap-2.5 text-sm transition-all duration-200 ${isHovered ? 'scale-[1.04]' : ''}`}
                      onMouseEnter={() => setHoveredRegion(i)}
                      onMouseLeave={() => setHoveredRegion(undefined)}
                    >
                      <span
                        className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full transition-all duration-200 ${isHovered ? 'scale-125' : ''}`}
                        style={{ backgroundColor: hex(r.colorToken) }}
                        aria-hidden
                      />
                      <span className="flex flex-col">
                        <span className={`ar-tnum leading-none transition-all duration-200 ${isHovered ? 'text-lg font-extrabold text-ar-ink' : 'text-[15px] font-bold text-ar-ink'}`}>{r.name}</span>
                        {r.amount && (
                          <span className={`font-ar-mono text-[12px] transition-all duration-200 ${isHovered ? 'font-bold text-ar-ink' : 'text-ar-muted'}`}>{r.amount}</span>
                        )}
                      </span>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </motion.div>

        {/* Diversification map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="border border-gray-200 rounded-lg p-6"
        >
          {stats.length > 0 && (
            <div className="flex items-center justify-center mb-6 gap-6 mt-2 pt-8 lg:pt-12 pb-6 flex-wrap">
              {stats.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 pr-6 border-r border-ar-line last:border-r-0 max-[480px]:border-r-0 max-[480px]:pr-0 max-[480px]:w-full"
                >
                  <span className="text-primary-500">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span>
                    <span className="ar-tnum block text-3xl font-semibold leading-none text-primary-500">
                      {s.value}
                    </span>
                    <span className="text-md uppercase tracking-wide">
                      {s.label}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          )}
          {data?.map?.filename_disk && (
            <img
              src={`${apiUrl}/assets/${data.map.filename_disk}?format=webp`}
              alt={data.map.title}
              className="w-full h-auto"
            />
          )}
          {data?.title_map && (
            <p className="mt-4 text-md text-primary-500 font-semibold text-center">{data.title_map}</p>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <MessageBox
          icon={<Globe className="h-10 w-10" />}
          className="mt-4"
        >
          {data?.global_presence_message}
        </MessageBox>
      </motion.div>

    </section>
  );
}
