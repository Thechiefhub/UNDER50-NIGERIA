import { 
  Honouree, 
  AwardCategory, 
  Story, 
  Speaker, 
  Session, 
  Partner, 
  Judge, 
  Nomination, 
  TicketTier, 
  SiteSettings, 
  NominationStatus,
  CountryEdition
} from "../types";

// Helper lists for generating 50 honourees programmatically
const NIGERIAN_FIRST_NAMES = [
  "Amina", "Chidi", "Tunde", "Funmi", "Olumide", "Chioma", "Ibrahim", "Yetunde", "Emeka", "Damilola",
  "Ngozi", "Babajide", "Folake", "Kelechi", "Aisha", "Femi", "Halima", "Uche", "Temitope", "Onyekachi",
  "Tolulope", "Adewale", "Ese", "Nuhu", "Ogechi", "Seyi", "Yusuf", "Adeola", "Chinedu", "Tosin"
];

const NIGERIAN_LAST_NAMES = [
  "Adebayo", "Egwu", "Omotoye", "Adeshina", "Okonkwo", "Bello", "Eze", "Balogun", "Onyema", "Alabi",
  "Soyinka", "Ojo", "Nwachukwu", "Danjuma", "Adeyemi", "Nwosu", "Bakare", "Okafor", "Sanusi", "Adedoyin",
  "Chukwu", "Lawal", "Igwe", "Popoola", "Mustapha", "Adegbite", "Obi", "Oladipo", "Umar", "Folorunsho"
];

const INDUSTRIES = [
  "FinTech", "Agritech", "Clean Energy", "Creative & Film", "E-Commerce", "Digital Health",
  "Venture Capital", "Logistics", "EdTech", "Sustainable Real Estate", "Civic Tech", "Aviation"
];

const CATEGORIES = [
  "Entrepreneur of the Year", "Technology & Innovation", "Finance & Investment",
  "Creative & Entertainment", "Corporate Leadership", "Public Service",
  "Healthcare", "Education", "Agriculture", "Real Estate & Infrastructure",
  "Media & Communications", "Social Impact"
];

const STATES = [
  "Lagos", "Abuja (FCT)", "Rivers", "Enugu", "Kano", "Oyo", "Anambra", "Kaduna", "Delta", "Ogun"
];

const PORTRAITS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop"
];

const GENDERS: Array<"Male" | "Female"> = ["Male", "Female"];

