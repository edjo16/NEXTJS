"use client";
import React from 'react';
import OptionsLines from '@/components/lines_of_business/OptionsLines';
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import { LinesOfBusinessPageData } from '@/types/lineOfBusiness';
interface LinesOfBusinessProps {
  data: LinesOfBusinessPageData;
}
const LinesOfBusinessClient: React.FC<LinesOfBusinessProps> = ({ data }) => {

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="relative w-full">
      <BackgroundImage data={data} />
      <section className="container-regular max-w-6xl">
        <OptionsLines linesOptions={data?.line_of_business_options} />
      </section>
    </div>
  );
}
export default LinesOfBusinessClient;
