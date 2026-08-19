import React, { useState } from "react";
import { 
  BarChart2, Users, FileText, Settings, Award, Plus, Trash2, Edit2, 
  Check, X, Eye, ShieldAlert, TrendingUp, MapPin, Calendar, Sprout, Briefcase 
} from "lucide-react";
import { 
  Honouree, AwardCategory, Story, Nomination, SiteSettings, NominationStatus, CountryEdition 
} from "../types";

interface AdminDashboardProps {
  honourees: Honouree[];
  categories: AwardCategory[];
  stories: Story[];
  nominations: Nomination[];
  settings: SiteSettings;
  onUpdateHonourees: (list: Honouree[]) => void;
  onUpdateStories: (list: Story[]) => void;
  onUpdateNominations: (list: Nomination[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
}

export default function AdminDashboard({
  honourees,
  categories,
  stories,
  nominations,
  settings,
  onUpdateHonourees,
  onUpdateStories,
  onUpdateNominations,
  onUpdateSettings
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "honourees" | "nominations" | "stories" | "settings">("overview");
  
  // Auth state simulator
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Create/Edit states
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Honouree | null>(null);
  const [personForm, setPersonForm] = useState({
    name: "",
    title: "",
    organization: "",
    industry: "FinTech",
    category: "Technology & Innovation",
    achievement: "",
    bio: "",
    portraitUrl: "",
    year: 2026,
    state: "Lagos",
    gender: "Male" as "Male" | "Female",
    country: CountryEdition.NIGERIA,
    whyTheyMatter: "",
    quote: "",
    isFeatured: false
  });

  // Story state
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [storyForm, setStoryForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Business",
    author: "Admin Editor",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    isPublished: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin50") {
      setIsAdmin(true);
      setAuthError("");
    } else {
      setAuthError("Invalid administrative security key code.");
    }
  };

  // Honourees CRUD
  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personForm.name || !personForm.title || !personForm.organization) {
      alert("Please fill in name, title and organization.");
      return;
    }

    let newList = [...honourees];
    const portrait = personForm.portraitUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";

    if (editingPerson) {
      newList = newList.map((p) =>
        p.id === editingPerson.id
          ? { ...p, ...personForm, portraitUrl: portrait }
          : p
      );
    } else {
      const newPerson: Honouree = {
        id: `hon-${Date.now()}`,
        ...personForm,
        portraitUrl: portrait,
        socials: {}
      };
      newList.unshift(newPerson);
    }

    onUpdateHonourees(newList);
    setShowPersonModal(false);
    setEditingPerson(null);
  };

  const handleDeletePerson = (id: string) => {
    if (confirm("Are you sure you want to retract this honouree from the official registry?")) {
      const newList = honourees.filter((p) => p.id !== id);
      onUpdateHonourees(newList);
    }
  };

  const handleEditPersonClick = (p: Honouree) => {
    setEditingPerson(p);
    setPersonForm({
      name: p.name,
      title: p.title,
      organization: p.organization,
      industry: p.industry,
      category: p.category,
      achievement: p.achievement,
      bio: p.bio,
      portraitUrl: p.portraitUrl,
      year: p.year,
      state: p.state,
      gender: p.gender,
      country: p.country,
      whyTheyMatter: p.whyTheyMatter || "",
      quote: p.quote || "",
      isFeatured: !!p.isFeatured
    });
    setShowPersonModal(true);
  };

  const handleAddPersonClick = () => {
    setEditingPerson(null);
    setPersonForm({
      name: "",
      title: "",
      organization: "",
      industry: "FinTech",
      category: "Technology & Innovation",
      achievement: "",
      bio: "",
      portraitUrl: "",
      year: 2026,
      state: "Lagos",
      gender: "Male",
      country: CountryEdition.NIGERIA,
      whyTheyMatter: "",
      quote: "",
      isFeatured: false
    });
    setShowPersonModal(true);
  };

  // Nomination Status
  const handleUpdateNomStatus = (id: string, nextStatus: NominationStatus) => {
    const list = nominations.map((n) =>
      n.id === id ? { ...n, status: nextStatus } : n
    );
    onUpdateNominations(list);
  };

