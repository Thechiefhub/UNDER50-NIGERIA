export enum NominationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  SHORTLISTED = "SHORTLISTED",
  FINALIST = "FINALIST",
  WINNER = "WINNER",
  NOT_SELECTED = "NOT_SELECTED"
}

export enum CountryEdition {
  NIGERIA = "NIGERIA",
  GHANA = "GHANA",
  KENYA = "KENYA",
  SOUTH_AFRICA = "SOUTH_AFRICA"
}

export interface Honouree {
  id: string;
  name: string;
  title: string;
  organization: string;
  industry: string;
  category: string;
  achievement: string;
  bio: string;
  portraitUrl: string;
  year: number;
  state: string;
  gender: "Male" | "Female";
  country: CountryEdition;
  whyTheyMatter: string;
  quote?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  recognitionHistory?: string[];
  isFeatured?: boolean;
}

export interface AwardCategory {
  id: string;
  name: string;
  description: string;
  criteria: string;
  icon: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  isPublished: boolean;
  slug: string;
}

export interface Speaker {
  id: string;
  name: string;
  position: string;
  organization: string;
  topic: string;
  portraitUrl: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Session {
  id: string;
  time: string;
  title: string;
  description: string;
  speakerIds: string[];
  category: string;
}

export interface Partner {
  id: string;
  name: string;
  tier: "TITLE" | "PLATINUM" | "GOLD" | "MEDIA" | "STRATEGIC" | "COMMUNITY";
  logoUrl: string;
  website: string;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  organization: string;
  portraitUrl: string;
  bio: string;
}

export interface Nomination {
  id: string;
  nomineeName: string;
  nomineeEmail: string;
  nomineePhone: string;
  nomineeTitle: string;
  nomineeOrg: string;
  nomineeIndustry: string;
  nomineeCategory: string;
  nomineeState: string;
  achievements: string;
  impactDescription: string;
  supportingEvidenceUrl?: string;
  nomineePortraitUrl?: string;
  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  status: NominationStatus;
  dateSubmitted: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number; // in NGN
  originalPrice?: number;
  benefits: string[];
  availability: "AVAILABLE" | "SELLING_FAST" | "SOLD_OUT";
}

export interface SiteSettings {
  countdownDate: string; // ISO string or simple date string
  countdownTime: string; // HH:MM
  timezone: string;
  eventStatus: "COUNTDOWN" | "LIVE" | "COMPLETED";
  currentEditionYear: number;
  nominationsOpen: boolean;
  whatsappContact: string; // WhatsApp link
}
