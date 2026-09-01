import { ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isCompliance = pathname === "/compliance-form" || pathname === "/compliance-form/" || pathname === "/t"|| pathname === "/t/" || pathname === "/kyc-due-diligence/" || pathname === "/annual-report" || pathname === "/annual-report/" || pathname === "/annual-report/";
    if (isCompliance) {
      setVisible(false); 
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed right-4 bottom-6 z-50 bg-secondary-500 rounded-full w-12 h-12 shadow-lg flex items-center justify-center cursor-pointer transition hover:bg-white border border-secondary-500 text-white hover:text-secondary-500"
      aria-label="Go to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  ) : null;
};

export default ScrollToTopButton;