  // Stories CRUD
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title || !storyForm.excerpt) {
      alert("Provide a title and excerpt.");
      return;
    }

    let newList = [...stories];
    if (editingStory) {
      newList = newList.map((s) =>
        s.id === editingStory.id
          ? { ...s, ...storyForm }
          : s
      );
    } else {
      const slug = storyForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newStory: Story = {
        id: `story-${Date.now()}`,
        ...storyForm,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        slug
      };
      newList.unshift(newStory);
    }

    onUpdateStories(newList);
    setShowStoryModal(false);
    setEditingStory(null);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Delete this story?")) {
      const newList = stories.filter((s) => s.id !== id);
      onUpdateStories(newList);
    }
  };

  // Settings Change
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (name === "currentEditionYear") {
      finalValue = Number(value);
    }
    onUpdateSettings({ ...settings, [name]: finalValue });
  };

  // Analytics derivations
  const numFeatured = honourees.filter((h) => h.isFeatured).length;
  const numPendingNom = nominations.filter((n) => n.status === NominationStatus.SUBMITTED).length;
  const totalNoms = nominations.length;

  // Derive Industry and state stats for charts
  const industryCounts = honourees.reduce((acc, curr) => {
    acc[curr.industry] = (acc[curr.industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stateCounts = honourees.reduce((acc, curr) => {
    acc[curr.state] = (acc[curr.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!isAdmin) {
    return (
      <div id="admin-gate-screen" className="max-w-md mx-auto px-6 py-24">
        <div className="bg-brand-charcoal border border-brand-grey p-8 text-center shadow-xl shadow-black/80">
          <ShieldAlert className="w-12 h-12 text-brand-red mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-white mb-2">ADMIN SECURE SIGN-IN</h2>
          <p className="text-gray-400 text-xs mb-6">Enter official gateway credentials to modify the UNDER50 registry.</p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase text-gray-500 tracking-wider">Passphrase Key *</label>
              <input
                type="password"
                placeholder="Hint: admin50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-brand-black border border-brand-grey p-3 text-sm text-white focus:outline-none focus:border-brand-red"
              />
            </div>
            {authError && <p className="text-xs text-brand-red font-bold">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-brand-red text-white py-3 text-xs uppercase tracking-widest font-black hover:bg-brand-red-hover transition-colors cursor-pointer"
            >
              Authorize Gate Entry
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-workspace" className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Panel */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-brand-charcoal border border-brand-grey p-6 flex flex-col space-y-6">
          <div className="border-b border-brand-grey pb-4">
            <p className="text-[10px] text-brand-red uppercase tracking-widest font-black">Authorized Shell</p>
            <h3 className="font-serif text-lg font-bold text-white">CONTROL CENTRE</h3>
            <p className="text-gray-500 text-[10px] uppercase font-mono mt-0.5">Role: Super Admin</p>
          </div>

          <nav id="admin-tabs" className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                activeTab === "overview" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-brand-black/40"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("honourees")}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                activeTab === "honourees" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-brand-black/40"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>The List ({honourees.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("nominations")}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                activeTab === "nominations" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-brand-black/40"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Nominations ({nominations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                activeTab === "stories" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-brand-black/40"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Stories ({stories.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                activeTab === "settings" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-brand-black/40"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Config</span>
            </button>
          </nav>

          <button
            onClick={() => setIsAdmin(false)}
            className="text-left text-xs uppercase text-gray-500 hover:text-brand-red transition-colors pt-4 border-t border-brand-grey/50 cursor-pointer"
          >
            Lock Terminal
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main id="admin-main-viewport" className="flex-1 bg-brand-charcoal border border-brand-grey p-8 min-h-[600px]">
        
        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === "overview" && (
          <div id="tab-overview" className="space-y-8 animate-fadeIn">
            <div className="border-b border-brand-grey pb-4 flex justify-between items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">EXECUTIVE ANALYTICS</h2>
                <p className="text-gray-400 text-xs">Real-time demographic and database counts for UNDER50 NIGERIA.</p>
              </div>
              <div className="flex items-center gap-2 bg-brand-black/30 border border-brand-grey px-3 py-1.5 text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-gray-400">Database Synchronized</span>
              </div>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-brand-black border border-brand-grey p-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Official Inductees</p>
                <p className="font-serif text-4xl font-bold text-white mt-1">{honourees.length}</p>
                <p className="text-[9px] text-brand-red font-bold mt-2">Class of 2025 & 2026</p>
              </div>
              <div className="bg-brand-black border border-brand-grey p-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Total Submissions</p>
                <p className="font-serif text-4xl font-bold text-white mt-1">{totalNoms}</p>
                <p className="text-[9px] text-green-500 font-bold mt-2">+{numPendingNom} Review Pending</p>
              </div>
              <div className="bg-brand-black border border-brand-grey p-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Featured Leaders</p>
                <p className="font-serif text-4xl font-bold text-white mt-1">{numFeatured}</p>
                <p className="text-[9px] text-gray-500 font-bold mt-2">Editorial Slider</p>
              </div>
              <div className="bg-brand-black border border-brand-grey p-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Stories Drafted</p>
                <p className="font-serif text-4xl font-bold text-white mt-1">{stories.length}</p>
                <p className="text-[9px] text-brand-red font-bold mt-2">Live Publication</p>
              </div>
            </div>

            {/* Custom Responsive SVG Chart: Industry representation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-black border border-brand-grey p-6">
                <h4 className="font-serif text-lg font-bold text-white mb-4">Industries Driving Innovation</h4>
                <div className="space-y-3">
                  {Object.entries(industryCounts).slice(0, 5).map(([ind, count]) => {
                    const pct = (count / honourees.length) * 100;
                    return (
                      <div key={ind} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-300">{ind}</span>
                          <span className="text-white font-bold">{count} ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-grey">
                          <div className="h-full bg-brand-red" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-brand-black border border-brand-grey p-6">
                <h4 className="font-serif text-lg font-bold text-white mb-4">Regional Impact Centers</h4>
                <div className="space-y-3">
                  {Object.entries(stateCounts).slice(0, 5).map(([state, count]) => {
                    const pct = (count / honourees.length) * 100;
                    return (
                      <div key={state} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-300">{state} State</span>
                          <span className="text-white font-bold">{count} ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-grey">
                          <div className="h-full bg-brand-red" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Audit Log Simulator */}
            <div className="bg-brand-black border border-brand-grey p-6">
              <h4 className="font-serif text-lg font-bold text-white mb-3">System Security Log</h4>
              <div className="space-y-2 font-mono text-[10px] text-gray-500">
                <p>[2026-08-19 06:08:12] - SUCCESS: Connected to secure backend storage cluster.</p>
                <p>[2026-08-19 06:08:14] - DEPLOYED: deployed security firestore.rules safely.</p>
                <p>[2026-08-19 06:08:45] - INITIALIZED: programmatically registered 50 premium Nigerian honourees.</p>
                <p>[2026-08-19 06:09:12] - COMPILER: Verified Vite server binding to 0.0.0.0:3000 securely.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HONOUREES REGISTER */}
        {activeTab === "honourees" && (
          <div id="tab-honourees" className="space-y-6 animate-fadeIn">
            <div className="border-b border-brand-grey pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">THE LIST REGISTRY</h2>
                <p className="text-gray-400 text-xs">Add, retract, or modify official honourees on the UNDER50 list.</p>
              </div>
              <button
                id="admin-add-person-btn"
                onClick={handleAddPersonClick}
                className="bg-brand-red text-white text-xs uppercase tracking-widest font-black px-4 py-2.5 hover:bg-brand-red-hover transition-colors flex items-center space-x-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Induct Leader</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-brand-grey bg-brand-black/30">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-brand-black border-b border-brand-grey text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Portrait</th>
                    <th className="p-4">Name / Org</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Region</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-grey/30">
                  {honourees.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-black/20">
                      <td className="p-4">
                        <img
                          src={p.portraitUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover grayscale"
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-white">{p.name}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5">{p.title} at {p.organization}</p>
                      </td>
                      <td className="p-4 text-brand-red font-semibold">{p.category}</td>
                      <td className="p-4">
                        <p className="text-white">{p.state} State</p>
                        <p className="text-gray-500 text-[9px] mt-0.5">UNDER50 {p.country}</p>
                      </td>
                      <td className="p-4">
                        {p.isFeatured ? (
                          <span className="text-xs bg-white text-black font-bold uppercase tracking-wider px-2 py-0.5">Yes</span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditPersonClick(p)}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-brand-black rounded transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePerson(p.id)}
                          className="p-1.5 text-gray-500 hover:text-brand-red hover:bg-brand-black rounded transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: NOMINATIONS PANEL */}
        {activeTab === "nominations" && (
          <div id="tab-nominations" className="space-y-6 animate-fadeIn">
            <div className="border-b border-brand-grey pb-4">
              <h2 className="font-serif text-3xl font-bold text-white">NOMINATION SUBMISSIONS</h2>
              <p className="text-gray-400 text-xs">Review digital forms, evidence documents, and assign statuses.</p>
            </div>

            {nominations.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No nomination forms submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {nominations.map((nom) => (
                  <div key={nom.id} className="bg-brand-black border border-brand-grey p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-grey/40 pb-4">
                      <div>
                        <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-400">
                          <span className="text-brand-red font-black">ID: {nom.id}</span>
                          <span>•</span>
                          <span>Submitted {nom.dateSubmitted}</span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-white mt-1">{nom.nomineeName}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{nom.nomineeTitle} • <span className="text-white">{nom.nomineeOrg}</span></p>
                      </div>

                      {/* Status Selector */}
                      <div className="flex flex-col space-y-1 self-stretch sm:self-auto">
                        <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Review Status</label>
                        <select
                          value={nom.status}
                          onChange={(e) => handleUpdateNomStatus(nom.id, e.target.value as NominationStatus)}
                          className={`text-xs uppercase tracking-widest font-bold px-3 py-1.5 focus:outline-none border border-brand-grey cursor-pointer ${
                            nom.status === NominationStatus.WINNER
                              ? "bg-green-500 text-black border-green-500"
                              : nom.status === NominationStatus.SHORTLISTED
                              ? "bg-brand-red text-white border-brand-red"
                              : nom.status === NominationStatus.UNDER_REVIEW
                              ? "bg-white text-black border-white"
                              : "bg-brand-black text-white"
                          }`}
                        >
                          <option value={NominationStatus.SUBMITTED}>Submitted</option>
                          <option value={NominationStatus.UNDER_REVIEW}>Under Review</option>
                          <option value={NominationStatus.SHORTLISTED}>Shortlisted</option>
                          <option value={NominationStatus.FINALIST}>Finalist</option>
                          <option value={NominationStatus.WINNER}>Winner</option>
                          <option value={NominationStatus.NOT_SELECTED}>Not Selected</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Category Requested</p>
                        <p className="text-white font-bold mt-1">{nom.nomineeCategory} ({nom.nomineeIndustry})</p>
                        
                        <p className="text-[10px] text-gray-500 uppercase font-bold mt-4">Achievements Summary</p>
                        <p className="text-gray-300 mt-1">{nom.achievements}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Systemic Impact</p>
                        <p className="text-gray-300 mt-1">{nom.impactDescription}</p>

                        <div className="mt-4 p-3 bg-brand-charcoal border border-brand-grey/50">
                          <p className="text-[9px] text-brand-red uppercase font-black">Endorsing Referee</p>
                          <p className="text-white font-bold mt-0.5">{nom.refereeName}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{nom.refereeEmail} • {nom.refereePhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STORIES (CMS) */}
        {activeTab === "stories" && (
          <div id="tab-stories" className="space-y-6 animate-fadeIn">
            <div className="border-b border-brand-grey pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">EDITORIAL ENGINE</h2>
                <p className="text-gray-400 text-xs">Write, publish, or retract magazine-quality editorial articles.</p>
              </div>
              <button
                onClick={() => {
                  setEditingStory(null);
                  setStoryForm({
                    title: "",
                    excerpt: "",
                    content: "",
                    category: "Business",
                    author: "Admin Editor",
                    readTime: "5 min read",
                    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
                    isPublished: true
                  });
                  setShowStoryModal(true);
                }}
                className="bg-brand-red text-white text-xs uppercase tracking-widest font-black px-4 py-2.5 hover:bg-brand-red-hover transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Article</span>
              </button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {stories.map((s) => (
                <div key={s.id} className="bg-brand-black border border-brand-grey p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={s.imageUrl} alt="" className="w-16 h-12 object-cover grayscale" />
                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-brand-red mb-0.5">{s.category}</div>
                      <h4 className="font-serif text-base font-bold text-white">{s.title}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5">By {s.author} • Published {s.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingStory(s);
                        setStoryForm({
                          title: s.title,
                          excerpt: s.excerpt,
                          content: s.content,
                          category: s.category,
                          author: s.author,
                          readTime: s.readTime,
                          imageUrl: s.imageUrl,
                          isPublished: s.isPublished
                        });
                        setShowStoryModal(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-brand-charcoal border border-transparent hover:border-brand-grey cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStory(s.id)}
                      className="p-1.5 text-gray-500 hover:text-brand-red hover:bg-brand-charcoal border border-transparent hover:border-brand-grey cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE SETTINGS */}
        {activeTab === "settings" && (
          <div id="tab-settings" className="space-y-6 animate-fadeIn">
            <div className="border-b border-brand-grey pb-4">
              <h2 className="font-serif text-3xl font-bold text-white">PLATFORM CONTROL VARIABLES</h2>
              <p className="text-gray-400 text-xs">Configure the current countdown date, active nomination statuses, and WhatsApp integrations.</p>
            </div>

            <div className="bg-brand-black border border-brand-grey p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Countdown Target */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Conference Date Target</label>
                  <input
                    type="date"
                    name="countdownDate"
                    value={settings.countdownDate}
                    onChange={handleSettingsChange}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Conference Time (HH:MM)</label>
                  <input
                    type="time"
                    name="countdownTime"
                    value={settings.countdownTime}
                    onChange={handleSettingsChange}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Country/Edition settings */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Current Edition Year</label>
                  <input
                    type="number"
                    name="currentEditionYear"
                    value={settings.currentEditionYear}
                    onChange={handleSettingsChange}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Event Status selector */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Event Status Protocol</label>
                  <select
                    name="eventStatus"
                    value={settings.eventStatus}
                    onChange={handleSettingsChange}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="COUNTDOWN">COUNTDOWN MODE</option>
                    <option value="LIVE">EVENT IS LIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                {/* Nomination state toggle */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Nomination Status Strip</label>
                  <select
                    name="nominationsOpen"
                    value={settings.nominationsOpen ? "true" : "false"}
                    onChange={(e) => {
                      onUpdateSettings({ ...settings, nominationsOpen: e.target.value === "true" });
                    }}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="true">NOMINATIONS OPEN</option>
                    <option value="false">NOMINATIONS CLOSED</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">WhatsApp Hotline Channel URL</label>
                  <input
                    type="text"
                    name="whatsappContact"
                    value={settings.whatsappContact}
                    onChange={handleSettingsChange}
                    className="bg-brand-charcoal border border-brand-grey p-3 text-xs text-white focus:outline-none"
                  />
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* -------------------- MODAL: CREATE/EDIT PERSON -------------------- */}
      {showPersonModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-charcoal border border-brand-grey max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-brand-grey pb-4">
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingPerson ? "Modify Leader Profile" : "Induct New Under-50 Leader"}
              </h3>
              <button onClick={() => setShowPersonModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSavePerson} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={personForm.name}
                    onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Professional Title *</label>
                  <input
                    type="text"
                    required
                    value={personForm.title}
                    onChange={(e) => setPersonForm({ ...personForm, title: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Organization *</label>
                  <input
                    type="text"
                    required
                    value={personForm.organization}
                    onChange={(e) => setPersonForm({ ...personForm, organization: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">State Origin *</label>
                  <input
                    type="text"
                    required
                    value={personForm.state}
                    onChange={(e) => setPersonForm({ ...personForm, state: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Industry *</label>
                  <select
                    value={personForm.industry}
                    onChange={(e) => setPersonForm({ ...personForm, industry: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white text-xs cursor-pointer"
                  >
                    <option value="FinTech">FinTech</option>
                    <option value="Agritech">Agritech</option>
                    <option value="Clean Energy">Clean Energy</option>
                    <option value="Creative & Film">Creative & Film</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Venture Capital">Venture Capital</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Award Category *</label>
                  <select
                    value={personForm.category}
                    onChange={(e) => setPersonForm({ ...personForm, category: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white text-xs cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Induction Year</label>
                  <input
                    type="number"
                    value={personForm.year}
                    onChange={(e) => setPersonForm({ ...personForm, year: Number(e.target.value) })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Portrait Image URL</label>
                  <input
                    type="text"
                    value={personForm.portraitUrl}
                    onChange={(e) => setPersonForm({ ...personForm, portraitUrl: e.target.value })}
                    placeholder="Provide image URL, or leave empty for default"
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Featured status</label>
                  <select
                    value={personForm.isFeatured ? "true" : "false"}
                    onChange={(e) => setPersonForm({ ...personForm, isFeatured: e.target.value === "true" })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white cursor-pointer"
                  >
                    <option value="false">Standard Inductee</option>
                    <option value="true">Featured Slide Leader</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Gender</label>
                  <select
                    value={personForm.gender}
                    onChange={(e) => setPersonForm({ ...personForm, gender: e.target.value as any })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Short Achievement Summary *</label>
                <input
                  type="text"
                  required
                  value={personForm.achievement}
                  onChange={(e) => setPersonForm({ ...personForm, achievement: e.target.value })}
                  placeholder="e.g. Pioneered satellite crop telemetry integration for 140,000 cooperative smallholder farmers."
                  className="bg-brand-black border border-brand-grey p-2.5 text-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Why They Matter</label>
                <textarea
                  value={personForm.whyTheyMatter}
                  onChange={(e) => setPersonForm({ ...personForm, whyTheyMatter: e.target.value })}
                  rows={3}
                  className="bg-brand-black border border-brand-grey p-2.5 text-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Biography</label>
                <textarea
                  value={personForm.bio}
                  onChange={(e) => setPersonForm({ ...personForm, bio: e.target.value })}
                  rows={4}
                  className="bg-brand-black border border-brand-grey p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-brand-grey">
                <button
                  type="button"
                  onClick={() => setShowPersonModal(false)}
                  className="border border-brand-grey px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-red text-white px-6 py-2 hover:bg-brand-red-hover transition-colors cursor-pointer font-bold uppercase tracking-widest"
                >
                  Save Inductee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: CREATE/EDIT STORY -------------------- */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-charcoal border border-brand-grey max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-brand-grey pb-4">
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingStory ? "Edit Editorial Story" : "Compose Magazine Article"}
              </h3>
              <button onClick={() => setShowStoryModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Article Title *</label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  className="bg-brand-black border border-brand-grey p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Category</label>
                  <select
                    value={storyForm.category}
                    onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white cursor-pointer"
                  >
                    <option value="Business">Business</option>
                    <option value="Investment">Investment</option>
                    <option value="Technology">Technology</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Culture">Culture</option>
                    <option value="People">People</option>
                    <option value="Impact">Impact</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold">Author Name</label>
                  <input
                    type="text"
                    required
                    value={storyForm.author}
                    onChange={(e) => setStoryForm({ ...storyForm, author: e.target.value })}
                    className="bg-brand-black border border-brand-grey p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Excerpt / Standfirst *</label>
                <input
                  type="text"
                  required
                  value={storyForm.excerpt}
                  onChange={(e) => setStoryForm({ ...storyForm, excerpt: e.target.value })}
                  className="bg-brand-black border border-brand-grey p-2.5 text-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">Content (Markdown supported) *</label>
                <textarea
                  required
                  value={storyForm.content}
                  onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                  rows={8}
                  className="bg-brand-black border border-brand-grey p-2.5 text-white font-mono"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-brand-grey">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="border border-brand-grey px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-red text-white px-6 py-2 hover:bg-brand-red-hover transition-colors cursor-pointer font-bold uppercase tracking-widest"
                >
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
