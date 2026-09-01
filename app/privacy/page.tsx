import React from 'react';
import { Metadata } from 'next';
import { PolicyNavigation } from "@/components/terms_policys/PolicyNavigation"
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Active Re',
  description: 'Comprehensive Privacy Policy for Active Re, outlining how we protect your personal data and ensure confidentiality across all interactions',
  alternates: {
    canonical: 'https://active-re.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative w-full">
      <div className="bg-background-team text-white py-16 min-h-96 ">
        <div className="max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 md:px-0 py-10 felx flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold my-8">Privacy Policy</h1>
        </div>
      </div>
      <p style={{ display: "none" }}>1. Introduction
        At Active Re, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.



        2. The Data We Collect About You
        Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).

        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:

        Identity Data includes first name, last name, username or similar identifier, marital status, title, date of birth, and gender.
        Contact Data includes billing address, delivery address, email address, and telephone numbers.
        Financial Data includes bank account and payment card details.
        Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.
        Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.

        3. How We Collect Your Personal Data
        We use different methods to collect data from and about you including through:

        Direct interactions. You may give us your Identity, Contact, and Financial Data by filling in forms or by corresponding with us by mail, phone, email, or otherwise.
        Automated technologies or interactions. As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.
        Third parties or publicly available sources. We may receive personal data about you from various third parties and public sources.

        4. How We Use Your Personal Data
        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:

        Where we need to perform the contract we are about to enter into or have entered into with you.
        Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
        Where we need to comply with a legal or regulatory obligation.

        5. Disclosures of Your Personal Data
        We may share your personal data with the parties set out below for the purposes set out in section 4 above.

        Service providers who provide IT and system administration services.
        Professional advisers including lawyers, bankers, auditors, and insurers.
        Tax authorities, regulators, and other authorities.

        6. Data Security
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.

        We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.


        7. Your Legal Rights
        Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:

        Request access to your personal data.
        Request correction of your personal data.
        Request erasure of your personal data.
        Object to processing of your personal data.
        Request restriction of processing your personal data.
        Request transfer of your personal data.
        Right to withdraw consent.

        8. Changes to the Privacy Policy
        Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by email. Please check back frequently to see any updates or changes to our privacy policy.


        9. Contact Us
        If you have any questions about this privacy policy or our privacy practices, please contact us at: info@acreinsurance.com</p>
      <PolicyNavigation currentPage="privacy" />
      <PrivacyClient />
    </div>
  );
}
