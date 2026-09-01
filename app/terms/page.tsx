import React from 'react';
import { Metadata } from 'next';
import { PolicyNavigation } from "@/components/terms_policys/PolicyNavigation"
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Active Re',
  description: 'Detailed Terms and Conditions for Active Re, defining the rules, responsibilities, and guidelines that govern the use of our services and website.',
  alternates: {
    canonical: 'https://active-re.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="relative w-full">
      <div className="bg-background-team text-white py-16 min-h-96 ">
        <div className="max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 md:px-0 py-10 felx flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold my-8">Terms and Conditions</h1>
        </div>
      </div>
      <p style={{ display: "none" }}>Terms and Conditions
        By accessing Active Re´s website, you agree to be bound by these terms and conditions. Please make sure to read them carefully. Do not proceed to further pages of Active Re´s website if you do not agree with these terms and conditions.
        Active Re´s website contains links to other websites operated by third parties. These links are only provided for the convenience of the users. Active Re does not have any influence on the content on the websites that are linked to, nor do the links represent any endorsement.
        1.Terms of Acces
        By using this website, you accept sole responsibility for the use of its content. You acknowledge that you are solely responsible for the use to which you put the website and all information you obtain from it. Active Re will not be liable for any loss or damage arising, directly or indirectly, from your use of this website.
        2.Variation of Content
        Active Re reserves the right, at any time and without any advance notice, to change the content that appears on this website, including these terms & conditions. Active Re strives to ensure that the content included is correct and acknowledges that there might be cases in which a delay can occur between updates of information. Consequently, information on this website may at times be outdated or inaccurate. Active Re is not under any obligation to inform you about such variations or amendments.
        3.Use of Content
        Only for your own personal use are you allowed to store in the memory of your computer, to manipulate, analyse, reformat, print and/or display the information received or accessed through this website. Any form of redistribution or reproduction for commercial purposes is prohibited without the explicit permission from Active Re. None of the content included on this website is intended to be regarded as an encouragement to invest in Active Re, nor should it in any way be seen as investment advice. None of the content on the website constitutes a solicitation, an offer, or a recommendation to buy any service or solutions, to affect any transactions or to conclude any legal act of any kind.
        4.User Content
        Under these terms and conditions, “your user content” means any material of any kind or format submitted to us through the forms available on this website. By doing so, you are giving Active Re the right to use it exclusively for the purpose or purposes indicated in those forms used to submit the information.        Comment to suggested text:
        This paragraph is written making specific use of the information given through the forms that are available on the website. As there are no other places where the “user” can provide or introduce information in Active Re’s website.
        Your user content must be legal and must not infringe any third party’s legal rights. Active Re will protect personal user information as per the applicable laws of its jurisdiction. Active Re reserves the right to use data or content submitted to its website for the purposes indicated in the forms used to submit the information.
        Notwithstanding Active Re’s rights herein granted, and under the terms and conditions concerning user content described in the previous paragraphs, Active Re does not undertake to monitor the submission of such content.
        5.Intellectual Propert
        The information, design and content of this website are copyright and the property of Active Re. All other logos, trademarks and company names used in this website are property and copyright of their holders. Active Re does not permit the use of its property and of other holders, as such use may constitute an infringement of their respective rights.
        6.Limitations and Exclusions of Liability
        Nothing in these terms and conditions will: (I) limit or exclude Active Re or your liability for fraud or fraudulent representation; (II) limit any of Active Re’s or your liabilities in any way that is not permitted or are excluded under the applicable law. The limitations and exclusions of liability in this Section, and on our website, including its terms and conditions (I) are subject to the paragraph above; (II) govern all liabilities that arise from them and their subject matter, including liabilities that arise in contract, negligence or breach of statutory duty. The information and services provided on this website are free of charge. Therefore, Active Re will not be liable for any loss or damage of any nature.
        Active Re will also not be liable to you for any loss or losses: (i) from any event or events beyond our reasonable control; (ii) of business losses; (iii) for damage to profits, income, revenue, or anticipated savings; (iv) of use or production; (v) of management or office time; (vi) of business, contracts, commercial opportunities or goodwill; (vii) of or corruption of any data, database or software; (viii) any special, indirect or consequential loss or damage and (ix) arising out of any acts or omissions of any hosting services provider, payment to services provider or other third party services provider.
        7.Acceptable Use
        Active Re prohibits the use of its website in any manner that deteriorates its availability or accessibility or in a way or form that is illegal, fraudulent or harmful in connection with the purpose or activity. We also prohibit using this website to copy, store, host, transmit, send, use, publish, and distribute any material, spyware, ransomware, computer virus, Trojan horse, worm, keystroke logger rootkit, or any other malicious computer software. In addition, Active Re’s website does not permit its use to conduct any systematic or data collection activities of any kind, transmit or send unsolicited commercial communications, use the website for any marketing purpose without Active Re’s express written consent.
        8.Invalidity
        Should any part of the terms and conditions stated be unenforceable, the other parts’ implementation will not be altered.
        9.Governing Law
        Active Re’s terms and conditions are governed and interpreted following the laws of Barbados. Accordingly, the courts in Barbados shall have jurisdiction to resolve any disputes that arise from the use of this website.</p>
      <PolicyNavigation currentPage="terms" />
      <TermsClient />
    </div>
  );
}
