import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export const PromoCards: React.FC = () => {
  const { setActiveCategory, navigateTo } = useStore();
  const { language, isRTL } = useLanguage();

  const cards = [
    {
      id: 'promo-1',
      badge: language === 'ar' ? 'عرض اليوم المميز' : 'Deal of the Day',
      title: language === 'ar' ? 'خصم حتى 30%' : 'Up to 30% Off',
      subtitle: language === 'ar' ? 'على أحدث أجهزة سامسونج جالاكسي' : 'On flagship Samsung Galaxy series',
      ctaText: language === 'ar' ? 'تسوق العروض' : 'Shop Deals',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
      theme: 'cream',
      cat: 'Samsung Galaxy'
    },
    {
      id: 'promo-2',
      badge: language === 'ar' ? 'وصل حديثاً' : 'New Arrivals',
      title: language === 'ar' ? 'آيفون 16 الجديد' : 'iPhone 16 Series',
      subtitle: language === 'ar' ? 'اكتشف عائلة آيفون الجديدة كلياً' : 'Discover the all-new iPhone family',
      ctaText: language === 'ar' ? 'استكشف الآن' : 'Explore Now',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
      theme: 'light',
      cat: 'Apple iPhone'
    },
    {
      id: 'promo-3',
      badge: language === 'ar' ? 'حصري لأعضاء موبايلي' : 'Mobily Exclusive',
      title: language === 'ar' ? 'خصم إضافي 10%' : 'Extra 10% Off',
      subtitle: language === 'ar' ? 'على الدفع المسبق لجميع الأجهزة' : 'On prepaid flagship orders this week',
      ctaText: language === 'ar' ? 'تسوق الآن' : 'Shop Now',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
      theme: 'dark',
      cat: null
    }
  ];

  const handleCardClick = (cat: string | null) => {
    setActiveCategory(cat);
    navigateTo('products');
  };

  return (
    <section className="promos-section reveal-on-scroll" id="promos">
      <div className="container">
        <div className="promos-grid">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`promo-card promo-card--${card.theme} reveal-on-scroll stagger-${idx + 1}`}
              onClick={() => handleCardClick(card.cat)}
            >
              <div className="promo-card__content">
                <span className="promo-card__badge">{card.badge}</span>
                <h3 className="promo-card__title">{card.title}</h3>
                <p className="promo-card__subtitle">{card.subtitle}</p>
                <div className="promo-card__link">
                  <span>{card.ctaText}</span>
                  <ArrowRight size={14} className={`promo-card__icon ${isRTL ? 'flip-rtl' : ''}`} />
                </div>
              </div>
              <div className="promo-card__media">
                <img
                  src={card.image}
                  alt={card.title}
                  className="promo-card__img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
