import type { Product } from '../types/product';

export const products: Product[] = [
  // Trending Flagships
  {
    id: 'phone-1',
    name: 'iPhone 16 Pro Max',
    nameAr: 'آيفون 16 برو ماكس',
    brand: 'Apple',
    category: 'Apple iPhone',
    categoryAr: 'آبل آيفون',
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviewCount: '2.4k',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=700&q=85'
    ],
    description: 'The definitive Apple flagship featuring Grade 5 Titanium finish, 6.9-inch Super Retina XDR ProMotion display, cutting-edge A18 Pro Bionic chip, and Camera Control with 5x telephoto optical zoom.',
    descriptionAr: 'الهاتف الرائد الأقوى من آبل بتصميم من التيتانيوم خفيف الوزن، شاشة 6.9 إنش Super Retina XDR مع ProMotion، معالج A18 Pro الخارق، وزر التحكم بالكاميرا الاحترافي وتقريب بصري 5x.',
    features: [
      '6.9" Super Retina XDR with Always-On',
      'Apple A18 Pro 3nm Silicon Chip',
      '48MP Fusion Camera + 5x Telephoto',
      'Titanium frame with Ceramic Shield'
    ],
    featuresAr: [
      'شاشة 6.9 بوصة Super Retina XDR مع تشغيل دائم',
      'معالج Apple A18 Pro بمعمارية 3 نانومتر',
      'كاميرا رئيسية 48 ميجابكسل مع تقريب بصري 5x',
      'هيكل تيتانيوم صلب مع زجاج Ceramic Shield'
    ],
    colors: [
      { name: 'Desert Titanium', nameAr: 'تيتانيوم صحراوي', hex: '#C5A98B' },
      { name: 'Natural Titanium', nameAr: 'تيتانيوم طبيعي', hex: '#9E9A93' },
      { name: 'White Titanium', nameAr: 'تيتانيوم أبيض', hex: '#F2F1ED' },
      { name: 'Black Titanium', nameAr: 'تيتانيوم أسود', hex: '#3B3B3D' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 200 },
      { size: '1TB', priceDelta: 450 }
    ],
    specs: {
      display: '6.9" OLED Super Retina XDR, 120Hz ProMotion',
      processor: 'Apple A18 Pro (6-core CPU, 6-core GPU, 16-core NPU)',
      camera: 'Triple: 48MP Wide + 48MP Ultra-wide + 12MP 5x Telephoto',
      battery: 'Up to 33h video playback, MagSafe 25W fast charge',
      os: 'iOS 18 with Apple Intelligence'
    },
    inStock: true,
    section: 'trending'
  },
  {
    id: 'phone-2',
    name: 'Samsung Galaxy S25 Ultra',
    nameAr: 'سامسونج جالاكسي S25 الترا',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    categoryAr: 'سامسونج جالاكسي',
    price: 1249.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviewCount: '1.8k',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=85'
    ],
    description: 'Samsung ultimate powerhouse equipped with Snapdragon 8 Elite, 200MP Quad-Tele camera system, built-in S-Pen, anti-reflective Corning Gorilla Armor, and complete Galaxy AI suite.',
    descriptionAr: 'وحش سامسونج المتكامل بمعالج Snapdragon 8 Elite الأسرع بالعالم، كاميرا 200 ميجابكسل خارقة، قلم S-Pen مدمج، شاشة مسطحة بزجاج مانع للانعكاس، وميزات الذكاء الاصطناعي Galaxy AI.',
    features: [
      '6.8" Dynamic AMOLED 2X, 1-120Hz QHD+',
      'Snapdragon 8 Elite for Galaxy (3nm)',
      '200MP Main + 50MP 5x Periscope + S-Pen',
      '5000 mAh battery with 45W Fast Charging'
    ],
    featuresAr: [
      'شاشة 6.8 بوصة Dynamic AMOLED 2X بدقة QHD+',
      'معالج Snapdragon 8 Elite المخصص لجالاكسي',
      'كاميرا 200 ميجابكسل مع تقريب بصري خارق وقلم S-Pen',
      'بطارية 5000 مللي أمبير مع شحن فائق السرعة 45 واط'
    ],
    colors: [
      { name: 'Titanium Black', nameAr: 'تيتانيوم أسود', hex: '#26272B' },
      { name: 'Titanium Gray', nameAr: 'تيتانيوم رمادي', hex: '#77787B' },
      { name: 'Titanium Silver', nameAr: 'تيتانيوم فضي', hex: '#D7D9DC' },
      { name: 'Titanium Blue', nameAr: 'تيتانيوم أزرق', hex: '#687E96' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 180 },
      { size: '1TB', priceDelta: 400 }
    ],
    specs: {
      display: '6.8" Dynamic LTPO AMOLED 2X, 2600 nits',
      processor: 'Qualcomm Snapdragon 8 Elite (Octa-core 4.32 GHz)',
      camera: '200MP Wide + 50MP 5x Periscope + 10MP 3x Telephoto + 50MP Ultrawide',
      battery: '5000 mAh, 45W wired, 15W wireless',
      os: 'One UI 7 (Android 15) with 7 years OS updates'
    },
    inStock: true,
    section: 'trending'
  },
  {
    id: 'phone-3',
    name: 'Google Pixel 9 Pro',
    nameAr: 'جوجل بكسل 9 برو',
    brand: 'Google',
    category: 'Google Pixel',
    categoryAr: 'جوجل بكسل',
    price: 999.99,
    originalPrice: 1099.99,
    rating: 4.8,
    reviewCount: '1.2k',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85'
    ],
    description: 'Designed by Google with custom Tensor G4 chip, 16GB RAM for on-device Gemini Nano AI, iconic camera bar with 50MP sensor, and 7 years of instant Android Feature Drops.',
    descriptionAr: 'هاتف جوجل الأذكى عالمياً مع معالج Google Tensor G4، وذاكرة 16GB لتشغيل ذكاء Gemini الاصطناعي على الجهاز، أفضل كاميرا تصوير فوتوغرافي، وتحديثات نظام فورية لـ 7 سنوات.',
    features: [
      '6.3" Super Actua LTPO OLED (1-120Hz)',
      'Google Tensor G4 Chip with Titan M2 security',
      'Pro 50MP Triple Camera with 30x Super Res Zoom',
      'Built-in Gemini Advanced & Magic Editor'
    ],
    featuresAr: [
      'شاشة 6.3 بوصة Super Actua شديدة السطوع',
      'معالج Google Tensor G4 مع شريحة أمان Titan M2',
      'كاميرا ثلاثية احترافية 50 ميجابكسل مع تقريب فائق 30x',
      'مساعد الذكاء الاصطناعي Gemini Advanced المدمج'
    ],
    colors: [
      { name: 'Obsidian', nameAr: 'أسود بركاني', hex: '#2A2C2E' },
      { name: 'Porcelain', nameAr: 'خزفي ناصع', hex: '#EDEBE6' },
      { name: 'Hazel', nameAr: 'رمادي زيتي', hex: '#878C82' },
      { name: 'Rose', nameAr: 'وردي ناعم', hex: '#DEBDB8' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 100 },
      { size: '512GB', priceDelta: 250 }
    ],
    specs: {
      display: '6.3" LTPO OLED, 3000 nits peak brightness',
      processor: 'Google Tensor G4 (4nm) + 16GB LPDDR5X RAM',
      camera: '50MP Main + 48MP Ultrawide + 48MP 5x Telephoto',
      battery: '4700 mAh with Extreme Battery Saver up to 100 hours',
      os: 'Pure Android 15 with guaranteed updates till 2031'
    },
    inStock: true,
    section: 'trending'
  },
  {
    id: 'phone-4',
    name: 'Samsung Galaxy Z Fold 6',
    nameAr: 'سامسونج جالاكسي زد فولد 6',
    brand: 'Samsung',
    category: 'Foldable Phones',
    categoryAr: 'شاشات قابلة للطي',
    price: 1699.99,
    originalPrice: 1899.99,
    rating: 4.8,
    reviewCount: '920',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=700&q=85',
    description: 'Revolutionary ultra-thin foldable with 7.6-inch inner tablet display, enhanced dual-rail Armor Aluminum hinge, S-Pen compatibility, and multi-window productivity.',
    descriptionAr: 'الهاتف القابل للطي الأقوى والأنحف مع شاشة داخلية عملاقة 7.6 إنش بحجم تابلت، مفصلة متطورة غير مرئية، دعم قلم S-Pen، وإنتاجية استثنائية لتشغيل عدة تطبيقات معاً.',
    features: [
      '7.6" Main Foldable + 6.3" Cover AMOLED 120Hz',
      'Ultra-thin light folding design with IP48 rating',
      'Multi-window taskbar & S-Pen support',
      'Snapdragon 8 Gen 3 for Galaxy'
    ],
    featuresAr: [
      'شاشة داخلية 7.6 بوصة + شاشة خارجية 6.3 بوصة',
      'تصميم خفيف ونحيف مع مقاومة للماء والغبار IP48',
      'شريط مهام لفتح 3 تطبيقات معاً ودعم قلم S-Pen',
      'معالج فائق الأداء Snapdragon 8 Gen 3'
    ],
    colors: [
      { name: 'Silver Shadow', nameAr: 'فضي معدني', hex: '#B8BAC0' },
      { name: 'Navy', nameAr: 'أزرق كحلي', hex: '#273444' },
      { name: 'Pink', nameAr: 'وردي هادئ', hex: '#ECCCD3' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 160 },
      { size: '1TB', priceDelta: 380 }
    ],
    specs: {
      display: '7.6" QXGA+ Dynamic AMOLED 2X + 6.3" Cover AMOLED',
      processor: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      camera: '50MP Wide + 10MP 3x Telephoto + 12MP Ultrawide',
      battery: '4400 mAh dual-cell with 25W fast charge',
      os: 'Android 14 One UI 6.1.1 (Multi-screen AI)'
    },
    inStock: true,
    section: 'trending'
  },
  {
    id: 'phone-5',
    name: 'Xiaomi 15 Ultra',
    nameAr: 'شاومي 15 الترا',
    brand: 'Xiaomi',
    category: 'Xiaomi & Ultra',
    categoryAr: 'شاومي والترا',
    price: 1049.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: '780',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85',
    description: 'Leica Quad-Camera optical engineering with 1-inch Sony LYT-900 sensor, 200MP periscope zoom, Snapdragon 8 Elite, 90W HyperCharge, and 6000mAh silicon battery.',
    descriptionAr: 'عملاق التصوير الاحترافي بعدسات Leica الألمانية وحساس سوني 1 إنش الضخم، تقريب بصري بيريسكوب 200 ميجابكسل، شحن صاروخي 90 واط، وبطارية سيليكون 6000 مللي أمبير.',
    features: [
      'Leica Summilux Quad-lens camera system',
      '1-inch Sony LYT-900 primary sensor',
      'Snapdragon 8 Elite processor',
      '6000 mAh battery with 90W HyperCharge'
    ],
    featuresAr: [
      'نظام كاميرات Leica Summilux الرباعي الاحترافي',
      'مستشعر رئيسي بحجم 1 بوصة Sony LYT-900',
      'معالج Snapdragon 8 Elite فائق السرعة',
      'بطارية ضخمة 6000 مللي أمبير مع شحن فائق 90 واط'
    ],
    colors: [
      { name: 'Ceramic White', nameAr: 'سيراميك أبيض', hex: '#F7F7F7' },
      { name: 'Titanium Gray', nameAr: 'تيتانيوم رمادي', hex: '#63656A' },
      { name: 'Classic Black', nameAr: 'أسود كلاسيكي', hex: '#1C1D21' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 140 },
      { size: '1TB', priceDelta: 320 }
    ],
    specs: {
      display: '6.73" 2K C8 LTPO OLED, 120Hz, 3200 nits',
      processor: 'Snapdragon 8 Elite (3nm TSMC)',
      camera: '50MP 1" Main + 200MP Periscope + 50MP Telephoto + 50MP Ultrawide',
      battery: '6000 mAh, 90W wired + 80W wireless',
      os: 'Xiaomi HyperOS 2 (Android 15)'
    },
    inStock: true,
    section: 'trending'
  },

  // Recommended Products
  {
    id: 'phone-6',
    name: 'iPhone 16',
    nameAr: 'آبل آيفون 16',
    brand: 'Apple',
    category: 'Apple iPhone',
    categoryAr: 'آبل آيفون',
    price: 799.99,
    originalPrice: 899.99,
    rating: 4.8,
    reviewCount: '1.5k',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=85',
    description: 'Vibrant color-infused glass back with aerospace-grade aluminum, 48MP Fusion camera with 2x optical quality telephoto, Camera Control, and Apple Intelligence readiness.',
    descriptionAr: 'تصميم مبهج بألوان زاهية مدمجة بالزجاج مع هيكل ألمنيوم طيراني، كاميرا 48 ميجابكسل مع تقريب بصري 2x، وزر الكاميرا السريع ودعم ذكاء آبل الاصطناعي.',
    features: [
      '6.1" Super Retina XDR with Dynamic Island',
      'A18 Bionic chip (3nm architecture)',
      'Action button & Camera Control sensor',
      'All-day battery with USB-C convenience'
    ],
    featuresAr: [
      'شاشة 6.1 بوصة مع الجزيرة التفاعلية Dynamic Island',
      'معالج A18 الجديد فائق السرعة والكفاءة',
      'زر الإجراءات Action Button وزر التحكم بالكاميرا',
      'بطارية تدوم طوال اليوم مع منفذ USB-C'
    ],
    colors: [
      { name: 'Ultramarine', nameAr: 'أزرق لازوردي', hex: '#4868A8' },
      { name: 'Teal', nameAr: 'أخضر بحري', hex: '#87B5B5' },
      { name: 'Pink', nameAr: 'وردي ناعم', hex: '#EBB4C3' },
      { name: 'White', nameAr: 'أبيض نقي', hex: '#F2F1ED' },
      { name: 'Black', nameAr: 'أسود حالك', hex: '#282829' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 100 },
      { size: '512GB', priceDelta: 250 }
    ],
    specs: {
      display: '6.1" Super Retina XDR OLED, 2000 nits peak',
      processor: 'Apple A18 Chip (6-core CPU, 5-core GPU)',
      camera: '48MP Fusion + 12MP Ultra-Wide with Macro',
      battery: 'Up to 22 hours video playback, MagSafe charging',
      os: 'iOS 18 with Apple Intelligence'
    },
    inStock: true,
    section: 'recommended'
  },
  {
    id: 'phone-7',
    name: 'Samsung Galaxy S24+',
    nameAr: 'سامسونج جالاكسي S24 بلس',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    categoryAr: 'سامسونج جالاكسي',
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: '860',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=85',
    description: 'Big 6.7-inch QHD+ display with uniform ultra-thin bezels, Armor Aluminum 2.0 frame, 4900mAh battery, and powerful Galaxy AI photo and live call translation tools.',
    descriptionAr: 'شاشة كبيرة 6.7 إنش فائقة الوضوح QHD+ مع حواف متماثلة فائقة النحافة، إطار ألمنيوم معزز، بطارية ضخمة 4900 مللي أمبير، وميزات الذكاء الاصطناعي وترجمة المكالمات الحية.',
    features: [
      '6.7" QHD+ Dynamic AMOLED 2X 120Hz',
      'Snapdragon 8 Gen 3 for Galaxy',
      '4900 mAh battery with 45W fast charge',
      'Live Translate & Circle to Search'
    ],
    featuresAr: [
      'شاشة 6.7 بوصة QHD+ AMOLED 2X بتردد 120Hz',
      'معالج Snapdragon 8 Gen 3 المخصص لجالاكسي',
      'بطارية 4900 مللي أمبير مع شحن سريع 45 واط',
      'ترجمة فورية للمكالمات وخاصية Circle to Search'
    ],
    colors: [
      { name: 'Cobalt Violet', nameAr: 'بنفسجي كوبالت', hex: '#443A59' },
      { name: 'Amber Yellow', nameAr: 'أصفر كهرماني', hex: '#F0E5BE' },
      { name: 'Onyx Black', nameAr: 'أسود عقيقي', hex: '#2A2A2C' },
      { name: 'Marble Gray', nameAr: 'رمادي رخامي', hex: '#D2D3D5' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 120 }
    ],
    specs: {
      display: '6.7" Dynamic LTPO AMOLED 2X, 2600 nits',
      processor: 'Snapdragon 8 Gen 3 / Exynos 2400 (4nm)',
      camera: '50MP Main + 10MP 3x Telephoto + 12MP Ultrawide',
      battery: '4900 mAh with 45W charging',
      os: 'Android 14 One UI 6.1 (7 years updates)'
    },
    inStock: true,
    section: 'recommended'
  },
  {
    id: 'phone-8',
    name: 'Apple Watch Ultra 2',
    nameAr: 'ساعة آبل الترا 2',
    brand: 'Apple',
    category: 'Smart Watches',
    categoryAr: 'ساعات ذكية',
    price: 749.99,
    originalPrice: 799.99,
    rating: 4.9,
    reviewCount: '1.1k',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85',
    description: 'The ultimate sports & rugged smartwatch with 49mm aerospace titanium case, 3000-nit brightest Apple display, dual-frequency precision GPS, and 72h battery in Low Power Mode.',
    descriptionAr: 'الساعة الرياضية الاحترافية الأقوى بهيكل تيتانيوم 49 مم، شاشة فائقة السطوع 3000 شمعة، نظام GPS ثنائي التردد عالي الدقة، وعمر بطارية يصل إلى 72 ساعة.',
    features: [
      '49mm Aerospace Titanium Case with Sapphire Crystal',
      '3000 nits peak display brightness',
      'Dual-frequency GPS & 100m water resistance',
      'S9 SiP with Double Tap gesture control'
    ],
    featuresAr: [
      'هيكل تيتانيوم 49 مم مع زجاج ياقوتي مقاوم للخدش',
      'أعلى سطوع شاشة في تاريخ آبل 3000 شمعة',
      'نظام GPS ثنائي ومقاومة ماء حتى عمق 100 متر',
      'معالج S9 مع دعم حركة النقر المزدوج Double Tap'
    ],
    colors: [
      { name: 'Natural Titanium', nameAr: 'تيتانيوم طبيعي', hex: '#B3AFAB' },
      { name: 'Black Titanium', nameAr: 'تيتانيوم أسود', hex: '#242528' }
    ],
    storageOptions: [
      { size: '49mm Cellular', priceDelta: 0 },
      { size: '49mm Titanium Band', priceDelta: 150 }
    ],
    specs: {
      display: '49mm Always-On Retina LTPO OLED, 3000 nits',
      processor: 'Apple S9 SiP (64-bit dual-core)',
      camera: 'Sensors: ECG, Blood Oxygen, Depth gauge, Siren',
      battery: 'Up to 36 hours regular, 72 hours Low Power Mode',
      os: 'watchOS 11'
    },
    inStock: true,
    section: 'recommended'
  },
  {
    id: 'phone-9',
    name: 'AirPods Pro 2 (USB-C)',
    nameAr: 'سماعات آبل ايربودز برو 2',
    brand: 'Apple',
    category: 'Audio & Earbuds',
    categoryAr: 'سماعات وايرلس',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: '3.1k',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=85',
    description: 'Industry-standard active noise cancellation with H2 chip, Adaptive Audio, Conversation Awareness, Personalized Spatial Audio, and MagSafe USB-C charging case with speaker.',
    descriptionAr: 'قمة العزل الصوتي مع شريحة H2 الذكية، ميزة الصوت التكيفي ووعي المحادثة، صوت مكاني مخصص ثلاثي الأبعاد، وعلبة شحن USB-C مع مكبر صوت للعثور عليها.',
    features: [
      'Up to 2x more Active Noise Cancellation',
      'Adaptive Audio & Transparency mode',
      'Personalized Spatial Audio with head tracking',
      'Up to 30 hours listening time with case'
    ],
    featuresAr: [
      'عزل ضوضاء مضاعف مرتين أقوى',
      'نمط الصوت التكيفي وشفافية الصوت التلقائية',
      'صوت مكاني مخصص يتتبع حركة الرأس بدقة',
      'حتى 30 ساعة استماع مع علبة الشحن'
    ],
    colors: [
      { name: 'Glossy White', nameAr: 'أبيض لامع', hex: '#FFFFFF' }
    ],
    storageOptions: [
      { size: 'Standard USB-C', priceDelta: 0 }
    ],
    specs: {
      display: 'Custom high-excursion Apple driver & amplifier',
      processor: 'Apple H2 headphone chip + U1 in case',
      camera: 'Dual beamforming microphones + inward mic',
      battery: '6 hours per charge, 30 hours with case',
      os: 'iOS, iPadOS, macOS, watchOS compatible'
    },
    inStock: true,
    section: 'recommended'
  },
  {
    id: 'phone-10',
    name: 'MagSafe Wireless Power Bank 10,000mAh',
    nameAr: 'باور بانك ماج سيف 10,000mAh',
    brand: 'Accessories',
    category: 'Power & Cables',
    categoryAr: 'شواحن وباوربانك',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: '620',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85',
    description: 'Slim aviation-grade aluminum magnetic power bank with strong N52 neodymium magnets, 15W Qi2 fast wireless charging, and 20W PD USB-C bidirectional port with LED battery indicator.',
    descriptionAr: 'باور بانك مغناطيسي نحيف من الألمنيوم بمغناطيس N52 قوي يلتصق بظهر الهاتف، يدعم الشحن اللاسلكي السريع 15W ومنفذ تايب سي 20W مع مؤشر رقمي لمستوى البطارية.',
    features: [
      '10,000 mAh High-Density Cobalt Battery',
      'Strong N52 Magnetic Alignment (Snap & Charge)',
      '15W Fast Wireless + 20W USB-C PD Cable Output',
      'Built-in kickstand for desktop viewing'
    ],
    featuresAr: [
      'سعة 10,000 مللي أمبير تكفي لشحن الهاتف مرتين',
      'مغناطيس N52 قوي جداً يثبت الهاتف بإحكام',
      'شحن لاسلكي 15 واط + شحن سلكي سريع 20 واط',
      'مسند خلفي مدمج لتثبيت الهاتف أفقياً أو عمودياً'
    ],
    colors: [
      { name: 'Space Gray', nameAr: 'رمادي فلكي', hex: '#4A4D53' },
      { name: 'Matte Black', nameAr: 'أسود مطفي', hex: '#1E1F22' },
      { name: 'Silver White', nameAr: 'فضي أبيض', hex: '#E3E4E8' }
    ],
    storageOptions: [
      { size: '10,000 mAh', priceDelta: 0 },
      { size: '20,000 mAh', priceDelta: 20 }
    ],
    specs: {
      display: 'LED Smart Battery Level Display',
      processor: 'Smart TempControl Protection Chip',
      camera: 'N/A',
      battery: '10,000 mAh / 38.5Wh (Airline Approved)',
      os: 'Compatible with iPhone 12-16 & Qi2 Android devices'
    },
    inStock: true,
    section: 'recommended'
  }
];
