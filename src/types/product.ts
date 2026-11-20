export interface ProductColor {
  name: string;
  nameAr: string;
  hex: string;
  image?: string;
}

export interface ProductStorage {
  size: string;
  priceDelta: number;
}

export interface ProductSpecs {
  display: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  category: string;
  categoryAr: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: string;
  image: string;
  gallery?: string[];
  description: string;
  descriptionAr: string;
  features?: string[];
  featuresAr?: string[];
  colors: ProductColor[];
  storageOptions: ProductStorage[];
  specs: ProductSpecs;
  inStock: boolean;
  tag?: string;
  badge?: string;
  section: 'trending' | 'recommended' | 'all';
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  image: string;
  itemCount?: number;
  tagline?: string;
  taglineAr?: string;
  badge?: string;
  badgeAr?: string;
}

export interface PromoCard {
  id: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink: string;
  image: string;
  theme: 'cream' | 'light' | 'dark';
}
