import ImageBack from '../common/ImageBack'
import { RegularButton } from '../ui/buttons'
import { JSX } from 'react';

export default function CardInverse({ information_title, information_description, information_image, link }:
    { information_title: string, information_description: string, information_image: string, link?: string }): JSX.Element {
    return (
        <>
            {information_title && information_image && (
                <>
                    <div className="relative w-full h-64 md:h-auto">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <ImageBack src={information_image} alt={information_title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center py-8">
                        <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
                        <h2 className="text-2xl font-bold mb-4 text-primary-500">{information_title}</h2>
                        <p className="text-gray-800 mb-4">{information_description || ""}</p>
                        {link && (
                            <RegularButton
                                text={`Learn more`}
                                link={link}
                            />
                        )}
                    </div>
                </>
            )}
        </>)
}

