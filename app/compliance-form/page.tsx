import React from 'react';
import { Metadata } from 'next';
import ComplianceFormClient from './ComplianceFormClient';

export const metadata: Metadata = {
  title: 'Compliance Form | Active Re',
  description: 'Due Diligence and KYC Compliance Form',
  alternates: {
    canonical: 'https://active-re.com/compliance-form',
  },
};

export default function ComplianceFormPage() {
  return <ComplianceFormClient />;
}
