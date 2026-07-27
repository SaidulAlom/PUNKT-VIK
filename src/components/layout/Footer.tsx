import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { LiveClock } from '../ui/LiveClock';
import { HairlineDivider } from '../ui/HairlineDivider';
import { Check, Copy, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  accentHex: string;
  onOpenBookCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, accentHex, onOpenBookCall }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@punktvik.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-hairline bg-[var(--bg-paper)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        {/* Main 3-Column Studio Instrument Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
          {/* Col 1: Studio Identity & Direct Contact */}
          <div className="md:col-span-5 space-y-6">
            <div className="font-display text-2xl font-extrabold uppercase tracking-tight">
              PUNKT &amp; VIK
            </div>
            <p className="text-sm opacity-70 max-w-sm leading-relaxed">
              Bespoke brand identities and digital experiences for founders and teams who have outgrown the template.
            </p>

            <div className="pt-2">
              <div className="text-xs font-mono-data opacity-50 uppercase tracking-widest mb-1">
                Direct Inquiries
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="mailto:hello@punktvik.studio"
                  className="font-mono-data text-base font-semibold hover-underline-link"
                >
                  hello@punktvik.studio
                </a>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="p-1.5 rounded border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="md:col-span-3 space-y-4 font-mono-data">
            <div className="text-xs opacity-50 uppercase tracking-widest">
              Index
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover-underline-link"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('work');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover-underline-link"
                >
                  Work / 06 Selected Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover-underline-link"
                >
                  Studio / Founders &amp; Ethos
                </button>
              </li>
              <li>
                <button onClick={onOpenBookCall} className="hover-underline-link text-left">
                  Contact / Schedule Call ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Studio Instrument Data Panel */}
          <div className="md:col-span-4 space-y-4 border border-hairline p-5 rounded-sm bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center justify-between text-xs font-mono-data opacity-50 uppercase tracking-widest">
              <span>Studio Instrument</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }} />
            </div>

            <LiveClock />

            <div className="pt-2 border-t border-hairline text-xs font-mono-data opacity-80 space-y-1">
              <div className="flex justify-between">
                <span className="opacity-60">Q3/Q4 Availability:</span>
                <span className="font-semibold text-emerald-500">2 Commissions Open</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Lead Time:</span>
                <span>4 - 6 Weeks</span>
              </div>
            </div>
          </div>
        </div>

        <HairlineDivider />

        {/* Legal & Socials Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono-data opacity-60 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} PUNKT &amp; VIK STUDIO. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-100 flex items-center space-x-1">
              <span>INSTAGRAM</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://readcv.com" target="_blank" rel="noreferrer" className="hover:opacity-100 flex items-center space-x-1">
              <span>READ.CV</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="#privacy" className="hover:opacity-100">
              PRIVACY POLICY
            </a>
            <a href="#transparency" className="hover:opacity-100">
              TRANSPARENCY STATEMENT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
