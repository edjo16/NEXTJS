'use client'
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import { useDataContext } from '@/context/DataContext.tsx';
import ComplianceContent from '@/components/compliance/ComplianceContent.tsx';
import Loading from '@/components/common/Loading.tsx';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import { usePathname } from 'next/navigation';

export default function CompliancePage() {
  const pathname = usePathname();
  
  // Canonicalize kyc-due-diligence to compliance
  const canonicalPath = pathname === '/kyc-due-diligence' ? '/compliance' : pathname;
  useCanonicalUrl(canonicalPath);
  
  const context = useDataContext();
  if (!context) return <div>Error: Context not available</div>;
  const { cache, isLoading } = context;
  if (isLoading) return <Loading/>;
  const data = cache?.complianceData;
  return (
    <>
      {data === null ?
        <div>No data</div>
        :
        <>
          <div className="relative w-full">
            <BackgroundImage data={data} />
            <ComplianceContent data={data} title={data?.title_content} />
          </div>
        </>
      }
    </>
  );
}