export const initialCategories: AwardCategory[] = [
  {
    id: "cat-1",
    name: "Entrepreneur of the Year",
    description: "Honouring founders who have built rapidly scalable businesses that solve critical marketplace inefficiencies while driving significant job creation.",
    criteria: "Minimum of 3 years in operation, proven business viability, measurable revenue growth, and demonstrable socio-economic contribution to the local ecosystem.",
    icon: "Briefcase"
  },
  {
    id: "cat-2",
    name: "Technology & Innovation",
    description: "Recognizing leaders pushing the boundaries of digital transformation, software development, artificial intelligence, and deep-tech architectures.",
    criteria: "Development of proprietary technological solutions, high adoption rate, innovative application of emerging tools, and scaling capacity.",
    icon: "Cpu"
  },
  {
    id: "cat-3",
    name: "Finance & Investment",
    description: "Honouring exceptional investment bankers, venture capitalists, and fintech executives restructuring capital access across Africa.",
    criteria: "Volume of capital mobilized, successful investments made, innovation in microfinance/capital distribution, and systemic financial impact.",
    icon: "TrendingUp"
  },
  {
    id: "cat-4",
    name: "Creative & Entertainment",
    description: "Celebrating directors, producers, designers, and creatives commercializing African culture globally and building the modern creative economy.",
    criteria: "Global reach, artistic excellence, commercial success of projects, and development of industry infrastructure.",
    icon: "Film"
  },
  {
    id: "cat-5",
    name: "Corporate Leadership",
    description: "Recognizing outstanding executives leading multinational corporations or large enterprises towards sustainable growth and market dominance.",
    criteria: "Strategic leadership roles, organizational transformation, corporate governance excellence, and exceptional performance metrics.",
    icon: "ShieldAlert"
  },
  {
    id: "cat-6",
    name: "Public Service",
    description: "Honouring young public administrators, policy architects, and civil servants reforming governance and implementing citizen-centric policies.",
    criteria: "Demonstrable impact in policy implementation, transparency, systemic process improvements, and commitment to public welfare.",
    icon: "Globe"
  },
  {
    id: "cat-7",
    name: "Healthcare",
    description: "Recognizing medical professionals, healthtech innovators, and public health advocates expanding diagnostic and clinical access.",
    criteria: "Improvement of community health indices, execution of medical innovations, scaling of clinical facilities, or research breakthrough.",
    icon: "Heart"
  },
  {
    id: "cat-8",
    name: "Education",
    description: "Celebrating educators and edtech developers democratizing access to future-proof technical and primary education.",
    criteria: "Reaching underserved children or youth, development of curriculum, application of technology in learning, and proven student performance improvements.",
    icon: "GraduationCap"
  },
  {
    id: "cat-9",
    name: "Agriculture",
    description: "Honouring agritech developers and commercial farmers securing Africa's food supply chains through climate-smart farming models.",
    criteria: "Integration of modern technology in cultivation/logistics, farmers empowered, yield improvements, and sustainability practices.",
    icon: "Sprout"
  },
  {
    id: "cat-10",
    name: "Real Estate & Infrastructure",
    description: "Recognizing architects, city planners, and developers constructing affordable, sustainable, and technologically integrated urban hubs.",
    criteria: "Commitment to sustainable building materials, green architecture, smart infrastructure integration, and units delivered.",
    icon: "Home"
  },
  {
    id: "cat-11",
    name: "Media & Communications",
    description: "Celebrating journalists, media moguls, and brand strategists documenting the true narrative of African innovation.",
    criteria: "Audience reach, credibility and integrity of journalistic outputs, innovation in media delivery, and industry-shaping narratives.",
    icon: "MessageSquare"
  },
  {
    id: "cat-12",
    name: "Social Impact",
    description: "Honouring social enterprise leaders and non-profit founders creating sustainable models to tackle poverty, gender bias, and environmental degradation.",
    criteria: "Measurable life outcomes improved, alignment with UN SDGs, longevity of programs, and systemic advocacy success.",
    icon: "Award"
  }
];

