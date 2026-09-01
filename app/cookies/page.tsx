import CookiesPage from '@/components/terms_policys/CookiesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Active RE',
  description: 'Detailed information regarding the use of cookies on the Active Re website, including how they enhance functionality and user experience.',
  alternates: {
    canonical: 'https://active-re.com/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | Active RE',
    description: 'Use of cookies on our site',
    type: 'website',
  },
};

export default function Cookies() {
  return (
    <>
      <div style={{ display: 'none' }}>
        <h1 className="font-bold mb-6 text-[2.65rem] md:text-7xl 2xl:text-8xl leading-tight">Cookie Policy</h1>
        <p>
          1. What Are Cookies?
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work, or work more efficiently, as well as to provide information to the site owners.



          2. How We Use Cookies
          We use cookies for several reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.



          3. Types of Cookies We Use
          Essential Cookies
          These cookies are necessary for the basic functionality of the website and cannot be disabled in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.

          Performance Cookies
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.

          Functionality Cookies
          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.

          Advertising Cookies
          These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.



          4. Cookie Control
          You can set your browser to refuse all cookies, or to alert you when cookies are being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.

          Cookie Preferences Center
          You can adjust your cookie preferences at any time using our cookie preferences center. Click the button below to access it.

          Adjust Cookie Preferences

          5. Third-Party Cookies
          In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.

          This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.
          We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, the social media sites will set cookies through our site.

          6. More Information
          Hopefully, that has clarified things for you and as was previously mentioned if there is something that you are not sure whether you need or not it is usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.

          However, if you are still looking for more information, you can contact us through one of our preferred contact methods:

          Email: info@acreinsurance.com</p>
      </div>
      <CookiesPage />;
    </>
  )
}
