export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  discipline: string;
  summary: string;
  description: string;
  tags: string[];
  heroImage: string;
  galleryImages: string[];
  outcome: string;
  clientQuote?: {
    text: string;
    author: string;
    title: string;
  };
  liveUrl?: string;
  accentHex?: string;
  aspectRatio?: string;
  readTime?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  year: string;
}

export interface Founder {
  name: string;
  role: string;
  location: string;
  bio: string;
  avatar: string;
}

export type AccentColorKey = 'ochre' | 'electric' | 'vermilion' | 'emerald';

export interface AccentColorOption {
  key: AccentColorKey;
  label: string;
  hex: string;
}

export type ActiveTab = 'home' | 'work' | 'studio' | 'contact';
