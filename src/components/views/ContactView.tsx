import React, { useState } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { HairlineDivider } from '../ui/HairlineDivider';
import { Copy, Check, MapPin, Mail, PhoneCall, Send } from 'lucide-react';

interface ContactViewProps {
  accentHex: string;
  onOpenBookCall: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ accentHex, onOpenBookCall }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@punktvik.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4">
        <div className="text-xs font-mono-data uppercase tracking-widest opacity-50">
          INQUIRIES &amp; COMMISSIONS
        </div>
        <TextReveal>
          <h1 className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight">
            LET’S BUILD SOMETHING ENDURING.
          </h1>
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Methods & Locations */}
        <div className="md:col-span-5 space-y-8 font-mono-data text-xs">
          <div className="p-6 border border-hairline rounded bg-black/[0.015] dark:bg-white/[0.015] space-y-4">
            <div className="opacity-50 uppercase tracking-widest">DIRECT EMAIL</div>
            <div className="flex items-center space-x-3">
              <a href="mailto:hello@punktvik.studio" className="text-base font-bold hover-underline-link">
                hello@punktvik.studio
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded border border-hairline hover:bg-black/5 dark:hover:bg-white/5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copied && <p className="text-[10px] text-emerald-500 uppercase">Copied to clipboard!</p>}
          </div>

          {/* Studios Locations */}
          <div className="space-y-4">
            <div className="opacity-50 uppercase tracking-widest flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>PHYSICAL STUDIOS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-hairline rounded space-y-1">
                <div className="font-bold uppercase">OSLO HQ</div>
                <div className="opacity-70">Akersgata 16, 0158 Oslo</div>
                <div className="opacity-40 text-[10px]">59.9139° N, 10.7522° E</div>
              </div>

              <div className="p-4 border border-hairline rounded space-y-1">
                <div className="font-bold uppercase">ZURICH STUDIO</div>
                <div className="opacity-70">Gotthardstrasse 26, 8002 Zurich</div>
                <div className="opacity-40 text-[10px]">47.3769° N, 8.5417° E</div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenBookCall}
              className="w-full py-3.5 rounded-full border border-current font-mono-data text-xs uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-[var(--text-ink)] hover:text-[var(--bg-paper)] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SCHEDULE A 30-MIN CALL</span>
            </button>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="md:col-span-7 p-6 sm:p-10 border border-hairline rounded bg-black/[0.01] dark:bg-white/[0.01]">
          {!submitted ? (
            <form onSubmit={handleSend} className="space-y-6 font-mono-data text-xs">
              <div className="text-xs opacity-50 uppercase tracking-widest mb-2">
                SEND DIRECT NOTE
              </div>

              <div className="space-y-1">
                <label className="block opacity-70 uppercase tracking-wider">YOUR NAME *</label>
                <input
                  type="text"
                  required
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                />
              </div>

              <div className="space-y-1">
                <label className="block opacity-70 uppercase tracking-wider">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                />
              </div>

              <div className="space-y-1">
                <label className="block opacity-70 uppercase tracking-wider">MESSAGE / PROJECT BRIEF *</label>
                <textarea
                  rows={5}
                  required
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Share details regarding your timeline, scope, and objectives..."
                  className="w-full px-4 py-2.5 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--bg-paper)] bg-[var(--text-ink)] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                style={{ backgroundColor: accentHex, color: '#111110' }}
              >
                <span>SEND DIRECT MESSAGE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4 font-mono-data">
              <div className="text-2xl font-bold uppercase">MESSAGE SENT</div>
              <p className="text-xs opacity-70 font-sans max-w-sm mx-auto">
                Thank you, {emailForm.name}. Your note has been delivered directly to Elin &amp; Kasper. We will reply within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full border border-hairline text-xs uppercase tracking-wider"
              >
                SEND ANOTHER NOTE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
