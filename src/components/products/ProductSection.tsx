import React from 'react';
import { ArrowRight, RotateCcw, Smartphone, Sparkles } from 'lucide-react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductSectionProps {
  id: string;
  title: string;
  linkText: string;
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  id,
  title,
  linkText,
  products
}) => {
  const { activeCategory, setActiveCategory, navigateTo } = useStore();
  const { isRTL, language } = useLanguage();

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
    : products;

  return (
    <section className="product-section reveal-on-scroll" id={id}>
      <div className="container">
        <div className="section-header">
          <div className="section-header__title-wrap">
            <h2 className="section-title">
              {title}
              {activeCategory && (
                <span className="section-title-cat-filter">
                  • {activeCategory}
                </span>
              )}
            </h2>

            {/* Quick Reset Button if category is filtered */}
            {activeCategory && (
              <button
                type="button"
                className="section-reset-category-btn"
                onClick={() => setActiveCategory(null)}
                title={language === 'ar' ? 'الرجوع لعرض كافة المنتجات' : 'Reset to show all products'}
              >
                <RotateCcw size={13} />
                <span>{language === 'ar' ? 'عرض جميع الهواتف' : 'Show All Phones'}</span>
              </button>
            )}
          </div>

          <button
            className="section-link-btn"
            onClick={() => navigateTo('products')}
          >
            <span>{linkText}</span>
            <ArrowRight size={16} className={isRTL ? 'flip-rtl' : ''} />
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className={`reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-empty-state-pro">
            <div className="product-empty-icon-wrap">
              <Smartphone size={32} />
            </div>
            <h3>
              {language === 'ar'
                ? `لم يتم العثور على أجهزة بقسم "${activeCategory}" في هذه القائمة`
                : `No devices found in "${activeCategory}" for this section`}
            </h3>
            <p>
              {language === 'ar'
                ? 'يمكنك استكشاف الكتالوج بالكامل أو إعادة ضبط التصفية لعرض جميع الهواتف المتاحة فوراً.'
                : 'You can explore the full catalog or reset the filter to view all available smartphones.'}
            </p>
            <div className="product-empty-actions">
              <button
                type="button"
                className="product-empty-reset-btn"
                onClick={() => setActiveCategory(null)}
              >
                <RotateCcw size={16} />
                <span>{language === 'ar' ? 'العودة لإظهار جميع المنتجات' : 'Show All Products'}</span>
              </button>
              <button
                type="button"
                className="product-empty-catalog-btn"
                onClick={() => navigateTo('products')}
              >
                <Sparkles size={16} />
                <span>{language === 'ar' ? 'تصفح كافة الأقسام' : 'Browse All Departments'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
