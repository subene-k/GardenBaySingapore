# Gardens by the Bay — Interactive Digital Visitor Experience
## Client Presentation & Executive Product Documentation
*Prepared for StratAgile AI Transformation Client Demonstration*

---

### Executive Overview

The **Gardens by the Bay Interactive Digital Visitor Experience** is a production-grade, responsive digital companion engineered to elevate visitor engagement across physical and digital touchpoints. Designed specifically for Singapore’s premier horticultural attraction, the application unifies **on-ground interactive kiosks**, **mobile smartphone guides**, and **pre-visit web planning** into a cohesive ecosystem.

#### Key Design & Architectural Pillars
1. **Nature-Inspired Design System**: Built with botanical emerald greens, warm cream accents, gold highlights, and glassmorphic elevation, reflecting the lush horticultural identity of Gardens by the Bay without visual clutter.
2. **Illustrated Vector Map Navigation**: Integrates high-resolution illustrated park cartography with responsive, interactive SVG hotspot overlays, precise spatial coordinates, and dynamic itinerary route polylines.
3. **Multilingual Inclusivity**: Fully translated and voice-narrated across Singapore’s four official national languages: **English, 中文 (Mandarin), Bahasa Melayu, and தமிழ் (Tamil)**.
4. **Universal Cross-Device Continuation**: QR-code-powered deep linking enables seamless handoff from desktop planning or on-ground kiosks to mobile smartphones with zero login friction.
5. **Multisensory Botanical Audio Companion**: Real-time synthesized pentatonic chime acoustics via the Web Audio API paired with client-side SpeechSynthesis voice narration for all attractions.

---

### Application Architecture & Technology Stack

| Layer | Technology | Purpose & Capabilities |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Component-based, functional hooks, strict typing |
| **Styling & Design System** | Tailwind CSS v4 | Responsive utility design, dark/light theme harmony |
| **Vector & Map Engine** | Responsive SVG + Canvas | 16:9 illustrated overlay, pan/pinch/zoom, route trails |
| **Audio Engine** | Web Audio API + SpeechSynthesis | Ambient musical chimes and multilingual voice narration |
| **Mobile & QR Engine** | `qrcode` + URLSearchParams | Instant deep linking with zero external database latency |
| **Icons & Micro-Interactions**| Lucide React | Botanical, transit, and navigation symbology |
| **Build & Tooling** | Vite 8 + ESBuild | Ultra-fast HMR and optimized production bundles |

---

### Core Features & Feature Matrix

#### 1. Immersive Explore Landing Experience
* **Live Park Vitals Bar**: Displays operating hours (**5:00 AM – 2:00 AM daily**), outdoor free admission access, factual Supertree counts (**18 total Supertrees: 12 in the Grove, 6 across Golden & Silver Gardens**), and climate-controlled biomes.
* **Curated Attraction Highlights**: Interactive hero cards for Flower Dome, Cloud Forest, Supertree Grove, and Floral Fantasy with pricing, indoor/outdoor tags, and direct map pinpointing.
* **Garden Rhapsody Advisory**: Prominent timings for the iconic evening light and sound show (**7:45 PM & 8:45 PM daily**).
* **Direct Navigation Links**: Quick-jump actions to the Interactive Map, Curated Itineraries, Kiosk Mode, and Visitor Amenities.

#### 2. Interactive Illustrated Map Engine
* **Fluid Viewport Controls**:
  * Pan via touch drag or mouse drag.
  * Smooth stepped Zoom In/Out (1.0x to 3.5x).
  * Pinch-to-zoom gesture support for mobile devices.
  * Reset View to default centering.
  * Fullscreen toggle for distraction-free navigation.
* **Category Filter Ribbons**:
  * **All Highlights**: Complete overview of 14 key attractions.
  * **Cooled Conservatories**: Flower Dome, Cloud Forest, Floral Fantasy.
  * **Supertrees & Aerial**: Supertree Grove, OCBC Skyway, Supertree Observatory.
  * **Outdoor Themed Gardens**: Heritage Gardens, Serene Garden, Sun Pavilion, The Meadow, The Canyon.
  * **Lakes & Nature**: Dragonfly & Kingfisher Lakes, Kingfisher Wetlands, Bay East Garden.
  * **Family & Children**: Far East Organization Children's Garden.
* **Smart Clustered Pin Placement**: Custom horizontal and vertical offsets around Supertree Grove and the park periphery to eliminate overlapping labels.
* **Live Search Bar**: Real-time fuzzy filtering by attraction name, category, or highlights.
* **Transit & Amenities Overlay**: Hotspots for Bayfront MRT (CE1/DT16), Gardens by the Bay MRT (TE22), Main Visitor Centre, EV shuttle boarding points, nursing rooms, lockers, and restrooms.
* **Itinerary Route Trail**: Dynamic SVG glowing polyline connecting all user-selected itinerary stops in sequential order.

