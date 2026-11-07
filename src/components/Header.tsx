import React, { useState } from 'react';
import { 
  Compass, MapPin, Footprints, Info, Sparkles, 
  Monitor, QrCode, Menu, X, Smartphone 
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk';
  onNavigateTab: (tab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk') => void;
  itineraryCount: number;
  onOpenQrModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigateTab,
  itineraryCount,
  onOpenQrModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'map', label: 'Interactive Map' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'itinerary', label: `Plan Visit ${itineraryCount > 0 ? `(${itineraryCount})` : ''}` },
    { id: 'info', label: 'Visitor Info' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <button
          onClick={() => onNavigateTab('explore')}
          className="text-lg font-bold tracking-tight text-emerald-900 dark:text-emerald-400 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity flex items-center gap-2 text-left"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
          <span>Gardens by the Bay</span>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateTab(link.id as any)}
              className={`whitespace-nowrap shrink-0 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors py-1 relative ${
                activeTab === link.id
                  ? 'text-emerald-800 dark:text-emerald-400 font-bold'
                  : ''
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQrModal}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Scan QR to continue on mobile"
            aria-label="Continue on mobile via QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateTab('kiosk')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kiosk Mode</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigateTab(link.id as any);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              onNavigateTab('kiosk');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2"
          >
            <Monitor className="w-4 h-4" />
            <span>Launch Touch Kiosk Mode</span>
          </button>
        </div>
      )}
    </header>
  );
};
