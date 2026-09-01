"use client";

import React from 'react';
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import { InsightsPageData } from '@/types/insights';
import InsightsContent from '@/components/insights/InsightsContent.tsx';

interface InsightsProps {
  data: InsightsPageData;
}

const Insights: React.FC<InsightsProps> = ({ data }) => {
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="relative w-full">
      <BackgroundImage data={data} />
      <InsightsContent data={data} isLoading={false} />
    </div>
  );
};

export default Insights;