// Handcrafted 4 key honourees to act as featured high-fidelity examples
const HANDCRAFTED_HONOUREES: Honouree[] = [
  {
    id: "hon-1",
    name: "Amina Adebayo",
    title: "Chief Executive Officer",
    organization: "Helios Fintech",
    industry: "FinTech",
    category: "Technology & Innovation",
    achievement: "Pioneered cross-border payment rails processing over $4.2B annually across 12 African corridors.",
    bio: "Amina Adebayo is a visionary technology executive with over 15 years of experience in engineering high-throughput transaction routing networks. At Helios Fintech, she has steered the firm from a three-person startup to a major digital banking partner supporting over 8 million merchants. She is a strong advocate for technical literacy and serves on several regional monetary policy advisory boards.",
    portraitUrl: PORTRAITS[0],
    year: 2026,
    state: "Lagos",
    gender: "Female",
    country: CountryEdition.NIGERIA,
    whyTheyMatter: "Amina has fundamentally restructured how small and medium-scale retail businesses handle liquidity, enabling instant settlement across fractured banking networks in Sub-Saharan Africa. Her work is closing the capital velocity gap.",
    quote: "We aren't just shifting digits across a ledger; we are laying down the concrete highways for Africa's economic sovereignty.",
    socials: {
      linkedin: "https://linkedin.com/in/amina-adebayo-demo",
      twitter: "https://twitter.com/amina_adebayo_demo",
      website: "https://heliosfinance.example.com"
    },
    recognitionHistory: ["Africa Tech Leader of the Year 2024", "Vanguard Trailblazer Award 2025"],
    isFeatured: true
  },
  {
    id: "hon-2",
    name: "Chidi Egwu",
    title: "Founder & Chief Agronomist",
    organization: "FarmVanguard Group",
    industry: "Agritech",
    category: "Agriculture",
    achievement: "Integrated satellite crop monitoring for 140,000 cooperative smallholder farmers across Nigeria's grain belt.",
    bio: "Chidi Egwu studied agricultural engineering at the University of Ibadan before pioneering FarmVanguard, a hardware-meets-software logistics model that provides localized soil metrics and instant cold-chain transport matches to rural farmers, cutting post-harvest losses by 62%.",
    portraitUrl: PORTRAITS[1],
    year: 2026,
    state: "Enugu",
    gender: "Male",
    country: CountryEdition.NIGERIA,
    whyTheyMatter: "Chidi's intervention is addressing Africa's food security crisis by transforming farming from a high-risk gamble into a highly predictable, science-driven enterprise backed by institutional capital.",
    quote: "True innovation doesn't sit in glass high-rises in Lagos. It crawls through the dirt of small farms in Kaduna, and turns dust into bread.",
    socials: {
      linkedin: "https://linkedin.com/in/chidi-egwu-demo",
      website: "https://farmvanguard.example.com"
    },
    recognitionHistory: ["UN SDG Excellence Award 2023", "CNBC Young Entrepreneur Africa 2025"],
    isFeatured: true
  },
  {
    id: "hon-3",
    name: "Funmi Adeshina",
    title: "Managing Partner",
    organization: "Rising Tide Capital",
    industry: "Venture Capital",
    category: "Finance & Investment",
    achievement: "Raised and deployed a $150M early-stage fund focusing strictly on hardware and logistics enablers in West Africa.",
    bio: "Funmi is an investment strategist with a track record at Goldman Sachs and the African Development Bank. Recognizing a gaping seed-funding vacuum for physical infrastructure and manufacturing startups, she founded Rising Tide Capital to back the unglamorous but essential backbone industries of Africa's future.",
    portraitUrl: PORTRAITS[2],
    year: 2026,
    state: "Abuja (FCT)",
    gender: "Female",
    country: CountryEdition.NIGERIA,
    whyTheyMatter: "By moving away from purely consumer-facing software, Funmi is directing critical institutional financing into foundational sectors like manufacturing, warehouse robotics, and cold-storage operations.",
    quote: "A tech application cannot move cargo. We must fund the heavy iron and physical logistics that actually ground our digital dreams.",
    socials: {
      linkedin: "https://linkedin.com/in/funmi-adeshina-demo",
      twitter: "https://twitter.com/funmi_tide"
    },
    isFeatured: true
  },
  {
    id: "hon-4",
    name: "Olumide Okonkwo",
    title: "Lead Architect & Developer",
    organization: "Obelisk Infrastructure",
    industry: "Sustainable Real Estate",
    category: "Real Estate & Infrastructure",
    achievement: "Developed Nigeria's first fully carbon-neutral smart micro-grid residential community in Lekki, housing 400 families.",
    bio: "Olumide Okonkwo is an urban planner and clean energy advocate who graduated with distinction from the Architectural Association in London. He returned to Nigeria in 2018 with a single mission: to build energy-independent housing clusters that run 100% on integrated solar roofing, recycled gray water systems, and local clay-composite blocks.",
    portraitUrl: PORTRAITS[3],
    year: 2025,
    state: "Lagos",
    gender: "Male",
    country: CountryEdition.NIGERIA,
    whyTheyMatter: "Olumide is rewriting the architectural playbook for dense African coastal cities, demonstrating that sustainability and premium urban luxury are not mutually exclusive.",
    quote: "We don't need to import concrete that traps heat. We need to look at our native soils, align with the equatorial sun, and build structures that breathe.",
    socials: {
      linkedin: "https://linkedin.com/in/olumide-obelisk",
      website: "https://obeliskhomes.example.com"
    },
    isFeatured: true
  }
];

