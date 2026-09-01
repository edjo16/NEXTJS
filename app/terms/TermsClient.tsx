"use client";
import React from 'react';
import { useDataContext } from '@/context/DataContext';
import { PoliciesandTerms } from '@/types/PoliciesandTerms';
import Loading from '@/components/common/Loading';

export default function TermsClient() {
  const context = useDataContext();
  
  if (!context) return <div>Error: Context not available</div>;
  const { cache, isLoading } = context;
  
  if (isLoading) return <Loading />;
  
  const data: PoliciesandTerms | null = cache?.termsData as PoliciesandTerms | null;

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="section-container">
      <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
      <div className="text-lg" dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
}
