'use client';

import { useRef } from "react"
import dynamic from 'next/dynamic'
import { motion } from "framer-motion"
import { ArrowUpIcon, Users, Briefcase, Award } from "lucide-react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import ImageBack from "../common/ImageBack"
import { ICareersContent } from "../../types/careers"
import useScrollAnimation from "../../hooks/useScrollAnimation"
import { fadeInVariants } from "../../utils/animations"
import Loading from "../common/Loading";

const CarrersForm = dynamic(() => import("./CarrersForm"), { ssr: false });

export default function CareersContent({ data }: { data: ICareersContent[] }) {

  const isMobile = useMediaQuery("(max-width: 768px)")
  const section1 = useScrollAnimation(isMobile ? 0.1 : 0.3)
  const section2 = useScrollAnimation(isMobile ? 0.1 : 0.3)
  const section3 = useScrollAnimation(isMobile ? 0.1 : 0.3)
const dataUploaded = data && data.length > 0 ? data : []
  return (
    dataUploaded && dataUploaded.length === 0 ?
      <Loading /> :
      <>
        {/* Building your future section */}
        <section id='why' ref={section1.ref} className="section-container">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={section1.inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-2 bg-secondary-500"></div>
              <ImageBack
                src={dataUploaded[0]?.image || ""}
                alt="professionals working together"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                <span className="relative">
                  {dataUploaded[0]?.title}
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary-500"></span>
                </span>
                <br />
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                {dataUploaded[0]?.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-celeste-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-xl text-gray-800">Opportunities for professional growth</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Who we are section */}
        <section id='who' ref={section2.ref} className="bg-gray-50">
          <div className="section-container">
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={section2.inView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                  <span className="relative">
                    {dataUploaded[1]?.title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary-500"></span>
                  </span>
                </h2>
                <p className="text-xl text-gray-800 mb-8">
                  {dataUploaded[1]?.content}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-celeste-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                  <p className="text-xl text-gray-800">Diverse and collaborative team</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-celeste-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-500" />
                  </div>
                  <p className="text-xl text-gray-800">Culture of excellence and innovation</p>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute -top-4 -right-4 w-24 h-2 bg-secondary-500"></div>
                <ImageBack
                  src={dataUploaded[1].image}
                  alt="team of Active Re"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* What makes us different */}
        <section id='what' ref={section3.ref} className="section-container">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={section3.inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-2 bg-secondary-500"></div>
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <ImageBack
                  src={dataUploaded[2]?.image}
                  alt={dataUploaded[2]?.title || ""}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                <span className="relative">
                  {dataUploaded[2]?.title}
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary-500"></span>
                </span>
                <br />
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                {dataUploaded[2]?.content}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">→</span>
                  <span className="text-md text-gray-800 mb-2">Innovative and customised solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">→</span>
                  <span className="text-md text-gray-800 mb-2">Years of experience in the sector</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">→</span>
                  <span className="text-md text-gray-800 mb-2">Based on trust and integrity</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>
        <section id='team' className="bg-slate-50">
          <CarrersForm />
        </section>
      </>

  )
}