import { Service, Testimonial, Founder, AccentColorOption } from '../types';

export const ACCENT_COLORS: AccentColorOption[] = [
  { key: 'ochre', label: 'Ochre Yellow', hex: '#D9A441' },
  { key: 'electric', label: 'Electric Blue', hex: '#3B5BFF' },
  { key: 'vermilion', label: 'Signal Vermilion', hex: '#E63946' },
  { key: 'emerald', label: 'Cold Emerald', hex: '#10B981' }
];

export const SERVICES: Service[] = [
  {
    id: '01',
    number: '01',
    title: 'Brand Systems & Visual Architecture',
    subtitle: 'From core positioning to scalable typographic design tokens.',
    description: 'We craft comprehensive brand systems designed to withstand changing aesthetic trends. Complete with custom display typography, color logic, grid definitions, and digital motion guidelines.',
    deliverables: ['Type & Layout Systems', 'Visual Identity Tokens', 'Brand Architecture', 'Brand Manifestos']
  },
  {
    id: '02',
    number: '02',
    title: 'Bespoke Web Experiences',
    subtitle: 'Awwwards-grade digital flagships that communicate authority.',
    description: 'High-performance, editorial web experiences built with custom smooth-scrolling engines, cursor-aware micro-interactions, and bespoke WebGL shaders. No templates, no off-the-shelf page builders.',
    deliverables: ['Custom Web Architecture', 'Interactive WebGL/Canvas', 'Performant React Engines', 'Editorial Layouts']
  },
  {
    id: '03',
    number: '03',
    title: 'Digital Art Direction & Interactive Monograms',
    subtitle: 'Curation that turns products into coveted cultural objects.',
    description: 'We orchestrate photography, 3D motion assets, and typographic narratives that elevate software and physical objects into memorable digital artifacts.',
    deliverables: ['3D & Photography Curation', 'Digital Monographs', 'Interactive Product Shows', 'Campaign Identity']
  },
  {
    id: '04',
    number: '04',
    title: 'Product Interfaces & Design Systems',
    subtitle: 'Intuitive software environments for complex operational domains.',
    description: 'Translating dense data workflows into calm, high-legibility interface systems. We partner closely with engineering teams to deploy production-ready React component libraries.',
    deliverables: ['Complex Web Apps', 'Design System Architecture', 'Telemetry Dashboards', 'Figma & Code Libraries']
  },
  {
    id: '05',
    number: '05',
    title: 'Physical & Packaging Systems',
    subtitle: 'Unbleached tactile materials engineered with brutalist discipline.',
    description: 'Extending digital precision into physical space — including eco-conscious luxury packaging, gallery signage, exhibit typography, and architectural monographs.',
    deliverables: ['Sustainable Packaging', 'Architectural Signage', 'Print Monograph Design', 'Material Specification']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "Punkt & Vik operate with an obsessive level of detail. They stripped away the sales fluff and gave our brand an undeniable, quiet authority.",
    author: "Henrik Kjaer",
    role: "Founder & Principal Architect",
    company: "Kjaer & Søn Studio",
    year: "2026"
  },
  {
    id: 't2',
    quote: "Working with Elin and Kasper was the single highest-ROI decision we made ahead of our Series B. They build experiences that immediately separate you from the noise.",
    author: "Elena Vance",
    role: "Head of Product",
    company: "Solaris Infrastructure AG",
    year: "2025"
  },
  {
    id: 't3',
    quote: "No templates, no generic SaaS tropes. Just pure typographic mastery, razor-sharp execution, and a website that our peers still compliment every week.",
    author: "Soren Lindqvist",
    role: "Curator & Editor",
    company: "Arkiv Stockholm",
    year: "2025"
  }
];

export const FOUNDERS: Founder[] = [
  {
    name: 'Elin Vik',
    role: 'Co-Founder & Creative Director',
    location: 'Oslo / Zurich',
    bio: 'Formerly Senior Art Director at Basel Type Foundry. Elin oversees brand positioning, typography architecture, and physical monograph design.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Kasper Punkt',
    role: 'Co-Founder & Systems Lead',
    location: 'Stockholm / Zurich',
    bio: 'Specialist in custom interaction engines, WebGL, and responsive typography performance. Previously lead engineer for Swiss digital art institutions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

export const STUDIO_PHILOSOPHY = [
  {
    title: 'No Templates',
    description: 'Every layout, grid, and interaction is engineered specifically for the client’s narrative.'
  },
  {
    title: 'Two-Partner Focus',
    description: 'We cap our studio intake at 6 major projects per year. You work directly with Elin and Kasper, never junior delegates.'
  },
  {
    title: 'Typography First',
    description: 'Structure, hierarchy, and spatial rhythm carry 90% of the emotional weight. Color and motion accentuate, never distract.'
  }
];
