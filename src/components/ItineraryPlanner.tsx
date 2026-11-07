import React from 'react';
import { 
  Footprints, Clock, ArrowUp, ArrowDown, Trash2, Plus, 
  Sparkles, QrCode, MapPin, Check, Share2, Compass, AlertCircle
} from 'lucide-react';
import { Attraction, CuratedItinerary } from '../types/gardens';
import { ATTRACTIONS_DATA, CURATED_ITINERARIES } from '../data/attractions';

interface ItineraryPlannerProps {
  itineraryAttractionIds: string[];
  onSetItinerary: (ids: string[]) => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onOpenQrModal: () => void;
  onNavigateToMap: () => void;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  itineraryAttractionIds,
  onSetItinerary,
  onSelectAttraction,
  onOpenQrModal,
  onNavigateToMap
}) => {
  // Current ordered attraction items
  const currentStops = itineraryAttractionIds
    .map(id => ATTRACTIONS_DATA.find(a => a.id === id))
    .filter((a): a is Attraction => a !== undefined);

  // Available attractions that are not yet in itinerary
  const remainingAttractions = ATTRACTIONS_DATA.filter(
    a => !itineraryAttractionIds.includes(a.id)
  );

  // Calculate total time: sum of durations + 10 mins walking between each consecutive stop
  const totalVisitMinutes = currentStops.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalWalkMinutes = Math.max(0, currentStops.length - 1) * 10;
  const totalTimeMinutes = totalVisitMinutes + totalWalkMinutes;

  const hours = Math.floor(totalTimeMinutes / 60);
  const minutes = totalTimeMinutes % 60;
  const formattedTotalTime = hours > 0 
    ? `${hours} hr${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`
    : `${minutes} mins`;

  // Move stop up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...itineraryAttractionIds];
    const temp = newIds[index - 1];
    newIds[index - 1] = newIds[index];
    newIds[index] = temp;
    onSetItinerary(newIds);
  };

  // Move stop down
  const handleMoveDown = (index: number) => {
    if (index === itineraryAttractionIds.length - 1) return;
    const newIds = [...itineraryAttractionIds];
    const temp = newIds[index + 1];
    newIds[index + 1] = newIds[index];
    newIds[index] = temp;
    onSetItinerary(newIds);
  };

  // Remove stop
  const handleRemove = (id: string) => {
    onSetItinerary(itineraryAttractionIds.filter(item => item !== id));
  };

  // Add stop
  const handleAddStop = (id: string) => {
    onSetItinerary([...itineraryAttractionIds, id]);
  };

  // Apply curated itinerary
  const handleApplyCurated = (curated: CuratedItinerary) => {
    onSetItinerary([...curated.attractionIds]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Title & Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1">
            Personalised Visit Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Itinerary Planner & Route Optimizer
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            Select stops, order your route across Gardens by the Bay, view calculated walking times, and transfer directly to your mobile device via QR continuation.
          </p>
        </div>

        {/* Global Summary Badge & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQrModal}
            className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Send to Phone via QR</span>
          </button>
          {currentStops.length > 0 && (
            <button
              onClick={onNavigateToMap}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>View Route on Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Curated Pre-Made Itineraries */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Curated Ready-to-Walk Itineraries
            </h2>
            <p className="text-xs text-stone-500">
              Designed by Singapore horticultural and visitor experience specialists
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURATED_ITINERARIES.map(itin => {
            const isCurrentlySelected = 
              itin.attractionIds.length === itineraryAttractionIds.length &&
              itin.attractionIds.every((id, idx) => itineraryAttractionIds[idx] === id);

            return (
              <div
                key={itin.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrentlySelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-md ring-1 ring-emerald-400'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      {itin.badge}
                    </span>
                    <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {itin.durationLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1.5">
                    {itin.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-3">
                    {itin.description}
                  </p>
                  
                  <div className="text-[11px] text-stone-500 mb-4">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Best Time: </span>
                    {itin.recommendedTime}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {itin.stopsCount} landmark stops
                  </span>
                  <button
                    onClick={() => handleApplyCurated(itin)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isCurrentlySelected
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-emerald-800 hover:text-white text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {isCurrentlySelected ? 'Applied' : 'Load Itinerary'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Custom Itinerary Builder */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Ordered Stops Sequence */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Your Active Route Sequence</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                {currentStops.length} {currentStops.length === 1 ? 'Stop' : 'Stops'}
              </span>
            </h2>

            {currentStops.length > 0 && (
              <button
                onClick={() => onSetItinerary([])}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Clear all stops
              </button>
            )}
          </div>

          {currentStops.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 space-y-3">
              <Compass className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                Your itinerary is currently empty
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Pick a ready-made tour above, or click on any attraction from the list to build your custom walking sequence.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentStops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between gap-4 transition-all hover:border-emerald-300 dark:hover:border-emerald-800"
                >
                  {/* Sequence Number Indicator */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {index + 1}
                    </div>

                    <img
                      src={stop.image}
                      alt={stop.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 cursor-pointer"
                      onClick={() => onSelectAttraction(stop)}
                    />

                    <div className="min-w-0">
                      <div 
                        className="text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-700 cursor-pointer truncate"
                        onClick={() => onSelectAttraction(stop)}
                      >
                        {stop.name}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                        <span>{stop.durationLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{stop.admission}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reordering and Removal Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === currentStops.length - 1}
                      className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemove(stop.id)}
                      className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-1"
                      title="Remove from itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Route Duration Metric & Add Remaining Stops */}
        <div className="space-y-6">
          {/* Total Duration Card */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white shadow-xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Trip Route Estimates
            </div>

            <div className="flex items-baseline justify-between border-b border-stone-800 pb-3">
              <span className="text-xs text-stone-400">Total Experience Time</span>
              <span className="text-2xl font-bold text-white font-mono">{formattedTotalTime}</span>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Attraction Time:</span>
                <span>{totalVisitMinutes} mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Estimated Walking Transit:</span>
                <span>{totalWalkMinutes} mins (~{currentStops.length > 1 ? (currentStops.length - 1) * 600 : 0}m)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Number of Stops:</span>
                <span>{currentStops.length} stops</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQrModal}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Export Itinerary to Mobile</span>
              </button>
            </div>
          </div>

          {/* Add More Sights to Itinerary */}
          {remainingAttractions.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Suggested Additions
              </h3>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {remainingAttractions.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {item.durationLabel} · {item.admission}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddStop(item.id)}
                      className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-medium shrink-0"
                      title="Add to Itinerary"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
