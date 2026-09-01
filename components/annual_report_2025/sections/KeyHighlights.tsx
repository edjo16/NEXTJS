import Stat from '../primitives/Stat';
import Kicker from '../primitives/Kicker';
import StaggerContainer from '../primitives/StaggerContainer';
import StaggerItem from '../primitives/StaggerItem';
import type { KeyHighlightseData, KeyHighlightsCards } from '@/types/annualReport2025';
import MessageBox from '../primitives/MessageBox';
import { ChartNoAxesCombined } from 'lucide-react';

export default function KeyHighlights({ keys }: { keys: KeyHighlightseData }) {
  const cards = keys?.key_highlights_cards ?? [];
  return (
    <section
      id="highlights"
      aria-labelledby={keys.title ? `highlights-title` : undefined}
      className="py-8 max-[720px]:py-8"
      style={{ fontFamily: 'Poppins' }}
    >
      <div className="mx-auto max-w-content px-8">
      <Kicker title={keys.title} />
        <div className="grid grid-cols-1 gap-6">
<style>{`
  #k-cards > * {
    border-right: 1px solid #9ca3af;
  }
  #k-cards > *:nth-child(6n),
  #k-cards > *:last-child {
    border-right: none;
  }
  @media (max-width: 1080px) {
    #k-cards > *:nth-child(6n) {
      border-right: 1px solid #9ca3af;
    }
    #k-cards > *:nth-child(3n),
    #k-cards > *:last-child {
      border-right: none;
    }
  }
  @media (max-width: 720px) {
    #k-cards > * {
      border-right: none;
    }
    #k-cards > *:nth-child(n+3) {
      border-top: 1px solid #9ca3af;
      padding-top: 1rem;
    }
  }
`}</style>
          <StaggerContainer
            id="k-cards"
            staggerDelay={0.06}
            className="grid grid-cols-6 gap-y-8 max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2"
          >
            {cards.map((item: KeyHighlightsCards, i) => (
              <StaggerItem key={item.id ?? i}>
                <Stat data={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      <MessageBox
        icon={<ChartNoAxesCombined className="h-10 w-10" />}
        className="mt-4"
      >
        {keys?.key_highlights_message}
      </MessageBox>
      </div>
    </section>
  );
}
