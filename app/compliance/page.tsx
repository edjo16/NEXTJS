import type { Metadata } from 'next';
import CompliancePage from '@/components/compliance/CompliancePage';

export const metadata: Metadata = {
  title: 'Compliance | Active RE',
  description: 'We uphold compliance and regulatory standards to guarantee integrity, security, and trust across all operations.',
  alternates: {
    canonical: 'https://active-re.com/compliance',
  },
  openGraph: {
    title: 'Compliance | Active RE',
    description: 'Safeguarding business relationships, stakeholders, and shared interests through sustainable practices and strict adherence to applicable regulations.',
    type: 'website',
    images: [
      {
        url: `https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/6b837770-86ba-4950-86c0-7b1324c22039.png?format=webp`,
        width: 1200,
        height: 630,
        alt: 'Home ',
      },
    ],
  },
}

export default function Compliance() {
  return (
    <>
      <div style={{ display: 'none' }}>
        <picture>
          <source srcSet="https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/6b837770-86ba-4950-86c0-7b1324c22039.png?format=webp" type="image/webp" />
          <img
            src={`https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/assets/6b837770-86ba-4950-86c0-7b1324c22039.png?format=webp`}
            alt='Compliance '
          />
          <h1 className="font-bold mb-6 text-[2.65rem] md:text-7xl 2xl:text-8xl leading-tight">Compliance</h1>
          <h2 className="font-bold mb-6 text-3xl md:text-4xl 2xl:text-6xl leading-tight">Safeguarding business relationships, stakeholders, and shared interests through sustainable practices and strict adherence to applicable regulations.</h2>
        </picture>
        <h3>Risk Management Culture</h3>
        <p>At Active Re, we embrace a proactive and structured approach to Enterprise Risk Management (ERM), enabling us to confidently navigate uncertainty and support the achievement of our operational and strategic goals.
          Our comprehensive framework enhances our ability to anticipate change, respond with agility, and seize opportunities for continuous improvement. Through effective communication, timely insights, and strong governance, ERM contributes to better decision-making, sustained value creation, and consistent regulatory compliance.
          By integrating ERM into our culture, we strengthen organisational resilience and foster a forward-looking environment where informed decisions drive sustainable success.
          We are committed to upholding international standards and the regulatory framework of Barbados, our home jurisdiction, as well as those of the countries where we conduct business.
          The Compliance framework we implement focuses on key areas including Anti-Money Laundering (AML), Counter-Terrorism Financing (CTF), Proliferation Financing (PF), and broader Anti-Financial Crime (AFC) obligations. We align our practices with global standards set by the Financial Action Task Force (FATF/GAFI), the United Nations (UN), the Organisation for Economic Co-operation and Development (OECD), and other recognised international bodies, ensuring responsible and robust operations worldwide.
          Through rigorous Due Diligence (DD) procedures, based on accurate and current information, we identify risks and build secure business relationships. These efforts promote transparency and accountability, safeguarding our clients, partners, and the markets where we maintain shared interests.
          Guided by a strong commitment to ethical conduct and regulatory compliance, we strive to foster trust and integrity in all aspects of our business.To ensure proper compliance with our AML/CTF/PF policy, we kindly request you to complete our Due Diligence (DD) Form.
          Your cooperation is vital to ensuring we can continue delivering the highest standard of service.</p>
      </div>
      <CompliancePage />;
    </>
  )
}


