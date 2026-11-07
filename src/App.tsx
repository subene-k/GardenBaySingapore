/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Compass, MapPin, Footprints, Info, Sparkles, 
  Smartphone, Monitor, Check, QrCode, ArrowRight, X
} from 'lucide-react';
import { Attraction, AttractionCategory } from './types/gardens';
import { ATTRACTIONS_DATA } from './data/attractions';
import { SupportedLanguage, TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExploreLanding } from './components/ExploreLanding';
import { InteractiveMap } from './components/InteractiveMap';
import { AttractionsList } from './components/AttractionsList';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { VisitorInfoSection } from './components/VisitorInfoSection';
import { AttractionDrawer } from './components/AttractionDrawer';
import { KioskMode } from './components/KioskMode';
import { QrShareModal } from './components/QrShareModal';

type AppTab = 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('explore');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [itineraryAttractionIds, setItineraryAttractionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gtb_itinerary');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['flower-dome', 'cloud-forest', 'supertree-grove'];
  });
  const [activeFilter, setActiveFilter] = useState<AttractionCategory | 'all'>('all');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Global Language state (supports 'en', 'zh', 'ms', 'ta')
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as SupportedLanguage;
      if (urlLang && ['en', 'zh', 'ms', 'ta'].includes(urlLang)) return urlLang;
      const savedLang = localStorage.getItem('gtb_lang') as SupportedLanguage;
      if (savedLang && ['en', 'zh', 'ms', 'ta'].includes(savedLang)) return savedLang;
    } catch (e) {}
    return 'en';
  });

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Persist language
  const handleSelectLang = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('gtb_lang', lang);
    } catch (e) {}
    syncUrl(activeTab, selectedAttraction ? selectedAttraction.id : null, lang);
  };

  // Sync itinerary changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gtb_itinerary', JSON.stringify(itineraryAttractionIds));
    } catch (e) {}
  }, [itineraryAttractionIds]);

  // Sync URL function for deep linking and history state
  const syncUrl = useCallback((tab: AppTab, locId: string | null, lang: SupportedLanguage, push: boolean = true) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    params.set('lang', lang);
    if (locId) {
      params.set('loc', locId);
    } else {
      params.delete('loc');
    }
    if (itineraryAttractionIds.length > 0) {
      params.set('itinerary', itineraryAttractionIds.join(','));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    const state = { tab, locId, lang };
    
    if (push) {
      window.history.pushState(state, '', newUrl);
    } else {
      window.history.replaceState(state, '', newUrl);
    }
  }, [itineraryAttractionIds]);

  // Navigate tab with browser history push
  const handleNavigateTab = (tab: AppTab) => {
    setActiveTab(tab);
    syncUrl(tab, selectedAttraction ? selectedAttraction.id : null, currentLang, true);
  };

  // Select attraction with browser history push
  const handleSelectAttraction = (attraction: Attraction | null) => {
    setSelectedAttraction(attraction);
    syncUrl(activeTab, attraction ? attraction.id : null, currentLang, true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setSelectedAttraction(null);
    syncUrl(activeTab, null, currentLang, true);
  };

  // Browser Back/Forward navigation listener (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = (params.get('tab') as AppTab) || 'explore';
      const locParam = params.get('loc');
      const langParam = params.get('lang') as SupportedLanguage;

      if (['explore', 'map', 'attractions', 'itinerary', 'info', 'kiosk'].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      if (locParam) {
        const found = ATTRACTIONS_DATA.find(a => a.id === locParam);
        setSelectedAttraction(found || null);
      } else {
        setSelectedAttraction(null);
      }

      if (langParam && ['en', 'zh', 'ms', 'ta'].includes(langParam)) {
        setCurrentLang(langParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse URL search parameters on initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    
    // Check initial tab
    const tabParam = params.get('tab') as AppTab;
    if (tabParam && ['explore', 'map', 'attractions', 'itinerary', 'info', 'kiosk'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    // Check for synced itinerary
    const itineraryParam = params.get('itinerary');
    if (itineraryParam) {
      const ids = itineraryParam.split(',').filter(id => ATTRACTIONS_DATA.some(a => a.id === id));
      if (ids.length > 0) {
        setItineraryAttractionIds(ids);
      }
    }

    // Check for synced location
    const locParam = params.get('loc');
    if (locParam) {
      const found = ATTRACTIONS_DATA.find(a => a.id === locParam);
      if (found) {
        setSelectedAttraction(found);
        if (!tabParam) setActiveTab('map');
      }
    }

    // Check for source
    const srcParam = params.get('src');
    if (srcParam === 'qr_continuation' || srcParam === 'kiosk_station_1') {
      setSyncToastMessage('Mobile Session Synchronised: Your itinerary and interactive map are ready.');
    }
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (syncToastMessage) {
      const timer = setTimeout(() => setSyncToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [syncToastMessage]);

  // Toggle stop in itinerary
  const handleToggleItinerary = (id: string) => {
    setItineraryAttractionIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      return next;
    });
  };

  // If in Kiosk Mode, render full-screen kiosk interface
  if (activeTab === 'kiosk') {
    return (
      <div className="min-h-screen bg-stone-950">
        <KioskMode
          onExitKiosk={() => handleNavigateTab('explore')}
          onSelectAttraction={(attraction) => {
            handleSelectAttraction(attraction);
          }}
          itineraryAttractionIds={itineraryAttractionIds}
          currentLang={currentLang}
          onSelectLang={handleSelectLang}
        />
        {/* Central Attraction Drawer */}
        <AttractionDrawer
          attraction={selectedAttraction}
          onClose={handleCloseDrawer}
          onSelectAttraction={handleSelectAttraction}
          isInItinerary={selectedAttraction ? itineraryAttractionIds.includes(selectedAttraction.id) : false}
          onToggleItinerary={handleToggleItinerary}
          currentLang={currentLang}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Notification Toast for QR continuation */}
      {syncToastMessage && (
        <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs font-semibold shadow-md flex items-center justify-between z-50 sticky top-0 animate-in slide-in-from-top">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{syncToastMessage}</span>
            </div>
            <button 
              type="button"
              onClick={() => setSyncToastMessage(null)}
              className="text-emerald-200 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Header */}
      <Header
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          handleNavigateTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        itineraryCount={itineraryAttractionIds.length}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'explore' && (
          <ExploreLanding
            onNavigateTab={(tab) => {
              handleNavigateTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAttraction={handleSelectAttraction}
            onOpenQrModal={() => setIsQrModalOpen(true)}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'map' && (
          <div className="h-[calc(100vh-4rem)] w-full p-2 sm:p-4 max-w-[1700px] mx-auto">
            <InteractiveMap
              selectedAttractionId={selectedAttraction ? selectedAttraction.id : null}
              onSelectAttraction={handleSelectAttraction}
              itineraryAttractionIds={itineraryAttractionIds}
              activeFilter={activeFilter}
              onFilterChange={(filter) => setActiveFilter(filter)}
              onNavigateToAttractionTab={() => handleNavigateTab('attractions')}
              currentLang={currentLang}
            />
          </div>
        )}

        {activeTab === 'attractions' && (
          <AttractionsList
            onSelectAttraction={handleSelectAttraction}
            itineraryAttractionIds={itineraryAttractionIds}
            onToggleItinerary={handleToggleItinerary}
            onNavigateToMapWithAttraction={(attraction) => {
              handleSelectAttraction(attraction);
              handleNavigateTab('map');
            }}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryPlanner
            itineraryAttractionIds={itineraryAttractionIds}
            onSetItinerary={(ids) => setItineraryAttractionIds(ids)}
            onSelectAttraction={handleSelectAttraction}
            onOpenQrModal={() => setIsQrModalOpen(true)}
            onNavigateToMap={() => {
              handleNavigateTab('map');
            }}
          />
        )}

        {activeTab === 'info' && (
          <VisitorInfoSection />
        )}
      </main>

      {/* Footer */}
      {activeTab !== 'map' && (
        <Footer
          onNavigateTab={(tab) => {
            handleNavigateTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          currentLang={currentLang}
        />
      )}

      {/* Purpose-Designed Mobile Bottom Sticky Navigation Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/90 dark:border-stone-800 flex items-center justify-around py-2 px-1 shadow-lg"
        style={{ maxHeight: '60px' }}
      >
        <button
          type="button"
          onClick={() => { handleNavigateTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'explore' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.nav.explore}</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigateTab('map')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'map' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{t.nav.map}</span>
        </button>

        <button
          type="button"
          onClick={() => { handleNavigateTab('attractions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'attractions' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t.nav.attractions}</span>
        </button>

        <button
          type="button"
          onClick={() => { handleNavigateTab('itinerary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'itinerary' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>{t.nav.itinerary}</span>
          {itineraryAttractionIds.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[9px] font-bold flex items-center justify-center">
              {itineraryAttractionIds.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => { handleNavigateTab('info'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'info' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>{t.nav.info}</span>
        </button>
      </nav>

      {/* Central Global Attraction Detail Drawer */}
      <AttractionDrawer
        attraction={selectedAttraction}
        onClose={handleCloseDrawer}
        onSelectAttraction={handleSelectAttraction}
        isInItinerary={selectedAttraction ? itineraryAttractionIds.includes(selectedAttraction.id) : false}
        onToggleItinerary={handleToggleItinerary}
        onNavigateToMap={() => {
          handleNavigateTab('map');
        }}
        currentLang={currentLang}
      />

      {/* Cross-Device QR Continuation Modal */}
      <QrShareModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        itineraryAttractionIds={itineraryAttractionIds}
        selectedAttractionId={selectedAttraction ? selectedAttraction.id : null}
      />
    </div>
  );
}
