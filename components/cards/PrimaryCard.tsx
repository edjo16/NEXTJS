import ImageBack from '../common/ImageBack'
import { RegularButton } from '../ui/buttons'
import { JSX } from 'react';
export default function PrimaryCard({
  information_title,
  information_description,
  information_image,
  link,
  isRemote = false
}: {
  information_title: string,
  information_description: string,
  information_image: string,
  link?: string,
  isRemote?: boolean
}): JSX.Element {
  const textOrder = isRemote
    ? "order-1 md:order-2 xs:order-2"
    : "order-2 md:order-1 xs:order-1";
  const imageOrder = isRemote
    ? "order-2 md:order-1 sm:order-1"
    : "order-1 md:order-2 sm:order-2";

  return (
    <>
      {information_title && information_image && (
        <>
          <div className={`flex flex-col justify-center py-8 ${textOrder}`}>
            <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
            <h2 className="text-2xl font-bold mb-8 text-primary-500">{information_title}</h2>
            <p className="text-xl text-gray-800 mb-8">{information_description || ""}</p>
            {link && (
              <RegularButton
                text={`Learn more`}
                link={link}
              />
            )}
          </div>
          <div className={`relative w-full h-80 md:h-auto ${imageOrder}`}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageBack src={information_image} alt={information_title} className="w-full h-full object-cover max-h-80 " />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}