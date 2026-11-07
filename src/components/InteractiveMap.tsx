import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Plus, Minus, RotateCcw, Maximize2, Minimize2, Search,
  Compass, Navigation, MapPin, Sparkles, X, ChevronRight,
  Clock, Ticket, Footprints, Layers
} from 'lucide-react';
import { Attraction, Facility, AttractionCategory } from '../types/gardens';
import { ATTRACTIONS_DATA, FACILITIES_DATA, ASSET_MAP_IMAGE } from '../data/attractions';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface InteractiveMapProps {
  selectedAttractionId: string | null;
  onSelectAttraction: (attraction: Attraction | null) => void;
  itineraryAttractionIds: string[];
  activeFilter: AttractionCategory | 'all';
  onFilterChange: (filter: AttractionCategory | 'all') => void;
  onNavigateToAttractionTab?: () => void;
  isKioskMode?: boolean;
  currentLang?: SupportedLanguage;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedAttractionId,
  onSelectAttraction,
  itineraryAttractionIds,
  activeFilter,
  onFilterChange,
  isKioskMode = false,
  currentLang = 'en'
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [showFacilities, setShowFacilities] = useState<boolean>(true);
  const [showRoute, setShowRoute] = useState<boolean>(true);
  const [hoveredAttractionId, setHoveredAttractionId] = useState<string | null>(null);

  // Touch pinch zoom state
  const touchDistanceRef = useRef<number | null>(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3.5;

  // Filtered attractions
  const visibleAttractions = ATTRACTIONS_DATA.filter(attraction => {
    if (activeFilter === 'all') return true;
    return attraction.category === activeFilter;
  });

  // Localized name helper
  const getLocalizedName = (attraction: Attraction) => {
    return t.attractionNames[attraction.id]?.name || attraction.name;
  };

  const getLocalizedCategory = (attraction: Attraction) => {
    return t.attractionNames[attraction.id]?.categoryLabel || attraction.categoryLabel;
  };

  // Search results
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : ATTRACTIONS_DATA.filter(a => {
        const localized = getLocalizedName(a);
        const q = searchQuery.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          localized.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q) ||
          a.highlights.some(h => h.toLowerCase().includes(q))
        );
      }).slice(0, 5);

  // Reset map view
  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Zoom in / out
  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const step = 0.35;
      const nextZoom = direction === 'in' ? Math.min(prev + step, MAX_ZOOM) : Math.max(prev - step, MIN_ZOOM);
      if (nextZoom === MIN_ZOOM) {
        setPan({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  };

  // Center on specific coordinates
  const centerOnLocation = useCallback((targetX: number, targetY: number, targetZoom: number = 2.0) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    
    setZoom(targetZoom);
    const offsetX = (50 - targetX) * (clientWidth / 100) * targetZoom;
    const offsetY = (50 - targetY) * (clientHeight / 100) * targetZoom;
    
    setPan({ x: offsetX, y: offsetY });
  }, []);

  // When selectedAttractionId changes externally, pan to it
  useEffect(() => {
    if (selectedAttractionId) {
      const attraction = ATTRACTIONS_DATA.find(a => a.id === selectedAttractionId);
      if (attraction) {
        centerOnLocation(attraction.coordinates.x, attraction.coordinates.y, 2.2);
      }
    }
  }, [selectedAttractionId, centerOnLocation]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom(prev => {
      const next = Math.min(Math.max(prev + zoomFactor, MIN_ZOOM), MAX_ZOOM);
      if (next === MIN_ZOOM) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const maxBound = 650 * (zoom - 0.7);
    const newX = Math.max(Math.min(e.clientX - dragStart.x, maxBound), -maxBound);
    const newY = Math.max(Math.min(e.clientY - dragStart.y, maxBound), -maxBound);
    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const maxBound = 650 * (zoom - 0.7);
      const newX = Math.max(Math.min(e.touches[0].clientX - dragStart.x, maxBound), -maxBound);
      const newY = Math.max(Math.min(e.touches[0].clientY - dragStart.y, maxBound), -maxBound);
      setPan({ x: newX, y: newY });
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - touchDistanceRef.current) * 0.005;
      setZoom(prev => Math.min(Math.max(prev + delta, MIN_ZOOM), MAX_ZOOM));
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistanceRef.current = null;
  };

  // Ordered itinerary attractions for route polylines
  const orderedItineraryAttractions = itineraryAttractionIds
    .map(id => ATTRACTIONS_DATA.find(a => a.id === id))
    .filter((a): a is Attraction => a !== undefined);

  const routePointsString = orderedItineraryAttractions
    .map(a => `${a.coordinates.x * 10},${a.coordinates.y * 5.625}`)
    .join(' ');

  const getCategoryTheme = (category: AttractionCategory) => {
    switch (category) {
      case 'conservatory':
        return { bg: 'bg-emerald-600', ring: 'ring-emerald-400' };
      case 'supertree':
        return { bg: 'bg-purple-600', ring: 'ring-purple-400' };
      case 'outdoor-garden':
        return { bg: 'bg-amber-600', ring: 'ring-amber-400' };
      case 'lake-nature':
        return { bg: 'bg-cyan-600', ring: 'ring-cyan-400' };
      case 'family':
        return { bg: 'bg-rose-600', ring: 'ring-rose-400' };
      default:
        return { bg: 'bg-stone-700', ring: 'ring-stone-400' };
    }
  };

  // Smart placement for tooltip to prevent overlaps near Supertree Grove
  const getTooltipPositionStyle = (attractionId: string, coordX: number) => {
    let verticalPlacement = 'bottom-full mb-2';
    if (attractionId === 'serene-garden' || attractionId === 'ocbc-skyway') {
      verticalPlacement = 'top-full mt-2';
    } else if (attractionId === 'supertree-observatory') {
      verticalPlacement = 'bottom-full mb-3.5';
    }

    // Horizontal alignment to prevent screen clipping (e.g. Children's Garden on left)
    let horizontalAlignment = 'left-1/2 -translate-x-1/2';
    if (coordX < 18) {
      horizontalAlignment = 'left-0 translate-x-0';
    } else if (coordX > 82) {
      horizontalAlignment = 'right-0 translate-x-0';
    }

    return `${verticalPlacement} ${horizontalAlignment}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-stone-900 overflow-hidden select-none flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50' : 'rounded-2xl shadow-xl border border-stone-200/80 dark:border-stone-800'
      }`}
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Search Input with Autocomplete */}
        <div className="relative pointer-events-auto w-full sm:w-80 shadow-lg rounded-xl">
          <div className="flex items-center gap-2 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-200/90 dark:border-stone-700/80">
            <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <input
              type="text"
              placeholder={t.map.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-500 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-30">
              <div className="px-3 py-1.5 text-xs text-stone-400 border-b border-stone-100 dark:border-stone-800">
                Matched Locations
              </div>
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectAttraction(item);
                    centerOnLocation(item.coordinates.x, item.coordinates.y, 2.2);
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-b border-stone-50 dark:border-stone-800/50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-stone-900 dark:text-stone-100">{getLocalizedName(item)}</div>
                    <div className="text-xs text-stone-500">{getLocalizedCategory(item)} · {item.admission}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter Chips on Map */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 shadow-md pointer-events-auto">
          {[
            { id: 'all', label: t.map.allHighlights },
            { id: 'conservatory', label: t.map.conservatories },
            { id: 'supertree', label: t.map.supertrees },
            { id: 'outdoor-garden', label: t.map.outdoorGardens },
            { id: 'lake-nature', label: t.map.lakes },
            { id: 'family', label: t.map.family },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id as AttractionCategory | 'all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map Utility Actions */}
        <div className="flex items-center gap-2 pointer-events-auto ml-auto">
          <button
            onClick={() => setShowFacilities(!showFacilities)}
            title="Toggle Transport & Facilities"
            className={`p-2.5 rounded-xl backdrop-blur-md shadow-md border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showFacilities 
                ? 'bg-emerald-800 text-white border-emerald-700' 
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">{t.map.amenities}</span>
          </button>

          {itineraryAttractionIds.length > 0 && (
            <button
              onClick={() => setShowRoute(!showRoute)}
              title="Toggle Itinerary Route Trail"
              className={`p-2.5 rounded-xl backdrop-blur-md shadow-md border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                showRoute 
                  ? 'bg-purple-800 text-white border-purple-700' 
                  : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">{t.map.route} ({itineraryAttractionIds.length})</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/90 dark:bg-stone-900/90 hover:bg-white text-stone-800 dark:text-stone-200 rounded-xl backdrop-blur-md shadow-md border border-stone-200/80 dark:border-stone-700/80 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Viewport Canvas */}
      <div 
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden bg-stone-950"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Base Illustrated Map Graphic */}
          <div className="relative w-full aspect-[16/9] max-w-none shadow-2xl overflow-hidden rounded-lg bg-emerald-950">
            <img
              src={ASSET_MAP_IMAGE}
              onError={(e) => {
                // Guaranteed fallback to /public/images/
                if (!e.currentTarget.src.includes('/images/')) {
                  e.currentTarget.src = '/images/illustrated_gardens_map_1794030377958.jpg';
                }
              }}
              alt="Gardens by the Bay Illustrated Visitor Map"
              className="w-full h-full object-cover pointer-events-none select-none block"
              draggable={false}
            />

            {/* SVG Interactive Overlay Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 562.5"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Connecting Itinerary Path Polyline */}
              {showRoute && orderedItineraryAttractions.length > 1 && (
                <g className="transition-opacity duration-300">
                  <polyline
                    points={routePointsString}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="8"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#routeGlow)"
                  />
                  <polyline
                    points={routePointsString}
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 6"
                    className="animate-pulse"
                  />
                </g>
              )}
            </svg>

            {/* Interactive Attraction Hotspot Pins */}
            {visibleAttractions.map(attraction => {
              const isSelected = selectedAttractionId === attraction.id;
              const isHovered = hoveredAttractionId === attraction.id;
              const itineraryIndex = itineraryAttractionIds.indexOf(attraction.id);
              const isInItinerary = itineraryIndex !== -1;
              const theme = getCategoryTheme(attraction.category);
              const localizedName = getLocalizedName(attraction);
              const tooltipClass = getTooltipPositionStyle(attraction.id, attraction.coordinates.x);

              return (
                <div
                  key={attraction.id}
                  style={{
                    left: `${attraction.coordinates.x}%`,
                    top: `${attraction.coordinates.y}%`,
                    transform: `translate(-50%, -50%) scale(${1 / Math.sqrt(zoom)})`,
                  }}
                  className={`absolute pointer-events-auto cursor-pointer transition-all duration-200 z-10 ${
                    isSelected ? 'z-30' : isHovered ? 'z-20' : 'z-10'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAttraction(attraction);
                  }}
                  onMouseEnter={() => setHoveredAttractionId(attraction.id)}
                  onMouseLeave={() => setHoveredAttractionId(null)}
                >
                  <div className="relative group flex items-center justify-center">
                    {(isSelected || isInItinerary) && (
                      <div 
                        className={`absolute -inset-2.5 rounded-full animate-ping opacity-60 ${
                          isSelected ? 'bg-amber-400' : 'bg-purple-400'
                        }`} 
                      />
                    )}

                    <button
                      type="button"
                      className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-xl ${
                        theme.bg
                      } ${
                        isSelected 
                          ? 'w-10 h-10 ring-4 ring-amber-400 ring-offset-2 ring-offset-stone-900 border-white scale-125' 
                          : isInItinerary
                            ? 'w-8 h-8 ring-2 ring-purple-300 border-white'
                            : 'w-7 h-7 hover:scale-115 border-white/90 hover:ring-2 hover:ring-white'
                      }`}
                      aria-label={localizedName}
                    >
                      {isInItinerary ? (
                        <span className="text-xs font-bold text-white tracking-tighter">
                          {itineraryIndex + 1}
                        </span>
                      ) : (
                        <MapPin className={`text-white ${isSelected ? 'w-5 h-5' : 'w-3.5 h-3.5'}`} />
                      )}
                    </button>

                    {/* Floating Label Badge with Overlap Prevention */}
                    <div 
                      className={`absolute ${tooltipClass} pointer-events-none transition-all duration-200 whitespace-nowrap ${
                        isSelected || isHovered || zoom >= 2.2
                          ? 'opacity-100 scale-100 z-30'
                          : 'opacity-0 scale-90'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`px-2.5 py-1 rounded-lg shadow-xl text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border ${
                          isSelected 
                            ? 'bg-amber-500 text-stone-950 border-amber-300 font-bold'
                            : 'bg-stone-900/90 text-stone-100 border-stone-700'
                        }`}>
                          {isInItinerary && (
                            <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                              {itineraryIndex + 1}
                            </span>
                          )}
                          <span>{localizedName}</span>
                          {attraction.admission === 'Ticketed' && (
                            <Ticket className="w-3 h-3 text-amber-300 inline" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Facilities Hotspots (MRT, Shuttle, Restrooms, Dining) */}
            {showFacilities && FACILITIES_DATA.map(fac => {
              return (
                <div
                  key={fac.id}
                  style={{
                    left: `${fac.coordinates.x}%`,
                    top: `${fac.coordinates.y}%`,
                    transform: `translate(-50%, -50%) scale(${0.85 / Math.sqrt(zoom)})`,
                  }}
                  className="absolute pointer-events-auto z-10 group cursor-help"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-800/90 hover:bg-stone-900 border border-stone-400/80 shadow-md text-white transition-transform hover:scale-125">
                    {fac.type === 'mrt' && <span className="text-[10px] font-black text-rose-400">MRT</span>}
                    {fac.type === 'shuttle' && <Navigation className="w-3 h-3 text-cyan-300" />}
                    {fac.type === 'visitor-centre' && <Compass className="w-3 h-3 text-amber-300" />}
                    {fac.type === 'dining' && <Footprints className="w-3 h-3 text-emerald-300" />}
                    {fac.type === 'parking' && <MapPin className="w-3 h-3 text-sky-300" />}
                  </div>

                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                    <div className="px-2 py-1 rounded-md bg-stone-900/95 text-stone-200 text-[11px] whitespace-nowrap border border-stone-700 shadow-lg">
                      <p className="font-semibold text-white">{fac.name}</p>
                      <p className="text-[10px] text-stone-400">{fac.hours}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Left Legend */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <div className="bg-stone-900/85 backdrop-blur-md border border-stone-700/80 p-2.5 rounded-xl shadow-xl text-stone-300 text-xs flex flex-col gap-1.5 pointer-events-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">{t.map.legendTitle}</div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {t.map.conservatories}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              {t.map.supertrees}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              {t.map.outdoorGardens}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              {t.map.lakes}
            </span>
          </div>
          <div className="text-[10px] text-stone-400 flex items-center gap-1 pt-1 border-t border-stone-800">
            <Compass className="w-3 h-3 text-emerald-400" />
            {t.map.dragHint}
          </div>
        </div>
      </div>

      {/* Floating Bottom Right Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          <button
            onClick={() => handleZoom('in')}
            className="p-2.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border-b border-stone-200 dark:border-stone-800"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border-b border-stone-200 dark:border-stone-800"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Reset Map View"
            aria-label="Reset Map View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
