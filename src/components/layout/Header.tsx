import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';
import { BrandLogo } from '../common/BrandLogo';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsWishlistOpen,
    navigateTo
  } = useStore();
  const { t, language } = useLanguage();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameAr.includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="container main-header__inner">
        {/* Brand Logo with dynamic phone and signal line */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
          }}
          aria-label="موبايلي | Mobily"
          style={{ textDecoration: 'none' }}
        >
          <BrandLogo size="normal" />
        </a>

        {/* Search Bar with live search dropdown */}
        <div className="search-bar" ref={searchRef}>
          <div className={`search-bar__input-wrapper ${isSearchFocused ? 'is-focused' : ''}`}>
            <input
              id="global-search-input"
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="search-bar__input"
            />
            {searchQuery && (
              <button
                className="search-bar__clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <button
              id="global-search-btn"
              className="search-bar__button"
              aria-label="Search"
              onClick={() => {
                if (searchQuery.trim()) {
                  navigateTo('products');
                  setIsSearchFocused(false);
                }
              }}
            >
              <Search size={18} />
            </button>
          </div>

          {/* Autocomplete / Live Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                <div className="search-dropdown__list">
                  <div className="search-dropdown__header">
                    <span>{t.productsFound} ({searchResults.length})</span>
                  </div>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-dropdown__item"
                      onClick={() => {
                        navigateTo('product-detail', product.id);
                        setIsSearchFocused(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="search-dropdown__thumb"
                      />
                      <div className="search-dropdown__info">
                        <span className="search-dropdown__title">
                          {language === 'ar' ? product.nameAr : product.name}
                        </span>
                        <span className="search-dropdown__meta">
                          {product.brand} • <strong>${product.price.toFixed(2)}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-dropdown__empty">
                  {t.noProductsFound} "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="header-actions">
          <button id="header-account-btn" className="header-action-btn" title={t.account}>
            <User size={20} className="header-action-btn__icon" />
            <span className="header-action-btn__label">{t.account}</span>
          </button>

          <button
            id="header-wishlist-btn"
            className="header-action-btn"
            title={t.wishlist}
            onClick={() => setIsWishlistOpen(true)}
          >
            <div className="header-action-btn__badge-wrap">
              <Heart size={20} className="header-action-btn__icon" />
              {wishlist.length > 0 && (
                <span className="header-badge">{wishlist.length}</span>
              )}
            </div>
            <span className="header-action-btn__label">{t.wishlist}</span>
          </button>

          <button
            id="header-cart-btn"
            className="header-action-btn"
            title={t.cart}
            onClick={() => setIsCartOpen(true)}
          >
            <div className="header-action-btn__badge-wrap">
              <ShoppingBag size={20} className="header-action-btn__icon" />
              {cartCount > 0 && (
                <span className="header-badge header-badge--cart">{cartCount}</span>
              )}
            </div>
            <span className="header-action-btn__label">{t.cart}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
