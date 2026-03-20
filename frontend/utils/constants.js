export const BRAND = {
  name: 'AMINO DOCK',
  motto: 'Made for clean and premium nutrition',
  philosophy: [
    '100% clean and natural ingredients',
    'Zero fillers like maltodextrins',
    'No amino spiking',
    'Zero added sugar',
    'Premium quality supplements'
  ]
};

export const BASE_PRODUCTS = ['Whey Concentrate', 'Whey Isolate', 'Iso Blend', 'Gainer'];

export const EXTRA_INGREDIENTS = ['Creatine', 'BCAA', 'Electrolytes', 'Vitamins'];

export const COMBO_DEALS = [
  {
    title: 'Muscle Gain Combo',
    includes: ['Elite Whey Concentrate', 'Elite Gainer', 'Creatine Monohydrate'],
    discount: '18% OFF'
  },
  {
    title: 'Strength Combo',
    includes: ['Elite Whey Isolate', 'Creatine Monohydrate', 'Elite Omega Fish Oil'],
    discount: '15% OFF'
  },
  {
    title: 'Recovery Combo',
    includes: ['Elite Iso Blend', 'Elite Omega Fish Oil'],
    discount: '12% OFF'
  }
];

export const FALLBACK_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Elite Whey Concentrate',
    slug: 'elite-whey-concentrate',
    flavours: ['Chocolate', 'Plain Coffee'],
    sizes: ['1kg', '2kg'],
    price: 2499,
    description: 'High-quality whey concentrate with clean premium sourcing.'
  },
  {
    _id: 'p2',
    name: 'Elite Iso Blend',
    slug: 'elite-iso-blend',
    flavours: ['Chocolate', 'Plain Coffee'],
    sizes: ['1kg', '2kg'],
    price: 2999,
    description: 'Balanced isolate blend for lean recovery and performance.'
  },
  {
    _id: 'p3',
    name: 'Elite Whey Isolate',
    slug: 'elite-whey-isolate',
    flavours: ['Chocolate', 'Plain Coffee', 'Unflavoured'],
    sizes: ['1kg', '2kg'],
    price: 3499,
    description: 'Ultra-filtered whey isolate with no amino spiking.'
  },
  {
    _id: 'p4',
    name: 'Elite Gainer',
    slug: 'elite-gainer',
    flavours: ['Choco Peanut', 'Caffe Peanut'],
    sizes: ['1kg', '2kg'],
    price: 2799,
    description: 'Calorie-dense gainer blend for quality mass support.'
  },
  {
    _id: 'p5',
    name: 'Creatine Monohydrate',
    slug: 'creatine-monohydrate',
    flavours: ['Citrus'],
    sizes: ['100g', '250g'],
    price: 899,
    description: 'Pure micronized creatine for strength and power output.'
  },
  {
    _id: 'p6',
    name: 'Elite Omega Fish Oil',
    slug: 'elite-omega-fish-oil',
    flavours: [],
    sizes: [],
    capsules: 60,
    price: 699,
    description: 'Premium omega support for heart, joints, and recovery.'
  }
];
