import React, { useState } from 'react';
import { 
  X, Clock, Ticket, Thermometer, Footprints, MapPin, 
  Sparkles, Check, Plus, ExternalLink, Volume2, VolumeX,
  Compass, ArrowRight, ShieldCheck, Accessibility, Share2
} from 'lucide-react';
import { Attraction } from '../types/gardens';
import { ATTRACTIONS_DATA } from '../data/attractions';

interface AttractionDrawerProps {
  attraction: Attraction | null;
  onClose: () => void;
  onSelectAttraction: (attraction: Attraction) => void;
  isInItinerary: boolean;
  onToggleItinerary: (attractionId: string) => void;
  onNavigateToMap?: () => void;
}

export const AttractionDrawer: React.FC<AttractionDrawerProps> = ({
  attraction,
  onClose,
  onSelectAttraction,
  isInItinerary,
  onToggleItinerary,
  onNavigateToMap
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!attraction) return null;

  // Nearby attraction objects
  const nearbyAttractions = attraction.nearbyAttractionIds
    .map(id => ATTRACTIONS_DATA.find(a => a.id === id))
    .filter((a): a is Attraction => a !== undefined);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?loc=${attraction.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none transition-opacity duration-300">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs pointer-events-auto transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        className="relative w-full max-w-xl h-full bg-white dark:bg-stone-900 shadow-2xl flex flex-col pointer-events-auto overflow-hidden z-10 animate-in slide-in-from-right duration-300 border-l border-stone-200 dark:border-stone-800"
      >
        {/* Top Header Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:text-stone-900 hover:bg-white shadow-md border border-stone-200/80 dark:border-stone-700 transition-colors"
            title="Share direct attraction link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:text-stone-900 hover:bg-white shadow-md border border-stone-200/80 dark:border-stone-700 transition-colors"
            aria-label="Close attraction drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image Section */}
          <div className="relative w-full h-72 sm:h-80 bg-stone-900 overflow-hidden">
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Scrim gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-1">
                {attraction.categoryLabel}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                {attraction.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-1">
                {attraction.subtitle}
              </p>
            </div>
          </div>

          {/* Body Information */}
          <div className="p-6 space-y-6">
            {/* Action Bar: Itinerary Button & View on Map */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleItinerary(attraction.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isInItinerary
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                }`}
              >
                {isInItinerary ? (
                  <>
                    <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>In Your Itinerary</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to My Visit Itinerary</span>
                  </>
                )}
              </button>

              {onNavigateToMap && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToMap();
                  }}
                  className="py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-medium hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Pin on Map</span>
                </button>
              )}
            </div>

            {/* Key Visit Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Hours */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Hours</span>
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-2">
                  {attraction.hours}
                </div>
              </div>

              {/* Admission */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Ticket className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Admission</span>
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {attraction.admission}
                </div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">
                  {attraction.priceNote}
                </div>
              </div>

              {/* Duration */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Footprints className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Duration</span>
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {attraction.durationLabel}
                </div>
                {attraction.temperature && (
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                    <Thermometer className="w-3 h-3 inline" />
                    {attraction.temperature}
                  </div>
                )}
              </div>
            </div>

            {/* Audio Companion Player */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                    Botanical Audio Companion
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 rounded">
                    Curated
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                  {isPlayingAudio 
                    ? `Playing audio tour: "Living Architecture of ${attraction.name}"` 
                    : `Listen to audio insights & horticultural lore for ${attraction.name}`}
                </p>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-3 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Verified Narrative Description */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
                About this Experience
              </h3>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {attraction.longDescription}
              </p>
            </div>

            {/* Highlights List */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2.5">
                Curated Highlights
              </h3>
              <ul className="space-y-2">
                {attraction.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visitor Tips */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Insider Visitor Tips
              </h3>
              <ul className="space-y-1.5">
                {attraction.visitorTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport & Accessibility */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-4 space-y-3">
              <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                <Compass className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Nearest Arrival: </span>
                  {attraction.nearestStation}
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                <Accessibility className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Accessibility: </span>
                  {attraction.accessibility.join(' · ')}
                </div>
              </div>
            </div>

            {/* Nearby Attractions */}
            {nearbyAttractions.length > 0 && (
              <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Nearby Next Stops
                </h3>
                <div className="space-y-2">
                  {nearbyAttractions.map((nearby) => (
                    <button
                      key={nearby.id}
                      onClick={() => onSelectAttraction(nearby)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={nearby.image} 
                          alt={nearby.name}
                          className="w-10 h-10 rounded-lg object-cover" 
                        />
                        <div>
                          <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">{nearby.name}</div>
                          <div className="text-[11px] text-stone-500">{nearby.durationLabel} · {nearby.admission}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Official Website Link */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-4 pb-2 flex items-center justify-between text-xs text-stone-500">
              <a
                href={attraction.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 hover:underline font-medium"
              >
                Official Gardens by the Bay Page
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-stone-400">Singapore Tourism Board Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
