"use client";
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from "framer-motion"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { IComplianceContent } from "../../types/compliance"
import useScrollAnimation from "../../hooks/useScrollAnimation"
import { fadeInVariants } from "../../utils/animations"
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button.tsx';
import Imageback from '../../components/common/ImageBack.tsx';

const ContacFormCompliance = dynamic(() => import('./ContacFormCompliance.tsx'), { ssr: false });

interface ComplianceContentProps {
    data: IComplianceContent;
    title: string;
}

export default function ComplianceContent({ data, title }: ComplianceContentProps) {    
    const isMobile = useMediaQuery("(max-width: 768px)")
    const section1 = useScrollAnimation(isMobile ? 0.1 : 0.3)
    const section2 = useScrollAnimation(isMobile ? 0.1 : 0.3)
    const section3 = useScrollAnimation(isMobile ? 0.1 : 0.3)
    const [openForm, setOpenForm] = useState(false);

    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openForm && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [openForm]);
    return (
        <>
            <section id='culture' ref={section1.ref} className="section-container">
                <div className='flex gap-8'>
                    <div>
                        <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
                        <h2 className="text-primary-500 text-3xl font-semibold border-orange-400 inline-block pb-1 mb-6">
                            {title}
                        </h2>
                    </div>
                </div>
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate={section1.inView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-12"
                >
                    <div className="text-md md:text-md 2xl:text-xl text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data?.body_content }} />
                    <div className="text-md md:text-md 2xl:text-xl text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data?.second_body_content }} />
                </motion.div>
            </section>
            <section id='kyc' ref={section2.ref} className="bg-gray-50">
                <div className="section-container">
                    <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        animate={section2.inView ? "visible" : "hidden"}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 md:order-1">
                            <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
                            <h2 className="text-primary-500 text-2xl font-semibold border-orange-400 inline-block pb-1 mb-4">
                                {data?.form_title || ""}
                            </h2>
                            <div className="text-md md:text-md 2xl:text-xl text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data?.form_content }} />
                            <Link href="/compliance-form" className="inline-block">
                                <Button
                                    size="lg"
                                    className="text-white bg-orange-500 hover:bg-orange-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {data?.form_button}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            <Imageback src={data?.form_image?.filename_disk} alt="KYC Compliance Diagram" activeTransition={false} />
                        </div>
                    </motion.div>
                </div>
            </section>
            <section id='contact' ref={section3.ref} className="section-container">
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate={section3.inView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <div className=" relative">
                        <Imageback
                            src={data?.contact_image?.filename_disk}
                            alt="KYC Compliance Diagram"
                            className="max-w-full h-auto"
                            activeTransition={false}
                        />
                    </div>
                    <div>
                        <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
                        <h2 className="text-primary-500 text-2xl font-semibold border-orange-400 inline-block pb-1 mb-4">
                        {data?.contact_name}
                        </h2>
                        <div className="text-md md:text-md 2xl:text-xl text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data?.contact_content }} />
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button
                                size="lg"
                                className="text-white bg-orange-500 hover:bg-orange-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => setOpenForm(prev => !prev)}
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                Get Support
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>
            {openForm && (
              <section className="section-container" ref={formRef}>
                <ContacFormCompliance />
              </section>
            )}
        </>
    )
}
