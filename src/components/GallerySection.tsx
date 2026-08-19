import React, { useState } from "react";
import { X, Play, ZoomIn, Eye, Image as ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  category: "gala" | "conference" | "backstage";
  title: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    category: "gala",
    title: "Gala Grand Induction Keynote",
    caption: "The Class of 2026 inductees receiving official plaques at the Lagos Oriental Grand Ballroom."
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    category: "conference",
    title: "Sovereign Enterprise Plenary Panel",
    caption: "Panellists debating supply networks and high-throughput monetary corridors in front of 2,000 delegates."
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
    category: "conference",
    title: "Technology Showcase Keynote",
    caption: "Amina Adebayo presenting the regional transactions ledger architecture mapping global benchmarks."
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    category: "backstage",
    title: "Behind-the-scenes Press Interactions",
    caption: "Award winners conducting exclusive interviews with international media houses."
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
    category: "gala",
    title: "Private Ministerial Roundtables",
    caption: "Inductees, advisory judges, and public directors discussing policy frameworks."
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    category: "backstage",
    title: "VIP Executive Matchmaking Cocktail",
    caption: "High-value matches mapping active VC seed pools to innovative infrastructure projects."
  }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "gala" | "conference" | "backstage">("ALL");
  const [activeLightbox, setActiveLightbox] = useState<GalleryImage | null>(null);

  const filteredImages = GALLERY_IMAGES.filter((img) =>
    activeFilter === "ALL" ? true : img.category === activeFilter
  );

  return (
    <div id="gallery-archive" className="space-y-8 max-w-7xl mx-auto px-6 py-12">
      {/* Category Toggles */}
      <div className="flex flex-wrap gap-3 border-b border-brand-grey pb-6">
        {["ALL", "gala", "conference", "backstage"].map((filt) => (
          <button
            key={filt}
            id={`filter-${filt}`}
            onClick={() => setActiveFilter(filt as any)}
            className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2 transition-all border cursor-pointer ${
              activeFilter === filt
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-brand-grey/50 hover:border-white"
            }`}
          >
            {filt === "ALL" ? "THE FULL ARCHIVE" : `${filt} Night`}
          </button>
        ))}
      </div>

      {/* Masonry Cascading Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveLightbox(img)}
            className="group relative overflow-hidden bg-brand-black border border-brand-grey/40 cursor-pointer aspect-square sm:aspect-video lg:aspect-[4/3]"
          >
            <img
              src={img.url}
              alt={img.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
            />
            {/* Dark Mask Reveal */}
            <div className="absolute inset-0 bg-brand-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Hover details Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-brand-black/90 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[9px] text-brand-red font-black uppercase tracking-widest block mb-1">
                {img.category} night
              </span>
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                {img.title}
                <ZoomIn className="w-4 h-4 text-brand-red" />
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div
          id="lightbox-backdrop"
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6 animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          {/* Top Bar controls */}
          <div className="flex justify-between items-center text-white">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
              UNDER50 ARCHIVE • {activeLightbox.category} night
            </span>
            <button
              onClick={() => setActiveLightbox(null)}
              className="p-2 text-gray-400 hover:text-white hover:bg-brand-charcoal cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="max-w-4xl mx-auto my-auto aspect-video max-h-[70vh] relative flex items-center justify-center">
            <img
              src={activeLightbox.url}
              alt={activeLightbox.title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[70vh] object-contain border border-brand-grey"
              onClick={(e) => e.stopPropagation()} // Stop propagation to backdrop
            />
          </div>

          {/* Bottom Caption Info */}
          <div className="max-w-xl mx-auto text-center space-y-2 pb-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl font-bold text-white">{activeLightbox.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">{activeLightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
