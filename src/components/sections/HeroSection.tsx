import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { TextReveal } from '../ui/TextReveal';
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  featuredProject: Project;
  onSelectProject: (p: Project) => void;
  accentHex: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredProject,
  onSelectProject,
  accentHex,
}) => {
  const [tagIndex, setTagIndex] = useState(0);

  const dataReadouts = [
    { client: featuredProject.client, discipline: featuredProject.discipline, year: featuredProject.year },
    { client: 'NORRA SOUND', discipline: 'Precision Audio UI', year: '2025' },
    { client: 'SOLARIS AG', discipline: 'Telemetry Grid System', year: '2025' },
    { client: 'ARKIV STOCKHOLM', discipline: 'Digital Monograph', year: '2025' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % dataReadouts.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [dataReadouts.length]);

  const currentData = dataReadouts[tagIndex];

  return (
    <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      {/* Top Header Eyebrow & Headline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-data uppercase tracking-widest opacity-60">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentHex }} />
            <span>FEATURED PROJECT [01]</span>
          </div>

          <TextReveal>
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
              {featuredProject.title}
            </h1>
          </TextReveal>
        </div>

        {/* Data Readout Loop & Action Link */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-4 border border-hairline rounded-sm bg-black/[0.02] dark:bg-white/[0.02] font-mono-data text-xs space-y-2">
            <div className="flex items-center justify-between opacity-50 text-[10px] uppercase tracking-widest border-b border-hairline pb-1">
              <span>STUDIO READOUT</span>
              <span>LIVE TRANSMISSION</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">CLIENT:</span>
              <span className="font-semibold">{currentData.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">FOCUS:</span>
              <span>{currentData.discipline}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">YEAR:</span>
              <span>{currentData.year}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectProject(featuredProject)}
            className="w-full py-3 px-6 rounded-full border border-current font-mono-data text-xs uppercase tracking-widest flex items-center justify-between group hover:bg-[var(--text-ink)] hover:text-[var(--bg-paper)] transition-all duration-300"
          >
            <span>VIEW CASE STUDY</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Featured Still Frame Gallery Presentation */}
      <div className="relative group cursor-pointer overflow-hidden border border-hairline rounded-sm shadow-xl" onClick={() => onSelectProject(featuredProject)}>
        <div className="aspect-[16/9] w-full bg-neutral-900 overflow-hidden relative">
          <img
            src={featuredProject.heroImage}
            alt={featuredProject.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div className="space-y-1">
              <p className="text-xs font-mono-data uppercase tracking-widest text-white/70">
                {featuredProject.discipline}
              </p>
              <p className="text-lg font-display font-bold uppercase tracking-wider">
                {featuredProject.client}
              </p>
            </div>

            <div
              className="px-4 py-2 rounded-full backdrop-blur-md text-xs font-mono-data uppercase tracking-wider font-semibold border border-white/20 flex items-center space-x-2"
              style={{ backgroundColor: `${accentHex}DD` }}
            >
              <span>EXPLORE ARCHIVE</span>
              <span>↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Positioning Statement Below Fold */}
      <div className="pt-12 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3 text-xs font-mono-data uppercase tracking-widest opacity-50 flex items-center space-x-2">
          <ArrowDownRight className="w-4 h-4" />
          <span>POSITIONING ETHOS</span>
        </div>

        <div className="md:col-span-9">
          <TextReveal>
            <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight">
              &ldquo;We only design what belongs. Outgrowing the template is where we start.&rdquo;
            </p>
          </TextReveal>
        </div>
      </div>
    </section>
  );
};
