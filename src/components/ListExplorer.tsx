import React, { useState, useMemo } from "react";
import { Search, Grid, List, BookOpen, ChevronRight, SlidersHorizontal, MapPin, Building2, Calendar, Award } from "lucide-react";
import { Honouree, CountryEdition } from "../types";

interface ListExplorerProps {
  honourees: Honouree[];
  categories: { id: string; name: string }[];
  onSelectPerson: (id: string) => void;
}

type DisplayLayout = "grid" | "compact" | "magazine";

export default function ListExplorer({ honourees, categories, onSelectPerson }: ListExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState<"ALL" | number>("ALL");
  const [selectedCountry, setSelectedCountry] = useState<"ALL" | CountryEdition>("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "alpha" | "category" | "year">("featured");
  const [layout, setLayout] = useState<DisplayLayout>("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique values for filters
  const industries = useMemo(() => {
    const list = honourees.map((h) => h.industry);
    return ["ALL", ...Array.from(new Set(list))];
  }, [honourees]);

  const states = useMemo(() => {
    const list = honourees.map((h) => h.state);
    return ["ALL", ...Array.from(new Set(list))];
  }, [honourees]);

  const years = useMemo(() => {
    const list = honourees.map((h) => h.year);
    return ["ALL", ...Array.from(new Set(list))].sort();
  }, [honourees]);

  const countries = useMemo(() => {
    const list = honourees.map((h) => h.country);
    return ["ALL", ...Array.from(new Set(list))];
  }, [honourees]);

  // Filter and sort honourees
  const filteredHonourees = useMemo(() => {
    let result = [...honourees];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.organization.toLowerCase().includes(q) ||
          h.title.toLowerCase().includes(q) ||
          h.industry.toLowerCase().includes(q)
      );
    }

    // Industry Filter
    if (selectedIndustry !== "ALL") {
      result = result.filter((h) => h.industry === selectedIndustry);
    }

    // Category Filter
    if (selectedCategory !== "ALL") {
      result = result.filter((h) => h.category === selectedCategory);
    }

    // State Filter
    if (selectedState !== "ALL") {
      result = result.filter((h) => h.state === selectedState);
    }

    // Year Filter
    if (selectedYear !== "ALL") {
      result = result.filter((h) => h.year === Number(selectedYear));
    }

    // Country Filter
    if (selectedCountry !== "ALL") {
      result = result.filter((h) => h.country === selectedCountry);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "alpha") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      if (sortBy === "year") {
        return b.year - a.year;
      }
      // "featured": prioritize featured, then year, then id
      const featA = a.isFeatured ? 1 : 0;
      const featB = b.isFeatured ? 1 : 0;
      if (featB !== featA) return featB - featA;
      if (b.year !== a.year) return b.year - a.year;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [honourees, search, selectedIndustry, selectedCategory, selectedState, selectedYear, selectedCountry, sortBy]);

  return (
    <section id="list-explorer" className="max-w-7xl mx-auto px-6 py-12">
      {/* Intro Header */}
      <div className="border-b border-brand-grey pb-10 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-brand-green text-xs uppercase tracking-widest font-bold mb-3">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></span>
            <span>The Registry</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white">
            THE LIST
          </h1>
          <p className="text-gray-400 max-w-lg mt-3 text-sm md:text-base leading-relaxed">
            50 people. 50 stories. One generation redefining the boundaries of African enterprise, leadership, and possibility.
          </p>
        </div>

        {/* Display Toggles & Filters Toggle */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-brand-charcoal border border-brand-grey p-1">
            <button
              id="layout-grid-btn"
              onClick={() => setLayout("grid")}
              className={`p-2 transition-colors cursor-pointer ${
                layout === "grid" ? "bg-brand-green text-white" : "text-gray-400 hover:text-white"
              }`}
              title="Editorial Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              id="layout-magazine-btn"
              onClick={() => setLayout("magazine")}
              className={`p-2 transition-colors cursor-pointer ${
                layout === "magazine" ? "bg-brand-green text-white" : "text-gray-400 hover:text-white"
              }`}
              title="Magazine Layout"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              id="layout-compact-btn"
              onClick={() => setLayout("compact")}
              className={`p-2 transition-colors cursor-pointer ${
                layout === "compact" ? "bg-brand-green text-white" : "text-gray-400 hover:text-white"
              }`}
              title="Compact List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            id="toggle-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 border px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
              showFilters
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-brand-grey hover:border-white"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Basic Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="relative md:col-span-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="list-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, organization, title, or industry..."
            className="w-full bg-brand-charcoal border border-brand-grey/80 py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-green transition-all placeholder:text-gray-500"
          />
        </div>
        <div className="md:col-span-4">
          <select
            id="list-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-brand-charcoal border border-brand-grey/80 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-brand-green transition-all cursor-pointer"
          >
            <option value="featured">Sort: Inductees & Featured</option>
            <option value="alpha">Sort: Alphabetical (A-Z)</option>
            <option value="year">Sort: Edition Year</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Drawer */}
      {showFilters && (
        <div
          id="advanced-filters-panel"
          className="bg-brand-charcoal border border-brand-grey p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-fadeIn"
        >
          {/* Category */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-brand-black border border-brand-grey text-xs p-2.5 text-white focus:outline-none focus:border-brand-green cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Industry */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-brand-black border border-brand-grey text-xs p-2.5 text-white focus:outline-none focus:border-brand-green cursor-pointer"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind === "ALL" ? "All Industries" : ind}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">State Origin</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-brand-black border border-brand-grey text-xs p-2.5 text-white focus:outline-none focus:border-brand-green cursor-pointer"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === "ALL" ? "All States (Nigeria)" : st}
                </option>
              ))}
            </select>
          </div>

          {/* Edition Year */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Edition Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === "ALL" ? "ALL" : Number(e.target.value))}
              className="bg-brand-black border border-brand-grey text-xs p-2.5 text-white focus:outline-none focus:border-brand-green cursor-pointer"
            >
              <option value="ALL">All Editions</option>
              {years.filter((y) => y !== "ALL").map((yr) => (
                <option key={yr} value={yr}>
                  Class of {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Region / Country */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Region Expansion</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as any)}
              className="bg-brand-black border border-brand-grey text-xs p-2.5 text-white focus:outline-none focus:border-brand-green cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "All Regions (Africa)" : `UNDER50 ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
          Showing <span className="text-white font-bold">{filteredHonourees.length}</span> of{" "}
          <span className="text-white font-bold">{honourees.length}</span> honourees
        </p>

        {/* Clear Filters Helper */}
        {(selectedCategory !== "ALL" || selectedIndustry !== "ALL" || selectedState !== "ALL" || selectedYear !== "ALL" || selectedCountry !== "ALL" || search !== "") && (
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSelectedIndustry("ALL");
              setSelectedState("ALL");
              setSelectedYear("ALL");
              setSelectedCountry("ALL");
              setSearch("");
            }}
            className="text-xs text-brand-green hover:underline uppercase tracking-wider font-bold cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredHonourees.length === 0 && (
        <div id="explorer-empty-state" className="text-center py-24 border border-dashed border-brand-grey/50">
          <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-white mb-2">NO HONOUREES FOUND</h3>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
            Even the most influential people occasionally slip past our current criteria. Try widening your search or filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSelectedIndustry("ALL");
              setSelectedState("ALL");
              setSelectedYear("ALL");
              setSelectedCountry("ALL");
              setSearch("");
            }}
            className="bg-brand-green text-white text-xs uppercase tracking-widest font-bold px-6 py-2.5 hover:bg-brand-green-hover transition-colors cursor-pointer"
          >
            Reset Explorer
          </button>
        </div>
      )}

      {/* -------------------- LAYOUT 1: EDITORIAL GRID -------------------- */}
      {layout === "grid" && filteredHonourees.length > 0 && (
        <div id="layout-grid-render" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHonourees.map((person) => (
            <div
              key={person.id}
              onClick={() => onSelectPerson(person.id)}
              className="bg-brand-charcoal group cursor-pointer border border-brand-grey/40 hover:border-brand-green/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Image & Year */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-black">
                <img
                  src={person.portraitUrl}
                  alt={person.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-green text-white text-[10px] tracking-widest uppercase font-black px-2 py-1">
                  CLASS OF {person.year}
                </div>
                {person.isFeatured && (
                  <div className="absolute top-4 right-4 bg-white text-black text-[10px] tracking-widest uppercase font-black px-2.5 py-1">
                    FEATURED
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-black/90 to-transparent pointer-events-none" />
              </div>

              {/* Text Info */}
              <div className="p-6 relative">
                {/* Visual signature Red accent line appears on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="flex items-center justify-between text-[11px] text-gray-400 uppercase tracking-widest mb-2">
                  <span className="font-bold text-brand-green">{person.category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    {person.state}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-green transition-colors duration-200">
                  {person.name}
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  {person.title} / <span className="text-white">{person.organization}</span>
                </p>

                <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-2">
                  {person.achievement}
                </p>
              </div>

              <div className="border-t border-brand-grey/40 p-4 bg-brand-black/30 flex justify-between items-center text-xs text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <span className="uppercase tracking-widest font-bold">Discover Profile</span>
                <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------- LAYOUT 2: MAGAZINE LAYOUT -------------------- */}
      {layout === "magazine" && filteredHonourees.length > 0 && (
        <div id="layout-magazine-render" className="space-y-16">
          {filteredHonourees.map((person, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={person.id}
                onClick={() => onSelectPerson(person.id)}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16 items-center cursor-pointer group border-b border-brand-grey/50 pb-12`}
              >
                {/* Huge Cover Image */}
                <div className="w-full lg:w-1/2 aspect-[3/2] overflow-hidden bg-brand-black relative">
                  <img
                    src={person.portraitUrl}
                    alt={person.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 bg-brand-green text-white text-xs tracking-widest uppercase font-black px-3 py-1.5">
                    {person.country} • CLASS OF {person.year}
                  </div>
                </div>

                {/* Editorial Description */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="text-xs text-brand-green uppercase tracking-widest font-black mb-3 flex items-center space-x-2">
                    <span>{person.category}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{person.industry}</span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white group-hover:text-brand-green transition-colors duration-300 mb-4">
                    {person.name}
                  </h2>

                  <p className="font-semibold text-lg text-gray-300 mb-4">
                    {person.title} at <span className="text-white border-b border-brand-green pb-0.5">{person.organization}</span>
                  </p>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-serif italic">
                    "{person.achievement}"
                  </p>

                  <div className="flex items-center space-x-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" />
                      {person.state} Region
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-green" />
                      Inducted {person.year}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center text-xs uppercase tracking-widest font-bold text-brand-green group-hover:text-white transition-colors">
                    <span>Explore Institutional Profile</span>
                    <span className="ml-2 w-8 h-[1px] bg-brand-green group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* -------------------- LAYOUT 3: COMPACT LIST -------------------- */}
      {layout === "compact" && filteredHonourees.length > 0 && (
        <div id="layout-compact-render" className="border-t border-brand-grey/50">
          {filteredHonourees.map((person, idx) => (
            <div
              key={person.id}
              onClick={() => onSelectPerson(person.id)}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-brand-grey/40 hover:bg-brand-charcoal/30 px-4 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-6">
                <span className="text-xs font-mono text-gray-600 hidden md:block">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                
                {/* Small Avatar */}
                <div className="w-12 h-12 rounded-none overflow-hidden bg-brand-black flex-shrink-0">
                  <img
                    src={person.portraitUrl}
                    alt={person.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-brand-green transition-colors">
                    {person.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-0.5">
                    <span className="font-semibold text-gray-300">{person.organization}</span>
                    <span className="text-gray-600">•</span>
                    <span>{person.title}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-brand-green font-medium">{person.industry}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8 mt-4 sm:mt-0 text-right">
                <div className="hidden lg:block text-right">
                  <p className="text-xs text-white font-bold">{person.category}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Category</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-white font-bold">{person.state}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">State</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-brand-green font-bold">Class of {person.year}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Induction</p>
                </div>
                <ChevronRight className="w-5 h-5 text-brand-green group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
