import React from 'react';
import { FOUNDERS, STUDIO_PHILOSOPHY } from '../../data/studioData';
import { TextReveal } from '../ui/TextReveal';
import { HairlineDivider } from '../ui/HairlineDivider';
import { Award, Compass, Cpu, Layers } from 'lucide-react';

interface StudioViewProps {
  accentHex: string;
  onOpenBookCall: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ accentHex, onOpenBookCall }) => {
  const awards = [
    { title: 'Nordic Design Guild Digital Award', project: 'Kjaer & Søn', year: '2026' },
    { title: 'Awwwards Site of the Month', project: 'Arkiv Stockholm Monograph', year: '2025' },
    { title: 'German Design Award Nominee', project: 'Norra Audio Software', year: '2025' },
    { title: 'FWA of the Day', project: 'Carta Variable Type Engine', year: '2024' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
      {/* Studio Header */}
      <div className="space-y-4">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          STUDIO ETHOS &amp; PARTNERS
        </div>
        <TextReveal>
          <h1 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight">
            CRAFTED BY HAND, ENGINEERED FOR AUTHORITY.
          </h1>
        </TextReveal>
        <p className="font-sans text-xl opacity-90 max-w-3xl leading-relaxed">
          Punkt &amp; Vik was founded on a simple principle: high-growth brands deserve custom visual and digital architecture — not cookie-cutter marketing templates.
        </p>
      </div>

      <HairlineDivider />

      {/* Founders Section */}
      <div className="space-y-8">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          THE PARTNERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="p-8 border border-hairline rounded bg-black/[0.015] dark:bg-white/[0.015] space-y-6">
              <div className="flex items-center space-x-6">
                <img
                  src={f.avatar}
                  alt={f.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover grayscale border-2"
                  style={{ borderColor: accentHex }}
                />
                <div className="space-y-1 font-mono-data">
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                    {f.name}
                  </h3>
                  <div className="text-xs opacity-70 uppercase tracking-wider">{f.role}</div>
                  <div className="text-[10px] opacity-40 uppercase tracking-widest">{f.location}</div>
                </div>
              </div>

              <p className="font-sans text-sm opacity-80 leading-relaxed">
                {f.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      <HairlineDivider />

      {/* Philosophy Rules */}
      <div className="space-y-8">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          STUDIO RULES
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDIO_PHILOSOPHY.map((p, i) => (
            <div key={p.title} className="p-6 border border-hairline rounded space-y-3 font-mono-data">
              <div className="text-xl font-bold" style={{ color: accentHex }}>
                0{i + 1}
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {p.title}
              </h3>
              <p className="font-sans text-xs opacity-80 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <HairlineDivider />

      {/* Awards & Recognition */}
      <div className="space-y-8">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50 flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>ACCOLADES &amp; RECOGNITION</span>
        </div>

        <div className="border border-hairline rounded divide-y divide-hairline font-mono-data text-xs">
          {awards.map((a) => (
            <div key={a.title} className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold uppercase tracking-wider">{a.title}</span>
                <span className="opacity-50 ml-3">({a.project})</span>
              </div>
              <span className="opacity-60">{a.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 sm:p-12 border border-hairline rounded bg-black/[0.02] dark:bg-white/[0.02] text-center space-y-6">
        <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight">
          READY TO ELEVATE YOUR DIGITAL BRAND?
        </h3>
        <p className="text-sm opacity-80 max-w-md mx-auto font-sans">
          We are currently accepting 2 major studio commissions for Q3/Q4.
        </p>
        <button
          onClick={onOpenBookCall}
          className="px-8 py-3.5 rounded-full text-xs font-mono-data uppercase tracking-widest text-[var(--bg-paper)] bg-[var(--text-ink)] hover:opacity-90 transition-opacity"
        >
          INITIATE A CONVERSATION ↗
        </button>
      </div>
    </div>
  );
};