// Dynamically generate the remaining 46 honourees to ensure exactly 50
export const generateFiftyHonourees = (): Honouree[] => {
  const honourees: Honouree[] = [...HANDCRAFTED_HONOUREES];
  
  // Need 46 more
  for (let i = 5; i <= 50; i++) {
    const fName = NIGERIAN_FIRST_NAMES[i % NIGERIAN_FIRST_NAMES.length];
    const lName = NIGERIAN_LAST_NAMES[(i + 3) % NIGERIAN_LAST_NAMES.length];
    const name = `${fName} ${lName}`;
    
    const category = CATEGORIES[i % CATEGORIES.length];
    const industry = INDUSTRIES[(i + 2) % INDUSTRIES.length];
    const state = STATES[(i * 7) % STATES.length];
    const gender = GENDERS[i % GENDERS.length];
    const year = i % 7 === 0 ? 2025 : 2026;
    const portraitUrl = PORTRAITS[i % PORTRAITS.length];
    
    const organization = [`${lName} & Partners`, `Apex ${industry}`, `Vanguard ${industry}`, `${fName} Global`][i % 4];
    
    honourees.push({
      id: `hon-${i}`,
      name,
      title: ["Managing Director", "Chief Operations Officer", "Founder", "Principal Partner", "Executive Director"][i % 5],
      organization,
      industry,
      category,
      achievement: `Led national scale-up of localized ${industry.toLowerCase()} solutions, generating over 120 high-value jobs.`,
      bio: `${name} is a highly accomplished trailblazer in ${industry}. Working at ${organization}, they have successfully built and managed projects across the ${state} region, scaling operations to meet international benchmarks and helping shape Nigeria's position as a hub of excellence under the age of 50.`,
      portraitUrl,
      year,
      state,
      gender,
      country: i % 15 === 0 ? CountryEdition.GHANA : CountryEdition.NIGERIA, // Showcase international readiness
      whyTheyMatter: `${name}'s exemplary leadership and innovative integration of sustainable practices in the ${industry} sector have set a new benchmark for peers, demonstrating how high-impact entrepreneurship can solve immediate societal issues.`,
      socials: {
        linkedin: `https://linkedin.com/in/${fName.toLowerCase()}-${lName.toLowerCase()}-demo`,
        twitter: `https://twitter.com/${fName.toLowerCase()}_${lName.toLowerCase()}`
      },
      isFeatured: false
    });
  }
  
  return honourees;
};

export const initialHonourees: Honouree[] = generateFiftyHonourees();

