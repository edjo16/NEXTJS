'use client';
import React from 'react';
import FinancialCharts from '@/components/finnancial_information/components/FinancialInformation.tsx';
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import { useDataContext } from '@/context/DataContext.tsx';
import AuditedFinancialStatements from '@/components/finnancial_information/components/FinancialStateMents.tsx';
import Rating from '@/components/finnancial_information/Rating.tsx';
import Loading from '@/components/common/Loading.tsx';

const FinancialInformationPage: React.FC = () => {
  const context = useDataContext();
  if (!context) return <div>Error: Context not available</div>;
  const { cache, isLoading } = context;
  if (isLoading) return <Loading />;
  const data = cache?.financialData;

  return (
    <>
      {data === null ?
        <div>No data</div>
        :
        <>
          <div className="relative w-full">
            <BackgroundImage data={data} />
            <section className="container-regular max-w-6xl">
              <FinancialCharts data={data} evolution_capital={data?.evolution_capital} written_premiums={data?.written_premiums} Underwritten_result_ratio={data?.Underwritten_result_ratio} />
              <AuditedFinancialStatements audited_finnancial_statements={data?.audited_finnancial_statements} financial_auditors={data?.financial_auditors} title={data?.audited_financial_statements_title} />
              <Rating data={data?.ranking} image={data?.ranking_image} title={data?.rating_title} />
            </section>
          </div>
        </>
      }
    </>
  );
};

export default FinancialInformationPage;
