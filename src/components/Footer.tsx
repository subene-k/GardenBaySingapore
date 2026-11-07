import React from 'react';
import { Compass, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onNavigateTab: (tab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk') => void;
  onOpenQrModal: () => void;
  currentLang?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenQrModal, currentLang = 'en' }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t.appName}</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Singapore’s world-renowned horticultural showpiece and national garden. 18 Marina Gardens Drive, Singapore 018953.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t.nav.explore}
            </div>
            <ul className="space-y-1.5">
              <li>
                <button type="button" onClick={() => onNavigateTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.explore}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTab('map')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.map}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTab('attractions')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.attractions}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTab('itinerary')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.itinerary}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTab('info')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.info}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart Visitor Experience */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Visitor Technology
            </div>
            <ul className="space-y-1.5">
              <li>
                <button type="button" onClick={onOpenQrModal} className="hover:text-white transition-colors cursor-pointer">
                  Mobile QR Continuation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTab('kiosk')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.kiosk}
                </button>
              </li>
              <li>
                <a 
                  href="https://www.gardensbythebay.com.sg/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Official Gardens Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Digital Visitor Experience Concept */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Digital Experience Concept
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designed as an interactive digital visitor experience prototype. Demonstrating illustrated SVG map wayfinding, multi-language visitor guides, and seamless QR cross-device session continuation.
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Gardens by the Bay Singapore · All official horticultural information verified.
          </div>
          <div className="flex items-center gap-4">
            <span>Guinness World Records: Largest Glass Greenhouse</span>
            <span>·</span>
            <span>Singapore Tourism Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
