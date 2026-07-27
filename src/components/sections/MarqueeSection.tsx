import React from 'react';

interface MarqueeSectionProps {
  accentHex: string;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({ accentHex }) => {
  const marqueeItems = [
    { text: 'KJAER & SØN', outline: false },
    { text: 'BRAND IDENTITY', outline: true },
    { text: 'NORRA SOUND', outline: false },
    { text: 'BESPOKE WEB', outline: true },
    { text: 'ARKIV 04', outline: false },
    { text: 'SYSTEM ARCHITECTURE', outline: true },
    { text: 'SOLARIS AG', outline: false },
    { text: 'EDITORIAL DESIGN', outline: true },
  ];

  return (
    <section className="py-16 sm:py-24 border-y border-hairline overflow-hidden select-none bg-black/[0.015] dark:bg-white/[0.015]">
      <div className="sr-only">
        Featured portfolio highlights: Kjaer &amp; Son, Brand Identity, Norra Sound, Bespoke Web, Arkiv 04, System Architecture, Solaris AG, Editorial Design.
      </div>

      <div aria-hidden="true" className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-8 sm:space-x-12">
              <span
                className={`font-display text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight ${
                  item.outline ? 'text-stroke-light' : ''
                }`}
              >
                {item.text}
              </span>
              <span
                className="text-2xl sm:text-4xl"
                style={{ color: accentHex }}
              >
                ✳
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
