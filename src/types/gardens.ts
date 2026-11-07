export type AttractionCategory = 
  | 'conservatory'
  | 'supertree'
  | 'outdoor-garden'
  | 'lake-nature'
  | 'family'
  | 'amenity';

export type AdmissionType = 'Ticketed' | 'Free Access';

export interface AttractionCoordinates {
  x: number; // percentage 0 - 100 on illustrated map
  y: number; // percentage 0 - 100 on illustrated map
}

export interface Attraction {
  id: string;
  name: string;
  subtitle: string;
  category: AttractionCategory;
  categoryLabel: string;
  description: string;
  longDescription: string;
  image: string;
  hours: string;
  admission: AdmissionType;
  priceNote: string;
  durationMinutes: number;
  durationLabel: string;
  indoor: boolean;
  temperature?: string;
  coordinates: AttractionCoordinates;
  officialUrl: string;
  highlights: string[];
  visitorTips: string[];
  nearestStation: string;
  accessibility: string[];
  nearbyAttractionIds: string[];
  tagline?: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'mrt' | 'shuttle' | 'visitor-centre' | 'restroom' | 'dining' | 'parking';
  typeLabel: string;
  description: string;
  hours: string;
  coordinates: AttractionCoordinates;
  tips: string;
}

export interface ItineraryStop {
  attractionId: string;
  customNotes?: string;
}

export interface CuratedItinerary {
  id: string;
  title: string;
  targetAudience: string;
  durationLabel: string;
  totalMinutes: number;
  description: string;
  recommendedTime: string;
  attractionIds: string[];
  stopsCount: number;
  badge: string;
}

export interface VisitorSessionState {
  selectedAttractionId: string | null;
  itineraryAttractionIds: string[];
  activeFilter: AttractionCategory | 'all';
  activeTab: 'explore' | 'map' | 'attractions' | 'itinerary' | 'info' | 'kiosk';
}
