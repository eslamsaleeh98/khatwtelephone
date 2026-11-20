import React, { useState } from 'react';
import { Menu, ChevronDown, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

export const SubNav: React.FC = () => {
  const { activeCategory, setActiveCategory, navigateTo } = useStore();
  const { t, language } = useLanguage();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const navItems = [
    { name: t.newArrivals, filter: null, action: () => navigateTo('products') },
    { name: t.topDeals, filter: null, badge: t.hotBadge, action: () => navigateTo('products') },
    { name: t.bestSellers, filter: null, action: () => navigateTo('products') },
    { name: t.appleIphones, filter: 'Apple iPhone', action: () => { setActiveCategory('Apple iPhone'); navigateTo('products'); } },
    { name: t.samsungGalaxy, filter: 'Samsung Galaxy', action: () => { setActiveCategory('Samsung Galaxy'); navigateTo('products'); } },
    { name: t.googlePixel, filter: 'Google Pixel', action: () => { setActiveCategory('Google Pixel'); navigateTo('products'); } },
    { name: t.smartAccessories, filter: 'Power & Cables', action: () => { setActiveCategory('Power & Cables'); navigateTo('products'); } }
  ];

  return (
    <nav className="sub-nav">
      <div className="container sub-nav__inner">
        {/* Categories Dropdown Button */}
        <div className="sub-nav__categories-wrapper">
          <button
            className="categories-trigger-btn"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            aria-expanded={isCategoryMenuOpen}
          >
            <Menu size={18} />
            <span>{t.categories}</span>
            <ChevronDown size={14} className={`chevron ${isCategoryMenuOpen ? 'rotated' : ''}`} />
          </button>

          {isCategoryMenuOpen && (
            <div className="categories-menu-dropdown">
              <div
                className={`categories-menu-item ${activeCategory === null ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveCategory(null);
                  setIsCategoryMenuOpen(false);
                  navigateTo('products');
                }}
              >
                <Sparkles size={16} />
                <span>{t.allDepartments}</span>
              </div>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`categories-menu-item ${activeCategory === cat.name ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setIsCategoryMenuOpen(false);
                    navigateTo('products');
                  }}
                >
                  <img src={cat.image} alt={cat.name} className="categories-menu-thumb" />
                  <span>{language === 'ar' ? cat.nameAr : cat.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Navigation Links */}
        <ul className="sub-nav__links">
          {navItems.map((item, idx) => {
            const isActive = item.filter && activeCategory === item.filter;
            return (
              <li key={idx} className="sub-nav__item">
                <button
                  className={`sub-nav__link ${isActive ? 'is-active' : ''}`}
                  onClick={item.action}
                >
                  {item.badge && (
                    <span className="sub-nav__badge-hot">{item.badge}</span>
                  )}
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
