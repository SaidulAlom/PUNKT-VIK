import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, AccentColorKey, Project } from './types';
import { PROJECTS } from './data/projects';
import { SERVICES, TESTIMONIALS, ACCENT_COLORS } from './data/studioData';
import { useMouseFollow } from './hooks/useMouseFollow';
import { useLenis } from './hooks/useLenis';

// Layout & UI
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CookieConsent } from './components/layout/CookieConsent';
import { BookCallModal } from './components/layout/BookCallModal';
import { CursorFollowPreview } from './components/interactions/CursorFollowPreview';

// Sections (for Home view)
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { StudioIntroSection } from './components/sections/StudioIntroSection';
import { ProjectListSection } from './components/sections/ProjectListSection';
import { ServicesNumberedSection } from './components/sections/ServicesNumberedSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactCTASection } from './components/sections/ContactCTASection';

// Views (for Work, Studio, Contact, Modal)
import { WorkView } from './components/views/WorkView';
import { StudioView } from './components/views/StudioView';
import { ContactView } from './components/views/ContactView';
import { ProjectDetailModal } from './components/views/ProjectDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [accentKey, setAccentKey] = useState<AccentColorKey>('ochre');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState<boolean>(false);

  // Initialize Lenis smooth scroll
  useLenis(true);

  // Initialize Lerp Mouse Follow
  const { mousePos, isHoverSupported } = useMouseFollow(0.12);

  const isInitialThemeMount = useRef(true);

  // Handle dark mode class on <html> with CSS keyframe cross-fade trigger
  useEffect(() => {
    if (isInitialThemeMount.current) {
      isInitialThemeMount.current = false;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return;
    }

    document.documentElement.classList.add('theme-crossfade-active');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-crossfade-active');
    }, 650);

    return () => clearTimeout(timer);
  }, [isDark]);

  const currentAccent = ACCENT_COLORS.find((c) => c.key === accentKey) || ACCENT_COLORS[0];

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#D9A441] selection:text-[#111110]">
      {/* Fixed Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        accentKey={accentKey}
        setAccentKey={setAccentKey}
        onOpenBookCall={() => setIsBookCallOpen(true)}
      />

      {/* Floating Cursor-Following Project Preview */}
      <CursorFollowPreview
        activeProject={hoveredProject}
        mousePos={mousePos}
        isHoverSupported={isHoverSupported}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <HeroSection
              featuredProject={PROJECTS[0]}
              onSelectProject={(p) => setSelectedProject(p)}
              accentHex={currentAccent.hex}
            />

            <MarqueeSection accentHex={currentAccent.hex} />

            <StudioIntroSection />

            <ProjectListSection
              projects={PROJECTS}
              onHoverProject={setHoveredProject}
              onSelectProject={(p) => setSelectedProject(p)}
              accentHex={currentAccent.hex}
            />

            <ServicesNumberedSection
              services={SERVICES}
              accentHex={currentAccent.hex}
            />

            <TestimonialsSection
              testimonials={TESTIMONIALS}
              accentHex={currentAccent.hex}
            />

            <ContactCTASection
              accentHex={currentAccent.hex}
              onOpenBookCall={() => setIsBookCallOpen(true)}
            />
          </>
        )}

        {activeTab === 'work' && (
          <WorkView
            onHoverProject={setHoveredProject}
            onSelectProject={(p) => setSelectedProject(p)}
            accentHex={currentAccent.hex}
          />
        )}

        {activeTab === 'studio' && (
          <StudioView
            accentHex={currentAccent.hex}
            onOpenBookCall={() => setIsBookCallOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            accentHex={currentAccent.hex}
            onOpenBookCall={() => setIsBookCallOpen(true)}
          />
        )}
      </main>

      {/* Studio Instrument Dashboard Footer */}
      <Footer
        setActiveTab={setActiveTab}
        accentHex={currentAccent.hex}
        onOpenBookCall={() => setIsBookCallOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        accentHex={currentAccent.hex}
      />

      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
        accentHex={currentAccent.hex}
      />

      {/* Accessible Cookie Consent Disclosure */}
      <CookieConsent />
    </div>
  );
}
