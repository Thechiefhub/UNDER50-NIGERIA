import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, User, Share2, Copy, Send, Check } from "lucide-react";
import { Story } from "../types";

interface ArticleViewProps {
  story: Story;
  onBack: () => void;
  onSelectPersonByName: (name: string) => void;
}

export default function ArticleView({ story, onBack, onSelectPersonByName }: ArticleViewProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Read "${story.title}" by ${story.author} on UNDER50 NIGERIA: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <article id="article-view-panel" className="max-w-4xl mx-auto px-6 py-12">
      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-[3px] bg-brand-charcoal z-50">
        <div className="h-full bg-brand-green transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Back CTA */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-brand-green transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Stories Portal</span>
      </button>

      {/* Hero Meta */}
      <div className="space-y-4 mb-10">
        <span className="text-xs text-brand-green font-black uppercase tracking-widest bg-brand-green/10 px-2.5 py-1">
          {story.category}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          {story.title}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed font-serif italic border-l-2 border-brand-green pl-4">
          {story.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 pt-4 border-t border-brand-grey/40">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <User className="w-4 h-4 text-brand-green" />
            {story.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {story.readTime}
          </span>
          <span>{story.date}</span>
        </div>
      </div>

      {/* Big Header Image */}
      <div className="aspect-[21/9] w-full overflow-hidden bg-brand-black border border-brand-grey/50 mb-12">
        <img
          src={story.imageUrl}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sharing Side Tray */}
        <div className="lg:col-span-2 flex lg:flex-col lg:space-y-4 justify-start items-center gap-4 lg:border-r lg:border-brand-grey/40 lg:pr-8 h-fit">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black hidden lg:block">Share</p>
          
          <button
            onClick={handleCopyLink}
            className="p-3 bg-brand-charcoal border border-brand-grey hover:border-white text-gray-400 hover:text-white transition-all rounded-none cursor-pointer"
            title="Copy Article Link"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleShareWhatsApp}
            className="p-3 bg-brand-charcoal border border-brand-grey hover:border-brand-green text-gray-400 hover:text-brand-green transition-all rounded-none cursor-pointer"
            title="Share via WhatsApp"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Text Content */}
        <div className="lg:col-span-10 text-gray-300 text-base md:text-lg leading-relaxed font-serif max-w-[70ch] space-y-6">
          <p>
            The current generation of Nigerian builders represents an unprecedented departure from standard corporate history. These under-50 innovators are looking at structural challenges — from capital accessibility to logistics limits — not as barriers, but as native opportunities to architect multi-billion dollar protocols.
          </p>

          {/* Pullquote */}
          <blockquote className="bg-brand-charcoal border-l-4 border-brand-green p-6 my-8 font-serif italic text-white text-lg md:text-xl">
            "We aren't waiting for institutions to adapt. We are building the concrete, sovereign rails that will guide our cities and food grids into the next century."
          </blockquote>

          <p>
            When examining the profiles of leading technology officers like <span onClick={() => onSelectPersonByName("Amina Adebayo")} className="text-brand-green hover:underline cursor-pointer font-sans font-bold">Amina Adebayo</span> or climate agronomists like <span onClick={() => onSelectPersonByName("Chidi Egwu")} className="text-brand-green hover:underline cursor-pointer font-sans font-bold">Chidi Egwu</span>, we see a recurring theme of profound discipline and long-term ecosystem investment.
          </p>

          <p>
            They prove that genuine leadership does not require half a century of slow ladders; it requires immediate, high-fidelity action that directly transforms communities. As we document their progress, we create an active reference archive for those who will step onto the stage tomorrow.
          </p>

          <div className="border-t border-brand-grey/50 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Next Article</p>
              <h4 className="font-serif text-base font-bold text-white mt-1 hover:text-brand-green transition-colors cursor-pointer" onClick={onBack}>
                Structuring Next-Generation Business Ecosystems →
              </h4>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
