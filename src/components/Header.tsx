import React, { useState } from 'react';
import { 
  Compass, MapPin, Footprints, Info, Sparkles, 
  Monitor, QrCode, Menu, X, Smartphone, Globe
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  activeTab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk';
  onNavigateTab: (tab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk') => void;
  itineraryCount: number;
  onOpenQrModal: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigateTab,
  itineraryCount,
  onOpenQrModal,
  currentLang,
  onSelectLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navLinks = [
    { id: 'explore', label: t.nav.explore },
    { id: 'map', label: t.nav.map },
    { id: 'attractions', label: t.nav.attractions },
    { id: 'itinerary', label: `${t.nav.itinerary} ${itineraryCount > 0 ? `(${itineraryCount})` : ''}` },
    { id: 'info', label: t.nav.info },
  ] as const;

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文 (Mandarin)' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <button
          type="button"
          onClick={() => onNavigateTab('explore')}
          className="text-lg font-bold tracking-tight text-emerald-900 dark:text-emerald-400 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2 text-left cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
          <span>{t.appName}</span>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigateTab(link.id as any)}
              className={`whitespace-nowrap shrink-0 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors py-1 relative cursor-pointer ${
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

        {/* Zone 3: 1 Primary Action + Functional Language Switcher & QR */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Functional Language Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="uppercase">{currentLang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Select Language
                </div>
                {languages.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                      currentLang === l.code
                        ? 'text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/40'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{l.label}</span>
                    {currentLang === l.code && <span className="text-emerald-600">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenQrModal}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Scan QR to continue on mobile"
            aria-label="Continue on mobile via QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('kiosk')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.kiosk}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
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
              type="button"
              onClick={() => {
                onNavigateTab(link.id as any);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                activeTab === link.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onNavigateTab('kiosk');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2 cursor-pointer"
          >
            <Monitor className="w-4 h-4" />
            <span>{t.hero.btnKiosk}</span>
          </button>
        </div>
      )}
    </header>
  );
};
