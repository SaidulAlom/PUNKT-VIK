import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('punkt_vik_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level: 'all' | 'essential') => {
    localStorage.setItem('punkt_vik_cookie_consent', JSON.stringify({ level, timestamp: Date.now() }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent banner"
      className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 bg-[var(--bg-paper)] border border-hairline shadow-2xl rounded-sm space-y-4 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono-data uppercase tracking-widest font-semibold">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>DATA &amp; PRIVACY DISCLOSURE</span>
        </div>
        <button
          onClick={() => handleConsent('essential')}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 opacity-60 hover:opacity-100"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs opacity-80 leading-relaxed font-sans">
        We use essential local storage to remember your theme and accent color preferences. Optional anonymous analytics help us refine our studio portfolio performance.
      </p>

      <div className="flex items-center justify-end space-x-3 pt-2 font-mono-data text-xs">
        <button
          onClick={() => handleConsent('essential')}
          className="px-3 py-1.5 rounded border border-hairline opacity-70 hover:opacity-100 uppercase tracking-wider transition-opacity"
        >
          REJECT OPTIONAL
        </button>
        <button
          onClick={() => handleConsent('all')}
          className="px-4 py-1.5 rounded bg-[var(--text-ink)] text-[var(--bg-paper)] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          ACCEPT ALL
        </button>
      </div>
    </div>
  );
};
