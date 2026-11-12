import { GalleryItem } from '../types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'look-1',
    title: 'Iridescent Aurora Glazed Almond',
    category: 'chrome',
    categoryLabel: 'Glazed & Chrome',
    image: '/src/assets/images/gallery_chrome_glaze_1794495166564.jpg',
    tags: ['Aurora Chrome', 'Russian E-File', 'Milky Nude'],
    nailShape: 'Almond',
    nailLength: 'Medium',
    durationMinutes: 85,
    priceEstimate: 100,
    serviceId: 'biab-overlay',
    technique: 'Russian cuticle clearance + Structured BIAB in Petal Nude + Rubbed Aurora Chrome powder with ultra-gloss diamond topcoat.',
    clientReview: {
      author: 'Camille R.',
      comment: 'The reflection in the sunlight is unbelievable! 4 weeks in and still zero chipping.'
    }
  },
  {
    id: 'look-2',
    title: 'Fine-Line Botanical & 24K Gold Leaf',
    category: 'handpainted',
    categoryLabel: 'Hand-Painted Art',
    image: '/src/assets/images/gallery_handpainted_art_1794495167370.jpg',
    tags: ['Hand-Painted', 'Botanical', 'Gold Leaf', 'Short Squoval'],
    nailShape: 'Squoval',
    nailLength: 'Natural Short',
    durationMinutes: 95,
    priceEstimate: 110,
    serviceId: 'biab-overlay',
    technique: 'Natural nail plate preservation + Builder gel in Milky Oat + Micro-brush olive foliage + Hand-placed genuine gold leaf flakes.',
    clientReview: {
      author: 'Maya Lin',
      comment: 'Sarah’s hand-painting skills are on another level. People constantly stop me to look at the leaves!'
    }
  },
  {
    id: 'look-3',
    title: 'Modern Tortoiseshell Micro-French',
    category: 'french',
    categoryLabel: 'Modern French',
    image: '/src/assets/images/gallery_french_twist_1794495167607.jpg',
    tags: ['Tortoiseshell', 'Micro French', 'Almond Shape', 'BIAB Base'],
    nailShape: 'Almond',
    nailLength: 'Medium',
    durationMinutes: 90,
    priceEstimate: 115,
    serviceId: 'biab-overlay',
    technique: 'Multi-layer amber jelly syrup layering with deep espresso blobbing, bordered by an ultra-thin crisp white guideline.',
    clientReview: {
      author: 'Sophie V.',
      comment: 'Subtle yet statement-making. The apex architecture makes my hands look so slender.'
    }
  },
  {
    id: 'look-4',
    title: 'High-Lustre Pearlescent Silk Nails',
    category: 'chrome',
    categoryLabel: 'Glazed & Chrome',
    image: '/src/assets/images/hero_nail_art_editorial_1794495166284.jpg',
    tags: ['Pearl Dust', 'Full Set', 'Medium Almond', 'Signature Look'],
    nailShape: 'Almond',
    nailLength: 'Medium',
    durationMinutes: 80,
    priceEstimate: 95,
    serviceId: 'biab-overlay',
    technique: 'Custom translucent alabaster gel overlay buffed with micro-fine white pearl pigment under dual LED curing.',
    clientReview: {
      author: 'Claire D.',
      comment: 'My go-to bridal manicure look. The pearlescent sheen catches every angle in photos.'
    }
  },
  {
    id: 'look-5',
    title: 'Aura Gradient with 3D Water Droplets',
    category: 'sculpt',
    categoryLabel: '3D & Sculpt',
    image: '/src/assets/images/gallery_chrome_glaze_1794495166564.jpg',
    tags: ['3D Droplets', 'Airbrushed Aura', 'Sculpted Gel'],
    nailShape: 'Oval',
    nailLength: 'Medium',
    durationMinutes: 100,
    priceEstimate: 125,
    serviceId: 'art-tier-3',
    technique: 'Blush pink and lavender airbrush aura core with non-wipe 3D hard sculpting gel beads for a morning dew effect.',
    clientReview: {
      author: 'Elena T.',
      comment: 'The 3D droplets feel so smooth and never snag on knitwear or hair.'
    }
  },
  {
    id: 'look-6',
    title: 'Minimalist Negative Space Half-Moons',
    category: 'biab',
    categoryLabel: 'Structured BIAB',
    image: '/src/assets/images/gallery_handpainted_art_1794495167370.jpg',
    tags: ['Negative Space', 'Clean Girl', 'Nude BIAB', 'Natural Nails'],
    nailShape: 'Squoval',
    nailLength: 'Natural Short',
    durationMinutes: 75,
    priceEstimate: 85,
    serviceId: 'biab-overlay',
    technique: 'Bare natural lunula exposed with structured sheer pink builder gel covering the nail body, finished with micro dot accent.',
    clientReview: {
      author: 'Nora K.',
      comment: 'Because the base is sheer and negative-space, the regrowth is virtually invisible for 5 weeks!'
    }
  }
];

export const CLIENT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Victoria Sterling',
    service: 'Structured BIAB Overlay + Tier 2 Art',
    date: '2 days ago',
    rating: 5,
    tag: 'Verified Client · 8 visits',
    text: 'Sarah is a true artisan. My natural nails used to bend and tear like paper. Since starting BIAB with Sarah 8 months ago, my nails are past my fingertips for the first time in my adult life. Her studio is so calming and spotless.'
  },
  {
    id: 'rev-2',
    author: 'Hannah M.',
    service: 'Gel-X Extensions + Glazed Chrome',
    date: '1 week ago',
    rating: 5,
    tag: 'Verified Client · 3 visits',
    text: 'Zero heat spikes, no drills burning my cuticles, and the Russian manicure precision is something you only see on top nail artist feeds. Sarah takes the time to match nail shape to finger anatomy.'
  },
  {
    id: 'rev-3',
    author: 'Dr. Priya Patel',
    service: 'Signature Russian E-File Dry Manicure',
    date: '2 weeks ago',
    rating: 5,
    tag: 'Verified Client · Monthly Regular',
    text: 'As a surgeon, hygiene and zero hangnails are critical for me. Sarah’s medical autoclave pouches opened fresh in front of you gave me complete peace of mind. Immaculate work and incredible longevity.'
  },
  {
    id: 'rev-4',
    author: 'Amélie Laurent',
    service: 'Full Set Apres Gel-X + French Tortoiseshell',
    date: '3 weeks ago',
    rating: 5,
    tag: 'Verified Client · First Visit',
    text: 'The online booking experience was so effortless, and when I arrived Sarah already had my inspiration look pulled up. The coffee, the private suite, and the finished nails exceeded every expectation.'
  }
];
