import { fetchContactsData, fetchTeamData } from '@/lib/directus';
import type { Metadata } from 'next';
import type { ContactPageData } from '@/types/contacts';
import type { TeamPageData } from '@/types/team';
import ContactsPageClient from './ContactsPageClient';

export const metadata: Metadata = {
  title: 'Contacts | Active RE',
  description: 'We specialize in delivering top-tier solutions designed to drive excellence, innovation, and measurable results.',
  alternates: {
    canonical: 'https://active-re.com/contacts',
  },
  openGraph: {
    title: 'Contacts | Active RE',
    description: 'We specialise in providing Top Tier solutions',
    type: 'website',
    images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/1bd4e411-4d9e-4ad0-8eb2-8a1929321d53.png?format=webp`,
        width: 1200,
        height: 630,
        alt: 'Contacts',
      },
    ],
  },
}

export default async function ContactPage() {
  try {
    const contactsDataRaw = await fetchContactsData();
    const teamDataRaw = await fetchTeamData();

    const contactsData = Array.isArray(contactsDataRaw) ? contactsDataRaw[0] : contactsDataRaw;
    const teamData = Array.isArray(teamDataRaw) 
      ? (teamDataRaw[0] as TeamPageData) 
      : (teamDataRaw as TeamPageData);

    if (!contactsData) {
      return <div>Error: No contacts data available</div>;
    }

    return (
      <ContactsPageClient 
        contactsData={contactsData as ContactPageData} 
        teamData={teamData?.our_team || []} 
      />
    );
  } catch (error) {
    console.error('Error loading contacts page:', error);
    return <div>Error loading page. Please try again later.</div>;
  }
}

