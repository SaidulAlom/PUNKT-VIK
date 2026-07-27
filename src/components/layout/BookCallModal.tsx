import React, { useState } from 'react';
import { X, Calendar, Send, CheckCircle2 } from 'lucide-react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentHex: string;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose, accentHex }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$30k - $50k',
    timeline: 'Q3 2026',
    services: [] as string[],
    message: '',
  });

  if (!isOpen) return null;

  const toggleService = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((item) => item !== s)
        : [...prev.services, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const availableServices = [
    'Brand Identity & Systems',
    'Bespoke Web Experience',
    'Interactive 3D/WebGL',
    'Design System Architecture',
    'Packaging & Monograph',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[var(--bg-paper)] border border-hairline shadow-2xl p-6 sm:p-10 rounded-sm text-[var(--text-ink)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-hairline hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono-data opacity-60 uppercase tracking-widest mb-1 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }} />
                <span>DIRECT INQUIRY &amp; SCHEDULING</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                INITIATE A COMMISSION
              </h2>
              <p className="text-sm opacity-70 mt-1 font-sans">
                Tell us briefly about your project goals. Elin or Kasper will respond within 24 hours to schedule a 30-minute discovery session.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono-data text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider opacity-60 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Astrid Lind"
                    className="w-full px-3 py-2 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider opacity-60 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., astrid@company.com"
                    className="w-full px-3 py-2 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider opacity-60 mb-1">
                    Company / Entity
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Kjaer Design"
                    className="w-full px-3 py-2 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider opacity-60 mb-1">
                    Anticipated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--bg-paper)] border border-hairline rounded focus:outline-none focus:border-current"
                  >
                    <option value="$20k - $30k">$20,000 - $30,000</option>
                    <option value="$30k - $50k">$30,000 - $50,000</option>
                    <option value="$50k - $100k">$50,000 - $100,000</option>
                    <option value="$100k+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider opacity-60 mb-2">
                  Select Scope / Services Needed
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableServices.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-3 py-1.5 rounded-full border text-[11px] uppercase tracking-wider transition-all ${
                          isSelected
                            ? 'bg-[var(--text-ink)] text-[var(--bg-paper)] border-transparent font-semibold'
                            : 'border-hairline hover:border-current opacity-70 hover:opacity-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider opacity-60 mb-1">
                  Project Brief &amp; Context
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your timeline, deliverables, or brand challenges..."
                  className="w-full px-3 py-2 bg-transparent border border-hairline rounded focus:outline-none focus:border-current"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[10px] opacity-50 uppercase tracking-widest flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>30-MIN DISCOVERY SESSION</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--bg-paper)] bg-[var(--text-ink)] hover:opacity-90 transition-opacity flex items-center space-x-2"
                  style={{ boxShadow: `0 4px 20px ${accentHex}33` }}
                >
                  <span>SEND INQUIRY &amp; SCHEDULER</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 animate-bounce" />
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-extrabold uppercase">INQUIRY RECEIVED</h3>
              <p className="text-sm opacity-80 max-w-md mx-auto font-sans">
                Thank you, <strong className="font-semibold">{formData.name}</strong>. Elin &amp; Kasper have received your brief. A calendar invitation has been sent to <span className="font-mono-data underline">{formData.email}</span>.
              </p>
            </div>
            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="px-6 py-2.5 rounded-full border border-current font-mono-data text-xs uppercase tracking-wider hover:bg-[var(--text-ink)] hover:text-[var(--bg-paper)] transition-colors"
            >
              RETURN TO STUDIO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
