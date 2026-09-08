import React from "react";
import { Award, ShieldCheck } from "lucide-react";

export default function Manifesto() {
  return (
    <section id="platform-manifesto" className="bg-[#0b0b0b] border-y border-brand-grey/40 py-24 select-none relative overflow-hidden">
      {/* Background oversized watermarked text */}
      <div className="absolute right-0 bottom-0 text-[18rem] md:text-[24rem] font-serif font-black text-[#111] leading-none translate-y-24 translate-x-12 pointer-events-none -z-10 select-none">
        50
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-10 relative">
        <div className="w-12 h-12 bg-brand-green flex items-center justify-center mx-auto mb-6">
          <Award className="w-6 h-6 text-white" />
        </div>

        <span className="text-xs text-brand-green font-black uppercase tracking-widest block mb-2">
          THE UNDER50 MANIFESTO
        </span>

        {/* Massive headline */}
        <h2 className="font-serif text-4xl md:text-7xl font-black text-white tracking-tight leading-none max-w-4xl mx-auto uppercase">
          Nigeria doesn't wait for the future.
        </h2>

        {/* Supporting detailed editorial text */}
        <p className="text-gray-400 text-lg md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto font-light">
          The future is already being built — in boardrooms, laboratories, studios, farms, classrooms, startups, hospitals, investment firms, communities, and homes across Nigeria.
        </p>

        {/* Closing punch */}
        <p className="text-white text-xl md:text-3xl font-bold tracking-tight uppercase border-t border-brand-grey/40 pt-10 max-w-lg mx-auto">
          UNDER50 NIGERIA exists to find the people building it.
        </p>

        <div className="flex items-center justify-center gap-2 pt-6 text-[10px] text-gray-500 uppercase tracking-widest font-black">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span>Independent. Audited. Systemic.</span>
        </div>
      </div>
    </section>
  );
}
