import React, { useRef } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Layers, LayoutGrid, RotateCcw } from 'lucide-react';
import { categories } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { scrollToElement } from '../../utils/scroll';
import { useScrollReveal } from '../../utils/useScrollReveal';

export const CategoryCircles: React.FC = () => {
  const { activeCategory, setActiveCategory, navigateTo } = useStore();
  const { t, language, isRTL } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Activate scroll reveal animation
  useScrollReveal(activeCategory);

  const handleCategoryClick = (categoryName: string | null) => {
    setActiveCategory(categoryName);
    scrollToElement('products', 600);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 260;
    const container = scrollContainerRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: isRTL ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="category-section reveal-on-scroll" id="categories">
      <div className="container">
        {/* Section Header */}
        <div className="category-header-wrap">
          <div className="category-header-info">
            <div className="category-header-title-row">
              <div className="category-icon-badge">
                <Layers size={17} />
              </div>
              <h2
                className="category-main-title"
                onClick={() => handleCategoryClick(null)}
                title={language === 'ar' ? 'عرض جميع المنتجات' : 'Show All Products'}
              >
                {t.shopByCategory}
              </h2>
              <span className="category-count-chip">
                {categories.length} {language === 'ar' ? 'أقسام' : 'Categories'}
              </span>
            </div>
            <p className="category-sub-title">
              {language === 'ar'
                ? 'اختر القسم المطلوب للتصفية السريعة، أو اختر «جميع المنتجات» لعرض الكتالوج بالكامل'
                : 'Select a category to filter or choose "All Products" to browse full catalog'}
            </p>
          </div>

          <div className="category-header-actions">
            {activeCategory ? (
              <div className="category-active-filter-pill">
                <span>{t.filteredBy}: <strong>{activeCategory}</strong></span>
                <button
                  className="category-clear-btn"
                  onClick={() => handleCategoryClick(null)}
                  title={language === 'ar' ? 'إظهار جميع المنتجات' : 'Show All Products'}
                >
                  <RotateCcw size={12} />
                  <span>{language === 'ar' ? 'إظهار الكل' : 'Show All'}</span>
                </button>
              </div>
            ) : (
              <button
                className="category-all-active-chip"
                onClick={() => handleCategoryClick(null)}
              >
                <Check size={13} />
                <span>{language === 'ar' ? 'يتم عرض جميع المنتجات' : 'Showing All Products'}</span>
              </button>
            )}

            <button
              className="category-view-all-btn"
              onClick={() => navigateTo('products')}
            >
              <span>{t.viewAllCategories}</span>
              <ArrowRight size={15} className={isRTL ? 'flip-rtl' : ''} />
            </button>
          </div>
        </div>

        {/* Compact Single-Row Categories Strip */}
        <div className="category-cards-viewport">
          <button
            type="button"
            className="category-nav-arrow category-nav-arrow--prev"
            onClick={() => handleScroll('left')}
            aria-label="Previous categories"
          >
            <ChevronLeft size={18} className={isRTL ? 'flip-rtl' : ''} />
          </button>

          <div
            className="category-cards-grid category-cards-grid--single-row"
            ref={scrollContainerRef}
          >
            {/* 1. Dedicated "ALL PRODUCTS" Card (خيار العودة الدائم لإظهار كافة المنتجات) */}
            <button
              type="button"
              className={`category-card-compact ${activeCategory === null ? 'is-selected' : ''}`}
              onClick={() => handleCategoryClick(null)}
              title={language === 'ar' ? 'إظهار جميع المنتجات بدون تصفية' : 'Show all products without filter'}
            >
              <div className="cat-compact-badge-row">
                <span className={`cat-compact-pill ${activeCategory === null ? 'is-highlight' : ''}`}>
                  {language === 'ar' ? 'الكل' : 'ALL'}
                </span>
                {activeCategory === null && (
                  <Check size={12} className="cat-compact-check" />
                )}
              </div>

              <div className="cat-compact-media cat-compact-media--all">
                <LayoutGrid size={24} className="cat-compact-all-icon" />
              </div>

              <div className="cat-compact-content">
                <h4 className="cat-compact-title">
                  {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
                </h4>
                <span className="cat-compact-count">
                  {language === 'ar' ? 'كافة الهواتف' : 'Full Catalog'}
                </span>
              </div>
            </button>

            {/* 2. Specific Category Cards */}
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-card-compact ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="cat-compact-badge-row">
                    <span className={`cat-compact-pill ${isSelected ? 'is-highlight' : ''}`}>
                      {cat.itemCount}+
                    </span>
                    {isSelected && (
                      <Check size={12} className="cat-compact-check" />
                    )}
                  </div>

                  <div className="cat-compact-media">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="cat-compact-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="cat-compact-content">
                    <h4 className="cat-compact-title">
                      {language === 'ar' ? cat.nameAr : cat.name}
                    </h4>
                    <span className="cat-compact-count">
                      {language === 'ar' ? cat.badgeAr || `${cat.itemCount} جهاز` : cat.badge || `${cat.itemCount} items`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="category-nav-arrow category-nav-arrow--next"
            onClick={() => handleScroll('right')}
            aria-label="Next categories"
          >
            <ChevronRight size={18} className={isRTL ? 'flip-rtl' : ''} />
          </button>
        </div>
      </div>
    </section>
  );
};
