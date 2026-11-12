import { Service, AddOn } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'biab-overlay',
    name: 'Structured BIAB Builder Gel Overlay',
    category: 'biab',
    categoryLabel: 'Builder Gel (BIAB)',
    durationMinutes: 75,
    price: 85,
    description: 'High-strength flexible builder gel overlay sculpted over your natural nails to reinforce strength, correct apex structure, and encourage natural nail growth without tipping.',
    includes: [
      'Comprehensive Russian e-file cuticle & dry prep',
      'Custom natural nail shaping & surface balancing',
      'Structural BIAB apex reinforcement application',
      'One sheer/nude/milky gel shade or high-shine glaze',
      'Organic cold-pressed jojoba cuticle nourishment'
    ],
    recommendedFor: 'Natural nails needing length retention, weak or brittle nails, growing natural length.',
    popular: true
  },
  {
    id: 'biab-infill',
    name: 'BIAB Maintenance Infill (3-4 Weeks)',
    category: 'biab',
    categoryLabel: 'Builder Gel (BIAB)',
    durationMinutes: 70,
    price: 75,
    description: 'Infill maintenance for existing Atelier Sarah BIAB overlays. We gently debulk previous product, refine cuticle regrowth, and rebalance the structural apex.',
    includes: [
      'E-file gentle product debulking & inspection',
      'Precision cuticle cleaning & perimeter prep',
      'Fresh BIAB infill and structural apex re-balance',
      'Fresh gel polish application or milky gloss finish'
    ],
    recommendedFor: 'Existing clients returning within 3-4 weeks with intact builder gel.',
    popular: false
  },
  {
    id: 'gel-x-extensions',
    name: 'Full Set Apres Gel-X™ Soft Gel Extensions',
    category: 'extensions',
    categoryLabel: 'Extensions',
    durationMinutes: 90,
    price: 115,
    description: '100% soak-off soft gel extension system crafted from medical-grade gel. Zero damage, zero toxic odors, and immaculate shape consistency from cuticle to tip.',
    includes: [
      'Full dry e-file manicure prep for zero lifting',
      'Custom tip sizing for all 10 nail beds',
      'Apres extend gel adhesive curing',
      'Length tapering and seamless cuticle flush refinement',
      'Single gel color or clean milky finish of choice'
    ],
    recommendedFor: 'Clients wanting immediate dramatic length and flawless shape (Almond, Coffin, Stiletto).',
    popular: true
  },
  {
    id: 'sculpted-acrylic',
    name: 'Artisan Hard Gel / Sculpted Extensions',
    category: 'extensions',
    categoryLabel: 'Extensions',
    durationMinutes: 105,
    price: 135,
    description: 'Bespoke hand-sculpted forms created without glued plastic tips. Built for extreme durability, flawless C-curves, and customized architectural architecture.',
    includes: [
      'Individual paper form tailoring for bespoke fit',
      'Hypoallergenic oligomer hard gel sculpting',
      'Precision pinch for tailored C-curve and slim sidewalls',
      'Surface cross-filing and glass gloss seal'
    ],
    recommendedFor: 'Clients wanting customized sculpted shapes or active lifestyles needing maximum resilience.',
    popular: false
  },
  {
    id: 'art-tier-1',
    name: 'Minimalist Nail Art (Tier 1)',
    category: 'art',
    categoryLabel: 'Nail Art',
    durationMinutes: 20,
    price: 25,
    description: 'Understated, modern accent art for up to 4 accent nails or subtle fine-line details on all 10 nails.',
    includes: [
      'Chrome powder glaze / glazed donut effect (all 10 nails)',
      'Subtle metallic foil flecks or micro dots',
      'Negative space micro geometric accents (4 nails)',
      'Single crystal placement per accent'
    ],
    recommendedFor: 'Understated office-friendly chic or first-time nail art clients.'
  },
  {
    id: 'art-tier-2',
    name: 'Editorial French & Fine Line Art (Tier 2)',
    category: 'art',
    categoryLabel: 'Nail Art',
    durationMinutes: 35,
    price: 45,
    description: 'Detailed hand-painted designs on all 10 fingers. Includes modern French variations, tortoiseshell, aura gradients, and fine botanical lines.',
    includes: [
      'Micro French, double French or tortoiseshell tips (all 10)',
      'Airbrushed blooming aura gradient effects',
      'Hand-painted fine-line botanical florals or stars',
      'Cat-eye magnetic velvet multi-dimensional swirls'
    ],
    recommendedFor: 'Trending Instagram/Pinterest aesthetics and classic modern French twists.',
    popular: true
  },
  {
    id: 'art-tier-3',
    name: 'Masterpiece 3D Sculpt & Gem Art (Tier 3)',
    category: 'art',
    categoryLabel: 'Nail Art',
    durationMinutes: 50,
    price: 70,
    description: 'Unrestricted bespoke nail art for special events, editorial shoots, and high-fashion aesthetics. Combining 3D sculpting gel, mixed media, and Swarovski elements.',
    includes: [
      '3D sculptural gel water droplets, molten chrome ribbons',
      'Multi-layered hand-painted fine art portraits or patterns',
      'Clustered Swarovski crystals & Japanese metal charms',
      'Bespoke consultation with reference moodboards'
    ],
    recommendedFor: 'Weddings, editorial projects, birthdays, and clients who view nails as fine jewelry.'
  },
  {
    id: 'dry-russian-manicure',
    name: 'Signature Russian E-File Dry Manicure',
    category: 'natural',
    categoryLabel: 'Natural Nails',
    durationMinutes: 60,
    price: 70,
    description: 'The pinnacle of hygienic cuticle care using specialized diamond e-file bits to gently remove dead pterygium and polish proximal nail folds for pristine 3-4 week cleanliness.',
    includes: [
      'Multi-step diamond bit e-file perimeter exfoliation',
      'Micro-scissor anatomical cuticle trimming',
      'Nail plate buffing & keratin barrier protection',
      'Under-the-cuticle gel polish application for extended outgrowth life',
      'Heated botanical oil towel compress'
    ],
    recommendedFor: 'Those who appreciate microscopic precision, clean cuticle aesthetics, and long-lasting manicures.'
  },
  {
    id: 'spa-pedicure',
    name: 'Luxe Botanical Gel Pedicure',
    category: 'natural',
    categoryLabel: 'Natural Nails',
    durationMinutes: 70,
    price: 85,
    description: 'Waterless hygienic e-file pedicure focused on callus softening, nail shaping, and long-wear cured gel polish that dries instantly.',
    includes: [
      'Hygienic foot sanitization and dry podiatry disc smoothing',
      'Deep toe cuticle detailing and square/round shaping',
      'Exfoliating bamboo and volcanic pumice scrub',
      'Instant-dry LED cured gel color with glossy seal',
      'Deep acupressure foot & ankle balm massage'
    ],
    recommendedFor: 'Complete rejuvenation with flawless sandal-ready toes.'
  },
  {
    id: 'safe-removal',
    name: 'Gentle Japanese Soak-Off & Nail Restoration',
    category: 'removal',
    categoryLabel: 'Removals',
    durationMinutes: 35,
    price: 35,
    description: 'Safe, zero-drill-to-natural-nail product removal. Acetone foil wrap with warming mitts, followed by intensive keratin strengthening treatment.',
    includes: [
      'Gentle e-file top coat breakdown',
      'Individual foil conditioning wrap soak-off',
      'Orange-wood stick glide removal (zero natural nail scraping)',
      'Intensive IBX strengthener or Japanese keratin treatment',
      'Natural shine buff and cuticle butter'
    ],
    recommendedFor: 'Taking a healthy break from enhancements or transitioning back to natural nails.'
  }
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'chrome-glaze',
    name: 'Aurora / Glazed Donut Chrome Glaze',
    price: 15,
    durationMinutes: 10,
    description: 'High-sheen pearlized or iridescent mirror chrome rubbed over your base gel.'
  },
  {
    id: 'single-nail-fix',
    name: 'Emergency Nail Repair / Silk Extension (Per Nail)',
    price: 12,
    durationMinutes: 15,
    description: 'Silk wrap stabilization or Gel-X replacement for broken or split natural nails.'
  },
  {
    id: 'foreign-removal',
    name: 'Foreign Acrylic / Hard Gel Removal (Previous Salon)',
    price: 25,
    durationMinutes: 30,
    description: 'Required if you arrive with product applied by another salon/technician.'
  },
  {
    id: 'french-finish',
    name: 'Classic Crisp French Tip Outline',
    price: 20,
    durationMinutes: 15,
    description: 'Hand-painted high-definition smile line in soft white, deep burgundy, or jet black.'
  },
  {
    id: 'cuticle-care-kit',
    name: 'Aftercare Roll-On Jojoba Elixir (To-Go 10ml)',
    price: 18,
    durationMinutes: 0,
    description: 'Artisanal organic cold-pressed jojoba & vitamin E oil bottle with rose quartz rollerball.'
  }
];

