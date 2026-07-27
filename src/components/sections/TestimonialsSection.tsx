import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import { TextReveal } from '../ui/TextReveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  accentHex: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  accentHex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header with Pair Counter */}
      <div className="flex items-center justify-between border-b border-hairline pb-6">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          04 / CREDIBILITY &amp; TESTIMONIALS
        </div>

        {/* Pair Counter (01 / 03) */}
        <div className="flex items-center space-x-4 font-mono-data text-xs">
          <span className="font-bold tracking-widest">
            0{currentIndex + 1} / 0{testimonials.length}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={prevTestimonial}
              title="Previous quote"
              className="p-2 rounded border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextTestimonial}
              title="Next quote"
              className="p-2 rounded border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Type Pull Quote */}
      <div className="max-w-4xl space-y-8 min-h-[220px] flex flex-col justify-between">
        <TextReveal key={current.id}>
          <blockquote className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-snug uppercase tracking-tight">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </TextReveal>

        {/* Attribution */}
        <div className="space-y-1 pt-4 border-t border-hairline font-mono-data text-xs uppercase tracking-widest">
          <div className="font-bold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }} />
            <span>{current.author}</span>
          </div>
          <div className="opacity-60 pl-4">
            {current.role} — {current.company} ({current.year})
          </div>
        </div>
      </div>
    </section>
  );
};
