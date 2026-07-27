import React from 'react';
import { FOUNDERS } from '../../data/studioData';
import { TextReveal } from '../ui/TextReveal';

export const StudioIntroSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column Label */}
        <div className="md:col-span-3 space-y-2">
          <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
            01 / STUDIO OVERVIEW
          </div>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">
            PUNKT &amp; VIK
          </h2>
        </div>

        {/* Center/Right Narrow Measure Editorial Paragraph */}
        <div className="md:col-span-9 space-y-12 max-w-3xl">
          <TextReveal>
            <p className="font-sans text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed opacity-90">
              Founded by <strong>Elin Vik</strong> and <strong>Kasper Punkt</strong> in Oslo and Zurich, Punkt &amp; Vik is an independent product design and web-experience studio. We build bespoke brand identities, custom digital flagships, and spatial typography for ambitious founders who have outgrown generic design templates.
            </p>
          </TextReveal>

          {/* Founder Bylines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-hairline font-mono-data text-xs">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="flex items-center space-x-4 p-3 rounded border border-hairline bg-black/[0.01] dark:bg-white/[0.01]">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover grayscale border border-hairline"
                />
                <div>
                  <div className="font-semibold text-sm uppercase tracking-wider">{founder.name}</div>
                  <div className="opacity-60">{founder.role}</div>
                  <div className="opacity-40 text-[10px] uppercase tracking-widest">{founder.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
