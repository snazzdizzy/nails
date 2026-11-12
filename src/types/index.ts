export interface Service {
  id: string;
  name: string;
  category: 'biab' | 'extensions' | 'art' | 'natural' | 'removal';
  categoryLabel: string;
  durationMinutes: number;
  price: number;
  description: string;
  includes: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'chrome' | 'handpainted' | 'french' | 'biab' | 'sculpt';
  categoryLabel: string;
  image: string;
  tags: string[];
  nailShape: 'Almond' | 'Oval' | 'Squoval' | 'Square' | 'Coffin' | 'Stiletto';
  nailLength: 'Natural Short' | 'Medium' | 'Long Extension';
  durationMinutes: number;
  priceEstimate: number;
  serviceId: string;
  technique: string;
  clientReview?: {
    author: string;
    comment: string;
  };
}

export interface Appointment {
  id: string;
  referenceCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  addOnIds: string[];
  addOnNames: string[];
  nailCondition: 'bare' | 'existing_gel' | 'foreign_removal';
  nailShape: string;
  nailLength: string;
  inspirationNote?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "10:00 AM"
  durationMinutes: number;
  totalPrice: number;
  depositAmount: number;
  balanceDue: number;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  service: string;
  date: string;
  rating: number;
  text: string;
  tag: string;
}
