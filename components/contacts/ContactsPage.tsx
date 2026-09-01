'use client';
import BackgroundImage from '@/components/common/BackgroundImage.tsx';
import { useDataContext } from '@/context/DataContext.tsx';
import { OurTeam } from '@/types/team';
import Loading from '@/components/common/Loading.tsx';
import ContactContent from '@/components/contacts/ContactsContent.tsx';

export default function ContactsPage() {
    const context = useDataContext();
    if (!context) return <div>Error: Context not available</div>;
    const { cache, isLoading } = context;
    if (isLoading) return <Loading />;
    const data = cache?.contactsData;
    const departments = Array.from(new Set(cache?.teamData?.our_team?.map((item: OurTeam) => item.department) ?? [])) as string[];

    return (
        <>
            {data === null ?
                <div>No data</div>
                :
                <>
                    <div className="relative w-full">
                        <BackgroundImage data={data} />
                        <ContactContent data={data} departments={departments} />
                    </div>
                </>
            }
        </>
    );
}
