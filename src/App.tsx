import React, { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Users, Check, CheckCircle, Download, Share2, Copy, 
  ChevronRight, ArrowRight, Clock, Lock, Plus, Phone, Mail, 
  Globe, Award, ShieldCheck, X, Sparkles, TrendingUp, Cpu, Heart, Sprout
} from "lucide-react";

import { 
  Honouree, AwardCategory, Story, Nomination, SiteSettings, NominationStatus, CountryEdition, TicketTier 
} from "./types";

import { 
  initialHonourees, initialCategories, initialStories, initialSpeakers, 
  initialSessions, initialPartners, initialJudges, ticketTiers, initialSettings, initialNominations 
} from "./data/demoData";

// Modular Components
import Navbar from "./components/Navbar";
import ListExplorer from "./components/ListExplorer";
import NominationForm from "./components/NominationForm";
import AdminDashboard from "./components/AdminDashboard";
import EventCountdown from "./components/EventCountdown";
import ArticleView from "./components/ArticleView";
import InsightsDashboard from "./components/InsightsDashboard";
import GallerySection from "./components/GallerySection";
import Manifesto from "./components/Manifesto";

export default function App() {
  // Page Routing State
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Sophisticated Animated Brand Word Rotator for Home Hero
  const brandWords = [
    "WHAT'S NEXT.",
    "TOMORROW.",
    "INNOVATION.",
    "LEADERSHIP.",
    "NIGERIA.",
    "ENTERPRISE.",
    "THE FUTURE."
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [animateWord, setAnimateWord] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateWord(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % brandWords.length);
        setAnimateWord(true);
      }, 400);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Persistent States synced to LocalStorage
  const [honourees, setHonourees] = useState<Honouree[]>(() => {
    const saved = localStorage.getItem("u50_honourees");
    return saved ? JSON.parse(saved) : initialHonourees;
  });

  const [nominations, setNominations] = useState<Nomination[]>(() => {
    const saved = localStorage.getItem("u50_nominations");
    return saved ? JSON.parse(saved) : initialNominations;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem("u50_stories");
    return saved ? JSON.parse(saved) : initialStories;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem("u50_settings");
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Newsletter Subscribers list
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Ticketing Checkout state
  const [selectedTicket, setSelectedTicket] = useState<TicketTier | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Save states to LocalStorage
  useEffect(() => {
    localStorage.setItem("u50_honourees", JSON.stringify(honourees));
  }, [honourees]);

  useEffect(() => {
    localStorage.setItem("u50_nominations", JSON.stringify(nominations));
  }, [nominations]);

  useEffect(() => {
    localStorage.setItem("u50_stories", JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem("u50_settings", JSON.stringify(settings));
  }, [settings]);

  // Nomination Submission handler
  const handleAddNomination = (newNom: Nomination) => {
    setNominations((prev) => [newNom, ...prev]);
  };

  // Newsletter Submission handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      alert("Provide a valid email address.");
      return;
    }
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  // Ticket checkout handler
  const handleTicketCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone) {
      alert("Please fill in all requested contact fields.");
      return;
    }
    setCheckoutSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setSelectedTicket(null);
      setCheckoutSuccess(false);
      setCheckoutName("");
      setCheckoutEmail("");
      setCheckoutPhone("");
      alert("Simulated secure billing settlement successfully! Official delegate passes dispatched to your email.");
    }, 1800);
  };

  // Dynamic route rendering helpers
  const handleSelectPerson = (id: string) => {
    setCurrentPage(`person-${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStory = (slug: string) => {
    setCurrentPage(`story-${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPersonByName = (name: string) => {
    const found = honourees.find((h) => h.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setCurrentPage(`person-${found.id}`);
    } else {
      setCurrentPage("list");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter featured ones
  const featuredHonourees = honourees.filter((h) => h.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between font-sans relative antialiased selection:bg-brand-green selection:text-white editorial-grid-bg">
      {/* Cinematic noise texture overlay */}
      <div className="noise-overlay" />

      {/* Global Navigation Header */}
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        nominationsOpen={settings.nominationsOpen} 
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* ==================== VIEW 1: HOME/DISCOVER ==================== */}
        {currentPage === "home" && (
          <div id="view-home" className="space-y-0 animate-slide-up">
            
            {/* Immersive Cinematic Hero */}
            <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center bg-transparent overflow-hidden py-16">
              {/* Subtle background red accent glow */}
              <div className="ambient-glow top-[20%] left-1/2 -translate-x-1/2" />

              <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative">
                
                <h1 className="font-serif text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none max-w-5xl mx-auto select-none">
                  THE PEOPLE SHAPING <br />
                  <span className="inline-block relative min-h-[1.1em]">
                    <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#F9F8F6] to-white transition-all duration-500 transform ${animateWord ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                      {brandWords[wordIndex]}
                    </span>
                  </span>
                </h1>

                <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed select-none">
                  Discover the exceptional innovators, entrepreneurs, and executives under 50 building companies, leading institutions, transforming industries, and redefining Africa's future.
                </p>

                {/* Conversion Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-sm sm:max-w-none mx-auto">
                  <button
                    id="hero-explore-btn"
                    onClick={() => setCurrentPage("list")}
                    className="w-full sm:w-auto border border-white text-white text-xs uppercase tracking-widest font-black px-8 py-4 hover:bg-white hover:text-black transition-all cursor-pointer sharp-border"
                  >
                    Explore The List
                  </button>
                  <button
                    id="hero-nominate-btn"
                    onClick={() => setCurrentPage("nominate")}
                    className="w-full sm:w-auto bg-brand-green text-white text-xs uppercase tracking-widest font-black px-8 py-4 hover:bg-brand-green-hover transition-all cursor-pointer sharp-border shadow-lg shadow-brand-green/15 border-b-2 border-brand-green-hover"
                  >
                    Nominate Someone
                  </button>
                </div>

                {/* Subtle scroll indicator */}
                <div className="pt-16 text-gray-500 text-[10px] uppercase tracking-widest select-none animate-bounce">
                  SCROLL TO DISCOVER ↓
                </div>
              </div>
            </section>

            {/* Live / Current Edition Strip */}
            <div id="edition-strip" className="bg-[#0b0b0b] border-y border-brand-grey py-5">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex items-center space-x-3 justify-center md:justify-start">
                  <span className="w-2.5 h-2.5 bg-brand-green rounded-full animate-ping flex-shrink-0"></span>
                  <p className="text-xs uppercase tracking-widest font-black text-white">
                    UNDER50 NIGERIA {settings.currentEditionYear} • 
                    <span className="text-brand-green ml-1 font-bold">
                      {settings.nominationsOpen ? "NOMINATIONS OPEN" : "SHORTLIST ANNOUNCED"}
                    </span>
                  </p>
                </div>
                {settings.nominationsOpen ? (
                  <button
                    onClick={() => setCurrentPage("nominate")}
                    className="text-xs text-white hover:text-brand-green font-black uppercase tracking-widest flex items-center space-x-1.5 border-b border-white hover:border-brand-green pb-0.5 transition-all cursor-pointer"
                  >
                    <span>Submit an Inductee Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage("list")}
                    className="text-xs text-white hover:text-brand-green font-black uppercase tracking-widest flex items-center space-x-1.5 border-b border-white hover:border-brand-green pb-0.5 transition-all cursor-pointer"
                  >
                    <span>Discover Nominee Registry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Manifesto Section */}
            <Manifesto />

            {/* Featured UNDER50 Leaders Section */}
            <section id="featured-section" className="max-w-7xl mx-auto px-6 py-24 space-y-12 relative">
              <div className="ambient-glow top-[40%] right-10" />
              
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-grey pb-6">
                <div>
                  <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-1">INDIVIDUAL PROFILES</span>
                  <h3 className="font-serif text-3xl md:text-5xl font-bold text-white">FEATURED LEADERS</h3>
                </div>
                <button
                  onClick={() => setCurrentPage("list")}
                  className="text-xs text-gray-400 hover:text-brand-green font-bold uppercase tracking-widest flex items-center gap-1.5 mt-4 md:mt-0 cursor-pointer group"
                >
                  <span className="hover-underline-expand">View All 50 Honourees</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Grid of Featured Leaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredHonourees.map((person) => (
                  <div
                    key={person.id}
                    onClick={() => handleSelectPerson(person.id)}
                    className="bg-brand-charcoal border border-brand-grey cursor-pointer group hover:border-brand-green/60 transition-all duration-300 relative flex flex-col justify-between sharp-border"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-brand-black relative">
                      <img
                        src={person.portraitUrl}
                        alt={person.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <p className="text-[10px] text-brand-green uppercase tracking-wider font-bold mb-1">{person.category}</p>
                      <h4 className="font-serif text-xl font-bold text-white group-hover:text-brand-green transition-colors">{person.name}</h4>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{person.title} / {person.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conference & Countdown Strip */}
            <section id="countdown-banner" className="bg-transparent border-y border-brand-grey py-24 space-y-12 relative">
              <div className="ambient-glow bottom-[10%] left-10" />
              <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                <span className="text-xs text-brand-green font-black uppercase tracking-widest block">ANNUAL CONFERENCE CONVENE</span>
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none">
                  THE COUNTDOWN IS ON
                </h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                  Join the leaders redefining enterprise at the annual UNDER50 Nigeria Leadership Summit. Secured seating passes are strictly credentialed.
                </p>
                <EventCountdown 
                  targetDateStr={settings.countdownDate} 
                  targetTimeStr={settings.countdownTime} 
                />
                <div className="pt-6">
                  <button
                    onClick={() => setCurrentPage("conference")}
                    className="bg-brand-green text-white text-xs uppercase tracking-widest font-black px-8 py-4 hover:bg-brand-green-hover transition-colors cursor-pointer sharp-border border-b-2 border-brand-green-hover"
                  >
                    Secure Delegates Passes
                  </button>
                </div>
              </div>
            </section>

            {/* Recent Stories (CMS Articles) */}
            <section id="home-stories-section" className="max-w-7xl mx-auto px-6 py-24 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-grey pb-6">
                <div>
                  <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-1">INTELLECTUAL INSIGHTS</span>
                  <h3 className="font-serif text-3xl md:text-5xl font-bold text-white">STORIES & ESSAYS</h3>
                </div>
                <button
                  onClick={() => setCurrentPage("stories")}
                  className="text-xs text-gray-400 hover:text-brand-green font-bold uppercase tracking-widest flex items-center gap-1.5 mt-4 md:mt-0 cursor-pointer group"
                >
                  <span className="hover-underline-expand">Explore Stories Index</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stories.slice(0, 3).map((story) => (
                  <div
                    key={story.id}
                    onClick={() => handleSelectStory(story.slug)}
                    className="bg-brand-charcoal border border-brand-grey cursor-pointer group hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between sharp-border"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-brand-black relative">
                      <img src={story.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                      <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between min-h-[180px]">
                      <div>
                        <span className="text-[10px] text-brand-green uppercase font-black">{story.category}</span>
                        <h4 className="font-serif text-lg font-bold text-white mt-2 group-hover:text-brand-green transition-colors line-clamp-2">
                          {story.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{story.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-6 border-t border-brand-grey/40 pt-4">
                        <span>By {story.author}</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sponsors & Partners logo grid */}
            <section id="partners-section" className="bg-[#0b0b0b] py-24 border-t border-brand-grey">
              <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="text-center">
                  <span className="text-xs text-brand-green font-black uppercase tracking-widest">Global Alliances</span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white uppercase mt-1">BUILD THE FUTURE WITH US</h3>
                  <p className="text-gray-400 text-xs mt-2 max-w-sm mx-auto">Connecting under-50 leaders with major institutional and audit networks.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
                  {initialPartners.map((prt) => (
                    <div key={prt.id} className="bg-brand-charcoal border border-brand-grey p-6 flex flex-col items-center justify-center text-center group hover:border-brand-green/50 transition-all duration-300 sharp-border">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-3 bg-brand-black flex-shrink-0">
                        <img src={prt.logoUrl} alt="" className="w-full h-full object-cover grayscale" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-black text-brand-green block mb-1">{prt.tier} Partner</span>
                      <span className="text-xs text-white font-bold block truncate max-w-full">{prt.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter Subscription */}
            <section id="newsletter-section" className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
              <span className="text-xs text-brand-green font-black uppercase tracking-widest block">The Dispatch List</span>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase">STAY AHEAD OF WHAT'S NEXT</h3>
              <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                Get stories, exclusive opportunities, demographic insights, and key announcements from the UNDER50 ecosystem directly to your terminal.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your executive email address..."
                  className="flex-grow bg-brand-charcoal border border-brand-grey p-3.5 text-xs text-white focus:outline-none focus:border-brand-green transition-all sharp-border"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="bg-brand-green text-white text-xs uppercase tracking-widest font-black px-6 py-3.5 hover:bg-brand-green-hover transition-all cursor-pointer sharp-border border-b-2 border-brand-green-hover"
                >
                  Join The List
                </button>
              </form>
              {newsletterSuccess && (
                <p className="text-xs text-green-500 font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Securely connected to email dispatch server!
                </p>
              )}
            </section>

            {/* Final CTA Closing Section */}
            <section id="final-cta" className="bg-[#0b0b0b] border-t border-brand-grey py-24 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-green/5 pointer-events-none -z-10" />
              <h2 className="font-serif text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-none max-w-4xl mx-auto select-none">
                WHO IS SHAPING <br />
                <span className="text-brand-green">WHAT'S NEXT?</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                Maybe it's you. Maybe it's someone you know. Help us discover and document those building Nigeria's tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
                <button
                  onClick={() => setCurrentPage("nominate")}
                  className="w-full bg-brand-green text-white text-xs uppercase tracking-widest font-black py-4 hover:bg-brand-green-hover transition-colors cursor-pointer sharp-border shadow-lg shadow-brand-green/10 border-b-2 border-brand-green-hover"
                >
                  Nominate Someone
                </button>
                <button
                  onClick={() => setCurrentPage("list")}
                  className="w-full border border-brand-grey text-white text-xs uppercase tracking-widest font-bold py-4 hover:bg-white hover:text-black transition-colors cursor-pointer sharp-border"
                >
                  Explore The List
                </button>
              </div>
            </section>

          </div>
        )}

        {/* ==================== VIEW 2: THE LIST ==================== */}
        {currentPage === "list" && (
          <div id="view-list" className="animate-slide-up">
            <ListExplorer 
              honourees={honourees} 
              categories={initialCategories} 
              onSelectPerson={handleSelectPerson} 
            />
          </div>
        )}

        {/* ==================== VIEW 3: AWARDS VIEW ==================== */}
        {currentPage === "awards" && (
          <div id="view-awards" className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-slide-up">
            <div className="border-b border-brand-grey pb-8 mb-8">
              <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-2">Recognition Criteria</span>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">THE UNDER50 AWARDS</h1>
              <p className="text-gray-400 text-sm max-w-xl mt-3 leading-relaxed">
                Rewarding those who turn ambition into measurable societal and industrial outcomes across 12 distinct impact categories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {initialCategories.map((cat, idx) => (
                <div key={cat.id} className="bg-brand-charcoal border border-brand-grey p-8 space-y-4 hover:border-brand-green/40 transition-all duration-300 relative flex flex-col justify-between sharp-border">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-brand-green font-bold">CATEGORY 0{idx + 1}</span>
                    <h3 className="font-serif text-2xl font-bold text-white">{cat.name}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{cat.description}</p>
                    <div className="bg-brand-black p-4 border-l-2 border-brand-green text-xs sharp-border">
                      <p className="font-black text-gray-500 uppercase tracking-widest mb-1">Standard Benchmarks</p>
                      <p className="text-gray-300 leading-relaxed font-sans">{cat.criteria}</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setCurrentPage("nominate");
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="text-xs text-brand-green hover:text-white uppercase tracking-widest font-black border-b border-brand-green pb-0.5 transition-all cursor-pointer"
                    >
                      Propose Nominee for Category →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Judges panel list */}
            <section className="bg-brand-charcoal border border-brand-grey p-8 md:p-12 space-y-8 sharp-border">
              <div className="border-b border-brand-grey pb-4">
                <span className="text-xs text-brand-green font-black uppercase tracking-widest block">Audit Integrity</span>
                <h3 className="font-serif text-3xl font-bold text-white">THE ADVISORY BOARD</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {initialJudges.map((jdg) => (
                  <div key={jdg.id} className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto bg-brand-black">
                      <img src={jdg.portraitUrl} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white leading-tight">{jdg.name}</h4>
                      <p className="text-[9px] text-brand-green uppercase font-black tracking-wider mt-0.5">{jdg.organization}</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-1 line-clamp-3">{jdg.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== VIEW 4: CONFERENCE VIEW ==================== */}
        {currentPage === "conference" && (
          <div id="view-conference" className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-slide-up">
            {/* Header */}
            <div className="border-b border-brand-grey pb-8">
              <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-2">Sovereign Conclave</span>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">UNDER50 CONFERENCE</h1>
              <p className="text-gray-400 text-sm max-w-xl mt-3 leading-relaxed">
                Where the leaders reshaping enterprise meet to map regional progress. Standard seatings are strictly limited.
              </p>
            </div>

            {/* Speaker Directory */}
            <section className="space-y-8">
              <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey/40 pb-3 uppercase">CONFERENCE SPEAKERS</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {initialSpeakers.map((spk) => (
                  <div key={spk.id} className="space-y-3 group">
                    <div className="aspect-square bg-brand-black overflow-hidden border border-brand-grey/40 sharp-border">
                      <img
                        src={spk.portraitUrl}
                        alt={spk.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">{spk.name}</h4>
                      <p className="text-[10px] text-brand-green uppercase tracking-wider font-bold mt-0.5">{spk.position} at {spk.organization}</p>
                      <p className="text-[10px] text-gray-400 italic leading-relaxed mt-1 line-clamp-2">"{spk.topic}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Agenda Schedule */}
            <section className="space-y-8">
              <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey/40 pb-3 uppercase">SUMMIT AGENDA TIMELINE</h3>
              <div className="border border-brand-grey bg-brand-charcoal/30 divide-y divide-brand-grey/30 sharp-border">
                {initialSessions.map((sess) => (
                  <div key={sess.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-brand-charcoal/20 transition-all">
                    <div className="w-24 flex-shrink-0">
                      <span className="font-serif text-xl font-black text-brand-green">{sess.time}</span>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{sess.category}</p>
                    </div>
                    <div className="flex-grow space-y-2">
                      <h4 className="font-serif text-lg font-bold text-white">{sess.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">{sess.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ticketing Selection Grid */}
            <section className="space-y-8">
              <div className="border-b border-brand-grey/40 pb-3">
                <h3 className="font-serif text-2xl font-bold text-white uppercase">DELEGATE ENTRANCE SECURED TICKETS</h3>
                <p className="text-gray-400 text-xs mt-1">Acquire admission passes securely. Checkout processes are fully simulated.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {ticketTiers.map((tier) => (
                  <div key={tier.id} className="bg-brand-charcoal border border-brand-grey p-6 flex flex-col justify-between space-y-6 sharp-border">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-brand-green font-black block mb-1">Pass Tier</span>
                        <h4 className="font-serif text-xl font-bold text-white">{tier.name}</h4>
                      </div>

                      <div className="border-y border-brand-grey/40 py-4">
                        <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Standard Fee</p>
                        <p className="font-serif text-3xl font-black text-white">₦{tier.price.toLocaleString()}</p>
                      </div>

                      <ul className="space-y-2 text-xs text-gray-400 list-none">
                        {tier.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-brand-green mt-0.5 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTicket(tier);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-brand-green text-white py-3 text-xs uppercase tracking-widest font-black hover:bg-brand-green-hover transition-colors cursor-pointer sharp-border"
                    >
                      Acquire Credentials →
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== VIEW 5: STORIES CATALOG ==================== */}
        {currentPage === "stories" && (
          <div id="view-stories" className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-slide-up">
            <div className="border-b border-brand-grey pb-8">
              <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-2">Editorial Platform</span>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">STORIES & ANALYSIS</h1>
              <p className="text-gray-400 text-sm max-w-xl mt-3 leading-relaxed">
                Premium essays, honouree profiles, and sector research tracking the systemic development of regional industries.
              </p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => handleSelectStory(story.slug)}
                  className="bg-brand-charcoal border border-brand-grey cursor-pointer group hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between sharp-border"
                >
                  <div className="aspect-video overflow-hidden bg-brand-black relative">
                    <img src={story.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 animate-fadeIn" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between min-h-[180px]">
                    <div>
                      <span className="text-[10px] text-brand-green uppercase font-black">{story.category}</span>
                      <h4 className="font-serif text-lg font-bold text-white mt-2 group-hover:text-brand-green transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{story.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-6 border-t border-brand-grey/40 pt-4">
                      <span>By {story.author}</span>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== VIEW 6: INSIGHTS VIEW ==================== */}
        {currentPage === "insights" && (
          <div id="view-insights" className="animate-slide-up">
            <InsightsDashboard honourees={honourees} />
          </div>
        )}

        {/* ==================== VIEW 7: ABOUT METRICS ==================== */}
        {currentPage === "about" && (
          <div id="view-about" className="max-w-5xl mx-auto px-6 py-12 space-y-16 animate-slide-up">
            
            {/* Heading */}
            <div className="border-b border-brand-grey pb-8 text-center">
              <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-2">Our Mission</span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-tight uppercase leading-none">A GENERATION WORTH WATCHING</h1>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
                UNDER50 Nigeria is not merely an awards ceremony; it is a permanent institution celebrating and connecting the exceptional under-50 minds redefining local markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300 leading-relaxed max-w-4xl mx-auto font-serif">
              <p>
                As West Africa's economic footprint expands, the responsibility of structural development falls squarely upon a highly energetic, highly disciplined cohort of next-generation leaders. We recognize that documenting their journeys, benchmarks, and investment profiles is critical to regional capital velocity and long-term ecosystem health.
              </p>
              <p>
                Under our rigorous evaluation frameworks, we auditing candidates across 12 distinct industries, ensuring each inductee index has built high-integrity, scalable, and verifiable systemic value. From fintech pipelines to agricultural cooling hubs, our list is a testament to African excellence.
              </p>
            </div>

            {/* Methodology workflow cards */}
            <section className="space-y-8 border-t border-brand-grey pt-12">
              <h3 className="font-serif text-2xl font-bold text-white uppercase text-center">Methodology Selection Protocol</h3>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                {[
                  { step: "01", name: "Discovery", desc: "Digital nomination and corporate database scanning index opens globally." },
                  { step: "02", name: "Review", desc: "First-round quantitative audit verifying professional details & metrics." },
                  { step: "03", name: "Evaluation", desc: "Advisory boards score portfolios against UN SDG & socio-economic metrics." },
                  { step: "04", name: "Shortlist", desc: "Top 12 nominees per category compiled for final administrative audit." },
                  { step: "05", name: "Judging", desc: "PwC verified judges score portfolios under secure guidelines." },
                  { step: "06", name: "Recognition", desc: "Official grand induction Class list published and Yearbooks cataloged." }
                ].map((mth) => (
                  <div key={mth.step} className="bg-brand-charcoal border border-brand-grey p-5 space-y-2 text-center sharp-border">
                    <span className="font-mono text-xs text-brand-green font-black block">{mth.step}</span>
                    <h4 className="font-serif text-sm font-bold text-white">{mth.name}</h4>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{mth.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== VIEW 8: NOMINATE FORM ==================== */}
        {currentPage === "nominate" && (
          <div id="view-nominate" className="animate-slide-up">
            <NominationForm 
              categories={initialCategories} 
              onAddNomination={handleAddNomination} 
            />
          </div>
        )}

        {/* ==================== VIEW 9: ADMIN PANEL ==================== */}
        {currentPage === "admin" && (
          <div id="view-admin" className="animate-slide-up">
            <AdminDashboard
              honourees={honourees}
              categories={initialCategories}
              stories={stories}
              nominations={nominations}
              settings={settings}
              onUpdateHonourees={setHonourees}
              onUpdateStories={setStories}
              onUpdateNominations={setNominations}
              onUpdateSettings={setSettings}
            />
          </div>
        )}

        {/* ==================== VIEW 10: ARTICLE VIEW ==================== */}
        {currentPage.startsWith("story-") && (
          <div id="view-article" className="animate-slide-up">
            {(() => {
              const slug = currentPage.replace("story-", "");
              const story = stories.find((s) => s.slug === slug);
              if (!story) return <p className="text-center py-24">Story article not found.</p>;
              return (
                <ArticleView
                  story={story}
                  onBack={() => setCurrentPage("stories")}
                  onSelectPersonByName={handleSelectPersonByName}
                />
              );
            })()}
          </div>
        )}

        {/* ==================== VIEW 11: PERSON DETAIL VIEW ==================== */}
        {currentPage.startsWith("person-") && (
          <div id="view-person" className="animate-slide-up">
            {(() => {
              const id = currentPage.replace("person-", "");
              const person = honourees.find((h) => h.id === id);
              if (!person) return <p className="text-center py-24">Profile not found.</p>;
              return (
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                  <button
                    onClick={() => setCurrentPage("list")}
                    className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-brand-green flex items-center space-x-1 transition-colors cursor-pointer border border-brand-grey px-4 py-2 sharp-border"
                  >
                    <span>← Retrack to Registry</span>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-b border-brand-grey pb-12">
                    {/* Portrait */}
                    <div className="md:col-span-5 aspect-[4/5] overflow-hidden bg-brand-black border border-brand-grey sharp-border">
                      <img
                        src={person.portraitUrl}
                        alt={person.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>

                    {/* Meta */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs text-brand-green font-black uppercase tracking-widest block">{person.category}</span>
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">{person.name}</h1>
                        <p className="font-semibold text-lg text-gray-300">{person.title} at <span className="text-white border-b border-brand-green/50">{person.organization}</span></p>
                      </div>

                      <div className="flex items-center space-x-6 text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-brand-green" />
                          {person.state} Origin
                        </span>
                        <span>•</span>
                        <span>Class of {person.year}</span>
                      </div>

                      {person.quote && (
                        <div className="bg-brand-charcoal p-6 border-l-2 border-brand-green italic text-sm md:text-base text-gray-300 font-serif leading-relaxed sharp-border">
                          "{person.quote}"
                        </div>
                      )}

                      <div className="space-y-2 text-xs">
                        <h4 className="font-black text-gray-500 uppercase tracking-widest">Key Accomplishment Benchmark</h4>
                        <p className="text-white leading-relaxed text-sm">{person.achievement}</p>
                      </div>
                    </div>
                  </div>

                  {/* Biography & Why they matter */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-sm leading-relaxed text-gray-300 font-serif">
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="font-serif text-xl font-bold text-white border-b border-brand-grey pb-2">Professional Biography</h3>
                      <p>{person.bio}</p>
                    </div>
                    <div className="md:col-span-5 space-y-4">
                      <h3 className="font-serif text-xl font-bold text-white border-b border-brand-grey pb-2">Why They Matter</h3>
                      <p className="italic text-gray-400">"{person.whyTheyMatter || 'Their leadership sets a prime standard for ecosystem resilience.'}"</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </main>

      {/* SECURE TICKET CHECKOUT MODAL */}
      {isCheckoutOpen && selectedTicket && (
        <div id="checkout-modal-backdrop" className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-brand-grey max-w-md w-full p-8 space-y-6 sharp-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-brand-grey pb-4">
              <div>
                <span className="text-[10px] text-brand-green font-black uppercase tracking-widest">Credential Checkout</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Delegate Admission</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-brand-black p-4 border border-brand-grey/65 flex justify-between items-center text-xs sharp-border">
              <div>
                <p className="text-white font-bold">{selectedTicket.name}</p>
                <p className="text-gray-500 text-[10px] uppercase">Tier level pass</p>
              </div>
              <p className="font-serif text-lg font-black text-brand-green">₦{selectedTicket.price.toLocaleString()}</p>
            </div>

            <form onSubmit={handleTicketCheckout} className="space-y-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Delegate Full Name *</label>
                <input
                  type="text"
                  required
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                  placeholder="e.g. Amina Adebayo"
                  className="bg-brand-black border border-brand-grey p-2.5 text-white sharp-border"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Executive Email *</label>
                <input
                  type="email"
                  required
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="e.g. amina@helios.ng"
                  className="bg-brand-black border border-brand-grey p-2.5 text-white sharp-border"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Contact Telephone *</label>
                <input
                  type="tel"
                  required
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
                  placeholder="e.g. +234 803 111 2222"
                  className="bg-brand-black border border-brand-grey p-2.5 text-white sharp-border"
                />
              </div>

              {checkoutSuccess ? (
                <div className="text-center text-xs text-green-500 font-bold uppercase tracking-wider py-2 animate-pulse">
                  Verifying secure banking token...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-brand-green text-white py-3 text-xs uppercase tracking-widest font-black hover:bg-brand-green-hover transition-colors cursor-pointer sharp-border border-b-2 border-brand-green-hover"
                >
                  Pay secure with Paystack / Flutterwave
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Premium Editorial Footer */}
      <footer id="premium-footer" className="bg-[#020202] border-t border-brand-grey pt-20 pb-12 select-none relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-grey/40 pb-16">
          
          {/* Main info column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-green flex items-center justify-center font-serif text-white text-xl font-bold sharp-border">
                50
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest font-black text-white">
                  UNDER50
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 -mt-1 font-sans">
                  NIGERIA
                </span>
              </div>
            </div>

            <p className="font-serif italic text-gray-400 text-lg max-w-md leading-relaxed">
              "Celebrating the innovators, entrepreneurs, executives, creatives, and institution-builders redefining Nigeria before the age of 50."
            </p>

            <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest font-black">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Independent Selection Protocol</span>
            </div>
          </div>

          {/* Quick links indices */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-brand-grey/30 pb-1">Index Navigation</p>
              <button onClick={() => { setCurrentPage("home"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Discover Hub</button>
              <button onClick={() => { setCurrentPage("list"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">The List Registry</button>
              <button onClick={() => { setCurrentPage("awards"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Awards Categories</button>
              <button onClick={() => { setCurrentPage("conference"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Conference Pass</button>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-brand-grey/30 pb-1">Insights & Legal</p>
              <button onClick={() => { setCurrentPage("stories"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Stories & Essays</button>
              <button onClick={() => { setCurrentPage("insights"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Demographic Insights</button>
              <button onClick={() => { setCurrentPage("about"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-gray-400 hover:text-white cursor-pointer text-left">Our Manifesto</button>
              <button onClick={() => { setCurrentPage("nominate"); window.scrollTo({top:0,behavior:"smooth"}); }} className="block text-brand-green hover:underline cursor-pointer text-left font-bold">Nominate Leader</button>
            </div>
          </div>

          {/* Socials & Audit partners */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-brand-grey/30 pb-1">Social Channels</p>
            <div className="flex flex-wrap gap-2">
              {["LinkedIn", "X / Twitter", "Instagram", "WhatsApp"].map((sc) => (
                <a
                  key={sc}
                  href={sc === "WhatsApp" ? settings.whatsappContact : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-white border border-brand-grey hover:border-brand-green px-3 py-1.5 transition-colors sharp-border"
                >
                  {sc}
                </a>
              ))}
            </div>
            <div className="p-3 bg-brand-charcoal border border-brand-grey text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider sharp-border">
              Auditor validation: <span className="text-white font-bold">PricewaterhouseCoopers (PwC) Nigeria</span>
            </div>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} UNDER50 NIGERIA platform. All sovereign rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Conduct Terms</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
