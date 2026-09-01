"use client"
import TeamCards from '@/components/our_team/OurTeam';
import { OurTeam, TeamPageData } from '@/types/team';

interface TeamProps {
    data: TeamPageData;
}
const OurTeamPage: React.FC<TeamProps> = ({ data }) => {
    if (!data) {
        return <div>No data</div>;
    }

    const departments = Array.from(new Set(data?.our_team?.map((item: OurTeam) => item.department).filter(Boolean) ?? [])) as string[];

    return (
            <div className="bg-gray-50 min-h-screen">
                <div className="bg-background-team text-white py-16 min-h-96 ">
                    <div className="max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 md:px-0 py-10 felx flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold my-8">{data?.title}</h1>
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                            {data?.content}
                        </p>
                    </div>
                </div>
                <div className="relative w-full">
                    <TeamCards data={data?.our_team} departments={departments} />
                </div>
            </div>
    );
}

export default OurTeamPage
