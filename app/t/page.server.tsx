import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BusinessCard } from "@/components/business_contact/BusinessCard";
import { fetchPersonal } from "@/hooks/UseGetPersonal";

interface PageProps {
  searchParams: Promise<{ p?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const code = params.p;
  
  if (!code) {
    return {
      title: 'Business Card | Active Re',
    };
  }

  try {
    const data = await fetchPersonal(code);
    return {
      title: `${data.name} - Business Card | Active Re`,
      description: `Contact information for ${data.name}`,
    };
  } catch {
    return {
      title: 'Business Card | Active Re',
    };
  }
}

export default async function BusinessCardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const code = params.p;

  if (!code) {
    notFound();
  }

  try {
    const businessCardData = await fetchPersonal(code);

    return (
      <div>
        <BusinessCard
          code={businessCardData?.code ?? ""}
          avatar={businessCardData?.avatar ?? ""}
          business={businessCardData?.business ?? ""}
          country={businessCardData?.country ?? ""}
          department={businessCardData?.department ?? ""}
          linkedin={businessCardData?.linkedin ?? ""}
          name={businessCardData?.name ?? ""}
          phone={businessCardData?.phone ?? ""}
          phone2={businessCardData?.phone2 ?? ""}
          email={businessCardData?.email ?? ""}
          address={businessCardData?.address ?? ""}
          role={businessCardData?.role ?? ""}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading business card:', error);
    notFound();
  }
}
