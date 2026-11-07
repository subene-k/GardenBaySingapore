import React, { useState } from 'react';
import { 
  Clock, Navigation, Car, Bus, Train, Accessibility, 
  Sparkles, ShieldCheck, HelpCircle, Phone, Info, MapPin, 
  ExternalLink, Sun, Droplets, Wind
} from 'lucide-react';
import { GENERAL_VISITOR_INFO } from '../data/attractions';

export const VisitorInfoSection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('mrt');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Essential Visitor Guidelines
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Plan Your Visit & Practical Info
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
          Everything you need for a seamless experience: verified opening hours, transport links, parking, light show schedules, and accessibility amenities.
        </p>
      </div>

      {/* Operational Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Operating Hours */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Operating Hours
          </h2>
          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Outdoor Gardens:</span>
              <p>5:00 AM – 2:00 AM Daily (Free Access)</p>
            </div>
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Conservatories & Skyway:</span>
              <p>9:00 AM – 9:00 PM (Last Entry 8:30 PM)</p>
            </div>
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Children's Garden:</span>
              <p>Thu–Sun & PH: 9:00 AM – 7:00 PM (Closed Mon–Wed)</p>
            </div>
          </div>
        </div>

        {/* Card 2: Garden Rhapsody Light Show */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/80 to-stone-900 border border-purple-800/40 text-white shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-800/60 text-purple-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">
            Garden Rhapsody Light Show
          </h2>
          <div className="space-y-2 text-xs text-purple-200">
            <div>
              <span className="font-semibold text-white">Show Timings:</span>
              <p>7:45 PM & 8:45 PM Daily</p>
            </div>
            <div>
              <span className="font-semibold text-white">Location & Fee:</span>
              <p>Supertree Grove · 15 mins · Free Admission</p>
            </div>
            <p className="text-[11px] text-purple-300 pt-1">
              Tip: Lie down on the lawn or benches 15 minutes early for the best vertical viewing angle.
            </p>
          </div>
        </div>

        {/* Card 3: Weather & Advisory */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Climate & Visit Comfort
          </h2>
          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center justify-between">
              <span>Outdoor Weather:</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">30°C Tropical / Gentle Breeze</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Indoor Biome Temp:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">23°C – 25°C Spring Climate</span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Bring a light jacket for the conservatories and stay hydrated when walking the outdoor grounds.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Here & Transportation */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Getting to Gardens by the Bay
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Centrally located in Marina Bay with two direct MRT stations and ample parking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MRT Options */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100">
              <Train className="w-5 h-5 text-rose-600" />
              <span>By Mass Rapid Transit (MRT)</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">
                  Option 1: Gardens by the Bay MRT (TE22)
                </div>
                <p className="text-stone-600 dark:text-stone-400 mb-1">
                  Thomson-East Coast Line · Take <strong>Exit 1</strong>.
                </p>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Closest to Flower Dome, Cloud Forest, and Main Visitor Centre (3-minute walk).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">
                  Option 2: Bayfront MRT (DT16 / CE1)
                </div>
                <p className="text-stone-600 dark:text-stone-400 mb-1">
                  Downtown & Circle Lines · Take <strong>Exit B</strong>.
                </p>
                <p className="text-stone-600 dark:text-stone-400">
                  Walk across Dragonfly Bridge directly into Floral Fantasy and Heritage Gardens, or hop on the park shuttle.
                </p>
              </div>
            </div>
          </div>

          {/* Shuttle, Car & Bus */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100">
              <Bus className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Shuttle, Taxi & Car Parking</span>
            </div>

            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-200">Electric Shuttle Service:</span>
                <p>Runs every 10 mins between Bayfront MRT (Exit B) and the Cooled Conservatories. SGD 3 unlimited day pass (Free for wheelchairs and kids &lt;0.9m).</p>
              </div>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="font-semibold text-stone-900 dark:text-stone-200">Taxi / Ride-Hailing Drop-Off:</span>
                <p>Set destination to "Gardens by the Bay Main Visitor Centre" (18 Marina Gardens Drive). Sheltered drop-off porch.</p>
              </div>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="font-semibold text-stone-900 dark:text-stone-200">Car Parks:</span>
                <p>Main Entrance Car Park (420 lots with EV charging bays), The Meadow Car Park (300 lots), Bayfront Plaza (250 lots). Electronic Parking System (EPS).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility & Visitor Amenities */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Accessibility & Amenities
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Committed to an inclusive and accessible horticultural experience for all visitors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <Accessibility className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">Wheelchair Loans</div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Complimentary wheelchair loans available at the Main Visitor Centre (first-come, first-served).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">Barrier-Free Paths</div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Wide paved pathways and spacious elevators allow effortless transit for strollers and mobility devices.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <Info className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">Luggage Lockers</div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Secure automated electronic lockers situated outside Flower Dome and The Canopy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <Phone className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">Visitor Assistance</div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Main Visitor Service Hotline: +65 6420 6848 (Daily 9:00 AM – 8:30 PM).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
