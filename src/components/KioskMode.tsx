import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Compass, QrCode, ArrowLeft, Sparkles, MapPin, 
  Clock, Navigation, HelpCircle, PhoneCall, Volume2, Globe
} from 'lucide-react';
import { Attraction } from '../types/gardens';
import { ATTRACTIONS_DATA } from '../data/attractions';
import { InteractiveMap } from './InteractiveMap';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface KioskModeProps {
  onExitKiosk: () => void;
  onSelectAttraction: (attraction: Attraction | null) => void;
  itineraryAttractionIds: string[];
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const KioskMode: React.FC<KioskModeProps> = ({
  onExitKiosk,
  onSelectAttraction,
  itineraryAttractionIds,
  currentLang,
  onSelectLang
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [activeKioskFilter, setActiveKioskFilter] = useState<'all' | 'conservatory' | 'supertree' | 'family'>('all');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [idleSeconds, setIdleSeconds] = useState<number>(0);
  const [showIdleWarning, setShowIdleWarning] = useState<boolean>(false);

  // Quick destinations for one-touch kiosk navigation
  const quickDestinations = [
    { id: 'flower-dome', icon: '🌸' },
    { id: 'cloud-forest', icon: '💧' },
    { id: 'supertree-grove', icon: '🌳' },
    { id: 'ocbc-skyway', icon: '🌉' },
    { id: 'floral-fantasy', icon: '✨' },
    { id: 'children-garden', icon: '⛲' },
  ];

  // Generate shareable QR code for the kiosk
  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}?src=kiosk_station_1&lang=${currentLang}`;
    QRCode.toDataURL(url, {
      width: 220,
      margin: 1,
      color: { dark: '#064e3b', light: '#ffffff' }
    }).then(setQrCodeUrl).catch(console.error);
  }, [currentLang]);

  // Idle timer to simulate public interactive terminal behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleSeconds(prev => {
        if (prev >= 60) {
          setShowIdleWarning(true);
        }
        if (prev >= 75) {
          setShowIdleWarning(false);
          setActiveKioskFilter('all');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    const resetIdle = () => {
      setIdleSeconds(0);
      setShowIdleWarning(false);
    };

    window.addEventListener('pointerdown', resetIdle);
    window.addEventListener('keydown', resetIdle);

    return () => {
      clearInterval(interval);
      window.removeEventListener('pointerdown', resetIdle);
      window.removeEventListener('keydown', resetIdle);
    };
  }, []);

  const languageButtons: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
    { code: 'ms', label: 'Melayu' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-4 sm:p-6 select-none overflow-x-hidden">
      {/* Kiosk Top Bar */}
      <header className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onExitKiosk}
            className="px-4 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-semibold flex items-center gap-2 border border-stone-700 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
            <span>{t.kiosk.exitKiosk}</span>
          </button>
          
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              Interactive Park Terminal #04 · Main Visitor Arrival Plaza
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t.kiosk.terminalTitle}
            </h1>
          </div>
        </div>

        {/* 4 Official Singapore National Languages */}
        <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-2xl border border-stone-800">
          {languageButtons.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => onSelectLang(code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentLang === code
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Kiosk Layout: 2-Column Touch Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 min-h-[620px]">
        {/* Left 8 Cols: Large Interactive Touch Map */}
        <div className="lg:col-span-8 flex flex-col h-[520px] lg:h-auto">
          <InteractiveMap
            selectedAttractionId={null}
            onSelectAttraction={onSelectAttraction}
            itineraryAttractionIds={itineraryAttractionIds}
            activeFilter={activeKioskFilter}
            onFilterChange={(f) => setActiveKioskFilter(f === 'amenity' || f === 'lake-nature' || f === 'outdoor-garden' ? 'all' : f)}
            isKioskMode={true}
            currentLang={currentLang}
          />
        </div>

        {/* Right 4 Cols: Quick Touch Destinations & QR Handoff */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          {/* Quick 1-Touch Highlights */}
          <div className="bg-stone-900 p-5 rounded-3xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300">
                {t.kiosk.quickDirections}
              </h2>
              <span className="text-xs text-emerald-400 font-semibold">{t.kiosk.touchToLocate}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {quickDestinations.map(dest => {
                const attraction = ATTRACTIONS_DATA.find(a => a.id === dest.id);
                const locName = attraction ? (t.attractionNames[dest.id]?.name || attraction.name) : '';
                const locSub = attraction ? (t.attractionNames[dest.id]?.categoryLabel || attraction.categoryLabel) : '';
                
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => {
                      if (attraction) onSelectAttraction(attraction);
                    }}
                    className="p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 active:scale-95 border border-stone-700/80 text-left transition-all flex flex-col justify-between min-h-[82px] cursor-pointer"
                  >
                    <div className="text-xl mb-1">{dest.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">{locName}</div>
                      <div className="text-[10px] text-stone-400 line-clamp-1">{locSub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prominent QR Mobile Continuation Box */}
          <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900 p-6 rounded-3xl border border-emerald-800/60 shadow-xl flex items-center gap-5">
            {qrCodeUrl ? (
              <div className="p-2 bg-white rounded-2xl shadow-lg shrink-0">
                <img
                  src={qrCodeUrl}
                  alt="Scan to take map on phone"
                  className="w-24 h-24 rounded-lg object-contain"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-stone-800 rounded-2xl animate-pulse shrink-0" />
            )}

            <div className="space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                <span>{t.kiosk.takeOnMobile}</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                {t.kiosk.scanWithCamera}
              </h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {t.kiosk.scanHint}
              </p>
            </div>
          </div>

          {/* Quick Park Advisory Ribbon */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 flex items-center justify-between text-xs text-stone-300">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Garden Rhapsody:</strong> 7:45 PM & 8:45 PM Daily
              </span>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-md font-semibold">
              Free Entry
            </span>
          </div>
        </div>
      </main>

      {/* Kiosk Footer with Accessibility Help */}
      <footer className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-3">
        <div className="flex items-center gap-4">
          <span>Terminal ID: <strong>GTB-TERMINAL-04</strong></span>
          <span>·</span>
          <span>Wheelchair Loan: <strong>Main Visitor Centre (Free)</strong></span>
          <span>·</span>
          <span>First Aid: <strong>The Canopy & Bayfront Plaza</strong></span>
        </div>

        <div className="text-[11px] text-stone-500">
          Gardens by the Bay Digital Visitor Experience
        </div>
      </footer>

      {/* Idle Warning Modal */}
      {showIdleWarning && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 p-8 rounded-3xl max-w-sm text-center space-y-4 shadow-2xl">
            <Clock className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">{t.kiosk.idleTitle}</h3>
            <p className="text-xs text-stone-400">
              {t.kiosk.idleText}
            </p>
            <button
              type="button"
              onClick={() => {
                setIdleSeconds(0);
                setShowIdleWarning(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md cursor-pointer"
            >
              {t.kiosk.continueExploring}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
