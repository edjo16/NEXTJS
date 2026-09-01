'use client';
import { PolicyNavigation } from "@/components/terms_policys/PolicyNavigation"
import React from 'react';
import { useDataContext } from '@/context/DataContext.tsx';
import { PoliciesandTerms } from '@/types/PoliciesandTerms';
import Loading from '@/components/common/Loading.tsx';

const CookiesPage: React.FC = () => {
  const context = useDataContext();
  if (!context) return <div>Error: Context not available</div>;
  const { cache, isLoading } = context;
  if (isLoading) return <Loading />;
  const data: PoliciesandTerms | null = cache?.cookiesData as PoliciesandTerms | null;

  return (
    <>
      {data === null ?
        <div>No data</div>
        :
        <>
          <div className="relative w-full">
            <div className="bg-background-team text-white py-16 min-h-96 ">
              <div className="max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 md:px-0 py-10 felx flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold my-8">{data?.title}</h1>
              </div>
            </div>
            <PolicyNavigation currentPage="cookies" />
            <div className="section-container">
              <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
              <div className="text-lg" dangerouslySetInnerHTML={{ __html: data?.content }} />
            </div>
          </div>
        </>
      }
    </>)
}
export default CookiesPage;
