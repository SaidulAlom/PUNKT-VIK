import React, { useState, useEffect } from 'react';

export const LiveClock: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');
  const [activeCity, setActiveCity] = useState<'oslo' | 'zurich'>('oslo');

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      // Format time in CET/CEST (UTC+1/UTC+2)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: activeCity === 'oslo' ? 'Europe/Oslo' : 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`${formatted} ${activeCity === 'oslo' ? 'CET (Oslo HQ)' : 'CET (Zurich)'}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeCity]);

  if (!mounted) {
    return (
      <div className="font-mono-data text-xs tracking-wider opacity-60">
        --:--:-- CET (Oslo HQ)
      </div>
    );
  }

  const coordinates = activeCity === 'oslo' 
    ? '59.9139° N, 10.7522° E' 
    : '47.3769° N, 8.5417° E';

  return (
    <div className="space-y-2 font-mono-data text-xs">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveCity('oslo')}
          className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border transition-colors ${
            activeCity === 'oslo'
              ? 'border-current bg-current text-[var(--bg-paper)] font-semibold'
              : 'border-current/20 opacity-60 hover:opacity-100'
          }`}
        >
          OSLO
        </button>
        <button
          onClick={() => setActiveCity('zurich')}
          className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border transition-colors ${
            activeCity === 'zurich'
              ? 'border-current bg-current text-[var(--bg-paper)] font-semibold'
              : 'border-current/20 opacity-60 hover:opacity-100'
          }`}
        >
          ZURICH
        </button>
      </div>

      <div className="flex items-center space-x-2 text-[11px] tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{timeStr}</span>
      </div>

      <div className="text-[10px] opacity-60 tracking-widest uppercase">
        COORDS: {coordinates}
      </div>
    </div>
  );
};
