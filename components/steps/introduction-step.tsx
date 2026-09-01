"use client"

import { useState, useRef } from "react"
import { FileText, FileUpIcon, RefreshCcw, FileDown, Mail, ChevronRight, ChevronDown } from "lucide-react"

interface SectionItem {
  label: string
  items?: string[]
}

interface SectionProps {
  number: number
  title: string
  content: SectionItem[]
  note?: string
}

function SectionBlock({ number, title, content, note }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(false)
  }

  return (
    <div
      className="border border-gray-100 rounded-lg overflow-hidden transition-colors duration-200 hover:border-primary-500 hover:bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header — always visible */}
      <div className="flex items-center gap-3 p-4 cursor-default select-none">
        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-white text-sm font-semibold">
          {number}
        </span>
        <h3 className="flex-1 text-base font-semibold text-gray-800">{title}</h3>
        <span className={`text-gray-400 transition-transform duration-700 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>

      {/* Collapsible body */}
      <div
        className={`transition-all duration-700 ease-in-out ${isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
      >
        <div className="px-4 pb-4 space-y-3">
          {note && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 leading-relaxed">
              <span className="font-semibold">Note: </span>{note}
            </p>
          )}
          <div className="space-y-3 pl-10">
            {content.map((entry, i) => (
              <div key={i}>
                {entry.label && (
                  <p className="text-sm font-medium text-gray-700 mb-1">{entry.label}</p>
                )}
                {entry.items && entry.items.length > 0 && (
                  <ul className="space-y-1">
                    {entry.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 text-gray-400 flex-shrink-0">🔸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function IntroductionStep() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-2 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary-500 mb-1">Compliance Due Diligence Form</h2>
        <p className="text-base font-medium text-gray-600">
          Know Your Customer (KYC) Information Form – Introduction
        </p>
      </div>

      {/* Intro paragraph */}
      <p className="text-sm text-gray-600 leading-relaxed">
        This Know Your Customer (KYC) Form is composed of different sections. The purpose of this introductory page is
        to provide you with an overview of the information that will be requested throughout the form, so that you may
        have all relevant details readily available and complete the questionnaire accurately and efficiently.
      </p>

      {/* Progress management */}
      <div className="bg-white border border-primary-500 rounded-lg p-5 space-y-3">
        <p className="text-sm font-semibold text-primary-500">
          For your convenience, the system allows you to manage your progress at all times. During completion, you may:
        </p>
        <ul className="space-y-2">
          {[
            {
              icon: <FileUpIcon className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />,
              text: (
                <>
                  <span className="font-medium text-primary-500">Download</span> a copy of the information entered by selecting the{" "}
                  <span className="inline-flex items-center gap-1 font-semibold text-primary-500">[Download button]</span>.
                  This file may be retained for your records and used to continue at a later stage.
                </>
              ),
            },
            {
              icon: <FileUpIcon className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />,
              text: (
                <>
                  <span className="font-medium text-primary-500">Upload</span> a previously downloaded file by selecting the{" "}
                  <span className="inline-flex items-center gap-1 font-semibold text-primary-500">[Upload button]</span>,
                  allowing you to resume without re-entering information.
                </>
              ),
            },
            {
              icon: <RefreshCcw className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />,
              text: (
                <>
                  <span className="font-medium text-primary-500">Clear</span> all information by selecting the{" "}
                  <span className="inline-flex items-center gap-1 font-semibold text-primary-500">[Clear button]</span>,
                  should you wish to restart the form.
                </>
              ),
            },
          ].map(({ icon, text }, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              {icon}
              <span className="leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact line */}
      <div className="flex items-center gap-2 text-sm text-gray-600  border border-gray-200 rounded-lg px-4 py-3">
        <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
        <span>
          Should you require clarification or assistance, contact the Compliance Team at{" "}
          <a href="mailto:compliance@acreinsurance.com" className="font-semibold text-primary-500 hover:underline">
            compliance@acreinsurance.com
          </a>
        </span>
      </div>

      {/* Divider + summary header */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <FileText className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-800">Form Sections Overview</h3>
        </div>

        <div className="space-y-4">
          {/* 1. General Information */}
          <SectionBlock
            number={1}
            title="General Information"
            content={[
              { label: "1.1 Company Name", items: ["Legal Company Name, Brand or Trade Name"] },
              { label: "1.2 Country of Registration", items: [] },
              {
                label: "1.3 Legal Structure",
                items: [
                  "State / governmental (public-sector entities, in general)",
                  "Semi-state / governmental entity (owned at least 20% by government)",
                  "Publicly traded entity (stock exchange)",
                  "Private entity",
                  "Other (explain)",
                ],
              },
              { label: "1.4 Identification Numbers", items: ["Registration Number, TIN (Tax Identification Number)"] },
              {
                label: "1.5 Main Business Activity",
                items: [
                  "Insurance (cedents)",
                  "Brokers / intermediaries (or equivalente)",
                  "Reinsurance (retrocessionaries)",
                  "Managing General Agents (MGAs or equivalent)",
                  "Marketing & related services (vendor)",
                  "Office & administrative services (vendor)",
                  "Techonology & related services (vendor)",
                  "Other (explain)",
                ],
              },
              { label: "1.6 Contact Details", items: ["Company main phone, addresses and website"] },
              {
                label: "1.7 Years of Established",
                items: ["Less than 5 years", "Between 5 and 10 years", "More than 10 years"],
              },
              { label: "1.8 Regulatory Body Name and Website", items: [] },
              { label: "1.9 Name Compliance Officer and Email", items: [] },
              { label: "1.10 Name of your ACTIVE RE Account Manager", items: [] },
            ]}
          />

          {/* 2. Board of Directors */}
          <SectionBlock
            number={2}
            title="Board of Directors"
            note="A PEP is an individual who is, or has been, entrusted with a prominent public function by a foreign or domestic government, or international organization. Persons related to or closely associated with such an individual are also considered PEPs. If the company is state or semi-state owned, indicate on 'PEP' column accordingly."
            content={[
              {label: "1. Name"},
              {label: "2. ID / Passport or Registration Number"},
              {label: "3. Board of Officer Role"},
              {label: "4. Date of Birth / Year of Establishment"},
              {label: "5. Nationality"},
              {label: "6. Country of Residence"},
              {label: "7. PEP / Governmental or N/A"},
            ]}
          />

          {/* 3. Shareholders */}
          <SectionBlock
            number={3}
            title="Shareholders"
            note="Name the shareholders that have 20% or more shares. If the company is state or semi-state owned, indicate on PEP column accordingly."
            content={[
              {label: "1. Name"},
              {label: "2. ID / Passport or Registration Number"},
              {label: "3. Share %"},
              {label: "4. Date of Birth / Year of Establishment"},
              {label: "5. Nationality"},
              {label: "6. Country of Residence"},
              {label: "7. PEP / Governmental or N/A"},
            ]}
          />

          {/* 4. UBOs */}
          <SectionBlock
            number={4}
            title="Ultimate Beneficial Owners (UBOs) – Holding 20% or more shares"
            note="If any of the ultimate beneficial owners are a government entity, or a stock exchange company, please fill in the name fields accordingly. If the company is state or semi-state owned, indicate on 'PEP' column accordingly."
            content={[
              {label: "1. Name"},
              {label: "2. ID / Passport or Registration Number"},
              {label: "3. Date of Birth / Year of Establishment"},
              {label: "4. Country of Residence"},
              {label: "5. Nationality"},
              {label: "6. Share Percentage"},
              {label: "7. Name of Stock Exchange ( If applicable)"},
              {label: "8. PEP / Governmental or N/A"},
            ]}
          />

          {/* 5. Financial Profile */}
          <SectionBlock
            number={5}
            title="Financial Profile"
            content={[
              {
                label: "Source of Funds / Main Business Conducted",
                items: [
                  "Business is mainly conducted (> 50%) in the country of registration",
                  "Business is mainly conducted both in the country of registration and in other countries (50/50%)",
                  "Business mainly conducted (> 50%) outside the country of registration",
                ],
              },
              {
                label: "Annual Income – Main Business Activity",
                items: [
                  "Up to 10,000,000 US$",
                  "10,000,000 – 50,000,000 US$",
                  "50,000,000 – 100,000,000 US$",
                  "100,000,000 US$ and more",
                ],
              },
              {
                label: "Annual Income – Other Business Activities",
                items: [
                  "Up to 10,000,000 US$",
                  "10,000,000 – 50,000,000 US$",
                  "50,000,000 – 100,000,000 US$",
                  "100,000,000 US$ and more",
                  "Not applicable",
                ],
              },
            ]}
          />

          {/* 6. Risk Rating */}
          <SectionBlock
            number={6}
            title="Risk Rating Information (if applicable)"
            content={[
              {label: "1. Rating Agency Name"},
              {label: "2. Date of Last Risk Rating (mm/dd/yyyy)"},
              {label: "3. Rating Assigned by the Rating Agency"},
            ]}
          />

          {/* 7. Interface */}
          <SectionBlock
            number={7}
            title="Interface"
            content={[
              {
                label: "Reference Sources",
                items: [
                  "Employee of Active Re",
                  "Networking event or business networking",
                  "Marketing channels",
                  "Board member of Active Re",
                  "Referral based on a positive recommendation",
                  "Market research / Awareness",
                  "Other (explain)",
                ],
              },
            ]}
          />

          {/* 8. Contact */}
          <SectionBlock
            number={8}
            title="Contact Person for Matters Related to This Form"
            content={[
              { label: "", items: ["Contact Name", "Contact Email"] },
            ]}
          />

          {/* 9. Documents */}
          <SectionBlock
            number={9}
            title="Required Documents"
            content={[
              {label: "1. Registration of incorporation of the company"},
              {label: "2. Licence or registration with regulatory body"},
              {label: "3. Certificate of incumbency / list of directors, officers, shareholders, beneficial owners, addresses, etc."},
              {label: "4. Colour copy of identity (ID) cards or passports of directors, officers, shareholders and beneficial owners"},
              {label: "5. Audited financial statements of the last period"},
              {label: "6. Powers of attorney / other document naming authorised signatories or legal "},
              {label: "7. Memorandum & articles of association (MOA/AOA)"},
              {label: "8. By-laws"},

            ]}
          />
        </div>
      </div>

      {/* Call to action */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-500 italic">
          Please review the overview above, then proceed to complete each section.
        </p>
        <ChevronRight className="h-4 w-4 text-primary-500" />
      </div>
    </div>
  )
}
