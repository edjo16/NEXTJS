import React from 'react';
import { News } from '../../../types/insights';
import { NewsContent } from './NewsContent';
interface NewsSectionsProps {
  newsItem: News;
}

const NewsSections: React.FC<NewsSectionsProps> = ({ newsItem }) => {
  const sections = Array.from({ length: newsItem.number_of_sections }, (_, i) => i + 1);
  const getSectionTypeKey = (sectionNumber: number): string => {
    const sectionNames = ['one', 'two', 'three', 'four', 'five'];
    return `section_${sectionNames[sectionNumber - 1]}_type`;
  };
  return (
    <div className="">
      {sections.map((sectionNumber) => {
        const sectionTypeKey = getSectionTypeKey(sectionNumber); // Get the key
        const sectionType = newsItem[sectionTypeKey as keyof News]; // Use the key to access the value

        const sectionContent = Object.keys(newsItem)
          .filter((key) => key.startsWith(`s${sectionNumber}_`))
          .reduce((acc, key) => {
            acc[key] = newsItem[key as keyof News];
            return acc;
          }, {} as Record<string, any>);

        return (
          <div key={sectionNumber} className="mb-2">
            <NewsContent type={sectionType as string} content={sectionContent} index={sectionNumber} />
          </div>
        );
      })}
    </div>
  );
};

export default NewsSections;