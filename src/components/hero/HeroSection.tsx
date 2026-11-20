import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { scrollToElement } from '../../utils/scroll';

interface SlideData {
  id: string;
  tagline: string;
  taglineAr: string;
  title1: string;
  title1Ar: string;
  title2: string;
  title2Ar: string;
  desc: string;
  descAr: string;
  ctaText: string;
  ctaTextAr: string;
  image: string;
  bgColor: string;
}

export const HeroSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { navigateTo } = useStore();

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      tagline: 'QUALITY. STYLE. EVERYDAY.',
      taglineAr: 'أصالة • فخامة • كل يوم',
      title1: 'Everything You Love,',
      title1Ar: 'كل ما تحبه،',
      title2: 'All in One Place.',
      title2Ar: 'في مكان واحد وبأفضل الأسعار.',
      desc: 'Shop top-quality products across all categories with unbeatable prices and a seamless experience.',
      descAr: 'تسوق أفضل المنتجات والهواتف الذكية عبر كافة الأقسام بأفضل الأسعار الرسمية وتجربة استثنائية.',
      ctaText: 'Shop Now',
      ctaTextAr: 'تسوق الآن',
      image: '/images/panoramic_living_room_hero.jpg',
      bgColor: '#F1E9DF'
    },
    {
      id: 'slide-2',
      tagline: 'NEXT-GEN TITANIUM FLAGSHIPS',
      taglineAr: 'هواتف المستقبل • قوة التيتانيوم',
      title1: 'iPhone 16 Pro Max &',
      title1Ar: 'آيفون 16 برو ماكس و',
      title2: 'Galaxy S25 Ultra.',
      title2Ar: 'جالاكسي S25 الترا.',
      desc: 'Experience unrivaled performance with official warranty, flexible storage tiers, and stunning camera systems.',
      descAr: 'اكتشف أحدث المعالجات الخارقة وكاميرات 200MP مع ضمان رسمي وألوان وسعات متعددة.',
      ctaText: 'Explore Flagships',
      ctaTextAr: 'استكشف الهواتف',
      image: '/images/panoramic_phones_hero.jpg',
      bgColor: '#F1E9DF'
    },
    {
      id: 'slide-3',
      tagline: 'IMMERSIVE AUDIO & WEARABLES',
      taglineAr: 'صوتيات فائقة وساعات ذكية',
      title1: 'AirPods Pro 2 &',
      title1Ar: 'ايربودز برو 2 و',
      title2: 'Apple Watch Ultra 2.',
      title2Ar: 'ساعة آبل الترا 2.',
      desc: 'Active noise cancellation, aerospace titanium cases, and high-speed wireless charging companions.',
      descAr: 'عزل ضوضاء مضاعف، تيتانيوم مقاوم للماء، وأحدث إكسسوارات الشحن السريع.',
      ctaText: 'View Wearables',
      ctaTextAr: 'تصفح الإكسسوارات',
      image: '/images/panoramic_wearables_hero.jpg',
      bgColor: '#F1E9DF'
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll logic (advances smoothly every 5.0 seconds)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlideIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handleCtaClick = () => {
    // Slower, noticeable smooth scroll down (1100ms) with arrival highlight
    scrollToElement('products', 1100);
  };

  return (
    <section className="hero-section page-view-enter">
      <div className="container">
        {/* Full-bleed Panoramic Banner with Auto-scroll Slider */}
        <div
          className="hero-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="hero-panoramic-card"
            style={{ backgroundColor: activeSlide.bgColor }}
          >
            {/* Background Full-Coverage Image with Seamless Gradient Mask */}
            <div className="hero-panoramic-media">
              <img
                src={activeSlide.image}
                alt={activeSlide.title1}
                className="hero-panoramic-img"
              />
              <div className="hero-panoramic-mask" />
            </div>

            {/* Content Overlay */}
            <div className="hero-panoramic-content">
              <span className="hero-tagline">
                {language === 'ar' ? activeSlide.taglineAr : activeSlide.tagline}
              </span>

              <h1 className="hero-title">
                {language === 'ar' ? activeSlide.title1Ar : activeSlide.title1}
                <br />
                <span className="hero-title--accent">
                  {language === 'ar' ? activeSlide.title2Ar : activeSlide.title2}
                </span>
              </h1>

              <p className="hero-description">
                {language === 'ar' ? activeSlide.descAr : activeSlide.desc}
              </p>

              <div className="hero-actions-row">
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={handleCtaClick}
                >
                  <span>{language === 'ar' ? activeSlide.ctaTextAr : activeSlide.ctaText}</span>
                  <ArrowRight
                    size={17}
                    style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
                  />
                </button>

                <button
                  type="button"
                  className="hero-secondary-btn"
                  onClick={() => navigateTo('products')}
                >
                  {language === 'ar' ? 'عرض الكتالوج الكامل' : 'Browse All Catalog'}
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <ShieldCheck size={17} className="hero-trust-icon" />
                  <span>{language === 'ar' ? 'دفع آمن ومحمي' : 'Secure Payments'}</span>
                </div>
                <div className="hero-trust-divider" />
                <div className="hero-trust-item">
                  <Award size={17} className="hero-trust-icon" />
                  <span>{language === 'ar' ? 'جودة أصلية 100%' : 'Premium Quality'}</span>
                </div>
                <div className="hero-trust-divider" />
                <div className="hero-trust-item">
                  <Truck size={17} className="hero-trust-icon" />
                  <span>{language === 'ar' ? 'شحن فوري وسريع' : 'Fast Delivery'}</span>
                </div>
              </div>
            </div>

            {/* Slider Controls: Arrows */}
            <button
              type="button"
              className="hero-arrow-btn hero-arrow-btn--prev"
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={22} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </button>
            <button
              type="button"
              className="hero-arrow-btn hero-arrow-btn--next"
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <ChevronRight size={22} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </button>

            {/* Auto-scroll Status & Dots Bar */}
            <div className="hero-slider-indicators">
              <button
                type="button"
                className="hero-pause-toggle"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? 'تشغيل التمرير التلقائي' : 'إيقاف التمرير التلقائي'}
              >
                {isPaused ? <Play size={11} /> : <Pause size={11} />}
              </button>

              <div className="hero-dots-wrap">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`hero-dot-btn ${idx === currentSlideIndex ? 'is-active' : ''}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
