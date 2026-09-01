"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent } from "../ui/card"
import { Label } from "../../components/ui/label";
import { ContactInfo } from "./ContactInfo";
import { ActionButtons } from "./ActionButtons";
import { SocialLinks } from "./SocialLinks";
import { BusinessCardProps } from "../../types/contacts";

export function BusinessCard({ name, code, role, avatar, phone, phone2, email, linkedin}: BusinessCardProps) {
  const socialLinks = {linkedin: linkedin};
  const website= 'active-re.com'
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
  return (
    <>
    <Card className="rounded-none border-0 md:rounded-lg md:border w-full my-0 md:my-10 max-w-md mx-auto bg-white shadow-2xl hover:shadow-3xl overflow-hidden">
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-900 to-primary-900 px-6 py-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative z-10 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white/20 shadow-lg">
            <AvatarImage src={`${apiUrl}/assets/${avatar}`} alt={name} className="object-cover" />
            <AvatarFallback className="bg-teal-100 text-primary-500 text-xl font-semibold">
              {name}
            </AvatarFallback>
          </Avatar>

          <h3 className="text-2xl font-bold mb-2 tracking-tight">{name}</h3>
          <Label
            className="p-1 rounded-md bg-white/20 text-white border-0 hover:bg-white/30 transition-colors"
          >
            {role}
          </Label>
        </div>

        <ActionButtons phone={phone} email={`${code}@acreinsurance.com`} />
      </div>

      <CardContent className="p-6 space-y-6">
        <ContactInfo
          phone={phone}
          phone2={phone2}
          email={`${code}@acreinsurance.com`}
          website={website}
        />

        <SocialLinks socialLinks={socialLinks} />

        <button
          onClick={() =>
            downloadVCard({
              name,
              code,
              role,
              phone,
              phone2,
              email,
              website,
            })
          }
          className="w-full bg-gradient-to-r from-primary-900 to-cyan-900 hover:from-primary-900 hover:to-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          DOWNLOAD VCARD
        </button>
      </CardContent>
    </Card>
    </>
  );
}

function downloadVCard(data: {
  name: string;
  code:string;
  role: string;
  phone: string;
  phone2: string;
  email: string;
  website: string;
  address?: string;
}) {
  const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.role}
TEL;TYPE=WORK,VOICE:(507) 263 3147
TEL;TYPE=CELL:${data.phone.slice(2)}
EMAIL:${data.code + '@acreinsurance.com'}
URL:${data.website}
ADR;TYPE=WORK:;; Somerley Building 1st floor; Somerley; Worthing Main Road; Worthing; Christ Church; 'BB22025'; 'Barbados'
END:VCARD`;

  const blob = new Blob([vCardContent], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.name.replace(/\s+/g, "_")}.vcf`;
  link.click();
  window.URL.revokeObjectURL(url);
}