export const initialStories: Story[] = [
  {
    id: "story-1",
    title: "The Architecture of Capital: How Nigerian VCs are Structuring Seed Funds in 2026",
    excerpt: "An deep dive into the shifting currents of Sub-Saharan venture deals, moving from consumer-facing fintech to physical enablers.",
    content: "## The Shift to Hard Assets\n\nFor nearly a decade, Nigerian technology investments were dominated by standard payment API wrappers and consumer fintech wallets. However, the macro-economic shifts of the past 24 months have triggered an intellectual and strategic recalibration among regional General Partners.\n\nToday, the focus is tilting heavily towards 'infrastructure-enablers.' This includes cold-chain logistics networks, sustainable physical real estate, smart utility distribution, and native manufacturing components. Fund managers are realizing that without deep infrastructure, digital interfaces are merely painting over systemic cracks.\n\n### Why Logistics Is King\n\nIn Lagos, Enugu, and Kano, a new generation of venture capital is funding warehousing hubs equipped with solar micro-grids. These physical nodes reduce transit latency and food spoilage, producing tangible yield increases that drive direct GDP growth. Experts agree that this pragmatic turn marks the true maturation of Africa's tech ecosystem.",
    category: "Investment",
    author: "Femi Soyinka",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    isPublished: true,
    slug: "architecture-of-capital-nigerian-vcs-2026"
  },
  {
    id: "story-2",
    title: "Amina Adebayo's Blueprint for Economic Sovereignty",
    excerpt: "An exclusive profile on the Helios Fintech CEO, tracking her journey from software engineer to transaction processing giant.",
    content: "## Defining Next-Gen Financial Corridors\n\nInside the quiet, monochrome offices of Helios Fintech in Victoria Island, Amina Adebayo is redesigning the financial plumbing of West Africa. She doesn't speak in the hyper-energetic, hype-filled vocabulary of typical Silicon Valley executives. She speaks with the precise, methodical cadence of an electrical engineer.\n\n'We aren't here to disrupt things just for the sake of friction,' she notes during our 3-hour conversation. 'We are building reliable utilities. A payment system is as essential to a modern economy as clean water and power lines.'\n\n### Scaling Under Pressure\n\nHelios's proprietary core ledger now handles millions of transactions per minute. The system is engineered to function across low-bandwidth environments, allowing rural retail merchants in Kebbi and Delta states to settle cross-border supply bills in real-time, bypassing traditional bank delays that once took weeks.",
    category: "People",
    author: "Aisha Umar",
    date: "Aug 12, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    isPublished: true,
    slug: "amina-adebayo-blueprint-economic-sovereignty"
  },
  {
    id: "story-3",
    title: "The Green Frontier: Climate-Resilient Agriculture in the Middle Belt",
    excerpt: "How agritech leaders are partnering with local cooperatives to deploy satellite telemetry and climate-smart irrigation.",
    content: "## Adapting to Shifting Rain Seasons\n\nThe Sahel's expansion and fluctuating precipitation schedules have historically made cereal cultivation in Nigeria's Middle Belt highly volatile. But in 2026, technology is providing a powerful counter-offensive.\n\nUsing satellite telemetry and local IoT ground sensors, young agronomists are providing real-time moisture advice straight to farmers via simplified USSD and voice interfaces in native languages. The results are striking: cooperative yields have risen by 44% in Kaduna and Plateau states, paving a resilient path for regional food security.",
    category: "Agriculture",
    author: "Nuhu Danjuma",
    date: "Aug 09, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1625246143195-6b222920f06a?q=80&w=800&auto=format&fit=crop",
    isPublished: true,
    slug: "green-frontier-climate-resilient-agriculture"
  },
  {
    id: "story-4",
    title: "Beyond Nollywood: Institutionalizing the Creative Economy",
    excerpt: "How African content creators and studio directors are securing global distribution rights while retaining intellectual ownership.",
    content: "## Retaining Intellectual Assets\n\nFor decades, Nigerian storytelling was characterized by hyper-prolific, low-budget video releases. While culturally monumental, this speed-first approach often left local talent with minimal long-term capital or intellectual property protections. Now, a sophisticated breed of creative executives are setting up studio funds to secure premium international co-production deals, ensuring Nigerian storytellers own the copyrights to their cultural assets.",
    category: "Culture",
    author: "Yetunde Alabi",
    date: "Aug 02, 2026",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    isPublished: true,
    slug: "beyond-nollywood-institutionalizing-creative-economy"
  },
  // Adding 8 more stories to reach exactly 12 as requested
  ...Array.from({ length: 8 }, (_, idx) => {
    const id = idx + 5;
    const cats = ["Business", "Technology", "Innovation", "Impact", "Opinion", "Leadership"];
    const cat = cats[idx % cats.length];
    return {
      id: `story-${id}`,
      title: `Structuring Next-Generation ${cat} Ecosystems: Lessons from Nigeria's Rising Leaders`,
      excerpt: `An insightful analysis on how under-50 executives are leveraging strategic policy adjustments and private-public alignments to scale ${cat.toLowerCase()} infrastructures.`,
      content: `## The Modern Blueprint for ${cat}\n\nDeveloping stable institutions requires a profound understanding of regulatory frameworks, cross-border supply economics, and long-term capital commitment. This editorial explores how Nigeria's most progressive under-50 cohort is building highly resilient protocols that will withstand economic cycles.\n\nThrough intense cross-industry collaboration and rapid tech-adoption, these leaders are proving that sustainable progress is not a distant vision but an active reality being crafted day by day.`,
      category: cat,
      author: ["Chukwu Obi", "Aisha Umar", "Babajide Folorunsho", "Folake Alabi"][idx % 4],
      date: `Jul ${28 - idx}, 2026`,
      readTime: `${4 + (idx % 4)} min read`,
      imageUrl: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
      ][idx % 4],
      isPublished: true,
      slug: `structuring-next-generation-${cat.toLowerCase()}-ecosystem-${id}`
    };
  })
];

