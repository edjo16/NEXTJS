'use client';
import BackgroundImage from '@/components/common/BackgroundImage';
import ContactContent from '@/components/contacts/ContactsContent';
import type { ContactPageData } from '@/types/contacts';
import type { OurTeam } from '@/types/team';

interface ContactsPageClientProps {
  contactsData: ContactPageData;
  teamData: OurTeam[];
}

export default function ContactsPageClient({ contactsData, teamData }: ContactsPageClientProps) {
  if (!contactsData) {
    return <div>Loading...</div>;
  }

  const departments = Array.from(new Set(teamData?.map((item: OurTeam) => item.department) ?? [])) as string[];

  return (
    <div className="relative w-full">
      <BackgroundImage data={contactsData} />
      <ContactContent data={contactsData} departments={departments} />
    </div>
  );
}