export const NAIL_SHAPES = [
  {
    name: 'Almond',
    description: 'Tapered sides meeting at a soft curved point. Elongates fingers gracefully.',
    idealFor: 'Medium to long nails; makes shorter fingers appear longer.',
    svgPath: 'M 10 90 L 10 45 C 10 20 20 5 30 5 C 40 5 50 20 50 45 L 50 90 Z'
  },
  {
    name: 'Oval',
    description: 'Softly rounded edges mirroring the natural contour of the cuticle.',
    idealFor: 'Short to medium nails; universally flattering and low-maintenance.',
    svgPath: 'M 10 90 L 10 40 C 10 12 18 6 30 6 C 42 6 50 12 50 40 L 50 90 Z'
  },
  {
    name: 'Squoval',
    description: 'Classic square outline with gently softened, curved corners for comfort.',
    idealFor: 'Natural short nails; high durability against chipping and snagging.',
    svgPath: 'M 10 90 L 10 20 C 10 10 16 8 30 8 C 44 8 50 10 50 20 L 50 90 Z'
  },
  {
    name: 'Coffin / Ballerina',
    description: 'Tapering inward sharply with a crisp flat, squared-off tip.',
    idealFor: 'Long extensions; bold, dramatic canvas for elaborate nail art.',
    svgPath: 'M 10 90 L 15 30 L 22 8 L 38 8 L 45 30 L 50 90 Z'
  },
  {
    name: 'Square',
    description: 'Straight sidewalls with a sharp 90-degree flat horizontal edge.',
    idealFor: 'Medium length and wider nail beds; crisp architectural French looks.',
    svgPath: 'M 10 90 L 10 10 L 50 10 L 50 90 Z'
  },
  {
    name: 'Stiletto',
    description: 'Dramatic sidewall taper meeting at a sharp, defined needle point.',
    idealFor: 'Long sculpts; statement editorial fashion and runway looks.',
    svgPath: 'M 10 90 L 12 40 L 30 4 L 48 40 L 50 90 Z'
  }
];