#### 3. Attraction Information Drawer & Audio Companion
* **Verified Attraction Dossiers**: High-resolution imagery, official name translations, verified opening hours, admission pricing (Standard vs. Free Access), and recommended visit duration.
* **Climate Indicators**: Ambient biome temperatures (e.g., 23°C – 25°C inside Flower Dome/Cloud Forest).
* **Botanical Audio Companion**:
  * Playable in **English, 中文, Melayu, and தமிழ்**.
  * Generates a soft harmonic bell/chime chord using the browser's Web Audio synthesizer.
  * Speaks curated, natural text-to-speech descriptions with auto-fallback to device speech engines.
* **Curated Highlights & Insider Tips**: Specific photography spots, mist hours in Cloud Forest, and sunset recommendations.
* **Arrival Guidance**: Specific MRT exit numbers (e.g., Bayfront MRT Exit B for Floral Fantasy).
* **Action Shortcuts**: "Pin on Map", "Add to My Visit", and official website external verification links.

#### 4. Smart Itinerary Builder & Curated Tours
* **5 Pre-Built Curated Itineraries**:
  1. **1-Hour Express Tour**: Cloud Forest & Supertree Grove (60 mins, 2 stops).
  2. **2-Hour Signature Experience**: Flower Dome, Cloud Forest & OCBC Skyway (120 mins, 3 stops).
  3. **3-Hour Complete Immersion**: Conservatories, Skyway, Supertree Observatory & Heritage Gardens (180 mins, 5 stops).
  4. **Family & Kids Adventure**: Children’s Garden Water Play, Cloud Forest & Floral Fantasy (150 mins, 3 stops).
  5. **Golden Hour & Night Photography**: Supertree Observatory, OCBC Skyway, Dragonfly Lake & Garden Rhapsody (110 mins, 4 stops).
* **Custom Dynamic Builder**: Add or remove any attraction, reorder stops up/down, and inspect real-time cumulative duration estimates.
* **Map Connection**: Jump directly to the interactive map with the visual route trail highlighted.

#### 5. On-Ground Touch Kiosk Concierge
* **Purpose-Built Touch UI**: High-contrast, large-button design optimized for public touchscreen terminals (e.g., Terminal #04 at Main Visitor Arrival Plaza).
* **1-Touch Destination Locator**: Immediate one-tap pinpointing to primary destinations.
* **Language Switcher**: Dedicated prominent buttons for Singapore's 4 national languages.
* **Automated Inactivity Timeout**: Gentle modal alert after 60 seconds of inactivity, resetting to the default welcome state at 75 seconds for the next park guest.
* **Mobile Handoff QR**: High-resolution QR code allowing visitors to scan and instantly carry the mobile visitor guide on their phone.

#### 6. Universal QR Cross-Device Continuation
* **Seamless Mobile Loading**: Whenever a visitor scans the QR code from the **On-Ground Kiosk** or the **Website Header/Footer**, the mobile browser loads the responsive visitor website directly (never forcing kiosk mode onto the phone).
* **State Preservation**: Persists selected attraction, active itinerary stops, and preferred language in clean URL query parameters (`tab`, `loc`, `itinerary`, `lang`, `src`).
* **Connection Toast**: Real-time visual feedback confirms the mobile device is synchronised with the visit session.

#### 7. Multilingual Support Matrix
| Language | Code | Navigation & Labels | Spoken Voice Narration |
| :--- | :--- | :--- | :--- |
| **English** | `en` | Full coverage | Native Web Speech synthesis |
| **Chinese (中文)** | `zh` | Full coverage | Native `zh-CN` / `zh-SG` speech |
| **Malay (Bahasa Melayu)** | `ms` | Full coverage | Native `ms-MY` / `id-ID` speech |
| **Tamil (தமிழ்)** | `ta` | Full coverage | Native `ta-IN` / `ta-SG` speech |

---

### Verified Factual & Content Standards

1. **Supertree Grove Disambiguation**: Total of 18 Supertrees across the park: **12 Supertrees in Supertree Grove**, **3 Supertrees in Golden Garden**, and **3 Supertrees in Silver Garden**.
2. **Admission Accuracy**: Outdoor Heritage Gardens, Serene Garden, Sun Pavilion, Dragonfly Lake, and Children's Garden are strictly **Free Access**. Flower Dome, Cloud Forest, Floral Fantasy, OCBC Skyway, and Supertree Observatory are accurately tagged as **Ticketed**.
3. **Transport Accuracy**: Bayfront MRT (CE1/DT16, Exit B underground linkway directly into park) and Gardens by the Bay MRT (TE22, Exit 1) are accurately attributed to nearest attractions.

---

### Local Run & Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (runs on port 3000)
npm run dev

# 3. Compile and verify TypeScript types
npm run lint

# 4. Create production distribution build
npm run build
```

---

*StratAgile Client Demonstration — Gardens by the Bay Digital Visitor Experience*
