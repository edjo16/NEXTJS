'use client'

import dynamic from 'next/dynamic'

const DueDiligenceForm = dynamic(
  () => import("@/components/compliance/due-diligence-form"),
  { ssr: false }
)

const KycProviderDynamic = dynamic(
  () => import("@/context/KycContext").then(mod => ({ default: mod.KycProvider })),
  { ssr: false }
)

export default function ComplianceFormClient() {
  return (
    <div className="relative w-full bg-slate-50">
      <div className="relative z-10 h-full">
        <KycProviderDynamic>
          <DueDiligenceForm />
        </KycProviderDynamic>
      </div>
    </div>
  )
}
