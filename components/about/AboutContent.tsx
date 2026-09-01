import YoutubeCard from '../../components/cards/YoutubeCard.tsx';
import Offices from '../../components/about/Offices.tsx';
import ValuesCarousel from '../../components/about/ValuesCarousel.tsx';
import BoardOfDirectors from '../../components/about/BoardOfDirectors.tsx';
import ImageVertical from '../../components/cards/ImageVertical.tsx';
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { fadeInVariants } from "../../utils/animations";
import { AboutUsPageData } from '../../types/about.ts';
import { useMediaQuery } from '../../hooks/useMediaQuery.tsx';
import { RegularButton } from '../ui/buttons'

interface AboutContentProps {
  data: AboutUsPageData;
}

const AboutContent: React.FC<AboutContentProps> = ({ data }) => {
  const videoSection = useScrollAnimation(0.2);
  const brochureSection = useScrollAnimation(0.2);
  const officesSection = useScrollAnimation(0.2);
  const BoardOfDirectorsSection = useScrollAnimation(0.2);
  const board_of_directos = data?.board_of_directos?.slice().sort((a, b) => a.integrant_index - b.integrant_index) || [];
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <>
      <section>
        {/* Brochure Section */}
        <motion.div
          id="growth"
          ref={videoSection.ref}
          variants={fadeInVariants}
          initial="hidden"
          animate={videoSection.inView ? "visible" : "hidden"}
          className="section-container"
        >
          {!isMobile ? (
            <YoutubeCard video_link={data?.video_link} video_title={data?.video_title} video_description={data?.video_description} video_button_content={data?.video_button_content} />
          ) :(
            <section id="offices-content" className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-6 mb-12 md:mb-0">
              <div className="flex flex-col justify-center">
                <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">{data?.video_title}</h2>
                <p className="text-xl text-gray-800 mb-8">{data?.video_description}</p>
                {data?.video_button_content !== '' && <RegularButton text={data?.video_button_content} link={`/our-team`} />}
              </div>
            </section>
          )
          }

        </motion.div>
        {/* Company Offices Section */}
        <motion.div
          ref={officesSection.ref}
          variants={fadeInVariants}
          initial="hidden"
          animate={officesSection.inView ? "visible" : "hidden"}
          className="section-container-top"
        >
          <Offices data={data?.Worldwide_offices} title={data?.Worldwide_offices_title} />
        </motion.div>
        <ValuesCarousel data={data?.our_values} />

        {/* Brochure Section */}
        <motion.div
          id="brochure"
          ref={brochureSection.ref}
          variants={fadeInVariants}
          initial="hidden"
          animate={brochureSection.inView ? "visible" : "hidden"}
          className="section-container"
        >
          <ImageVertical information_title={data?.brochure_section[0].brochure_title} information_description={data?.brochure_section[0].brochure_description} information_image={data?.brochure_section[0].brochure_image} brochure_file={data?.brochure_section[0].brochure_file} />
        </motion.div>
      </section>
      {/* Board of Directors Section */}
      <motion.div
        id="board-of-directors"
        ref={BoardOfDirectorsSection.ref}
        variants={fadeInVariants}
        initial="hidden"
        animate={BoardOfDirectorsSection.inView ? "visible" : "hidden"}
        className="section-container-top"
      >
        <BoardOfDirectors data={board_of_directos} title={data?.board_of_directos_title} />
      </motion.div>
    </>
  );
};

export default AboutContent;