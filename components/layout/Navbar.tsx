'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from "lucide-react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useDataContext } from "../../context/DataContext"
import { NavItems } from "../../types/navbarAndFooter"
import { fetchTitle } from "../../utils/fetch"
import { navItemsFallBackObject } from "../../utils/navbar"
// Separated logic hooks for Navbar
function useNavbarLogic() {
  const context = useDataContext();
  const { cache } = context || {};
  const navbar = cache?.navbar;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrolledHero, setScrolledHero] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const lastScrollY = useRef(0);
  const scrolledRef = useRef(false);
  const showNavbarRef = useRef(true);
  const tickingRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const isCompliance = pathname === "/compliance-form" || pathname === "/compliance-form/" || pathname === "/t" || pathname.startsWith("/t/");

  // Memoize navItems fallback
  const navItemsFallBack = useMemo(() => navItemsFallBackObject, []);
  const navItems = navbar ? navbar : navItemsFallBack;

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const nextScrolled = currentScrollY > 80;

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
        setScrolledHero(nextScrolled);
      }

      if (!isMobile) {
        const nextShowNavbar = currentScrollY <= 80 || currentScrollY < lastScrollY.current;
        if (showNavbarRef.current !== nextShowNavbar) {
          showNavbarRef.current = nextShowNavbar;
          setShowNavbar(nextShowNavbar);
        }
        lastScrollY.current = currentScrollY;
      }

      tickingRef.current = false;
    });
  }, [isMobile]);

  // Fetch title
  const fetchData = useCallback(async () => {
    const data = await fetchTitle();
    setTitle(data?.title_navbar || "18 Years of Global, Specialised & Innovative Solutions");
  }, []);

  // Scroll to section
  const scrollToSection = useCallback((hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle nav click
  const handleNavClick = useCallback((to: string) => (e: React.MouseEvent) => {
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
      setIsOpen(false);
      setDropdownOpen(null);
    }
  }, [pathname, router, scrollToSection]);

  // Toggle menu
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    if (isCompliance) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll, isCompliance]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize return values
  return {
    navItems,
    isOpen,
    setIsOpen,
    scrolled,
    scrolledHero,
    showNavbar,
    isMobile,
    dropdownOpen,
    setDropdownOpen,
    title,
    isCompliance,
    handleNavClick,
    toggleMenu
  };
}

const Navbar = () => {
  const pathname = usePathname();
  const navbarData = useNavbarLogic();
  
  const context = useDataContext();
  if (!context) return <div>Error: Context not available</div>;
  
  const {
    navItems,
    isOpen,
    setIsOpen,
    scrolled,
    scrolledHero,
    showNavbar,
    isMobile,
    dropdownOpen,
    setDropdownOpen,
    title,
    isCompliance,
    handleNavClick,
    toggleMenu
  } = navbarData;

  return (
    <>{!isCompliance && (
      <div
        className={`fixed w-full z-40 transition-opacity duration-1000 
          ${scrolled ? "bg-gradient-to-b from-primary-900 to-primary-500/90" : "bg-gradient-to-b from-black/70 to-transparent"}
          ${!isMobile && scrolledHero && !showNavbar ? " -top-24" : " top-0"}`}
        style={{ transitionProperty: "top, background-color" }}
      >
        {/* Main navigation */}
        <nav className="text-white">
          <div className={`max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 lg:px-0 py-2 `}>
            <div className="flex justify-between items-center">
              {/* Logo and tagline container */}
              <div className={`py-2 ${isMobile ? "w-full" : "max-w-xl sm:px-4 xl:px-0"}`}>
                <div className={`flex flex-col`}>
                  {/* Logo */}
                  <Link href="/" className={isMobile ? "self-start" : ""}>
                    <Image src={isMobile ? "/images/logo2.png" : "/images/logo.svg"} alt="Active RE" width={isMobile ? 120 : 180} height={36} className="h-9 w-auto" priority />
                  </Link>

                  {/* Tagline - only show full text on desktop */}
                  {!scrolled && !isMobile && (
                    <p className="text-xs leading-relaxed transition-all duration-700 pt-0.5">
                      {title}
                    </p>
                  )}
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-10 relative">
                {navItems && navItems.map((item:any, index : number) => (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <div className={` ${pathname === `${item.to}` ? "text-orange-200" : "text-white hover:text-orange-200"} flex items-center cursor-pointer text-md 2xl:text-lg font-medium transition-colors`}>
                      <Link
                        href={item.to}
                        className={`flex items-center space-x-1`}
                        onClick={() => setDropdownOpen(null)}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Link>
                    </div>

                    {item.hasDropdown && item.sub_items && dropdownOpen === index && (
                      <div className="absolute bg-transparent pb-8 pt-2 w-48">
                        <div className={`absolute left-0 shadow-lg z-20 rounded-md
                ${scrolled ? "bg-gradient-to-b from-primary-900 to-primary-500/90" : "bg-gradient-to-b from-primary-900 to-primary-500/90"}`}>
                          <div className="py-2">
                            {item.sub_items.map((sub_item : NavItems) => (
                              <Link
                                key={sub_item.to}
                                href={sub_item.to}
                                className="block px-4 py-2 text-sm text-white hover:text-orange-200 hover:bg-primary-900/20 transition-colors"
                                onClick={handleNavClick(sub_item.to)}
                              >
                                {sub_item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md hover:bg-[#005964] transition-colors"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`lg:hidden ${isOpen ? "block" : "hidden"}  bg-gradient-to-b from-primary-900 to-primary-500/90`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems && navItems.map((item:any, index: number) => (
                <div key={item.to}>
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-white hover:text-orange-200 transition-colors"
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === index ? 'rotate-180' : ''}`} />}
                  </button>
                  {item.hasDropdown && item.sub_items && dropdownOpen === index && (
                    <div className="pl-4 pb-2">
                      {item?.sub_items.map((sub_item : NavItems) => (
                        <Link
                          key={sub_item.to}
                          href={sub_item.to}
                          className="block px-3 py-2 text-sm text-white hover:bg-primary-900 rounded-md transition-colors"
                          onClick={e => {
                            handleNavClick(sub_item.to)(e);
                            setIsOpen(false);
                            setDropdownOpen(null);
                          }}
                        >
                          {sub_item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Orange line at the bottom */}
          <div className="h-1 w-full bg-secondary-500"></div>
        </nav>
      </div>
    )}
    </>
  );
};

export default Navbar
