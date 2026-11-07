import React, { useState } from 'react';
import { 
  Search, Filter, Clock, Ticket, Thermometer, Plus, Check, 
  MapPin, Sparkles, ArrowRight, ExternalLink 
} from 'lucide-react';
import { Attraction, AttractionCategory, AdmissionType } from '../types/gardens';
import { ATTRACTIONS_DATA } from '../data/attractions';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface AttractionsListProps {
  onSelectAttraction: (attraction: Attraction) => void;
  itineraryAttractionIds: string[];
  onToggleItinerary: (attractionId: string) => void;
  onNavigateToMapWithAttraction: (attraction: Attraction) => void;
  currentLang?: SupportedLanguage;
}

export const AttractionsList: React.FC<AttractionsListProps> = ({
  onSelectAttraction,
  itineraryAttractionIds,
  onToggleItinerary,
  onNavigateToMapWithAttraction,
  currentLang = 'en'
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory | 'all'>('all');
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionType | 'all'>('all');
  const [indoorOnly, setIndoorOnly] = useState(false);

  // Filter logic
  const filteredAttractions = ATTRACTIONS_DATA.filter(attraction => {
    const locName = t.attractionNames[attraction.id]?.name || attraction.name;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = attraction.name.toLowerCase().includes(q) || locName.toLowerCase().includes(q);
      const matchCategory = attraction.categoryLabel.toLowerCase().includes(q);
      const matchDesc = attraction.description.toLowerCase().includes(q);
      const matchHighlight = attraction.highlights.some(h => h.toLowerCase().includes(q));
      if (!matchName && !matchCategory && !matchDesc && !matchHighlight) {
        return false;
      }
    }

    // Category
    if (selectedCategory !== 'all' && attraction.category !== selectedCategory) {
      return false;
    }

    // Admission
    if (selectedAdmission !== 'all' && attraction.admission !== selectedAdmission) {
      return false;
    }

    // Indoor climate
    if (indoorOnly && !attraction.indoor) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          World-Class Horticultural Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {t.nav.attractions} & Horticultural Wonders
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
          From record-breaking glass biomes and misty waterfalls to vertical Supertrees and cultural heritage trails across 101 hectares.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.map.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
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
                type="button"
                onClick={() => setSelectedCategory(tab.id as AttractionCategory | 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admission & Indoor Toggles */}
          <div className="flex items-center gap-3 ml-auto">
            <select
              value={selectedAdmission}
              onChange={(e) => setSelectedAdmission(e.target.value as AdmissionType | 'all')}
              className="bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 px-3 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-emerald-700"
            >
              <option value="all">Any Admission</option>
              <option value="Ticketed">Ticketed Experiences</option>
              <option value="Free Access">Free Access Gardens</option>
            </select>

            <button
              type="button"
              onClick={() => setIndoorOnly(!indoorOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                indoorOnly
                  ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-200 border-cyan-400'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5 text-cyan-600" />
              <span>Cooled Indoor Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-stone-500">
        Showing <strong>{filteredAttractions.length}</strong> attractions & destinations
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map(attraction => {
          const isInItinerary = itineraryAttractionIds.includes(attraction.id);
          const locName = t.attractionNames[attraction.id]?.name || attraction.name;
          const locSub = t.attractionNames[attraction.id]?.subtitle || attraction.subtitle;
          const locCat = t.attractionNames[attraction.id]?.categoryLabel || attraction.categoryLabel;

          return (
            <div
              key={attraction.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div 
                className="relative h-52 overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => onSelectAttraction(attraction)}
              >
                <img
                  src={attraction.image}
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('/images/')) {
                      e.currentTarget.src = '/images/flower_dome_interior_1794030379074.jpg';
                    }
                  }}
                  alt={locName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Admission & Category Chips */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-[11px] font-semibold text-white border border-stone-700">
                    {locCat}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold backdrop-blur-md ${
                    attraction.admission === 'Ticketed'
                      ? 'bg-amber-400/90 text-stone-950'
                      : 'bg-emerald-700/90 text-white'
                  }`}>
                    {attraction.admission}
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {locName}
                  </h3>
                  <p className="text-xs text-stone-300 truncate">
                    {locSub}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {attraction.description}
                </p>

                {/* Metadata strip */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs text-stone-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{attraction.durationLabel}</span>
                    </span>
                    {attraction.temperature ? (
                      <span className="flex items-center gap-1 text-cyan-600 font-medium">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{attraction.temperature}</span>
                      </span>
                    ) : (
                      <span>Outdoor Parkland</span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400 truncate">
                    {t.drawer.nearestArrival}: {attraction.nearestStation}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectAttraction(attraction)}
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateToMapWithAttraction(attraction)}
                    className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Find on Interactive Map"
                  >
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleItinerary(attraction.id)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isInItinerary
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 border border-purple-300 dark:border-purple-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                    }`}
                    title={isInItinerary ? 'Remove from Itinerary' : 'Add to Itinerary'}
                  >
                    {isInItinerary ? <Check className="w-4 h-4 text-purple-600" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
