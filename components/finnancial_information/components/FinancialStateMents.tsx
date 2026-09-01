"use client"
import Image from "../../common/ImageBack"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/Accordion"
import { FinnancialStatements, financialAuditors } from "../../../types/finnancialInformation"
import { SubtitleOcre } from "../../ui/subtitle"

export default function AuditedFinancialStatements({ audited_finnancial_statements, financial_auditors, title }: { audited_finnancial_statements: FinnancialStatements[], financial_auditors: financialAuditors[], title: string }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
  const deloitteStatements = audited_finnancial_statements && audited_finnancial_statements.filter((statement: any) => statement?.auditor_name === "deloitte").sort((a: any, b: any) => b.year - a.year) || []
  const pwcStatements = audited_finnancial_statements && audited_finnancial_statements.filter((statement: any) => statement?.auditor_name === "pwc") || []
  const grantThorntonStatements = audited_finnancial_statements && audited_finnancial_statements.filter((statement: any) => statement?.auditor_name === "Grant Thornton") || []
  const deloitteLogo = financial_auditors && financial_auditors.find((auditor: any) => auditor.name === "deloitte")?.image || ""
  const grantThorntonLogo = financial_auditors && financial_auditors.find((auditor: any) => auditor.name === "Grant Thornton")?.image || ""
  const pwcLogo = financial_auditors && financial_auditors.find((auditor: any) => auditor.name === "pwc")?.image || ""
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  }

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col justify-center items-center space-x-2">
          <SubtitleOcre title={title} />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-end ">

        {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8"> */}
          {/* Grant Thornton Section with Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
              <Image
                src={`${grantThorntonLogo}`}
                alt="Grant Thornton logo"
                activeTransition={false}
                className="max-h-16 max-w-52 h-auto w-auto object-contain"
              />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="grant-thorton-statements">
                <motion.div whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.6)" }} className="rounded-lg">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium text-primary-500 hover:no-underline">
                    <motion.div className="flex items-center">
                      <FileText className="mr-3" size={22} />
                      <span className="text-sm md:text-md xl:text-lg" >Financial Statements ({grantThorntonStatements[0]?.year} {grantThorntonStatements.length > 1 ? `- ${grantThorntonStatements[grantThorntonStatements.length - 1]?.year}` : ''})</span>
                    </motion.div>
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent>
                  <motion.div variants={container} initial="hidden" animate="show" className="w-full space-y-2 mt-2">
                    {grantThorntonStatements.map((statement: FinnancialStatements) => (
                      <motion.div
                        key={statement?.year}
                        variants={item}
                        onMouseEnter={() => setHoveredItem(`grant-thorton-${statement?.year}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <a
                          href={`${apiUrl}/assets/${statement?.audited_file}?format=webp&quality=75`}
                          target="_blank"
                          className="flex items-center p-3 ml-8 rounded-lg transition-all duration-300 hover:bg-blue-50 group"
                        >
                          <motion.div
                            animate={{
                              scale: hoveredItem === `grant-thorton-${statement?.year}` ? 1.1 : 1,
                              rotate: hoveredItem === `grant-thorton-${statement?.year}` ? 5 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="text-primary-500"
                          >
                            <FileText size={20} />
                          </motion.div>
                          <span className="ml-3 text-md font-medium text-gray-700 group-hover:text-primary-500">
                            Active Re - Financial Statements {statement?.year}
                          </span>
                          <motion.div
                            animate={{
                              x: hoveredItem === `grant-thorton-${statement?.year}` ? 5 : 0,
                            }}
                            className="ml-auto opacity-0 group-hover:opacity-100 text-primary-500"
                          >
                            →
                          </motion.div>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
          <div className="hidden md:block w-0.5 h-full bg-gray-50 m-auto"></div>

          {/* Deloitte Section with Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
              <Image
                src={`${deloitteLogo}`}
                alt="Deloitte logo"
                activeTransition={false}
                className="max-h-16 max-w-52 h-auto w-auto object-contain"
              />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="deloitte-statements">
                <motion.div whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.6)" }} className="rounded-lg">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium text-primary-500 hover:no-underline">
                    <motion.div className="flex items-center">
                      <FileText className="mr-3" size={22} />
                      <span className="text-sm md:text-md xl:text-lg" >Financial Statements ({deloitteStatements[0]?.year} {deloitteStatements.length > 1 ? `- ${deloitteStatements[deloitteStatements.length - 1]?.year}` : ''})</span>
                    </motion.div>
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent>
                  <motion.div variants={container} initial="hidden" animate="show" className="w-full space-y-2 mt-2">
                    {deloitteStatements.map((statement: FinnancialStatements) => (
                      <motion.div
                        key={statement?.year}
                        variants={item}
                        onMouseEnter={() => setHoveredItem(`deloitte-${statement?.year}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <a
                          href={`${apiUrl}/assets/${statement?.audited_file}?format=webp&quality=75`}
                          target="_blank"
                          className="flex items-center p-3 ml-8 rounded-lg transition-all duration-300 hover:bg-blue-50 group"
                        >
                          <motion.div
                            animate={{
                              scale: hoveredItem === `deloitte-${statement?.year}` ? 1.1 : 1,
                              rotate: hoveredItem === `deloitte-${statement?.year}` ? 5 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="text-primary-500"
                          >
                            <FileText size={20} />
                          </motion.div>
                          <span className="ml-3 text-md font-medium text-gray-700 group-hover:text-primary-500">
                            Active Re - Financial Statements {statement?.year}
                          </span>
                          <motion.div
                            animate={{
                              x: hoveredItem === `deloitte-${statement?.year}` ? 5 : 0,
                            }}
                            className="ml-auto opacity-0 group-hover:opacity-100 text-primary-500"
                          >
                            →
                          </motion.div>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Separation Line */}
          {/* <div className="hidden md:block w-0.5 h-full bg-gray-50 m-auto"></div> */}
          {/* PWC Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
              <Image
                src={`${pwcLogo}`}
                alt="PwC logo"
                activeTransition={false}
                className="max-h-28 max-w-24 h-auto w-auto object-contain"
              />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="deloitte-statements">
                <motion.div whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.6)" }} className="rounded-lg">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium text-orange-500 hover:no-underline">
                    <motion.div className="flex items-center">
                      <FileText className="mr-3" size={22} />
                      <span className="text-sm sm:text-md xl:text-lg" >Financial Statements ({pwcStatements[0]?.year} {pwcStatements.length > 1 ? `- ${pwcStatements[pwcStatements.length - 1]?.year}` : ''})</span>
                    </motion.div>
                  </AccordionTrigger>
                </motion.div>
                <AccordionContent>
                  <motion.div variants={container} initial="hidden" animate="show" className="w-full space-y-2 mt-2">
                    {pwcStatements.map((statement: FinnancialStatements) => (
                      <motion.div
                        key={statement?.year}
                        variants={item}
                        onMouseEnter={() => setHoveredItem(`deloitte-${statement?.year}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <a
                          href={`${apiUrl}/assets/${statement?.audited_file}?format=webp&quality=75`}
                          target="_blank"
                          className="flex items-center p-3 ml-8 rounded-lg transition-all duration-300 hover:bg-orange-50 group"
                        >
                          <motion.div
                            animate={{
                              scale: hoveredItem === `pwc-${statement?.year}` ? 1.1 : 1,
                              rotate: hoveredItem === `pwc-${statement?.year}` ? 5 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="text-orange-500"
                          >
                            <FileText size={20} />
                          </motion.div>
                          <span className="ml-3 text-md font-medium text-gray-700 group-hover:text-orange-600">
                            Active Re - Financial Statements {statement?.year}
                          </span>
                          <motion.div
                            animate={{
                              x: hoveredItem === `pwc-${statement?.year}` ? 5 : 0,
                            }}
                            className="ml-auto opacity-0 group-hover:opacity-100 text-orange-500"
                          >
                            →
                          </motion.div>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
