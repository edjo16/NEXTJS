"use client";
import React from 'react';
import { useDataContext } from '@/context/DataContext';
import { PoliciesandTerms } from '@/types/PoliciesandTerms';
import Loading from '@/components/common/Loading';
import { Shield, Lock, Eye, AlertCircle } from "lucide-react"

export default function PrivacyClient() {
  const context = useDataContext();
  
  if (!context) return <div>Error: Context not available</div>;
  const { cache, isLoading } = context;
  
  if (isLoading) return <Loading />;
  
  const data: PoliciesandTerms | null = cache?.privacyData as PoliciesandTerms | null;

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="section-container">
        <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 mt-10">
          <div className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm">
            <Shield className="mb-2 h-8 w-8 text-primary-500" />
            <h3 className="text-sm font-medium">Data Protection</h3>
            <p className="mt-1 text-xs text-gray-500">We comply with all data protection regulations</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm">
            <Lock className="mb-2 h-8 w-8 text-primary-500" />
            <h3 className="text-sm font-medium">Security</h3>
            <p className="mt-1 text-xs text-gray-500">We use advanced security measures</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm">
            <Eye className="mb-2 h-8 w-8 text-primary-500" />
            <h3 className="text-sm font-medium">Transparency</h3>
            <p className="mt-1 text-xs text-gray-500">We clearly explain how we use your data</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm">
            <AlertCircle className="mb-2 h-8 w-8 text-primary-500" />
            <h3 className="text-sm font-medium">Control</h3>
            <p className="mt-1 text-xs text-gray-500">You have control over your personal data</p>
          </div>
        </div>
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
    </>
  );
}