export const initialSpeakers: Speaker[] = [
  {
    id: "spk-1",
    name: "Amina Adebayo",
    position: "CEO",
    organization: "Helios Fintech",
    topic: "Laying the Concrete Payment Highways for Africa's Economic Expansion",
    portraitUrl: PORTRAITS[0],
    bio: "Chief Executive Officer of Helios Fintech. Architect of high-throughput payment corridors.",
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: "spk-2",
    name: "Chidi Egwu",
    position: "Founder & Chief Agronomist",
    organization: "FarmVanguard Group",
    topic: "Satellite Crop Telemetry: Turning Soil Risk into Predictable Harvests",
    portraitUrl: PORTRAITS[1],
    bio: "Renowned agronomist and pioneer of localized agritech telemetry across Central Nigeria.",
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: "spk-3",
    name: "Funmi Adeshina",
    position: "Managing Partner",
    organization: "Rising Tide Capital",
    topic: "Funding the heavy iron: De-risking physical logistics & manufacture seeds",
    portraitUrl: PORTRAITS[2],
    bio: "Experienced VC General Partner backing native infrastructure, logistics, and supply tech.",
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: "spk-4",
    name: "Olumide Okonkwo",
    position: "Lead Architect",
    organization: "Obelisk Infrastructure",
    topic: "Carbon-Neutral Urban Nodes: Rethinking Energy in Dense Coastal Cities",
    portraitUrl: PORTRAITS[3],
    bio: "Pioneering green architect constructing sustainable, solar-independent micro-communities.",
    socials: { linkedin: "https://linkedin.com" }
  },
  // Adding 6 more speakers to reach exactly 10
  ...Array.from({ length: 6 }, (_, idx) => {
    const id = idx + 5;
    const names = ["Tunde Alabi", "Ngozi Sanusi", "Ibrahim Folorunsho", "Yetunde Alabi", "Emeka Nwosu", "Halima Danjuma"];
    const orgs = ["Apex Partners", "Vanguard Capital", "Horizon Healthtech", "Civic Insight", "Logistics Nigeria", "Kano Agritech"];
    return {
      id: `spk-${id}`,
      name: names[idx % names.length],
      position: ["Founder", "Executive Director", "Chief Medical Officer", "Managing Partner", "Global Lead"][idx % 5],
      organization: orgs[idx % orgs.length],
      topic: `Structuring Scalable ${["Fintech", "Aviation", "Healthcare Delivery", "Carbon-Credits", "Real Estate Funding"][idx % 5]} Channels across Africa`,
      portraitUrl: PORTRAITS[(id) % PORTRAITS.length],
      bio: `Industry authority with over a decade of operational excellence redefining business frontiers.`,
      socials: { linkedin: "https://linkedin.com" }
    };
  })
];

export const initialSessions: Session[] = [
  {
    id: "sess-1",
    time: "09:00",
    title: "Registration & High-Net Networking",
    description: "Delegates arrive. Press accreditations open. Elite private roundtable registrations commence.",
    speakerIds: [],
    category: "Networking"
  },
  {
    id: "sess-2",
    time: "10:00",
    title: "Opening Statement & Platform Manifesto",
    description: "Official welcome address laying down the strategic scope of the UNDER50 NIGERIA platform.",
    speakerIds: [],
    category: "Keynote"
  },
  {
    id: "sess-3",
    time: "10:30",
    title: "Financing the Hard Rails: Capital Velocity vs Infrastructure",
    description: "An intensive debate on bridging the financing gap between consumer applications and heavy capital goods/supply chains.",
    speakerIds: ["spk-3", "spk-1"],
    category: "Panel"
  },
  {
    id: "sess-4",
    time: "11:45",
    title: "Climate-Resilient Agriculture: Scaling food production under precipitation volatility",
    description: "Technological deep-dive into agricultural yields, real-time USSD monitoring, and sovereign supply resilience.",
    speakerIds: ["spk-2"],
    category: "Fireside Chat"
  },
  {
    id: "sess-5",
    time: "12:30",
    title: "Luncheon & Private Institutional Matches",
    description: "A private curated dining experience mapping high-potential founders with active investment pools.",
    speakerIds: [],
    category: "Luncheon"
  },
  {
    id: "sess-6",
    time: "14:00",
    title: "Rethinking Urban Density: Green Architecture and Energy Independence",
    description: "Exploration of smart housing grids, localized building materials, and micro-grid utilities for coastal hubs.",
    speakerIds: ["spk-4"],
    category: "Case Study"
  },
  {
    id: "sess-7",
    time: "15:00",
    title: "Policy & Sovereign Growth: Aligning Enterprise with National Interest",
    description: "Panel session investigating regulatory partnerships, tax adjustments for local manufacturers, and public digital assets.",
    speakerIds: ["spk-5", "spk-6", "spk-7"],
    category: "Panel"
  },
  {
    id: "sess-8",
    time: "16:30",
    title: "Closing Plenary & The UNDER50 2026 List Unveiling",
    description: "High-production gala countdown and official recognition induction ceremony.",
    speakerIds: ["spk-1", "spk-2", "spk-3", "spk-4"],
    category: "Induction Ceremony"
  }
];

