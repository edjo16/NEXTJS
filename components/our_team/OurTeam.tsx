"use client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ChevronDown, Mail, Linkedin, Search } from "lucide-react"
import Image from "next/image"
import type { OurTeam } from "../../types/team"
import { useDepartment } from "../../context/DepartmentContext";
import React, { useEffect, useRef, useState } from 'react';
import ContacFormIndividual from '../../components/contacts/ContactIndividual.tsx';

export default function TeamCards({ data, departments }: { data: OurTeam[], departments: string[] }) {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const orderAll = data && data.sort((a, b) => a.index_all - b.index_all)
  const filterDepartment = data && data.filter((participant) => participant.department === selectedDepartment)
  const orderDepartment = filterDepartment && filterDepartment.sort((a, b) => a.index - b.index)
  // Filtrar por departamento y por nombre
  const filteredParticipants =
    (data && selectedDepartment !== "All" ? orderDepartment : orderAll || [])
      .filter((p, index, self) =>
        index === self.findIndex(obj => obj.name === p.name)
      )
      .filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const formRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (openForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openForm]);
  const handleCardClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const allDepartments = ["All", ...departments];

  return (
    <div className="section-container">
      {/* Search input */}
      <div className="w-full overflow-x-auto md:overflow-x-auto md:overflow-visible thin-scrollbar">
        <div className="flex flex-nowrap h-12 gap-2 mb-6 justify-between min-w-max">
        <div className="left-0 pl-3 flex items-center border border-secondary-500">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search team members..."
          className="block w-full max-w-52 h-11 pl-1 py-2 bg-gray-50 placeholder-gray-500 focus:outline-none 0 transition duration-150 ease-in-out"
        />
        </div>
          {allDepartments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDepartment(dept)}
            className={`whitespace-nowrap overflow-hidden text-sm text-ellipsis px-2 py-2 xl:px-3 md:py-2 transition-colors duration-300 flex items-center ${
              selectedDepartment === dept
                ? "bg-secondary-500 text-white"
                : "border border-orange-700 text-orange-700 italic px-3 2xl:px-6 py-2 flex items-center justify-between hover:border-secondary-500 hover:bg-orange-700 hover:text-white transition"
            }`}
          >
            {dept} <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          ))}
        </div>
      </div>

      {/* Grid for participants */}
      <section className="section-container-top">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <LayoutGroup>
            {filteredParticipants && filteredParticipants.map((participant) => {
              const isExpanded = expandedId === participant.id

              return (
                <motion.div
                  layout
                  layoutId={`card-${participant.id}`}
                  key={participant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 1.2,
                    layout: {
                      type: "tween",
                      stiffness: 150,
                      damping: 20,
                    },
                  }}
                  className={`bg-white pb-2 shadow-md overflow-hidden ${isExpanded ? " row-span-2" : ""}`}
                >
                  <div className={`${isExpanded ? "px-4 pt-4 flex flex-col md:flex-row" : "px-4 pt-2 flex flex-col md:flex-row"}`}>
                    <motion.div
                      layout
                      style={{
                        width: "120px",
                        height: "130px",
                      }}
                    >
                      <motion.img
                        layout
                        layoutId={`image-${participant.id}`}
                        src={`${apiUrl}/assets/${participant?.personal_image}` || "/placeholder.svg"}
                        alt={participant?.name}
                        style={{
                          width: "120px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                        transition={{
                          layout: {
                            duration: 1.8,
                            ease: "easeInOut",
                          },
                        }}
                      />
                    </motion.div>

                    <div
                      className={`md:w-2/3 md:pl-[4px] mt-3 md:mt-0`}
                      style={{ minHeight: 140 }}                    >
                      <motion.div layout className="mb-1">
                        <h3 className="font-medium text-sm">
                          {participant?.name}
                        </h3>
                        <div className="w-full h-0.5 bg-primary-500 mb-1" />
                        <p className="text-gray-600 text-xs leading-snug min-h-[4em]">
                          {participant?.position}
                        </p>
                      </motion.div>

                      {/* Languages */}
                      <motion.div layout className="flex items-start justify-between align-top gap-4 mb-3">
                        {participant?.languages_spoken && (
                          <div>
                            <p className="text-xs font-medium mb-1">Languages</p>
                            <div className="flex flex-wrap gap-1">
                              {participant?.languages_spoken?.length > 0 &&
                                participant.languages_spoken.map((language, index) => (
                                  <Image
                                    key={index}
                                    title={language}
                                    src={`/images/${language}.png`}
                                    alt={language}
                                    width={20}
                                    height={20}
                                    className="w-6 h-6 md:w-5 md:h-5"
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Contact */}
                        <div>
                          <p className="text-xs font-medium mb-1">Contact</p>
                          <div className="flex space-x-2 justify-start">
                            {participant?.email && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser({ name: participant.name, email: participant.email });
                                  setOpenForm(true);
                                }}
                                className="text-primary-500 hover:text-secondary-500 transition-colors duration-300"
                                aria-label={`Contact ${participant.name}`}
                              >
                                <Mail className="w-6 h-6 md:w-5 md:h-5" />
                              </button>
                            )}
                            {participant?.linkedin && (
                              <a
                                href={participant.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-secondary-500 transition-colors duration-300"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-between mt-3"
                          >
                            <p className="text-sm font-medium mb-1"></p>
                            <motion.button
                              layoutId={`button-${participant.id}`}
                              onClick={() => setExpandedId(null)}
                              className="p-1 text-xs text-orange-700 border-b-2 border-transparent  hover:bg-white hover:border-b-secondary-500 transition-colors"
                            >
                              See less
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between mx-4 my-1"
                  >
                    <motion.div layout className={`flex items-center justify-between ${isExpanded ? "-mt-6" : "-mt-2"}`}>
                      {participant?.location?.length > 0 && (
                        <>
                          <span className="w-5 h-5 relative">
                            <Image alt="Stable outlook" fill className="object-top object-cover" src="https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net//assets/cfe60c10-9a92-4247-b487-7a03d23cfc58.svg?format=webp&amp;quality=75" />
                          </span>
                          <div className="flex items-center gap-2">
                            {participant?.location?.map((location, index) => (
                              <div className="flex items-center gap-2 px-1" key={index}>
                                {index >= 1 && <div className="border-l-2 border-gray-200 h-4"></div>}
                                <span className="text-gray-400 text-xs" key={index}>{location}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                    {!isExpanded && (
                      <motion.button
                        layout
                        layoutId={`button-${participant.id}`}
                        onClick={() => handleCardClick(participant?.id)}
                        className="-mt-2 text-xs text-orange-700 border-b-2 border-transparent  hover:bg-white hover:border-b-secondary-500 transition-colors"
                      >
                        See Profile
                      </motion.button>
                    )}
                  </motion.div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="mb-4 px-4 text-xs"
                    >
                      <p className="text-sm font-medium mb-1">Profile</p>
                      <p className="text-gray-700 text-[.75rem]">
                        {participant?.biography || "Biografy is not available."}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </LayoutGroup>
        </div>
      </section>

      {filteredParticipants && filteredParticipants.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Chargin for participants in this department.</p>
        </div>
      )}
      {openForm && (
        <section className="section-container" ref={formRef}>
          <ContacFormIndividual userRef={selectedUser} />
        </section>
      )}
    </div>
  )
}

