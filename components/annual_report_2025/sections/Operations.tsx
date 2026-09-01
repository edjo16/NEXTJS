import { motion } from 'framer-motion';
import Icon from '../primitives/Icon';
import Kicker from '../primitives/Kicker';
import ProgressRing from '../charts/ProgressRing';
import LinkCTA from '../primitives/LinkCTA';
import { ChartColumnIncreasing } from 'lucide-react';
import type {
  OperationsData,
} from '@/types/annualReport2025';
import MessageBox from '../primitives/MessageBox';
import StaggerContainer from '../primitives/StaggerContainer';
import StaggerItem from '../primitives/StaggerItem';
import { getAssetUrl } from '@/lib/annual-report/asset';

function fmt(value: number): string {
  return Number.isInteger(value) ? value.toLocaleString('en-US') : value.toString();
}

export default function Operations({data}: {data?: OperationsData;}) {
  const items = (data?.operation_metric ?? [])
    .sort((a, b) => a.sort_order - b.sort_order);
  const cards = (data?.operation_card ?? [])
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section id="operations" aria-labelledby="operations-title" className="bg-white py-8 px-8 max-[1080px]:py-8" style={{ fontFamily: 'Poppins' }}>
      <Kicker title={data?.title} />
      {data?.subtitle && <p className="mb-4 text-3xl font-semibold text-ocre-600">{data.subtitle}</p>}
      <div className="mx-auto max-w-content">
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full"
          />
          <div className="flex flex-wrap items-start gap-8">
            <div className="w-full md:w-[25%] min-w-[220px]">
              {data?.content && <p className="mt-2 text-xl">{data.content}</p>}
            </div>

            <div className="flex-1 min-w-[300px]">
              {items.length > 0 && (
                <StaggerContainer staggerDelay={0.08} className="flex flex-wrap items-stretch justify-center gap-x-10 gap-y-8">
                  {items.map((m) =>
                    m.kind === 'metric' ? (
                      <StaggerItem key={m.id} className="flex w-[110px] flex-col items-center justify-center">
                        <span className="mb-2 text-primary-500">
                          {m.icon_image ? (
                            <img src={getAssetUrl(m.icon_image)} alt={m.label} className="h-16 w-16" />
                          ) : (
                            <Icon name={m.icon} size={32} />
                          )}
                        </span>
                        <p className=" text-xl font-semibold leading-none text-primary-900 ">
                          {fmt(m.value)}
                          {m.unit && <span className="mt-2 text-lg text-primary-900 ">{m.unit}</span>}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-center">
                          {m.label}
                        </p>
                      </StaggerItem>
                    ) : (
                      <StaggerItem key={m.id} className="flex w-[110px] flex-col items-center justify-center">
                        <ProgressRing value={m.value} label={m.label}  size={80} />
                        <span className=" mt-2 text-xs uppercase tracking-wide text-center">
                          {m.label}
                        </span>
                      </StaggerItem>
                    )
                  )}
                </StaggerContainer>
              )}
            </div>
          </div>

          {cards.length > 0 && (
            <StaggerContainer staggerDelay={0.07} className="mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-gray-200 max-[1080px]:grid-cols-2 max-[560px]:grid-cols-1">
              {cards.map((c) => (
                <StaggerItem key={c.id}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-6 h-full flex flex-col"
                  >
                    <span className="inline-flex p-2 h-16 w-16 items-center justify-center rounded-xl bg-primary-500/20 text-primary-500">
                      <Icon name={c.icon} size={28} />
                    </span>
                    <h3 className="mt-4 text-lg font-medium uppercase tracking-[0.1em] text-primary-900">
                      {c.title}
                    </h3>
                    {c.body && <p className="mt-2 text-sm">{c.body}</p>}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
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
          {data?.operations_message}
        </MessageBox>
      </motion.div>
    </section>
  );
}
