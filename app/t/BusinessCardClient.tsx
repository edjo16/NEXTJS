"use client"
import { useBusinessCardData } from "@/hooks/useBusinessCardData";
import Loading from "@/components/common/Loading";
import { useSearchParams } from "next/navigation";
import {BusinessCard} from "@/components/business_contact/BusinessCard";
import { Suspense } from "react";

function BusinessCardContent() {
  const searchParams = useSearchParams();
  const p = searchParams.get('p') ?? undefined;
  const { businessCardData, isLoading, notFound } = useBusinessCardData(p);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>;
  }

  if (notFound) {
    return <div className="flex justify-center items-center h-screen">
      <h1>404 Not Found</h1>
    </div>;
  }

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
}

export default function BusinessCardClient() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loading /></div>}>
      <BusinessCardContent />
    </Suspense>
  );
}
