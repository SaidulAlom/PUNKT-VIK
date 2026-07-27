import React, { useState } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Copy, Check, ArrowUpRight, PhoneCall } from 'lucide-react';

interface ContactCTASectionProps {
  accentHex: string;
  onOpenBookCall: () => void;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  accentHex,
  onOpenBookCall,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@punktvik.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-28 sm:py-40 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 border-t border-hairline">
      <div className="space-y-4">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          05 / INITIATE COMMISSIONS
        </div>

        <TextReveal>
          <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
            DO YOU HAVE A PROJECT IN MIND? LET’S TALK.
          </h2>
        </TextReveal>
      </div>

      <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-8 font-mono-data">
        {/* Large Clickable Email */}
        <div className="space-y-2">
          <div className="text-xs opacity-50 uppercase tracking-widest">
            DIRECT EMAIL INQUIRY
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="mailto:hello@punktvik.studio"
              className="font-display text-2xl sm:text-4xl font-extrabold hover-underline-link tracking-tight"
            >
              hello@punktvik.studio
            </a>
            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="p-2.5 rounded-full border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copied && (
            <p className="text-[11px] text-emerald-500 uppercase tracking-widest">
              ✓ Email address copied to clipboard
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onOpenBookCall}
            className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--bg-paper)] bg-[var(--text-ink)] hover:opacity-90 transition-opacity flex items-center justify-center space-x-3 shadow-xl"
            style={{ boxShadow: `0 8px 30px ${accentHex}40` }}
          >
            <PhoneCall className="w-4 h-4" />
            <span>SCHEDULE DISCOVERY CALL</span>
          </button>
        </div>
      </div>
    </section>
  );
};
