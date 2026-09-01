import { motion } from 'framer-motion';
import { ChartColumnIncreasing, Leaf, Target } from 'lucide-react';
import Icon from '../primitives/Icon';
import Kicker from '../primitives/Kicker';
import LinkCTA from '../primitives/LinkCTA';
import MessageBox from '../primitives/MessageBox';
import type { RetrocessionData, GovernancenData } from '@/types/annualReport2025';
import StaggerContainer from '../primitives/StaggerContainer';
import StaggerItem from '../primitives/StaggerItem';

export default function RetroGovernance({
  retrocession,
  governance,
  onOpenReport,
}: {
  retrocession?: RetrocessionData;
  governance?: GovernancenData;
  onOpenReport?: () => void;
}) {
  const retroItems = (retrocession?.retrocession_cards ?? []).sort((a, b) => a.id - b.id);
  const govItems = (governance?.governance_cards ?? []).sort((a, b) => a.sort_order - b.sort_order);

  const colLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
  }
  const colRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
  }

  return (
    <section
      id="governance"
      aria-labelledby="retro-title"
      className="bg-ar-paper py-8 max-[1080px]:py-8"
      style={{ fontFamily: 'Poppins' }}
    >
      <div className="mx-auto grid max-w-content grid-cols-[1.5fr_1fr] gap-12 px-8 max-[1080px]:grid-cols-1">
        {/* 07 Retrocession */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={colLeft}
        >
          <Kicker title={retrocession?.title} />
          {retrocession?.subtitle && <p className="mb-4 text-3xl font-semibold text-ocre-600">{retrocession.subtitle}</p>}
          {retrocession?.content && <p className="mt-3 max-w-xl">{retrocession.content}</p>}

          <p className="font-ar-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-500">
            {retrocession?.retrocession_cards_title ?? 'Our strategic retrocession framework'}
          </p>
          <style>{`
  #retro-cards {
    border: 1px solid #d1d5db;
    border-radius: 1rem;
    overflow: hidden;
  }
  #retro-cards > * {
    border-right: 1px solid #d1d5db;
    border-bottom: 1px solid #d1d5db;
  }
  #retro-cards > *:nth-child(4n),
  #retro-cards > *:last-child {
    border-right: none;
  }
  #retro-cards > *:last-child {
    border-bottom: none;
  }
  @media (max-width: 1080px) {
    #retro-cards > *:nth-child(4n) {
      border-right: 1px solid #d1d5db;
    }
    #retro-cards > *:nth-child(2n),
    #retro-cards > *:last-child {
      border-right: none;
    }
  }
  @media (max-width: 560px) {
    #retro-cards > * {
      border-right: none;
    }
    #retro-cards > *:nth-child(n+2) {
      border-top: 1px solid #d1d5db;
      border-bottom: none;
    }
  }
`}</style>
          <StaggerContainer staggerDelay={0.06} className="my-8 grid grid-cols-4 max-[1080px]:grid-cols-2 max-[560px]:grid-cols-1" id="retro-cards">
            {retroItems.map((t) => (
              <StaggerItem key={t.id}>
                <motion.div
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col items-center justify-center bg-white p-5 text-center"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-celeste-100 text-primary-500">
                    <Icon name={t.icon} size={32} />
                  </span>
                  <h3 className="mt-3 text-md font-medium uppercase tracking-[0.08em] transition-all duration-200 hover:font-bold">
                    {t.title}
                  </h3>
                  {t.body && <p className="mt-2 text-sm">{t.body}</p>}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {retrocession?.retrocession_message && (
            <MessageBox
              icon={<Target className="h-10 w-10" />}
              className="mt-4"
            >
              {retrocession.retrocession_message}
            </MessageBox>
          )}
        </motion.div>

        {/* 08 Governance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={colRight}
          className="rounded-2xl border border-ar-line p-6"
        >
          <Kicker title={governance?.title} />
          <ul className="mt-4">
            {govItems.map((g) => (
              <motion.li
                key={g.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + g.sort_order * 0.08 }}
                whileHover={{ x: 4 }}
                className="grid grid-cols-[48px_1fr] gap-4 border-b border-ar-line py-5 last:border-b-0"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ar-line text-primary-500">
                  <Icon name={g.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{g.title}</h3>
                  {g.body && <p className="mt-1 text-sm">{g.body}</p>}
                </div>
              </motion.li>
            ))}
          </ul>

          {governance?.governance_message && (
            <MessageBox
              icon={<Leaf className="h-10 w-10" />}
              className="mt-4"
            >
              {governance.governance_message}
            </MessageBox>
          )}
        </motion.div>
      </div>
    </section>
  );
}
