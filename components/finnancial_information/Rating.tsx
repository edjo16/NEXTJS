import { SubtitleOcre } from "../ui/subtitle";
import { ranking } from "../../types/finnancialInformation";
import ImageBack from "../common/ImageBack";
import { Image as ImageData } from "../../types/types";
import Link from "next/link"
import { TrendingUp, Award, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

// Mock data structure based on your original types
interface RankingData {
    year: number
    financial_strength: string
    credit_rating: string
    certification: string
    link: string
}

interface Image {
    filename_disk: string
}

interface ComponentProps {
    data: RankingData[]
    image: Image
    title: string
}




export default function Component({ data, image, title }: ComponentProps) {
    const ratingData = data && data.sort((a, b) => b.year - a.year) || []

    return (
        <section className="relative section-container py-12">
            <SubtitleOcre title={title} />
            {/* Timeline Layout */}
            <ImageBack
                src={image?.filename_disk}
                alt="Risk Rating"
                activeTransition={false}
                className="w-48 2xl:w-60 mx-auto mb-8"
            />
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 hidden md:block">
                </div>

                <div className="space-y-8">
                    {ratingData && ratingData.map((item, index) => (
                        <div key={item.year} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden md:block z-10"></div>

                            {/* Content Card */}
                            <div className="md:ml-16">
                                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
                                    <CardContent className="p-0">
                                        {/* Year Header */}
                                        <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 text-primary-500 p-2">
                                            <div className="flex justify-between items-center gap-2">
                                                <div className="flex gap-2"><Calendar className="w-4 h-4" /><span className="text-sm font-bold">{item.year}</span></div>
                                            </div>
                                        </div>

                                        {/* Rating Content */}
                                        <div className="p-2">
                                            <div className="grid md:grid-cols-3 gap-6">
                                                {/* Financial Strength */}
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center mb-3">
                                                        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                                                        <h4 className="font-semibold text-gray-700">Financial Strength</h4>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs py-1 px-4 font-bold text-primary-500`}
                                                    >
                                                        {item.financial_strength}
                                                    </Badge>
                                                </div>

                                                {/* Credit Rating */}
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center mb-3">
                                                        <Award className="w-5 h-5 text-gray-600 mr-2" />
                                                        <h4 className="font-semibold text-gray-700">Credit Rating</h4>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs py-1 px-4 font-bold text-primary-500`}
                                                    >
                                                        {item.credit_rating}
                                                    </Badge>
                                                </div>

                                                {/* Certification */}
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center mb-3">
                                                        <Award className="w-5 h-5 text-gray-600 mr-2" />
                                                        <h4 className="font-semibold text-gray-700">Certification</h4>
                                                    </div>
                                                    <Link
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-700 transition-colors duration-200"
                                                    >
                                                        {item.certification}
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
