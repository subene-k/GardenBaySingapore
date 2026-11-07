/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Footprints, Info, Sparkles, 
  Smartphone, Monitor, Check, QrCode, ArrowRight, X
} from 'lucide-react';
import { Attraction, AttractionCategory } from './types/gardens';
import { ATTRACTIONS_DATA } from './data/attractions';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk'>('explore');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [itineraryAttractionIds, setItineraryAttractionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gtb_itinerary');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default initial itinerary: Flower Dome, Cloud Forest, Supertree Grove
    return ['flower-dome', 'cloud-forest', 'supertree-grove'];
  });
  const [activeFilter, setActiveFilter] = useState<AttractionCategory | 'all'>('all');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Sync itinerary changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gtb_itinerary', JSON.stringify(itineraryAttractionIds));
    } catch (e) {}
  }, [itineraryAttractionIds]);

  // Parse URL search parameters on mount (QR continuation support!)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    
    // Check for synced itinerary
    const itineraryParam = params.get('itinerary');
    if (itineraryParam) {
      const ids = itineraryParam.split(',').filter(id => ATTRACTIONS_DATA.some(a => a.id === id));
      if (ids.length > 0) {
        setItineraryAttractionIds(ids);
        setSyncToastMessage(`Cross-Device Session Synchronised: Loaded ${ids.length} stops in your itinerary`);
      }
    }

    // Check for synced location
    const locParam = params.get('loc');
    if (locParam) {
      const found = ATTRACTIONS_DATA.find(a => a.id === locParam);
      if (found) {
        setSelectedAttraction(found);
        setActiveTab('map');
      }
    }

    // Check for source
    const srcParam = params.get('src');
    if (srcParam === 'qr_continuation' || srcParam === 'kiosk_station_1') {
      if (!syncToastMessage) {
        setSyncToastMessage('Welcome to Gardens by the Bay! Your mobile guide is live.');
      }
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
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // If in Kiosk Mode, render full-screen kiosk interface
  if (activeTab === 'kiosk') {
    return (
      <div className="min-h-screen bg-stone-950">
        <KioskMode
          onExitKiosk={() => setActiveTab('explore')}
          onSelectAttraction={(attraction) => {
            setSelectedAttraction(attraction);
          }}
          itineraryAttractionIds={itineraryAttractionIds}
        />
        {/* Attraction Drawer in Kiosk */}
        <AttractionDrawer
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
          onSelectAttraction={(a) => setSelectedAttraction(a)}
          isInItinerary={selectedAttraction ? itineraryAttractionIds.includes(selectedAttraction.id) : false}
          onToggleItinerary={handleToggleItinerary}
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
              onClick={() => setSyncToastMessage(null)}
              className="text-emerald-200 hover:text-white"
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
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        itineraryCount={itineraryAttractionIds.length}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'explore' && (
          <ExploreLanding
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAttraction={(attraction) => {
              setSelectedAttraction(attraction);
            }}
            onOpenQrModal={() => setIsQrModalOpen(true)}
          />
        )}

        {activeTab === 'map' && (
          <div className="h-[calc(100vh-4rem)] w-full p-2 sm:p-4 max-w-[1700px] mx-auto">
            <InteractiveMap
              selectedAttractionId={selectedAttraction ? selectedAttraction.id : null}
              onSelectAttraction={(attraction) => {
                setSelectedAttraction(attraction);
              }}
              itineraryAttractionIds={itineraryAttractionIds}
              activeFilter={activeFilter}
              onFilterChange={(filter) => setActiveFilter(filter)}
              onNavigateToAttractionTab={() => setActiveTab('attractions')}
            />
          </div>
        )}

        {activeTab === 'attractions' && (
          <AttractionsList
            onSelectAttraction={(attraction) => {
              setSelectedAttraction(attraction);
            }}
            itineraryAttractionIds={itineraryAttractionIds}
            onToggleItinerary={handleToggleItinerary}
            onNavigateToMapWithAttraction={(attraction) => {
              setSelectedAttraction(attraction);
              setActiveTab('map');
            }}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryPlanner
            itineraryAttractionIds={itineraryAttractionIds}
            onSetItinerary={(ids) => setItineraryAttractionIds(ids)}
            onSelectAttraction={(attraction) => {
              setSelectedAttraction(attraction);
            }}
            onOpenQrModal={() => setIsQrModalOpen(true)}
            onNavigateToMap={() => {
              setActiveTab('map');
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
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />
      )}

      {/* Purpose-Designed Mobile Bottom Sticky Navigation Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/90 dark:border-stone-800 flex items-center justify-around py-2 px-1 shadow-lg"
        style={{ maxHeight: '60px' }}
      >
        <button
          onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'explore' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'map' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Map</span>
        </button>

        <button
          onClick={() => { setActiveTab('attractions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'attractions' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Sights</span>
        </button>

        <button
          onClick={() => { setActiveTab('itinerary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'itinerary' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>Plan</span>
          {itineraryAttractionIds.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[9px] font-bold flex items-center justify-center">
              {itineraryAttractionIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => { setActiveTab('info'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'info' ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Info</span>
        </button>
      </nav>

      {/* Global Attraction Detail Drawer */}
      <AttractionDrawer
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        onSelectAttraction={(attraction) => {
          setSelectedAttraction(attraction);
        }}
        isInItinerary={selectedAttraction ? itineraryAttractionIds.includes(selectedAttraction.id) : false}
        onToggleItinerary={handleToggleItinerary}
        onNavigateToMap={() => {
          setActiveTab('map');
        }}
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
