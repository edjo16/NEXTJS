import React from 'react';
import { Metadata } from 'next';
import ComplianceFormClient from './ComplianceFormClient';

export const metadata: Metadata = {
  title: 'Compliance Form | Active Re',
  description: 'Due Diligence and KYC Compliance Form',
};

export default function ComplianceFormPage() {
  return <ComplianceFormClient />;
}