export const initialPartners: Partner[] = [
  {
    id: "prt-1",
    name: "Standard Chartered Africa",
    tier: "TITLE",
    logoUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=200&auto=format&fit=crop",
    website: "https://standardchartered.com"
  },
  {
    id: "prt-2",
    name: "PricewaterhouseCoopers (PwC) Nigeria",
    tier: "PLATINUM",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    website: "https://pwc.com"
  },
  {
    id: "prt-3",
    name: "Flutterwave",
    tier: "PLATINUM",
    logoUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop",
    website: "https://flutterwave.com"
  },
  {
    id: "prt-4",
    name: "Dangote Group",
    tier: "GOLD",
    logoUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=200&auto=format&fit=crop",
    website: "https://dangote.com"
  },
  {
    id: "prt-5",
    name: "BusinessDay Media",
    tier: "MEDIA",
    logoUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=200&auto=format&fit=crop",
    website: "https://businessday.ng"
  },
  {
    id: "prt-6",
    name: "Nigeria Economic Summit Group (NESG)",
    tier: "STRATEGIC",
    logoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop",
    website: "https://nesg.org"
  },
  {
    id: "prt-7",
    name: "Lagos Business School (LBS)",
    tier: "STRATEGIC",
    logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=200&auto=format&fit=crop",
    website: "https://lbs.edu.ng"
  },
  {
    id: "prt-8",
    name: "Ventures Platform",
    tier: "COMMUNITY",
    logoUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=200&auto=format&fit=crop",
    website: "https://venturesplatform.com"
  }
];

export const initialJudges: Judge[] = [
  {
    id: "jdg-1",
    name: "Dr. Alero Balogun",
    title: "Senior Governance & Policy Advisor",
    organization: "The African Union Commission",
    portraitUrl: PORTRAITS[4],
    bio: "Former Director-General of Regional Reforms, over 22 years structuring public sector digital trust registries."
  },
  {
    id: "jdg-2",
    name: "Eseosa Okunbo",
    title: "Distinguished Fellow of Capital Markets",
    organization: "London School of Economics",
    portraitUrl: PORTRAITS[5],
    bio: "Pioneering structured private equity partner with over $3.8B in infrastructure assets under advisory."
  },
  {
    id: "jdg-3",
    name: "Yusuf Danjuma",
    title: "Co-Founder & General Partner",
    organization: "Sahara Green Ventures",
    portraitUrl: PORTRAITS[6],
    bio: "Renowned venture investor with strategic board seats in 14 tier-1 African Agritech and Climate operations."
  },
  {
    id: "jdg-4",
    name: "Chioma Nwosu",
    title: "Managing Director",
    organization: "Nollywood Cinema Development",
    portraitUrl: PORTRAITS[7],
    bio: "Award-winning creative economy developer representing Nigerian cinematic and IP rights on global boards."
  },
  {
    id: "jdg-5",
    name: "Professor Babajide Lawal",
    title: "Chair of Technological Systems",
    organization: "University of Ibadan",
    portraitUrl: PORTRAITS[8],
    bio: "Renowned academic researcher with over 80 published works on high-efficiency computing models in emerging markets."
  }
];

