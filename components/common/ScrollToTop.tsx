"use client";

import { ChevronUp } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const visibleRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const isCompliance = pathname === "/compliance-form" || pathname === "/compliance-form/" || pathname === "/t" || pathname === "/t/" || pathname === "/kyc-due-diligence/" || pathname === "/annual-report"|| pathname === "/annual-report/"|| "/annual-report/2025" || "/annual-report/2025/";
    if (isCompliance) {
      visibleRef.current = false;
      setVisible(false); 
      return;
    }

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 200;
        if (visibleRef.current !== nextVisible) {
          visibleRef.current = nextVisible;
          setVisible(nextVisible);
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed right-4 bottom-6 z-30 bg-secondary-500 rounded-full w-12 h-12 shadow-lg flex items-center justify-center cursor-pointer transition hover:bg-white border border-secondary-500 text-white hover:text-secondary-500"
      aria-label="Go to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  ) : null;
};

export default ScrollToTopButton;
