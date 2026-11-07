export type SupportedLanguage = 'en' | 'zh' | 'ms' | 'ta';

export interface TranslationDictionary {
  appName: string;
  nav: {
    explore: string;
    map: string;
    attractions: string;
    itinerary: string;
    info: string;
    kiosk: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    btnMap: string;
    btnPlan: string;
    btnKiosk: string;
  };
  stats: {
    hectaresLabel: string;
    plantsLabel: string;
    supertreesLabel: string;
    biomesLabel: string;
    biomesUnit: string;
  };
  map: {
    searchPlaceholder: string;
    allHighlights: string;
    conservatories: string;
    supertrees: string;
    outdoorGardens: string;
    lakes: string;
    family: string;
    amenities: string;
    route: string;
    legendTitle: string;
    dragHint: string;
  };
  drawer: {
    hours: string;
    admission: string;
    duration: string;
    temperature: string;
    aboutTitle: string;
    highlightsTitle: string;
    tipsTitle: string;
    nearestArrival: string;
    accessibility: string;
    nearbyNext: string;
    officialPage: string;
    inItinerary: string;
    addToItinerary: string;
    pinOnMap: string;
    close: string;
    audioTour: string;
  };
  kiosk: {
    terminalTitle: string;
    quickDirections: string;
    touchToLocate: string;
    takeOnMobile: string;
    scanWithCamera: string;
    scanHint: string;
    exitKiosk: string;
    idleTitle: string;
    idleText: string;
    continueExploring: string;
  };
  attractionNames: Record<string, { name: string; subtitle: string; categoryLabel: string }>;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'Gardens by the Bay',
    nav: {
      explore: 'Explore',
      map: 'Interactive Map',
      attractions: 'Attractions',
      itinerary: 'Plan Visit',
      info: 'Visitor Info',
      kiosk: 'Kiosk Mode'
    },
    hero: {
      badge: "Singapore's Premier Horticultural Destination",
      title: 'Where Wonders Bloom in Botanical Architecture',
      subtitle: 'Immerse yourself in world-record glass conservatories, a 35-metre misty mountain waterfall, and towering vertical Supertrees. Plan your journey with an interactive illustrated map and continue seamlessly on your smartphone.',
      btnMap: 'Launch Interactive Map',
      btnPlan: 'Curate Visit Itinerary',
      btnKiosk: 'Kiosk Terminal Mode'
    },
    stats: {
      hectaresLabel: 'Lush Botanical Parkland',
      plantsLabel: 'From 5 Global Continents',
      supertreesLabel: '18 Supertrees across park (12 in Grove)',
      biomesLabel: 'Cooled Glass Conservatories',
      biomesUnit: 'Conservatories'
    },
    map: {
      searchPlaceholder: 'Search biomes, lakes, MRT...',
      allHighlights: 'All Highlights',
      conservatories: 'Conservatories',
      supertrees: 'Supertrees',
      outdoorGardens: 'Outdoor Gardens',
      lakes: 'Lakes & Nature',
      family: 'Family',
      amenities: 'Amenities',
      route: 'Route',
      legendTitle: 'Map Legend',
      dragHint: 'Drag to pan · Scroll or pinch to zoom'
    },
    drawer: {
      hours: 'Hours',
      admission: 'Admission',
      duration: 'Duration',
      temperature: 'Climate',
      aboutTitle: 'About this Experience',
      highlightsTitle: 'Curated Highlights',
      tipsTitle: 'Insider Visitor Tips',
      nearestArrival: 'Nearest Arrival',
      accessibility: 'Accessibility',
      nearbyNext: 'Nearby Next Stops',
      officialPage: 'Official Gardens by the Bay Page',
      inItinerary: 'In Your Itinerary',
      addToItinerary: 'Add to My Visit Itinerary',
      pinOnMap: 'Pin on Map',
      close: 'Close',
      audioTour: 'Botanical Audio Companion'
    },
    kiosk: {
      terminalTitle: 'Gardens by the Bay Touch Concierge',
      quickDirections: '1-Touch Quick Directions',
      touchToLocate: 'Touch to Locate',
      takeOnMobile: 'Take Map On Mobile',
      scanWithCamera: 'Scan With Phone Camera',
      scanHint: 'Continue with live walking directions, audio guides, and opening hours directly on your smartphone.',
      exitKiosk: 'Exit Kiosk Mode',
      idleTitle: 'Still using this kiosk?',
      idleText: 'The screen will reset for the next visitor shortly. Touch anywhere to keep exploring.',
      continueExploring: 'Continue Exploring'
    },
    attractionNames: {
      'flower-dome': { name: 'Flower Dome', subtitle: 'The World’s Largest Glass Greenhouse', categoryLabel: 'Cooled Conservatory' },
      'cloud-forest': { name: 'Cloud Forest', subtitle: 'A Misty 35-Metre Mountain & Indoor Waterfall', categoryLabel: 'Cooled Conservatory' },
      'supertree-grove': { name: 'Supertree Grove', subtitle: 'Futuristic Vertical Gardens & Light Spectacle', categoryLabel: 'Supertree & Aerial' },
      'ocbc-skyway': { name: 'OCBC Skyway', subtitle: 'Suspended Aerial Walkway 22 Metres Above Ground', categoryLabel: 'Supertree & Aerial' },
      'supertree-observatory': { name: 'Supertree Observatory', subtitle: 'Singapore’s Highest 360° Garden Lookout', categoryLabel: 'Supertree & Aerial' },
      'floral-fantasy': { name: 'Floral Fantasy', subtitle: 'Whimsical Floral Art & 4D Flight Ride', categoryLabel: 'Floral Attraction' },
      'heritage-gardens': { name: 'Heritage Gardens', subtitle: 'Singapore’s Multi-Cultural Botanical Tapestry', categoryLabel: 'Outdoor Garden' },
      'dragonfly-lake': { name: 'Dragonfly & Kingfisher Lakes', subtitle: 'Living Eco-Lake & 440-Metre Scenic Boardwalk', categoryLabel: 'Lakes & Nature' },
      'children-garden': { name: 'Far East Organization Children’s Garden', subtitle: 'Water Play Splashes & Rainforest Treehouses', categoryLabel: 'Family & Recreation' },
      'serene-garden': { name: 'Serene Garden', subtitle: 'Japanese Zen-Inspired Contemplative Sanctuary', categoryLabel: 'Outdoor Garden' },
      'the-meadow': { name: 'The Meadow', subtitle: 'Singapore’s Largest Outdoor Concert & Event Bowl', categoryLabel: 'Family & Recreation' },
      'sun-pavilion': { name: 'Sun Pavilion', subtitle: 'Dramatic Desert Cacti & Succulent Sanctuary', categoryLabel: 'Outdoor Garden' },
      'kingfisher-wetlands': { name: 'Kingfisher Wetlands', subtitle: 'Freshwater Eco-Sanctuary & Bird Watching', categoryLabel: 'Lakes & Nature' },
      'golden-garden': { name: 'Golden Garden', subtitle: 'Grand Arrival Supertrees & Botanical Plaza', categoryLabel: 'Outdoor Garden' },
      'active-garden': { name: 'Active Garden', subtitle: 'Community Wellness Lawn & Waterfront Promenade', categoryLabel: 'Family & Recreation' }
    }
  },

  zh: {
    appName: '滨海湾花园',
    nav: {
      explore: '探索花园',
      map: '互动手绘地图',
      attractions: '景点大全',
      itinerary: '规划行程',
      info: '访客指南',
      kiosk: '触摸导览终端'
    },
    hero: {
      badge: '新加坡顶级园艺旅游胜地',
      title: '植物建筑与自然奇观的绽放之地',
      subtitle: '沉浸于世界吉尼斯纪录玻璃冷室、35米室内雾气瀑布与擎天大树。使用交互手绘地图规划路线，并可通过手机扫码随时继续导览。',
      btnMap: '开启互动地图',
      btnPlan: '定制游园行程',
      btnKiosk: '启动展厅终端模式'
    },
    stats: {
      hectaresLabel: '郁郁葱葱的热带植物公园',
      plantsLabel: '涵盖全球五大洲特色植被',
      supertreesLabel: '全园共18棵擎天树（树丛区12棵）',
      biomesLabel: '两大世界级玻璃冷室',
      biomesUnit: '大冷室'
    },
    map: {
      searchPlaceholder: '搜索冷室、湖泊、地铁站...',
      allHighlights: '全部亮点',
      conservatories: '冷室',
      supertrees: '擎天树与空中步道',
      outdoorGardens: '户外花园',
      lakes: '湖泊生态',
      family: '亲子游乐',
      amenities: '便利设施',
      route: '路线规划',
      legendTitle: '地图图例',
      dragHint: '拖动平移 · 双指或滚轮缩放'
    },
    drawer: {
      hours: '开放时间',
      admission: '门票信息',
      duration: '建议游览时间',
      temperature: '恒温环境',
      aboutTitle: '体验介绍',
      highlightsTitle: '精选亮点',
      tipsTitle: '贴心访客贴士',
      nearestArrival: '最近抵步站点',
      accessibility: '无障碍设施',
      nearbyNext: '附近推荐下一站',
      officialPage: '滨海湾花园官方页面',
      inItinerary: '已加入您的行程',
      addToItinerary: '加入游览路线',
      pinOnMap: '在地图上查看',
      close: '关闭',
      audioTour: '植物园林语音伴侣'
    },
    kiosk: {
      terminalTitle: '滨海湾花园触控智能导览台',
      quickDirections: '一键即达热门景点',
      touchToLocate: '点击定位',
      takeOnMobile: '带到手机上游览',
      scanWithCamera: '使用手机相机扫码',
      scanHint: '无需安装应用，即可在您的手机上直接获取实时路线指引、语音讲解与开放时间。',
      exitKiosk: '退出终端模式',
      idleTitle: '您还在使用此导览台吗？',
      idleText: '屏幕即将自动复位供下一位访客使用。点击任意处继续操作。',
      continueExploring: '继续浏览'
    },
    attractionNames: {
      'flower-dome': { name: '花穹', subtitle: '全球最大的无柱玻璃温室冷室', categoryLabel: '玻璃冷室' },
      'cloud-forest': { name: '云雾林', subtitle: '35米室内飞瀑与神秘山丘', categoryLabel: '玻璃冷室' },
      'supertree-grove': { name: '擎天树丛', subtitle: '未来主义垂直花园与音乐灯光秀', categoryLabel: '擎天树与高空' },
      'ocbc-skyway': { name: '华侨银行空中走道', subtitle: '悬挂于22米高空的空中步道', categoryLabel: '擎天树与高空' },
      'supertree-observatory': { name: '擎天树观景台', subtitle: '新加坡最高360度花园景观台', categoryLabel: '擎天树与高空' },
      'floral-fantasy': { name: '奇幻花海', subtitle: '梦幻倒悬花束艺术与4D飞行体验', categoryLabel: '花艺体验展' },
      'heritage-gardens': { name: '文化遗产花园', subtitle: '展现新加坡多元民族历史的植物织锦', categoryLabel: '户外花园' },
      'dragonfly-lake': { name: '蜻蜓湖与翠鸟湖', subtitle: '生态活水湖泊与440米观景栈道', categoryLabel: '湖泊生态' },
      'children-garden': { name: '远东机构儿童乐园', subtitle: '互动戏水喷泉与热带雨林树屋', categoryLabel: '亲子休闲' },
      'serene-garden': { name: '静谧花园', subtitle: '受日式禅宗启发的冥想沉思园林', categoryLabel: '户外花园' },
      'the-meadow': { name: '大草场', subtitle: '新加坡最大的户外自然草坪活动区', categoryLabel: '亲子休闲' },
      'sun-pavilion': { name: '阳光亭', subtitle: '沙漠仙人掌与多肉植物奇观', categoryLabel: '户外花园' },
      'kingfisher-wetlands': { name: '翠鸟湿地', subtitle: '淡水生态庇护所与红树林观鸟点', categoryLabel: '湖泊生态' },
      'golden-garden': { name: '金花园', subtitle: '宏伟迎宾擎天树与金色花卉广场', categoryLabel: '户外花园' },
      'active-garden': { name: '动感花园', subtitle: '社区活力健身草坪与滨水步道', categoryLabel: '亲子休闲' }
    }
  },

  ms: {
    appName: 'Gardens by the Bay',
    nav: {
      explore: 'Terokai',
      map: 'Peta Interaktif',
      attractions: 'Tarikan',
      itinerary: 'Rancang Lawatan',
      info: 'Info Pelawat',
      kiosk: 'Mod Kiosk'
    },
    hero: {
      badge: 'Destinasi Hortikultur Utama Singapura',
      title: 'Keajaiban Botani Berkembang dalam Seni Bina',
      subtitle: 'Alami konservatori kaca bertaraf dunia, air terjun setinggi 35 meter, dan Supertree gergasi. Rancang laluan anda dengan peta bergambar interaktif dan teruskan dengan mudah di telefon pintar anda.',
      btnMap: 'Buka Peta Interaktif',
      btnPlan: 'Rancang Jadual Perjalanan',
      btnKiosk: 'Mod Terminal Kiosk'
    },
    stats: {
      hectaresLabel: 'Taman Botani Tropika Subur',
      plantsLabel: 'Dari 5 Benua Seluruh Dunia',
      supertreesLabel: '18 Supertree di seluruh taman (12 di Grove)',
      biomesLabel: 'Dua Konservatori Kaca Sejuk',
      biomesUnit: 'Konservatori'
    },
    map: {
      searchPlaceholder: 'Cari kubah, tasik, stesen MRT...',
      allHighlights: 'Semua Sorotan',
      conservatories: 'Konservatori Sejuk',
      supertrees: 'Supertree & Laluan Udara',
      outdoorGardens: 'Taman Terbuka',
      lakes: 'Tasik & Alam Semula Jadi',
      family: 'Keluarga',
      amenities: 'Kemudahan',
      route: 'Laluan',
      legendTitle: 'Petunjuk Peta',
      dragHint: 'Seret untuk geser · Skrol atau cubit untuk zum'
    },
    drawer: {
      hours: 'Waktu Operasi',
      admission: 'Kemasukan',
      duration: 'Tempoh Disyorkan',
      temperature: 'Suhu Nyaman',
      aboutTitle: 'Mengenai Tarikan Ini',
      highlightsTitle: 'Sorotan Utama',
      tipsTitle: 'Petua Pelawat',
      nearestArrival: 'Ketibaan Terdekat',
      accessibility: 'Kebolehcapaian',
      nearbyNext: 'Hentian Seterusnya',
      officialPage: 'Laman Rasmi Gardens by the Bay',
      inItinerary: 'Dalam Jadual Anda',
      addToItinerary: 'Tambah ke Jadual Lawatan',
      pinOnMap: 'Lihat Pada Peta',
      close: 'Tutup',
      audioTour: 'Panduan Audio Botani'
    },
    kiosk: {
      terminalTitle: 'Terminal Sentuh Gardens by the Bay',
      quickDirections: '1-Sentuhan Arah Pantas',
      touchToLocate: 'Sentuh untuk Cari',
      takeOnMobile: 'Bawa Peta di Telefon',
      scanWithCamera: 'Imbas Dengan Kamera Telefon',
      scanHint: 'Teruskan perjalanan dengan arah langsung, panduan audio dan waktu operasi di telefon anda tanpa memuat turun aplikasi.',
      exitKiosk: 'Keluar Mod Kiosk',
      idleTitle: 'Masih menggunakan kiosk ini?',
      idleText: 'Skrin akan ditetapkan semula tidak lama lagi. Sentuh di mana-mana untuk meneruskan.',
      continueExploring: 'Teruskan Meneroka'
    },
    attractionNames: {
      'flower-dome': { name: 'Kubah Bunga (Flower Dome)', subtitle: 'Konservatori Kaca Terbesar di Dunia', categoryLabel: 'Konservatori Sejuk' },
      'cloud-forest': { name: 'Hutan Awan (Cloud Forest)', subtitle: 'Gunung Berkabus 35-Meter & Air Terjun Dalaman', categoryLabel: 'Konservatori Sejuk' },
      'supertree-grove': { name: 'Supertree Grove', subtitle: 'Taman Menegak Futuristik & Pertunjukan Cahaya', categoryLabel: 'Supertree' },
      'ocbc-skyway': { name: 'OCBC Skyway', subtitle: 'Laluan Gantung 22 Meter di Udara', categoryLabel: 'Supertree' },
      'supertree-observatory': { name: 'Supertree Observatory', subtitle: 'Pemandangan 360° Tertinggi Taman', categoryLabel: 'Supertree' },
      'floral-fantasy': { name: 'Floral Fantasy', subtitle: 'Seni Bunga Tergantung & Penerbangan 4D', categoryLabel: 'Tarikan Bunga' },
      'heritage-gardens': { name: 'Taman Warisan', subtitle: 'Warisan Pelbagai Budaya Melayu, Cina, India & Kolonial', categoryLabel: 'Taman Terbuka' },
      'dragonfly-lake': { name: 'Tasik Pepatung & Tasik Pekaka', subtitle: 'Tasik Ekologi Hidup & Laluan Papan 440m', categoryLabel: 'Tasik & Alam' },
      'children-garden': { name: 'Taman Kanak-kanak Far East Organization', subtitle: 'Permainan Air & Rumah Pokok Hutan Hujan', categoryLabel: 'Keluarga & Kanak-kanak' },
      'serene-garden': { name: 'Taman Ketenangan (Serene Garden)', subtitle: 'Taman Zen Jepun untuk Kontemplasi', categoryLabel: 'Taman Terbuka' },
      'the-meadow': { name: 'The Meadow', subtitle: 'Padang Acara Luaran Terbesar di Singapura', categoryLabel: 'Keluarga & Rekreasi' },
      'sun-pavilion': { name: 'Pavilion Matahari (Sun Pavilion)', subtitle: 'Kaktus Gurun & Tumbuhan Sukulen Hebat', categoryLabel: 'Taman Terbuka' },
      'kingfisher-wetlands': { name: 'Tanah Lembap Kingfisher', subtitle: 'Santuari Ekologi Air Tawar & Memerhati Burung', categoryLabel: 'Tasik & Alam' },
      'golden-garden': { name: 'Taman Emas (Golden Garden)', subtitle: 'Supertree Ketibaan & Plaza Botani', categoryLabel: 'Taman Terbuka' },
      'active-garden': { name: 'Active Garden', subtitle: 'Kawasan Kesihatan Komuniti & Laluan Tepi Air', categoryLabel: 'Keluarga & Rekreasi' }
    }
  },

  ta: {
    appName: 'கார்டன்ஸ் பை தி பே',
    nav: {
      explore: 'ஆராய்க',
      map: 'வரைபடம்',
      attractions: 'ஈர்ப்புகள்',
      itinerary: 'பயணத் திட்டம்',
      info: 'வழிகாட்டி',
      kiosk: 'தொடுதிரை முறை'
    },
    hero: {
      badge: 'சிங்கப்பூரின் முதன்மையான தாவரவியல் தளம்',
      title: 'இயற்கை எழிலும் கட்டடக் கலையும் இணையும் இடம்',
      subtitle: 'உலக சாதனை படைத்த கண்ணாடி தாவரக் காப்பகங்கள், 35 மீட்டர் உயர உட்புற நீர்வீழ்ச்சி மற்றும் கம்பீர சூப்பர்ட்ரீ மரங்களை கண்டு களியுங்கள்.',
      btnMap: 'ஊடாடும் வரைபடத்தை திறக்க',
      btnPlan: 'பயணத் திட்டத்தை அமைத்தல்',
      btnKiosk: 'தொடுதிரை முறை'
    },
    stats: {
      hectaresLabel: 'செழுமையான தாவரவியல் பூங்கா',
      plantsLabel: 'உலகளாவிய 5 கண்டங்களின் தாவரங்கள்',
      supertreesLabel: '18 சூப்பர்ட்ரீ மரங்கள் (தோப்பில் 12)',
      biomesLabel: 'இரண்டு குளிரூட்டப்பட்ட காப்பகங்கள்',
      biomesUnit: 'காப்பகங்கள்'
    },
    map: {
      searchPlaceholder: 'காப்பகங்கள், ஏரிகள், ரயில் நிலையம் தேடுக...',
      allHighlights: 'அனைத்து இடங்கள்',
      conservatories: 'குளிரூட்டப்பட்ட காப்பகம்',
      supertrees: 'சூப்பர்ட்ரீ & வான்பாதை',
      outdoorGardens: 'வெளிப்புற தோட்டங்கள்',
      lakes: 'ஏரிகள் & இயற்கை',
      family: 'குடும்பம்',
      amenities: 'வசதிகள்',
      route: 'பயணப் பாதை',
      legendTitle: 'வரைபட வழிகாட்டி',
      dragHint: 'நகர்த்த இழுக்கவும் · பெரிதாக்க சுருக்கவும்'
    },
    drawer: {
      hours: 'நேரம்',
      admission: 'நுழைவுக்கட்டணம்',
      duration: 'பரிந்துரைக்கப்படும் நேரம்',
      temperature: 'காலநிலை',
      aboutTitle: 'இந்த இடம் பற்றி',
      highlightsTitle: 'முக்கிய சிறப்பம்சங்கள்',
      tipsTitle: 'பயனுள்ள குறிப்புகள்',
      nearestArrival: 'அருகிலுள்ள நிலையம்',
      accessibility: 'அணுகல்தன்மை',
      nearbyNext: 'அடுத்த அருகிலுள்ள இடங்கள்',
      officialPage: 'அதிகாரப்பூர்வ தளம்',
      inItinerary: 'திட்டத்தில் உள்ளது',
      addToItinerary: 'திட்டத்தில் சேர்க்க',
      pinOnMap: 'வரைபடத்தில் பார்க்க',
      close: 'மூடுக',
      audioTour: 'ஒலி வழிகாட்டி'
    },
    kiosk: {
      terminalTitle: 'கார்டன்ஸ் பை தி பே தொடுதிரை வழிகாட்டி',
      quickDirections: 'விரைவு வழிகாட்டல்',
      touchToLocate: 'தொட்டு கண்டறியவும்',
      takeOnMobile: 'மொபைலில் வரைபடம்',
      scanWithCamera: 'தொலைபேசி கேமராவால் ஸ்கேன் செய்க',
      scanHint: 'செயலி பதிவிறக்கம் இன்றி உங்கள் தொலைபேசியிலேயே வழிகாட்டுதலையும் நேரங்களையும் பெறலாம்.',
      exitKiosk: 'வெளியேறு',
      idleTitle: 'இன்னும் பயன்படுத்துகிறீர்களா?',
      idleText: 'அடுத்தவருக்காக திரை விரைவில் மீட்டமைக்கப்படும். தொடர தொடவும்.',
      continueExploring: 'தொடர்ந்து பார்க்க'
    },
    attractionNames: {
      'flower-dome': { name: 'மலர்க் குவிமாடம் (Flower Dome)', subtitle: 'உலகின் மிகப்பெரிய கண்ணாடி பசுமைக்குடில்', categoryLabel: 'குளிரூட்டப்பட்ட காப்பகம்' },
      'cloud-forest': { name: 'மேகக் காடு (Cloud Forest)', subtitle: '35 மீட்டர் மூடுபனி மலை & நீர்வீழ்ச்சி', categoryLabel: 'குளிரூட்டப்பட்ட காப்பகம்' },
      'supertree-grove': { name: 'சூப்பர்ட்ரீ தோப்பு (Supertree Grove)', subtitle: 'செங்குத்து தோட்டங்கள் & ஒளி நிகழ்ச்சி', categoryLabel: 'சூப்பர்ட்ரீ' },
      'ocbc-skyway': { name: 'OCBC ஸ்கைவே (Skyway)', subtitle: '22 மீட்டர் உயரத்தில் அமைந்துள்ள வான்பாதை', categoryLabel: 'சூப்பர்ட்ரீ' },
      'supertree-observatory': { name: 'சூப்பர்ட்ரீ வானாய்வகம்', subtitle: 'சிங்கப்பூரின் மிக உயரமான 360° காட்சி தளம்', categoryLabel: 'சூப்பர்ட்ரீ' },
      'floral-fantasy': { name: 'மலர் கனவுலகம் (Floral Fantasy)', subtitle: 'தொங்கும் மலர்க் கலை & 4D சவாரி', categoryLabel: 'மலர் ஈர்ப்பு' },
      'heritage-gardens': { name: 'பாரம்பரியத் தோட்டங்கள்', subtitle: 'இந்திய, மலாய், சீன மற்றும் காலனித்துவ மரபுகள்', categoryLabel: 'வெளிப்புற தோட்டம்' },
      'dragonfly-lake': { name: 'தும்பி ஏரி & மீன்கொத்தி ஏரி', subtitle: 'இயற்கை நீர்நிலை & 440 மீட்டர் நடைபாதை', categoryLabel: 'ஏரிகள் & இயற்கை' },
      'children-garden': { name: 'ஃபார் ஈஸ்ட் சிறுவர் தோட்டம்', subtitle: 'நீர் விளையாட்டு & மர வீடுகள்', categoryLabel: 'குடும்பம்' },
      'serene-garden': { name: 'அமைதித் தோட்டம் (Serene Garden)', subtitle: 'ஜப்பானிய ஜென் பாணி தியான பூங்கா', categoryLabel: 'வெளிப்புற தோட்டம்' },
      'the-meadow': { name: 'தி மெடோ (The Meadow)', subtitle: 'சிங்கப்பூரின் மிகப்பெரிய வெளிப்புற புல்வெளி', categoryLabel: 'குடும்பம்' },
      'sun-pavilion': { name: 'சூரிய மண்டபம் (Sun Pavilion)', subtitle: 'பாலைவன கற்றாழை & சதைப்பற்றுள்ள தாவரங்கள்', categoryLabel: 'வெளிப்புற தோட்டம்' },
      'kingfisher-wetlands': { name: 'மீன்கொத்தி சதுப்பு நிலம்', subtitle: 'நன்னீர் காப்பகம் & பறவை நோக்குமிடம்', categoryLabel: 'ஏரிகள் & இயற்கை' },
      'golden-garden': { name: 'தங்கத் தோட்டம் (Golden Garden)', subtitle: 'வருகை தரும் சூப்பர்ட்ரீ வளாகம்', categoryLabel: 'வெளிப்புற தோட்டம்' },
      'active-garden': { name: 'ஆரோக்கிய பூங்கா (Active Garden)', subtitle: 'சமூக உடற்பயிற்சி தளம் & நீர்முனை', categoryLabel: 'குடும்பம்' }
    }
  }
};
