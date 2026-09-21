'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import BackgroundImage from '@/components/common/BackgroundImage';
import KeyFinancialIndicators from '@/components/finnancial_information/v2/KeyFinancialIndicators';
import AuditedStatements from '@/components/finnancial_information/v2/AuditedStatements';
import FinancialStrengthRatings from '@/components/finnancial_information/v2/FinancialStrengthRatings';
import type { FinancialInformationPageData } from '@/types/finnancialInformation';

interface FinancialInformationClientProps {
  data: FinancialInformationPageData;
}

const FinancialInformationClient: React.FC<FinancialInformationClientProps> = ({ data }) => {
  return (
    <div className="relative w-full bg-white">
      <BackgroundImage data={data} />

      <section className="container-regular mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center text-lg font-semibold text-secondary-500 transition-colors hover:text-primary-500"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
            Home
          </Link>
        </div>

        <KeyFinancialIndicators data={data} />

        <div className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2">
          <AuditedStatements
            title={data?.audited_financial_statements_title}
            statements={data?.audited_finnancial_statements}
            auditors={data?.financial_auditors}
          />
          <FinancialStrengthRatings
            title={data?.rating_title}
            ratings={data?.ranking}
            image={data?.ranking_image}
          />
        </div>
      </section>
    </div>
  );
};

export default FinancialInformationClient;
