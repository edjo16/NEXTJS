'use client';
import dynamic from 'next/dynamic';
import AddressSection from '../../components/contacts/AddressSection.tsx';
import TeamSection from '../../components/contacts/TeamSection.tsx';
import { motion } from "framer-motion"
import useScrollAnimation from "../../hooks/useScrollAnimation"
import { fadeInVariants } from "../../utils/animations"

const ContactForm = dynamic(() => import('../../components/contacts/ContactForm.tsx'), { ssr: false });

export default function  ContactContent ({data, departments}: {data: any, departments: string[]}) {
    const sectionRef = useScrollAnimation(0.2);
    const teamSection = useScrollAnimation(0.2);
    const contactSection = useScrollAnimation(0.2);

    return (
        <>
            <motion.div
                id='address'
                ref={sectionRef.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={sectionRef.inView ? "visible" : "hidden"}
                className="section-container"
            >
                <AddressSection address={data?.address} title = {data?.address_title} />
            </motion.div>
            <motion.div
                id='our-team'
                ref={teamSection.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={teamSection.inView ? "visible" : "hidden"}
                className="section-container"
            >
                <TeamSection team_image={data?.team_image} departments={departments ? departments : []} />
            </motion.div>
            <motion.div
                id='get-in-touch'
                ref={contactSection.ref}
                variants={fadeInVariants}
                initial="hidden"
                animate={contactSection.inView ? "visible" : "hidden"}
                className="section-container"
            >
                <ContactForm />
            </motion.div>
        </>
    );
};
