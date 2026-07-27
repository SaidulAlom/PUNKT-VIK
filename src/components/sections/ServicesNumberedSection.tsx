import React from 'react';
import { Service } from '../../types';
import { HairlineDivider } from '../ui/HairlineDivider';
import { TextReveal } from '../ui/TextReveal';

interface ServicesNumberedSectionProps {
  services: Service[];
  accentHex: string;
}

export const ServicesNumberedSection: React.FC<ServicesNumberedSectionProps> = ({
  services,
  accentHex,
}) => {
  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-hairline pb-6 space-y-2">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          03 / CAPABILITIES &amp; VALUE
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
          WHERE WE ADD VALUE
        </h2>
      </div>

      {/* Stacked Numbered Rows */}
      <div className="space-y-0">
        <HairlineDivider />
        {services.map((service) => (
          <React.Fragment key={service.id}>
            <div className="py-10 sm:py-16 px-4 sm:px-6 group transition-colors duration-300 hover:bg-black/[0.015] dark:hover:bg-white/[0.015]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Number in tabular figure monospace */}
                <div className="md:col-span-2">
                  <span
                    className="font-mono-data text-3xl sm:text-4xl font-extrabold tracking-tight"
                    style={{ color: accentHex }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="md:col-span-5 space-y-2">
                  <TextReveal>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                      {service.title}
                    </h3>
                  </TextReveal>
                  <p className="font-mono-data text-xs opacity-60 uppercase tracking-wider">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description & Deliverables Pills */}
                <div className="md:col-span-5 space-y-4">
                  <p className="text-sm opacity-80 leading-relaxed font-sans">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-full border border-hairline text-[11px] font-mono-data uppercase tracking-wider opacity-70 bg-black/[0.02] dark:bg-white/[0.02]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <HairlineDivider />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
