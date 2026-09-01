"use client"
import { Linkedin, Youtube, MapPin, Mail, ChevronRight, PhoneCall, MessageSquareMore } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMediaQuery } from "../../hooks/useMediaQuery";
export default function Footer() {

  const isMobile = useMediaQuery("(max-width: 768px)")
  const pathname = usePathname();
  const router = useRouter();
  const emailUser = "info";
  const emailDomain = "acreinsurance.com";
  const emailAddress = `${emailUser}@${emailDomain}`;
  const isCompliance = pathname === "/compliance-form" || pathname === "/compliance-form/" || pathname === "/t" || pathname.startsWith("/t/");

  if (isCompliance) return null

  // Lógica para scroll suave como en el navbar
  const scrollToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleFooterNavClick = (to: string) => (e: React.MouseEvent) => {
    const [path, hash] = to.split("#");
    if (hash) {
      e.preventDefault();
      const normalizedPath = path || "/";
      if (pathname === normalizedPath) {
        scrollToSection(hash);
      } else {
        router.push(normalizedPath);
        setTimeout(() => scrollToSection(hash), 300);
      }
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary-500 to-primary-900 text-white py-4 overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 ">
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl md:max-w-5xl xl:max-w-7xl mx-auto px-4 md:px-4 xl:px-0 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-10 py-4">
          {/* Company Overview */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold tracking-wide border-l-2 border-celeste-900 pl-3">Active Re Global Offices </h3>

            <div className="group  hover:bg-white/10 backdrop-blur-sm p-1 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20">
              <div className="flex align-center">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-celeste-900 group-hover:text-white transition-colors duration-300" />
                <div>
                   <Link href="/contacts#address" className="flex items-center" onClick={handleFooterNavClick('/contacts#address')}>
                  <p className="text-xs text-white-100 group-hover:text-white transition-colors duration-300">
                    View Locations
                  </p>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Locations */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold tracking-wide border-l-2 border-celeste-900 pl-3">Contact Us</h3>

            <div className="group  hover:bg-white/10 backdrop-blur-sm p-1 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20">
              <button type="button" onClick={handleEmailClick} className="flex items-center w-full text-left" aria-label="Send email to Active Re">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-celeste-900 group-hover:text-white transition-colors duration-300" />
                <span className="text-xs text-white group-hover:text-white transition-colors duration-300">
                  info@acreinsurance.com
                </span>
              </button>
            </div>

            <div className="backdrop-blur-sm p-1 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20">
              <div className="flex align-center">
                <PhoneCall className="h-4 w-4 mr-3 flex-shrink-0 text-celeste-900 self-center" />
                <div className="flex flex-col gap-2">
                  <Link
                    href="tel:+12466222333"
                    className="flex items-center px-1 pt-1 focus:outline-none focus:ring-2 focus:ring-celeste-900"
                  >
                    <span className="block text-xs text-white group-hover:text-white transition-colors duration-300">
                      +1 (246) 622-2333
                    </span>
                  </Link>
                  <Link
                    href="tel:+5072637147"
                    className="flex items-center px-1 pt-1 focus:outline-none focus:ring-2 focus:ring-celeste-900"
                  >
                    <span className="block text-xs text-white group-hover:text-white transition-colors duration-300">
                      +507 263 3147
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold tracking-wide border-l-2 border-celeste-900 pl-3">Customer Feedback</h3>

            <div className="group hover:bg-white/10 backdrop-blur-sm p-1 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20">
              <Link href="https://forms.office.com/r/PZLbe0LnUt?origin=lprLink" target="_blank" className="flex items-center" >
                <MessageSquareMore className="h-5 w-5 mr-3 flex-shrink-0 text-celeste-900 group-hover:text-white transition-colors duration-300" />
                <span className="text-xs text-white group-hover:text-white transition-colors duration-300">
                  Submit concerns anonymously
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="mt-2 px-4 md:px-0 pt-1 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-10 text-white text-sm">
          <div className="flex justify-center md:justify-start md:items-start gap-4 mt-1 md:mt-0">
            <Link href="/terms" className="text-xs hover:text-white transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-xs hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs hover:text-white transition-colors duration-300">
              About Cookies
            </Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start md:items-start gap-4 mt-1">
            <a
              href="https://www.linkedin.com/company/active-re/"
              className="flex items-center gap-2"
              target="_blank"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className="h-3 w-3 text-white" />
              {!isMobile && <><span className="text-xs font-regular">LinkedIn</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </>}
            </a>
            <a
              href="https://www.youtube.com/@active-re"
              className="flex items-center gap-2"
              aria-label="Visit our YouTube channel"
              target="_blank"
            >
              <Youtube className="h-3 w-3 text-white" />
              {!isMobile && <>
                <span className="text-xs font-regular">YouTube</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </>
              }
            </a>
          </div>
          <p className="text-center md:text-start mt-1 text-xs">© {new Date().getFullYear()} ACTIVE CAPITAL REINSURANCE LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

