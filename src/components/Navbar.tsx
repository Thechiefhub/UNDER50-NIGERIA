import React, { useState, useEffect } from "react";
import { Menu, X, Award, ChevronRight, MessageSquare } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  nominationsOpen: boolean;
}

export default function Navbar({ currentPage, onPageChange, nominationsOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Discover" },
    { id: "list", label: "The List" },
    { id: "awards", label: "Awards" },
    { id: "conference", label: "Conference" },
    { id: "stories", label: "Stories" },
    { id: "insights", label: "Insights" },
    { id: "about", label: "About" },
  ];

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#050505]/95 backdrop-blur-md py-3 border-brand-grey/50 shadow-lg shadow-black/40"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={() => handleLinkClick("home")}
            className="cursor-pointer group flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-brand-green flex items-center justify-center font-serif text-white text-base font-bold transition-transform group-hover:scale-105">
              50
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest font-bold text-white group-hover:text-brand-green transition-colors">
                UNDER50
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 -mt-1 font-sans">
                Nigeria
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 relative py-1 hover:text-brand-green cursor-pointer ${
                  currentPage === link.id || (currentPage.startsWith("story-") && link.id === "stories") || (currentPage.startsWith("person-") && link.id === "list")
                    ? "text-brand-green font-bold"
                    : "text-gray-300"
                }`}
              >
                {link.label}
                {/* Active Underline Indicator */}
                {(currentPage === link.id || (currentPage.startsWith("story-") && link.id === "stories") || (currentPage.startsWith("person-") && link.id === "list")) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-green" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="cta-tickets"
              onClick={() => handleLinkClick("conference")}
              className="text-xs uppercase tracking-widest font-bold text-gray-300 hover:text-white px-3 py-2 transition-colors cursor-pointer"
            >
              Get Tickets
            </button>
            <button
              id="cta-nominate"
              onClick={() => handleLinkClick("nominate")}
              className="bg-brand-green text-white text-xs uppercase tracking-widest font-bold px-5 py-2.5 transition-all duration-300 hover:bg-brand-green-hover flex items-center group shadow-md shadow-brand-green/10 cursor-pointer"
            >
              Nominate
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
            {/* Hidden admin access icon */}
            <button
              id="cta-admin-shortcut"
              onClick={() => handleLinkClick("admin")}
              className={`text-xs uppercase tracking-widest font-bold p-2 transition-all duration-200 ${
                currentPage === "admin" ? "text-brand-green" : "text-gray-500 hover:text-gray-300"
              }`}
              title="Admin CMS & Logs"
            >
              <Award className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              id="mobile-shortcut-nominate"
              onClick={() => handleLinkClick("nominate")}
              className="bg-brand-green text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 hover:bg-brand-green-hover transition-colors"
            >
              Nominate
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-green p-1.5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation-overlay"
        className={`fixed inset-0 bg-[#050505] z-40 transition-all duration-500 flex flex-col justify-between px-8 py-24 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 mt-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-sans border-b border-brand-grey/40 pb-2">
            Navigation Index
          </p>
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              id={`mobile-nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-3xl font-serif text-white hover:text-brand-green transition-all duration-200 flex items-center justify-between group py-1"
            >
              <span className="flex items-center">
                <span className="text-xs font-sans text-brand-green mr-4 opacity-50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {link.label}
              </span>
              <ChevronRight className="w-6 h-6 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="flex flex-col space-y-4 border-t border-brand-grey/40 pt-8">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>UNDER50 NIGERIA</span>
            <span>EDITION 2026</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              id="mobile-overlay-tickets"
              onClick={() => handleLinkClick("conference")}
              className="border border-brand-grey text-white text-center uppercase tracking-widest font-bold py-3 text-xs hover:bg-white hover:text-black transition-colors"
            >
              Tickets
            </button>
            <button
              id="mobile-overlay-nominate"
              onClick={() => handleLinkClick("nominate")}
              className="bg-brand-green text-white text-center uppercase tracking-widest font-bold py-3 text-xs hover:bg-brand-green-hover transition-colors"
            >
              Nominate
            </button>
          </div>
          <button
            id="mobile-overlay-admin"
            onClick={() => handleLinkClick("admin")}
            className="text-gray-600 hover:text-brand-green text-center text-[10px] uppercase tracking-widest mt-2 flex items-center justify-center space-x-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Admin CMS & Registry</span>
          </button>
        </div>
      </div>

      {/* Spacer to push content below sticky header */}
      <div className="h-20 w-full bg-brand-black" />
    </>
  );
}
