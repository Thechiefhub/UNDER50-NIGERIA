import React, { useMemo } from "react";
import { Honouree } from "../types";
import { TrendingUp, Award, MapPin, Users, Info } from "lucide-react";

interface InsightsDashboardProps {
  honourees: Honouree[];
}

export default function InsightsDashboard({ honourees }: InsightsDashboardProps) {
  // Compute analytics dynamically from full dataset
  const statistics = useMemo(() => {
    const total = honourees.length;
    
    // Industries
    const industryMap: Record<string, number> = {};
    const stateMap: Record<string, number> = {};
    const genderMap: Record<string, number> = { Male: 0, Female: 0 };
    const countryMap: Record<string, number> = {};

    honourees.forEach((h) => {
      industryMap[h.industry] = (industryMap[h.industry] || 0) + 1;
      stateMap[h.state] = (stateMap[h.state] || 0) + 1;
      genderMap[h.gender] = (genderMap[h.gender] || 0) + 1;
      countryMap[h.country] = (countryMap[h.country] || 0) + 1;
    });

    // Convert to sorted arrays
    const topIndustries = Object.entries(industryMap)
      .map(([name, count]) => ({ name, count, pct: (count / total) * 100 }))
      .sort((a, b) => b.count - a.count);

    const topStates = Object.entries(stateMap)
      .map(([name, count]) => ({ name, count, pct: (count / total) * 100 }))
      .sort((a, b) => b.count - a.count);

    const regionalSpread = Object.entries(countryMap)
      .map(([name, count]) => ({ name, count, pct: (count / total) * 100 }));

    return {
      total,
      topIndustries,
      topStates,
      regionalSpread,
      gender: {
        male: genderMap.Male,
        malePct: (genderMap.Male / total) * 100,
        female: genderMap.Female,
        femalePct: (genderMap.Female / total) * 100
      }
    };
  }, [honourees]);

  return (
    <section id="insights-dashboard" className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Heading */}
      <div className="border-b border-brand-grey pb-8 mb-12">
        <div className="flex items-center space-x-2 text-brand-green text-xs uppercase tracking-widest font-bold mb-3">
          <TrendingUp className="w-4 h-4" />
          <span>Under50 Insights</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-tight">
          THE INTELLIGENCE LAYER
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3 leading-relaxed">
          Mapping the demographics, geographic distribution, and sector trends of the generation restructuring the African economic landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Analytics Highlight */}
        <div className="lg:col-span-8 bg-brand-charcoal border border-brand-grey p-8 space-y-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-brand-green font-black uppercase tracking-widest block mb-2">Ecosystem Authority</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              Where Nigeria's Under-50 Leaders Are Building
            </h3>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed max-w-lg">
              Venture activity and leadership densities are consolidating around crucial enabling infrastructure and foundational logistics networks.
            </p>
          </div>

          {/* SVG / Bar Chart Representation */}
          <div className="space-y-4">
            {statistics.topIndustries.slice(0, 5).map((ind, idx) => (
              <div key={ind.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <span className="text-brand-green font-mono font-bold text-[10px]">0{idx + 1}</span>
                    {ind.name}
                  </span>
                  <span className="text-gray-400 font-mono font-bold">
                    {ind.count} Leaders ({ind.pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-brand-black">
                  <div 
                    className="h-full bg-brand-green transition-all duration-500" 
                    style={{ width: `${ind.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State/Geographic Index */}
        <div className="lg:col-span-4 bg-brand-charcoal border border-brand-grey p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-2">Geographic Distribution</span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Cities Driving the Next Wave
            </h3>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              Tracking state-by-state origin and operational hubs of list inductees across Nigeria's major industrial nodes.
            </p>
          </div>

          {/* Vertical Grid for geographic data */}
          <div className="space-y-4 my-8">
            {statistics.topStates.slice(0, 4).map((st) => (
              <div key={st.name} className="flex justify-between items-center border-b border-brand-grey/40 pb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-green" />
                  <span className="text-xs text-white font-bold">{st.name} State</span>
                </div>
                <span className="text-xs font-mono font-bold text-gray-400">{st.count} Inductees</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-gray-500 uppercase tracking-widest border-t border-brand-grey/40 pt-4 flex items-center gap-1.5 font-bold">
            <Info className="w-3.5 h-3.5 text-brand-green" />
            <span>Audited annually by PwC Nigeria registry advisors.</span>
          </div>
        </div>
      </div>

      {/* Demographics Parity Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gender Demographics Bar Chart */}
        <div className="bg-brand-charcoal border border-brand-grey p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-2">Demographic Indices</span>
            <h3 className="font-serif text-xl font-bold text-white">Gender Representation Ratio</h3>
            <p className="text-gray-400 text-xs mt-1">A dynamic audit of under-50 gender parity ratios across the aggregate list registry.</p>
          </div>

          <div className="my-8">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              <span>Female ({statistics.gender.femalePct.toFixed(0)}%)</span>
              <span>Male ({statistics.gender.malePct.toFixed(0)}%)</span>
            </div>
            {/* Horizontal divided bar */}
            <div className="w-full h-8 flex">
              <div className="bg-brand-green h-full" style={{ width: `${statistics.gender.femalePct}%` }} title="Female representation" />
              <div className="bg-white h-full" style={{ width: `${statistics.gender.malePct}%` }} title="Male representation" />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-2">
              <span>{statistics.gender.female} Leaders</span>
              <span>{statistics.gender.male} Leaders</span>
            </div>
          </div>
        </div>

        {/* Global Expansion Map Block */}
        <div className="bg-brand-charcoal border border-brand-grey p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-brand-green font-black uppercase tracking-widest block mb-2">Continental Expansion</span>
            <h3 className="font-serif text-xl font-bold text-white">UNDER50 Sub-Saharan Readiness</h3>
            <p className="text-gray-400 text-xs mt-1">Architected to map regional cohorts as the platform scales across neighboring African economic channels.</p>
          </div>

          <div className="space-y-3 my-6">
            <div className="flex justify-between items-center text-xs border-b border-brand-grey/40 pb-2">
              <span className="text-white font-bold">Nigeria (Primary)</span>
              <span className="bg-brand-green text-white font-mono font-bold px-2 py-0.5 text-[10px]">ACTIVE • {statistics.regionalSpread.find(r => r.name === "NIGERIA")?.count || 47} Leaders</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-brand-grey/40 pb-2">
              <span className="text-white font-bold">Ghana</span>
              <span className="bg-white text-black font-mono font-bold px-2 py-0.5 text-[10px]">ACTIVE • {statistics.regionalSpread.find(r => r.name === "GHANA")?.count || 3} Leaders</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-brand-grey/40 pb-2">
              <span className="text-gray-500 font-bold">Kenya</span>
              <span className="text-gray-500 text-[10px] uppercase font-bold">Expansion 2027</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-bold">South Africa</span>
              <span className="text-gray-500 text-[10px] uppercase font-bold">Expansion 2028</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
