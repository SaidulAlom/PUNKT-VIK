import React, { useState, useEffect } from 'react';
import { ActiveTab, AccentColorKey } from '../../types';
import { ACCENT_COLORS } from '../../data/studioData';
import { Sun, Moon, Palette, PhoneCall, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  accentKey: AccentColorKey;
  setAccentKey: (key: AccentColorKey) => void;
  onOpenBookCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  accentKey,
  setAccentKey,
  onOpenBookCall,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'work', label: 'WORK' },
    { id: 'studio', label: 'STUDIO' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const currentAccentHex = ACCENT_COLORS.find((c) => c.key === accentKey)?.hex || '#D9A441';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-paper)]/90 backdrop-blur-md border-b border-hairline py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group focus:outline-none"
        >
          <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight uppercase flex items-center space-x-2">
            <span>PUNKT &amp; VIK</span>
            <span
              className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{ backgroundColor: currentAccentHex }}
            />
          </div>
          <p className="text-[10px] font-mono-data opacity-60 tracking-widest uppercase hidden sm:block">
            STOCKHOLM • OSLO • ZURICH
          </p>
        </button>

        {/* Desktop Primary Nav */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`relative py-1 text-xs font-mono-data tracking-widest uppercase transition-colors ${
                  isActive ? 'text-[var(--text-ink)] font-semibold' : 'text-[var(--text-ink)]/60 hover:text-[var(--text-ink)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] transition-all duration-300"
                    style={{ backgroundColor: currentAccentHex }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls & Call Pill */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Accent Color Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowAccentPicker(!showAccentPicker)}
              title="Change Accent Color"
              className="p-2 rounded-full border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: currentAccentHex }}
              />
            </button>

            {showAccentPicker && (
              <div className="absolute right-0 mt-2 p-2 bg-[var(--bg-paper)] border border-hairline rounded shadow-xl flex space-x-2 z-50 animate-in fade-in zoom-in-95">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      setAccentKey(c.key);
                      setShowAccentPicker(false);
                    }}
                    title={c.label}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      accentKey === c.key ? 'scale-110 border-current' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Theme Dark/Light Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            title="Toggle Dark / Light Theme"
            className="p-2 rounded-full border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Book a call pill button */}
          <button
            onClick={onOpenBookCall}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono-data tracking-wider uppercase border border-current transition-all duration-300 hover:bg-[var(--text-ink)] hover:text-[var(--bg-paper)] group focus:outline-none"
          >
            <PhoneCall className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>BOOK A CALL</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded border border-hairline text-[var(--text-ink)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-[var(--bg-paper)] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-mono-data text-sm uppercase tracking-wider">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-hairline ${
                  activeTab === item.id ? 'font-bold text-[var(--text-ink)]' : 'opacity-70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBookCall();
            }}
            className="w-full py-3 rounded-full border border-current text-xs font-mono-data uppercase tracking-wider text-center"
            style={{ borderColor: currentAccentHex }}
          >
            BOOK A CALL ↗
          </button>
        </div>
      )}
    </header>
  );
};
