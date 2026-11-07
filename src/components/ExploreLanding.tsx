import React from 'react';
import { 
  Compass, MapPin, Sparkles, Clock, ArrowRight, Ticket, 
  Smartphone, Monitor, ChevronRight, CheckCircle2, ShieldCheck,
  Footprints, Droplets, Leaf
} from 'lucide-react';
import { Attraction } from '../types/gardens';
import { 
  ATTRACTIONS_DATA, 
  GARDENS_QUICK_STATS,
  ASSET_HERO_IMAGE,
  ASSET_FLOWER_DOME,
  ASSET_CLOUD_FOREST,
  ASSET_SUPERTREE,
  ASSET_FLORAL_FANTASY
} from '../data/attractions';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface ExploreLandingProps {
  onNavigateTab: (tab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk') => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onOpenQrModal: () => void;
  currentLang?: SupportedLanguage;
}

export const ExploreLanding: React.FC<ExploreLandingProps> = ({
  onNavigateTab,
  onSelectAttraction,
  onOpenQrModal,
  currentLang = 'en'
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const flowerDome = ATTRACTIONS_DATA.find(a => a.id === 'flower-dome');
  const cloudForest = ATTRACTIONS_DATA.find(a => a.id === 'cloud-forest');
  const supertrees = ATTRACTIONS_DATA.find(a => a.id === 'supertree-grove');
  const floralFantasy = ATTRACTIONS_DATA.find(a => a.id === 'floral-fantasy');

  return (
    <div className="space-y-16 pb-16 pt-4">
      {/* Hero Marquee Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 shadow-2xl border border-stone-800 min-h-[520px] lg:min-h-[580px] flex flex-col justify-end p-8 sm:p-12">
          {/* Background Hero Photography */}
          <img
            src={ASSET_HERO_IMAGE}
            onError={(e) => {
              if (!e.currentTarget.src.includes('/images/')) {
                e.currentTarget.src = '/images/hero_gardens_conservatory_1794030378866.jpg';
              }
            }}
            alt="Gardens by the Bay Singapore Twilight Panorama"
            className="absolute inset-0 w-full h-full object-cover opacity-80 select-none block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/80" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab('map')}
                className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>{t.hero.btnMap}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('itinerary')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Footprints className="w-5 h-5" />
                <span>{t.hero.btnPlan}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('kiosk')}
                className="px-4 py-3.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 text-sm font-semibold border border-purple-500/30 flex items-center gap-2 transition-all cursor-pointer ml-auto hidden sm:flex"
              >
                <Monitor className="w-4 h-4" />
                <span>{t.hero.btnKiosk}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operational Quick Stats Strip with Disambiguated Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {GARDENS_QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-baseline gap-1.5 font-bold text-stone-900 dark:text-stone-100 font-mono text-3xl">
                <span>{stat.value}</span>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 font-sans">{stat.unit}</span>
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Signature Biomes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1">
              Iconic World-Class Attractions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              The Four Cornerstones of the Bay
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('attractions')}
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start md:self-auto cursor-pointer"
          >
            <span>Explore All 15 Attractions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spotlight 1: Flower Dome */}
          {flowerDome && (
            <div 
              onClick={() => onSelectAttraction(flowerDome)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 h-96 shadow-md cursor-pointer border border-stone-200 dark:border-stone-800 transition-all hover:shadow-xl"
            >
              <img
                src={ASSET_FLOWER_DOME}
                onError={(e) => {
                  if (!e.currentTarget.src.includes('/images/')) {
                    e.currentTarget.src = '/images/flower_dome_interior_1794030379074.jpg';
                  }
                }}
                alt="Flower Dome Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-semibold text-emerald-300 border border-stone-700">
                  World Record Largest Glass Greenhouse
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold">
                  Ticketed
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {t.attractionNames['flower-dome']?.name || 'Flower Dome'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                  Replicating Mediterranean and semi-arid climates with ancient thousand-year-old olive trees, towering baobabs, and rotating floral festivals.
                </p>
                <div className="flex items-center gap-4 text-xs text-stone-300 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    9:00 AM – 9:00 PM
                  </span>
                  <span>·</span>
                  <span>23°C – 25°C Spring Climate</span>
                </div>
              </div>
            </div>
          )}

          {/* Spotlight 2: Cloud Forest */}
          {cloudForest && (
            <div 
              onClick={() => onSelectAttraction(cloudForest)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 h-96 shadow-md cursor-pointer border border-stone-200 dark:border-stone-800 transition-all hover:shadow-xl"
            >
              <img
                src={ASSET_CLOUD_FOREST}
                onError={(e) => {
                  if (!e.currentTarget.src.includes('/images/')) {
                    e.currentTarget.src = '/images/cloud_forest_waterfall_1794030381305.jpg';
                  }
                }}
                alt="Cloud Forest Waterfall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-semibold text-cyan-300 border border-stone-700">
                  35-Metre Misty Mountain & Waterfall
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold">
                  Ticketed
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {t.attractionNames['cloud-forest']?.name || 'Cloud Forest'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                  Ascend to the Lost World through swirling mountain mists and walk the cantilevered Cloud Walk aerial skyway among orchids and carnivorous pitcher plants.
                </p>
                <div className="flex items-center gap-4 text-xs text-stone-300 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    9:00 AM – 9:00 PM
                  </span>
                  <span>·</span>
                  <span>Misting every 2 hours</span>
                </div>
              </div>
            </div>
          )}

          {/* Spotlight 3: Supertree Grove (ACCURATELY LABELED) */}
          {supertrees && (
            <div 
              onClick={() => onSelectAttraction(supertrees)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 h-96 shadow-md cursor-pointer border border-stone-200 dark:border-stone-800 transition-all hover:shadow-xl"
            >
              <img
                src={ASSET_SUPERTREE}
                onError={(e) => {
                  if (!e.currentTarget.src.includes('/images/')) {
                    e.currentTarget.src = '/images/supertree_grove_night_1794030381267.jpg';
                  }
                }}
                alt="Supertree Grove Night Light Show"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-semibold text-purple-300 border border-stone-700">
                  Garden Rhapsody Light Show
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold">
                  Grove: Free Access
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  {t.attractionNames['supertree-grove']?.name || 'Supertree Grove'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                  12 vertical tree towers in the central Grove (part of 18 Supertrees across the Gardens). Outdoor grounds are free to explore; separate tickets for OCBC Skyway & Observatory.
                </p>
                <div className="flex items-center gap-4 text-xs text-stone-300 pt-2">
                  <span>Shows at 7:45 PM & 8:45 PM Daily</span>
                  <span>·</span>
                  <span>Parkland open 5:00 AM – 2:00 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* Spotlight 4: Floral Fantasy */}
          {floralFantasy && (
            <div 
              onClick={() => onSelectAttraction(floralFantasy)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 h-96 shadow-md cursor-pointer border border-stone-200 dark:border-stone-800 transition-all hover:shadow-xl"
            >
              <img
                src={ASSET_FLORAL_FANTASY}
                onError={(e) => {
                  if (!e.currentTarget.src.includes('/images/')) {
                    e.currentTarget.src = '/images/floral_fantasy_showcase_1794030380351.jpg';
                  }
                }}
                alt="Floral Fantasy Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-semibold text-rose-300 border border-stone-700">
                  Whimsical Suspended Floral Art
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold">
                  Ticketed
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-rose-300 transition-colors">
                  {t.attractionNames['floral-fantasy']?.name || 'Floral Fantasy'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                  Four fantastical chambers of suspended floral bouquets, undulating flower canopies, and the exhilarating 4D Flight of the Dragonfly experience.
                </p>
                <div className="flex items-center gap-4 text-xs text-stone-300 pt-2">
                  <span>Located at Bayfront Plaza (Bayfront MRT Exit B)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cross-Device Continuation Promo Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 p-8 sm:p-12 text-white border border-emerald-700/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Cross-Device Intelligence Handoff</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Plan on Desktop or Kiosk, Walk with Mobile
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              No account creation or mobile app download required. Generate a private QR code on this screen and continue your route on your smartphone with instant walking navigation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenQrModal}
                className="px-5 py-3 rounded-xl bg-white text-stone-950 hover:bg-stone-100 text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Generate Continuation QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center p-6 bg-stone-900/90 rounded-2xl border border-stone-700/80 shadow-2xl">
            <div className="w-36 h-36 rounded-xl bg-stone-800 flex items-center justify-center border border-stone-700 p-2 text-center text-xs text-stone-400">
              <div className="space-y-2">
                <Smartphone className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-[11px] block">Live Mobile Sync Ready</span>
              </div>
            </div>
            <span className="text-[11px] text-stone-400 mt-3 font-mono">Gardens QR Sync Hub</span>
          </div>
        </div>
      </section>
    </div>
  );
};
