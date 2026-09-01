'use client';
import React from 'react';
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import CareersContent from '@/components/careers/CarrersContent.tsx';
import { CareersPageData } from '@/types/careers';

interface CarrersProps {
    data: CareersPageData;
}
  const CareersPage: React.FC<CarrersProps> = ({ data }) => {
    if (!data) {
        return <div>No data</div>;
    }

  return (
        <div className="relative w-full">
          <BackgroundImage data={data} />
          <CareersContent data={data?.careers_content} />
        </div>

  );
};

export default CareersPage;
