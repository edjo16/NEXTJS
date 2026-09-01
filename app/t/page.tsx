import React from 'react';
import { Metadata } from 'next';
import BusinessCardClient from './BusinessCardClient';

export const metadata: Metadata = {
  title: 'Business Card | Active Re',
  description: 'Contact information for Active Re team members',
  alternates: {
    canonical: 'https://active-re.com/t',
  },
};

export default function BusinessCardPage() {
  return <BusinessCardClient />;
}