import { Attraction, Facility, CuratedItinerary } from '../types/gardens';

export const ASSET_MAP_IMAGE = '/src/assets/images/illustrated_gardens_map_1794030377958.jpg';
export const ASSET_HERO_IMAGE = '/src/assets/images/hero_gardens_conservatory_1794030378866.jpg';
export const ASSET_FLOWER_DOME = '/src/assets/images/flower_dome_interior_1794030379074.jpg';
export const ASSET_CLOUD_FOREST = '/src/assets/images/cloud_forest_waterfall_1794030381305.jpg';
export const ASSET_SUPERTREE = '/src/assets/images/supertree_grove_night_1794030381267.jpg';
export const ASSET_FLORAL_FANTASY = '/src/assets/images/floral_fantasy_showcase_1794030380351.jpg';

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: 'flower-dome',
    name: 'Flower Dome',
    subtitle: 'The World’s Largest Glass Greenhouse',
    category: 'conservatory',
    categoryLabel: 'Cooled Conservatory',
    description: 'Guinness World Record largest glass greenhouse, replicating the cool-dry Mediterranean and semi-arid climates with nine distinct gardens.',
    longDescription: 'Spanning 1.28 hectares under an unsupported columnless glass grid-shell, Flower Dome houses exotic plants from five continents. Explore the Olive Grove with thousand-year-old olive trees, the dramatic Succulent Garden, Australian and Californian gardens, and the vibrant Flower Field featuring rotating seasonal floral extravaganzas like Tulipmania and Orchid Haven.',
    image: ASSET_FLOWER_DOME,
    hours: 'Daily: 9:00 AM – 9:00 PM (Last admission 8:30 PM)',
    admission: 'Ticketed',
    priceNote: 'Standard Adult from SGD 32 (Conservatories combo available)',
    durationMinutes: 75,
    durationLabel: '60 – 90 mins',
    indoor: true,
    temperature: '23°C – 25°C',
    coordinates: { x: 67.5, y: 19.5 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/flower-dome.html',
    highlights: [
      'Guinness World Records 2015 largest glass greenhouse (1.28 hectares)',
      'Changing floral displays in the central Flower Field',
      'Over 30,000 plants representing 150+ species',
      'Ancient Mediterranean olive trees over 1,000 years old'
    ],
    visitorTips: [
      'Bring a light cardigan as temperatures are maintained between 23°C–25°C.',
      'Best visited during midday to escape tropical heat or at twilight for evening ambient illumination.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22, Exit 1) or Bayfront MRT Shuttle Stop',
    accessibility: ['Wheelchair Accessible', 'Stroller Friendly', 'Sensory Plant Tactile Areas'],
    nearbyAttractionIds: ['cloud-forest', 'supertree-grove', 'serene-garden']
  },
  {
    id: 'cloud-forest',
    name: 'Cloud Forest',
    subtitle: 'A Misty 35-Metre Mountain & Indoor Waterfall',
    category: 'conservatory',
    categoryLabel: 'Cooled Conservatory',
    description: 'A 35-metre tall mountain veiled in mist with one of the world’s tallest indoor waterfalls, showcasing highland tropical montane biodiversity.',
    longDescription: 'Step into a mystical misty world where high-altitude orchids, pitcher plants, and delicate ferns cling to a living vertical mountain. Ride the elevator to the Lost World at the summit, then descend along the cantilevered Cloud Walk and Treetop Walk suspended high above the forest canopy with views of Marina Bay.',
    image: ASSET_CLOUD_FOREST,
    hours: 'Daily: 9:00 AM – 9:00 PM (Last admission 8:30 PM)',
    admission: 'Ticketed',
    priceNote: 'Standard Adult from SGD 32 (Conservatories combo available)',
    durationMinutes: 75,
    durationLabel: '60 – 90 mins',
    indoor: true,
    temperature: '23°C – 25°C',
    coordinates: { x: 86.0, y: 34.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/cloud-forest.html',
    highlights: [
      'Dramatic 35-meter indoor cascading waterfall',
      'Cantilevered Cloud Walk suspended aerial skyway',
      'Carnivorous pitcher plants and rare high-elevation orchids',
      'Misting hours every 2 hours: 10am, 12pm, 2pm, 4pm, 6pm, 8pm'
    ],
    visitorTips: [
      'Time your visit with misting times (every even hour) for magical photographic opportunities.',
      'Paved accessible walkways allow seamless wheelchair and stroller transit.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22, Exit 1)',
    accessibility: ['Wheelchair Accessible', 'Elevator Access to Mountain Peak', 'Braille Signage'],
    nearbyAttractionIds: ['flower-dome', 'supertree-grove', 'sun-pavilion']
  },
  {
    id: 'supertree-grove',
    name: 'Supertree Grove',
    subtitle: 'Futuristic Vertical Gardens & Light Spectacle',
    category: 'supertree',
    categoryLabel: 'Supertree & Aerial',
    description: 'Iconic 25 to 50-metre vertical botanical giants embedded with over 162,900 plants, home to the daily Garden Rhapsody light show.',
    longDescription: 'The heart of Gardens by the Bay, Supertree Grove features 12 towering vertical gardens that act as cooling ducts for the conservatories and harness solar energy. By day they provide shaded promenades; by night they come alive with vibrant colors choreographed to music in the complimentary Garden Rhapsody spectacle.',
    image: ASSET_SUPERTREE,
    hours: 'Outdoor Grounds: Daily 5:00 AM – 2:00 AM (Free access)',
    admission: 'Free Access',
    priceNote: 'Outdoor Grove is free. Garden Rhapsody light show is free.',
    durationMinutes: 45,
    durationLabel: '45 – 60 mins',
    indoor: false,
    coordinates: { x: 65.0, y: 44.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/supertree-grove.html',
    highlights: [
      'Free Garden Rhapsody Light & Sound Show: Daily at 7:45 PM & 8:45 PM',
      'Vertical gardens hosting 200+ species of bromeliads, orchids, and ferns',
      'Photovoltaic cells generating electricity for park lighting',
      'Panoramic central plaza with viewing lawns'
    ],
    visitorTips: [
      'Arrive 15–20 minutes before the 7:45 PM or 8:45 PM show to secure a comfortable lawn spot.',
      'Lying down on the circular benches provides an immersive optical view of the illuminated canopy.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22, Exit 1) or Bayfront MRT (CE1/DT16)',
    accessibility: ['Wheelchair Accessible Plaza', 'Paved Smooth Pathways'],
    nearbyAttractionIds: ['ocbc-skyway', 'supertree-observatory', 'flower-dome', 'cloud-forest']
  },
  {
    id: 'ocbc-skyway',
    name: 'OCBC Skyway',
    subtitle: 'Suspended Aerial Walkway 22 Metres Above Ground',
    category: 'supertree',
    categoryLabel: 'Supertree & Aerial',
    description: 'A 128-metre long curved aerial suspension walkway hung between two towering Supertrees, offering bird’s-eye vistas of the gardens and bay.',
    longDescription: 'Stroll 22 metres in the sky on this suspended aerial path. Feel the gentle tropical breeze as you take in panoramic vistas of the surrounding gardens, Marina Bay Sands hotel towers, and the Singapore Straits horizon.',
    image: ASSET_SUPERTREE,
    hours: 'Daily: 9:00 AM – 9:00 PM (Last admission 8:30 PM)',
    admission: 'Ticketed',
    priceNote: 'Standard: SGD 14 (Adult) / SGD 10 (Child)',
    durationMinutes: 25,
    durationLabel: '20 – 30 mins',
    indoor: false,
    coordinates: { x: 53.5, y: 32.5 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/ocbc-skyway.html',
    highlights: [
      '128-metre aerial suspension bridge between Supertrees',
      '22 metres high offering breathtaking angles of Marina Bay Sands',
      'Elevated views during golden hour sunset and night illuminations'
    ],
    visitorTips: [
      'May be temporarily closed during lightning warnings for visitor safety.',
      'Strollers are not allowed on the walkway due to width; stroller parking is available at the base.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Elevator Access Available', 'Assisted Wheelchair Access'],
    nearbyAttractionIds: ['supertree-grove', 'supertree-observatory', 'golden-garden']
  },
  {
    id: 'supertree-observatory',
    name: 'Supertree Observatory',
    subtitle: 'Singapore’s Highest 360° Garden Lookout',
    category: 'supertree',
    categoryLabel: 'Supertree & Aerial',
    description: 'Located at the canopy of the tallest 50-metre Supertree, featuring an open-air rooftop deck and digital experience lounge.',
    longDescription: 'Ascend to the summit of the tallest Supertree. The observatory features an indoor lounge with digital media installations on climate sustainability, an open-air circular rooftop viewing deck, and a café for refreshments with an unmatched 360-degree Singapore panorama.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 9:00 AM – 9:00 PM (Last admission 8:30 PM)',
    admission: 'Ticketed',
    priceNote: 'Standard: SGD 14 (Adult) / SGD 10 (Child)',
    durationMinutes: 35,
    durationLabel: '30 – 45 mins',
    indoor: true,
    coordinates: { x: 63.5, y: 39.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/supertree-observatory.html',
    highlights: [
      'Highest vantage point in Gardens by the Bay (50 metres)',
      'Unobstructed 360-degree open-air rooftop viewing deck',
      'Air-conditioned media deck with digital touch exhibits and café'
    ],
    visitorTips: [
      'Visit 30 minutes before sunset to capture both daytime clarity and the glowing night skyline.',
      'Cocktails and botanical mocktails available at the rooftop café.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Wheelchair Accessible via Express Elevator'],
    nearbyAttractionIds: ['supertree-grove', 'ocbc-skyway', 'cloud-forest']
  },
  {
    id: 'floral-fantasy',
    name: 'Floral Fantasy',
    subtitle: 'Whimsical Floral Art & 4D Flight Ride',
    category: 'conservatory',
    categoryLabel: 'Cooled Conservatory',
    description: 'Four dreamlike garden landscapes featuring suspended bouquets, floral chandeliers, and the immersive 4D Flight of the Dragonfly ride.',
    longDescription: 'Situated right by Bayfront MRT, Floral Fantasy blends horticultural artistry with fairytale whimsy across four garden chambers: Dance, Float, Waltz, and Drift. Marvel at thousands of preserved flowers tumbling from the ceiling, poison dart frogs in vivariums, and finish with a simulated flight through the gardens.',
    image: ASSET_FLORAL_FANTASY,
    hours: 'Mon–Fri: 10:00 AM – 7:00 PM; Sat, Sun & PH: 10:00 AM – 8:00 PM',
    admission: 'Ticketed',
    priceNote: 'Standard: SGD 20 (Adult) / SGD 12 (Child)',
    durationMinutes: 45,
    durationLabel: '40 – 50 mins',
    indoor: true,
    temperature: '23°C – 25°C',
    coordinates: { x: 41.5, y: 47.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/floral-fantasy.html',
    highlights: [
      'Four distinct floral themes: Dance, Float, Waltz, and Drift',
      'Over 15,000 hanging cut, dried, and preserved blossoms',
      'Poison Dart Frog vivarium exhibit',
      '4D multisensory Ride: Flight of the Dragonfly'
    ],
    visitorTips: [
      'Located near Bayfront MRT Exit B—ideal as your very first or last stop.',
      'Photography hotspot: look up to capture the undulating hanging garden waves.'
    ],
    nearestStation: 'Bayfront MRT (DT16/CE1, Exit B)',
    accessibility: ['Wheelchair Accessible', 'Stroller Friendly'],
    nearbyAttractionIds: ['dragonfly-lake', 'heritage-gardens', 'golden-garden']
  },
  {
    id: 'heritage-gardens',
    name: 'Heritage Gardens',
    subtitle: 'Singapore’s Multi-Cultural Botanical Tapestry',
    category: 'outdoor-garden',
    categoryLabel: 'Outdoor Garden',
    description: 'Four themed gardens reflecting Singapore’s main ethnic groups and colonial history: Indian, Chinese, Malay, and Colonial Gardens.',
    longDescription: 'Discover the intimate ties between plants and Singapore’s multicultural heritage. The Indian Garden showcases sacred motifs, banyans, and Ayurvedic herbs; the Chinese Garden honors scholar aesthetics with penjing rocks and bamboo; the Malay Garden celebrates traditional kampong village subsistence plants; and the Colonial Garden recounts the spice trade history of nutmeg, rubber, and cloves.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 40,
    durationLabel: '30 – 45 mins',
    indoor: false,
    coordinates: { x: 29.5, y: 53.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/heritage-gardens.html',
    highlights: [
      'Indian Garden: Sacred banyan trees and floral kolam patterns',
      'Chinese Garden: Penjing bonsai, scholar rocks, and water reflections',
      'Malay Garden: Medicinal kampong herbs, pandan, and breadfruit',
      'Colonial Garden: Historical cash crops: nutmeg, rubber, cloves, cocoa'
    ],
    visitorTips: [
      'Peaceful, shaded outdoor walking trails with heritage interpretive plaques.',
      'Connects directly from the Bayfront MRT bridge toward the Supertree Grove.'
    ],
    nearestStation: 'Bayfront MRT (DT16/CE1, Exit B)',
    accessibility: ['Paved Pathways', 'Wheelchair Accessible'],
    nearbyAttractionIds: ['dragonfly-lake', 'floral-fantasy', 'the-meadow']
  },
  {
    id: 'dragonfly-lake',
    name: 'Dragonfly Lake & Kingfisher Lake',
    subtitle: 'Living Eco-Lake & 440-Metre Scenic Boardwalk',
    category: 'lake-nature',
    categoryLabel: 'Lakes & Nature',
    description: 'A rich aquatic sanctuary acting as a natural eco-filtration system for park runoff, bordered by a picturesque wooden boardwalk.',
    longDescription: 'These twin lakes are not only scenic waterways reflecting the Supertrees and skyline, but also a living ecosystem. Aquatic reedbeds and floating wetland islands naturally cleanse stormwater runoff before it enters the Marina Reservoir. Stroll along the 440-metre Dragonfly Bridge and boardwalk to spot monitor lizards, kingfishers, and iridescent dragonflies.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 30,
    durationLabel: '25 – 35 mins',
    indoor: false,
    coordinates: { x: 34.0, y: 77.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/dragonfly-and-kingfisher-lakes.html',
    highlights: [
      '440-metre lakeside boardwalk with panoramic reflections',
      'Natural biological water filtration system',
      'Bronze dragonfly sculptures hovering above the water surface',
      'Rich native birdlife: Collared Kingfishers and Little Herons'
    ],
    visitorTips: [
      'Fabulous vantage point for twilight photos of the illuminated Supertrees reflecting on the water.',
      'Shaded rest pavilions with wooden benches along the boardwalk.'
    ],
    nearestStation: 'Bayfront MRT (DT16/CE1)',
    accessibility: ['Wheelchair Friendly Boardwalk', 'Tactile Paving'],
    nearbyAttractionIds: ['heritage-gardens', 'kingfisher-wetlands', 'children-garden']
  },
  {
    id: 'children-garden',
    name: 'Far East Organization Children’s Garden',
    subtitle: 'Water Play Splashes & Rainforest Treehouses',
    category: 'family',
    categoryLabel: 'Family & Recreation',
    description: 'An interactive water play park with motion-activated fountain nozzles, rainforest treehouses, and adventure play trails for kids.',
    longDescription: 'Designed for children aged 1 to 12, this vibrant sanctuary features a 0.5-hectare interactive Water Play area where synchronized jets dance to lively children’s music. A separate Toddler Play Zone provides safe gentle sprays, while older kids can climb two 7.5-meter rainforest treehouses connected by climbing rope bridges in the jungle canopy.',
    image: ASSET_HERO_IMAGE,
    hours: 'Thu–Sun & PH: 9:00 AM – 7:00 PM (Water play closes at 6:30 PM). Closed Mon–Wed.',
    admission: 'Free Access',
    priceNote: 'Free admission (Swimwear required for water play)',
    durationMinutes: 90,
    durationLabel: '60 – 120 mins',
    indoor: false,
    coordinates: { x: 8.5, y: 88.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/far-east-organization-childrens-garden.html',
    highlights: [
      'Hydro-vault water sprays synchronized with sound sensors',
      'Toddler Play Zone with mist nozzles and sway bridges (ages 1–5)',
      'Rainforest Treehouses with suspension bridges (ages 6–12)',
      'Shaded family rest amphitheatre with lockers and shower facilities'
    ],
    visitorTips: [
      'Children must wear proper swimwear to enter the interactive water fountains.',
      'Check opening days: closed Mondays through Wednesdays for weekly maintenance.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22, Exit 1)',
    accessibility: ['Wheelchair Accessible Pathways', 'Family Shower & Changing Rooms'],
    nearbyAttractionIds: ['kingfisher-lake', 'active-garden', 'dragonfly-lake']
  },
  {
    id: 'serene-garden',
    name: 'Serene Garden',
    subtitle: 'Japanese Zen-Inspired Contemplative Sanctuary',
    category: 'outdoor-garden',
    categoryLabel: 'Outdoor Garden',
    description: 'A 2-hectare minimalist Japanese rock garden featuring bamboo groves, cascading streams, and 160 rocks sourced from Niyodo, Japan.',
    longDescription: 'Created in collaboration with renowned Japanese landscape designer Jun-ichi Inada, Serene Garden offers an oasis of quiet contemplation. Meander past weeping bamboo groves, podocarpus trees, a cascading natural waterfall, and granite stone formations that evoke the gentle rhythm of mountain streams.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 25,
    durationLabel: '20 – 30 mins',
    indoor: false,
    coordinates: { x: 58.0, y: 24.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/serene-garden.html',
    highlights: [
      '160 authentic blue rocks hand-selected from Niyodo River, Shikoku',
      'Zen gravel contemplation area and bamboo groves',
      'Peaceful wooden viewing pavilion overlooking mini waterfalls',
      'Rare bonsai podocarpus and sculptural tropical trees'
    ],
    visitorTips: [
      'One of the quietest corners of the gardens—perfect for meditation or reading.',
      'Situated right adjacent to the Flower Dome exterior walkway.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Wheelchair Accessible Paths'],
    nearbyAttractionIds: ['flower-dome', 'the-meadow', 'golden-garden']
  },
  {
    id: 'the-meadow',
    name: 'The Meadow',
    subtitle: 'Singapore’s Largest Outdoor Concert & Event Bowl',
    category: 'family',
    categoryLabel: 'Family & Recreation',
    description: 'A 22,000-square-metre natural grass amphitheatre that accommodates up to 30,000 people for picnics, festivals, and music concerts.',
    longDescription: 'Surrounded by panoramic views of the conservatories and Marina Bay Sands, The Meadow is Singapore’s premier outdoor venue. On ordinary days it is a relaxing green pasture perfect for evening kite-flying, family picnics, and stargazing.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free access on non-event days',
    durationMinutes: 30,
    durationLabel: '20 – 40 mins',
    indoor: false,
    coordinates: { x: 39.5, y: 32.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/the-meadow.html',
    highlights: [
      'Sprawling 22,000 sqm green lawn with unobstructed city skyline views',
      'Host to major international music concerts and cultural festivals',
      'Popular picnic sanctuary on weekend late afternoons'
    ],
    visitorTips: [
      'Pack a picnic mat and snacks for a relaxing golden hour hangout.',
      'Check park event schedules on weekends for potential private closures.'
    ],
    nearestStation: 'Bayfront MRT (DT16/CE1)',
    accessibility: ['Gradual Grass Slopes', 'Paved Perimeter Path'],
    nearbyAttractionIds: ['heritage-gardens', 'serene-garden', 'golden-garden']
  },
  {
    id: 'sun-pavilion',
    name: 'Sun Pavilion',
    subtitle: 'Dramatic Desert Cacti & Succulent Sanctuary',
    category: 'outdoor-garden',
    categoryLabel: 'Outdoor Garden',
    description: 'An open-air sheltered desert pavilion featuring more than 1,000 desert plants across 100 arid species from the Americas and Africa.',
    longDescription: 'Experience the marvels of plant adaptation in harsh arid climates. The Sun Pavilion shelters an incredible variety of cacti and succulents, including Mexican giant cardon cacti towering up to several meters, the whimsical Turk’s Cap, and spherical golden barrel cacti.',
    image: ASSET_FLOWER_DOME,
    hours: 'Daily: 9:00 AM – 9:00 PM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 20,
    durationLabel: '15 – 25 mins',
    indoor: false,
    coordinates: { x: 74.0, y: 54.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/sun-pavilion.html',
    highlights: [
      'Over 1,000 arid plants representing desert habitats of Mexico, Argentina, and Africa',
      'Giant columnar cacti and brain-like Cephalocereus senilis ("Old Man Cactus")',
      'Protected glass canopy providing sheltered desert environment'
    ],
    visitorTips: [
      'Right next to the Flower Dome exit—easy 10-minute stroll on your way to Supertree Grove.',
      'Observe without touching as desert spines are very sharp.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Level Concrete Path', 'Wheelchair Friendly'],
    nearbyAttractionIds: ['flower-dome', 'supertree-grove', 'the-canyon']
  },
  {
    id: 'kingfisher-wetlands',
    name: 'Kingfisher Wetlands',
    subtitle: 'Freshwater Eco-Sanctuary & Bird Watching',
    category: 'lake-nature',
    categoryLabel: 'Lakes & Nature',
    description: 'A 15,000-square-metre revitalised freshwater sanctuary harboring native mangrove species, otters, and bird lookout points.',
    longDescription: 'A biodiversity haven linking the main gardens with Marina Channel. Featuring more than 200 true mangrove and mangrove-associate trees, this wetland cleanses water through natural aeration cascades and provides a tranquil home for smooth-coated otters, white-breasted waterhens, and migratory kingfishers.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 30,
    durationLabel: '20 – 35 mins',
    indoor: false,
    coordinates: { x: 17.5, y: 62.5 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/kingfisher-wetlands.html',
    highlights: [
      '15,000 sqm freshwater eco-sanctuary with native mangrove trees',
      'Frequent sightings of Singapore’s wild smooth-coated otters',
      'Aeration water steps that oxygenate the lake system naturally'
    ],
    visitorTips: [
      'Early mornings (7:30 AM–9:00 AM) offer prime birdwatching and quiet walks.',
      'Shaded viewing platforms with wildlife identification guides.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Wheelchair Accessible Boardwalk'],
    nearbyAttractionIds: ['dragonfly-lake', 'active-garden', 'children-garden']
  },
  {
    id: 'golden-garden',
    name: 'Golden Garden',
    subtitle: 'Grand Arrival Supertrees & Botanical Plaza',
    category: 'outdoor-garden',
    categoryLabel: 'Outdoor Garden',
    description: 'Three majestic golden-hued Supertrees greeting visitors arriving from Marina Bay Sands and the Central Arrival Plaza.',
    longDescription: 'Named for the golden-flowered trees and foliage that surround it, Golden Garden features three towering Supertrees that act as prominent landmark beacons. It connects the overhead Lion Bridge from Marina Bay Sands directly into the heart of Gardens by the Bay.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free admission for all visitors',
    durationMinutes: 15,
    durationLabel: '10 – 15 mins',
    indoor: false,
    coordinates: { x: 49.5, y: 25.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/golden-garden.html',
    highlights: [
      'Three towering Supertrees framing the Lion Bridge pedestrian gateway',
      'Lush collection of yellow-flowered plants, tabebuias, and golden palms',
      'Central transit hub with wayfinding kiosks and shuttle ticketing'
    ],
    visitorTips: [
      'Ideal meeting spot when walking over from Marina Bay Sands Hotel lobby.',
      'Shuttle bus stop nearby transports visitors to the Cooled Conservatories.'
    ],
    nearestStation: 'Bayfront MRT (DT16/CE1, Exit B)',
    accessibility: ['Ramp Access', 'Elevator from Lion Bridge'],
    nearbyAttractionIds: ['ocbc-skyway', 'serene-garden', 'the-meadow']
  },
  {
    id: 'active-garden',
    name: 'Active Garden',
    subtitle: 'Community Wellness Lawn & Waterfront Promenade',
    category: 'family',
    categoryLabel: 'Family & Recreation',
    description: 'An open community space featuring outdoor fitness stations, musical playground instruments, a dog run, and community herb garden.',
    longDescription: 'Situated along the waterfront promenade overlooking the Marina Reservoir, Active Garden brings families and fitness enthusiasts together. It includes interactive musical play chimes, an all-inclusive outdoor gym, edible community garden, and the pet-friendly Mylo’s gelato café.',
    image: ASSET_HERO_IMAGE,
    hours: 'Daily: 5:00 AM – 2:00 AM',
    admission: 'Free Access',
    priceNote: 'Free access for all visitors',
    durationMinutes: 30,
    durationLabel: '20 – 40 mins',
    indoor: false,
    coordinates: { x: 14.0, y: 49.0 },
    officialUrl: 'https://www.gardensbythebay.com.sg/en/things-to-do/attractions/active-garden.html',
    highlights: [
      'Outdoor fitness zone and interactive musical percussion stations',
      'Waterfront jogging promenade facing the Singapore Flyer',
      'Pet-friendly café Mylo’s with artisanal homemade gelato'
    ],
    visitorTips: [
      'Great pit stop for gelato and a relaxed walk along the waterfront.',
      'Water coolers and pet hydration stations are available.'
    ],
    nearestStation: 'Gardens by the Bay MRT (TE22)',
    accessibility: ['Barrier-Free Paved Walkways'],
    nearbyAttractionIds: ['kingfisher-wetlands', 'children-garden', 'heritage-gardens']
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'fac-mrt-te22',
    name: 'Gardens by the Bay MRT (TE22)',
    type: 'mrt',
    typeLabel: 'MRT Station',
    description: 'Thomson-East Coast Line Station (Exit 1). The closest train station to Flower Dome and Cloud Forest (3-minute walk).',
    hours: 'First train ~5:45 AM, Last train ~11:45 PM',
    coordinates: { x: 95.0, y: 66.5 },
    tips: 'Take Exit 1 for direct underground escalator and ramp access to the Visitor Centre and Conservatories.'
  },
  {
    id: 'fac-visitor-centre',
    name: 'Main Visitor Centre & Ticketing',
    type: 'visitor-centre',
    typeLabel: 'Visitor Services',
    description: 'Customer service counters, ticket purchase and redemption, stroller and wheelchair rentals, luggage storage, and park maps.',
    hours: 'Daily: 9:00 AM – 8:30 PM',
    coordinates: { x: 65.5, y: 69.5 },
    tips: 'Complimentary park maps in English, Mandarin, Japanese, and Korean. Automated ticketing kiosks available.'
  },
  {
    id: 'fac-taxi-dropoff',
    name: 'Main Taxi & Ride-Hailing Drop-Off',
    type: 'parking',
    typeLabel: 'Transport Hub',
    description: 'Primary vehicular drop-off sheltered porch and taxi pick-up rank outside the Main Visitor Centre.',
    hours: '24 Hours Daily',
    coordinates: { x: 71.0, y: 81.0 },
    tips: 'Key pick-up destination for Grab / Gojek / Taxi bookings. Sheltered during tropical rain.'
  },
  {
    id: 'fac-shuttle-bayfront',
    name: 'Park Shuttle Service Hub',
    type: 'shuttle',
    typeLabel: 'Electric Shuttle',
    description: 'Eco-friendly electric shuttle operating between Bayfront Plaza (MRT DT16/CE1) and the Cooled Conservatories.',
    hours: 'Daily: 9:00 AM – 9:00 PM (Every 10 minutes)',
    coordinates: { x: 44.0, y: 45.0 },
    tips: 'SGD 3 for unlimited rides all day. Free for children under 0.9m and wheelchair passengers.'
  },
  {
    id: 'fac-the-canopy',
    name: 'The Canopy F&B & Dining Hub',
    type: 'dining',
    typeLabel: 'Dining & Refreshments',
    description: 'Sheltered dining hub between the two domes featuring Shake Shack, Starbucks, Jurassic Nest food hall, and local delicacies.',
    hours: 'Daily: 10:00 AM – 10:00 PM',
    coordinates: { x: 73.0, y: 30.0 },
    tips: 'Air-conditioned dining options and restrooms located right outside Flower Dome.'
  }
];

export const CURATED_ITINERARIES: CuratedItinerary[] = [
  {
    id: 'itin-icon-1hr',
    title: 'The Icon Express',
    targetAudience: 'First-time visitors with limited time',
    durationLabel: '1 Hour',
    totalMinutes: 65,
    description: 'Experience Singapore’s two most world-famous architectural marvels: the majestic Flower Dome and towering Supertrees.',
    recommendedTime: 'Morning (10:00 AM) or Golden Hour (5:30 PM)',
    attractionIds: ['flower-dome', 'supertree-grove'],
    stopsCount: 2,
    badge: 'Express'
  },
  {
    id: 'itin-wonder-2hr',
    title: 'The Wonders of Nature',
    targetAudience: 'Couples & Nature Enthusiasts',
    durationLabel: '2 Hours',
    totalMinutes: 125,
    description: 'Immerse yourself in both cooled biomes and stroll 22 meters above ground on the OCBC Skyway suspension bridge.',
    recommendedTime: 'Late Afternoon (3:30 PM – 5:30 PM)',
    attractionIds: ['flower-dome', 'cloud-forest', 'ocbc-skyway'],
    stopsCount: 3,
    badge: 'Popular'
  },
  {
    id: 'itin-full-3hr',
    title: 'Ultimate Bay Experience',
    targetAudience: 'Comprehensive visitors wanting the best of all biomes',
    durationLabel: '3 Hours',
    totalMinutes: 180,
    description: 'Complete tour spanning Floral Fantasy, Cloud Forest misty mountain, Flower Dome floral displays, and the Supertree Observatory.',
    recommendedTime: 'Start at 2:30 PM to catch sunset and evening lights',
    attractionIds: ['floral-fantasy', 'flower-dome', 'cloud-forest', 'supertree-observatory', 'supertree-grove'],
    stopsCount: 5,
    badge: 'Signature'
  },
  {
    id: 'itin-family-fun',
    title: 'Family & Kids Adventure',
    targetAudience: 'Families with young children & toddlers',
    durationLabel: '2.5 Hours',
    totalMinutes: 150,
    description: 'Interactive water play, misty mountain waterfalls, and scenic lakeside boardwalks with otter and bird spotting.',
    recommendedTime: 'Thursday to Sunday mornings (9:30 AM)',
    attractionIds: ['children-garden', 'cloud-forest', 'dragonfly-lake'],
    stopsCount: 3,
    badge: 'Family Friendly'
  },
  {
    id: 'itin-night-photo',
    title: 'Twilight & Night Photography',
    targetAudience: 'Photographers & Evening Explorers',
    durationLabel: '2 Hours',
    totalMinutes: 120,
    description: 'Capture the golden hour over Marina Bay, witness the 7:45 PM Garden Rhapsody light show, and capture illuminated Supertree reflections.',
    recommendedTime: 'Evening (6:30 PM – 8:30 PM)',
    attractionIds: ['supertree-observatory', 'supertree-grove', 'dragonfly-lake'],
    stopsCount: 3,
    badge: 'Evening Magic'
  }
];

export const GARDENS_QUICK_STATS = [
  { value: '101', unit: 'Hectares', label: 'Lush Botanical Parkland' },
  { value: '1.5M+', unit: 'Plants', label: 'From 5 Global Continents' },
  { value: '18', unit: 'Supertrees', label: 'Vertical Living Gardens' },
  { value: '3', unit: 'Cooled Biomes', label: 'World Record Conservatories' }
];

export const GENERAL_VISITOR_INFO = {
  generalHours: 'Outdoor Gardens: 5:00 AM – 2:00 AM Daily (Free Access)',
  conservatoriesHours: 'Cooled Conservatories & Floral Fantasy: 9:00 AM – 9:00 PM (Last Entry 8:30 PM)',
  lightShowTimings: 'Garden Rhapsody: Daily at 7:45 PM and 8:45 PM (Supertree Grove, 15 Mins, Free Admission)',
  mrtLines: [
    {
      station: 'Gardens by the Bay MRT (TE22)',
      line: 'Thomson-East Coast Line',
      exit: 'Exit 1',
      convenience: 'Directly at Flower Dome & Visitor Centre (3-min walk)'
    },
    {
      station: 'Bayfront MRT (CE1 / DT16)',
      line: 'Circle & Downtown Lines',
      exit: 'Exit B',
      convenience: 'Directly at Floral Fantasy and Dragonfly Bridge walkway'
    }
  ],
  parkingLots: [
    { name: 'Main Entrance Car Park', spaces: '420 Lots + 6 EV Charging bays', rate: 'SGD 0.035/min (1st 2 hours)' },
    { name: 'The Meadow Car Park', spaces: '300 Lots', rate: 'SGD 0.035/min' },
    { name: 'Bayfront Plaza Car Park', spaces: '250 Lots', rate: 'SGD 0.035/min' }
  ],
  accessibilityServices: [
    'Complimentary wheelchair loans at Main Visitor Centre (subject to availability)',
    'Sensory gardens with textured stone and aromatic tropical herbs',
    'Braille elevator panels and audio announcements inside Cloud Forest mountain lift',
    '100% barrier-free paved paths between all major attractions'
  ]
};
