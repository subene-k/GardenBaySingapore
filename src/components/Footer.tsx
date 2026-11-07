import React from 'react';
import { Compass, ExternalLink, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk') => void;
  onOpenQrModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenQrModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Gardens by the Bay</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Singapore’s world-renowned horticultural showpiece and national garden. 18 Marina Gardens Drive, Singapore 018953.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Interactive Guide
            </div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigateTab('explore')} className="hover:text-white transition-colors">
                  Explore Highlights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('map')} className="hover:text-white transition-colors">
                  Interactive Illustrated Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('attractions')} className="hover:text-white transition-colors">
                  All 15 Biomes & Sights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('itinerary')} className="hover:text-white transition-colors">
                  Curate Itinerary Route
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('info')} className="hover:text-white transition-colors">
                  Operating Hours & Transit
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
                <button onClick={onOpenQrModal} className="hover:text-white transition-colors">
                  Mobile QR Continuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('kiosk')} className="hover:text-white transition-colors">
                  Full-Screen Kiosk Terminal Mode
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

          {/* Col 4: StratAgile AI Transformation Client Demo */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              StratAgile Demonstration
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designed for StratAgile AI transformation showcase. Demonstrating seamless cross-device session continuation, illustrated SVG map wayfinding, and interactive public kiosks.
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
