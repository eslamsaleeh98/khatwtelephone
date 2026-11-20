import type { PromoCard } from '../types/product';

export const promoCards: PromoCard[] = [
  {
    id: 'promo-1',
    badge: 'Deal of the Day',
    badgeAr: 'عرض اليوم المميز',
    title: 'Up to 30% Off',
    titleAr: 'خصم حتى 30%',
    subtitle: 'On selected flagship Galaxy devices',
    subtitleAr: 'على هواتف سامسونج جالاكسي المختارة',
    ctaText: 'Shop Deals',
    ctaTextAr: 'تسوق العروض',
    ctaLink: '#deals',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
    theme: 'cream'
  },
  {
    id: 'promo-2',
    badge: 'New Arrivals',
    badgeAr: 'وصل حديثاً',
    title: 'Fresh Finds',
    titleAr: 'عائلة آيفون 16',
    subtitle: 'Check out the latest products just for you',
    subtitleAr: 'استكشف أحدث مواصفات أجهزة آبل الجديدة',
    ctaText: 'Explore Now',
    ctaTextAr: 'استكشف الآن',
    ctaLink: '#new',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
    theme: 'light'
  },
  {
    id: 'promo-3',
    badge: 'Member Exclusive',
    badgeAr: 'حصري للأعضاء',
    title: 'Extra 10% Off',
    titleAr: 'خصم إضافي 10%',
    subtitle: 'On prepaid orders this weekend',
    subtitleAr: 'على الدفع المسبق لجميع الهواتف',
    ctaText: 'Shop Now',
    ctaTextAr: 'تسوق الآن',
    ctaLink: '#member',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
    theme: 'dark'
  }
];