export const ticketTiers: TicketTier[] = [
  {
    id: "tkt-1",
    name: "Standard Access",
    price: 75000,
    benefits: [
      "Access to all general conference tracks & panel discussions",
      "Official UNDER50 Nigeria delegate badge & digital workbook",
      "Standard seating in main auditorium",
      "Networking lunch & coffee breaks",
      "Access to public exhibition pavilion"
    ],
    availability: "AVAILABLE"
  },
  {
    id: "tkt-2",
    name: "VIP Premium",
    price: 250000,
    benefits: [
      "All Standard benefits",
      "Reserved front-row seating during keynotes and list unveiling",
      "Access to VIP Networking Lounge and exclusive executive speed-networking",
      "Gala Awards Dinner invitation and premium cocktail reception",
      "Complimentary high-end gift bag containing printed UNDER50 2026 Yearbook"
    ],
    availability: "SELLING_FAST"
  },
  {
    id: "tkt-3",
    name: "VVIP Elite Partner",
    price: 750000,
    benefits: [
      "All VIP Premium benefits",
      "Access to Private Advisory Board roundtable matches with judges & speakers",
      "Dedicated high-value concierge service & premium fast-track check-in",
      "Private press & media room interview opportunities",
      "Exclusive invitation to pre-event private dinner with Under-50 inductees"
    ],
    availability: "AVAILABLE"
  },
  {
    id: "tkt-4",
    name: "Corporate Table of 5",
    price: 1100000,
    originalPrice: 1250000,
    benefits: [
      "5 × full VIP Premium credentials with priority assigned corporate seating",
      "Dedicated corporate table display at the Gala Awards Dinner",
      "1/4 page corporate logo insertion inside the printed UNDER50 2026 Yearbook",
      "Group digital media interview feature published across regional partner platforms"
    ],
    availability: "AVAILABLE"
  }
];

export const initialSettings: SiteSettings = {
  countdownDate: "2026-11-20", // Configured date
  countdownTime: "09:00",
  timezone: "GMT+1 (Lagos)",
  eventStatus: "COUNTDOWN",
  currentEditionYear: 2026,
  nominationsOpen: true,
  whatsappContact: "https://wa.me/234800UNDER50" // High-fidelity WhatsApp link
};

// Initial nominations array for admin dashboard tracking
export const initialNominations: Nomination[] = [
  {
    id: "nom-rec-1",
    nomineeName: "Dr. Okey Nwachukwu",
    nomineeEmail: "okey@apexhealth.ng",
    nomineePhone: "+234 803 111 2222",
    nomineeTitle: "Director of Clinical Operations",
    nomineeOrg: "Apex Medical Center",
    nomineeIndustry: "Digital Health",
    nomineeCategory: "Healthcare",
    nomineeState: "Enugu",
    achievements: "Deployed containerized telemedicine clinics treating over 35,000 rural patients in Eastern Nigeria with real-time video diagnosis.",
    impactDescription: "Our network has reduced child mortality metrics by 14% across 8 rural local government areas by bringing premium specialist diagnostics directly to primary health centers.",
    supportingEvidenceUrl: "https://apexhealth.ng/evidence.pdf",
    refereeName: "Prof. Kenneth Okafor",
    refereeEmail: "k.okafor@unth.edu.ng",
    refereePhone: "+234 805 333 4444",
    status: NominationStatus.UNDER_REVIEW,
    dateSubmitted: "2026-08-15"
  },
  {
    id: "nom-rec-2",
    nomineeName: "Halima Umar",
    nomineeEmail: "halima@sahelsprout.com",
    nomineePhone: "+234 812 555 6666",
    nomineeTitle: "Chief Operations Officer",
    nomineeOrg: "Sahel Sprout",
    nomineeIndustry: "Agritech",
    nomineeCategory: "Agriculture",
    nomineeState: "Kano",
    achievements: "Distributed drought-resistant grain species to 12,000 smallholders, backing purchase agreements with national distributors.",
    impactDescription: "Increased grain cooperative family revenues by an average of 180,000 NGN per seasonal cycle, while generating local processing employment.",
    supportingEvidenceUrl: "https://sahelsprout.com/impact.pdf",
    refereeName: "Alhaji Ibrahim Sanusi",
    refereeEmail: "i.sanusi@kanocoop.org",
    refereePhone: "+234 809 777 8888",
    status: NominationStatus.SUBMITTED,
    dateSubmitted: "2026-08-18"
  }
];
