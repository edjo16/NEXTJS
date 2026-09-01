import { ITeamArticles } from "../../../types/insights";
import ImageBack from "../../common/ImageBack"
interface ArticleSectionsProps {
    articleItem: ITeamArticles;
}

const ArticlesDetail: React.FC<ArticleSectionsProps> = ({ articleItem }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex-shrink-0">
                    <ImageBack
                        src={articleItem?.collaborator_image?.filename_disk}
                        alt={articleItem?.collaborator_name}
                        width={180}
                        height={180}
                        className="rounded-sm"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-lg font-semibold">{articleItem?.collaborator_name}</h2>
                    <p className="text-gray-700">{articleItem?.business}</p>
                </div>
            </div>

            <div className="mt-4">
                <div className="relative w-full max-w-3xl overflow-hidden  text-gray-700 font-family-display"
                    dangerouslySetInnerHTML={{ __html: articleItem?.content }}
                />
            </div>            
        </div>
    )
}
export default ArticlesDetail