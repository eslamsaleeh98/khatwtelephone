import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../products/ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

export const AllProductsPage: React.FC = () => {
  const { navigateTo, activeCategory, setActiveCategory } = useStore();
  const { t, language, isRTL } = useLanguage();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Ensure fresh view at top
    window.scrollTo(0, 0);
  }, []);

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand)));
    return ['all', ...list];
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory) {
      list = list.filter(
        p => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      list = list.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, selectedBrand, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="all-products-page page-view-enter">
      <div className="container">
        {/* Header Navigation */}
        <div className="catalog-header">
          <button className="detail-back-btn" onClick={() => navigateTo('home')}>
            <ArrowLeft size={16} className={isRTL ? 'flip-rtl' : ''} />
            <span>{t.backToProducts}</span>
          </button>
          <div className="catalog-title-wrap">
            <h1 className="catalog-title">{t.allProductsTitle}</h1>
            <p className="catalog-subtitle">{t.allProductsSubtitle}</p>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="catalog-category-tabs">
          <button
            className={`cat-tab-btn ${activeCategory === null ? 'is-active' : ''}`}
            onClick={() => {
              setActiveCategory(null);
              setCurrentPage(1);
            }}
          >
            {t.allDepartments}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${activeCategory === cat.name ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(activeCategory === cat.name ? null : cat.name);
                setCurrentPage(1);
              }}
            >
              {language === 'ar' ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>

        {/* Controls Bar: Brands & Sort & Count */}
        <div className="catalog-controls-bar">
          <div className="catalog-brands-filter">
            <SlidersHorizontal size={16} className="catalog-filter-icon" />
            <span className="catalog-filter-label">{t.allBrands}:</span>
            <div className="brand-chips">
              {brands.map((b) => (
                <button
                  key={b}
                  className={`brand-chip ${selectedBrand === b ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedBrand(b);
                    setCurrentPage(1);
                  }}
                >
                  {b === 'all' ? (language === 'ar' ? 'الكل' : 'All') : b}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-sort-wrap">
            <ArrowUpDown size={15} />
            <label htmlFor="sort-select" className="sort-label">{t.sortBy}:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="catalog-sort-select"
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
              <option value="rating">{t.sortRating}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="catalog-pagination">
                <div className="pagination-info">
                  {t.showingPage} <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{' '}
                  <strong>{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> {t.pageOf}{' '}
                  <strong>{filteredProducts.length}</strong>
                </div>

                <div className="pagination-buttons">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={18} className={isRTL ? 'flip-rtl' : ''} />
                    <span>{t.prevPage}</span>
                  </button>

                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          className={`page-num-btn ${currentPage === pageNum ? 'is-active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next Page"
                  >
                    <span>{t.nextPage}</span>
                    <ChevronRight size={18} className={isRTL ? 'flip-rtl' : ''} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="catalog-empty">
            <h3>{t.noProductsFound}</h3>
            <p>Try resetting filters to explore all available smartphones.</p>
            <button
              className="cart-continue-btn"
              onClick={() => {
                setActiveCategory(null);
                setSelectedBrand('all');
                setCurrentPage(1);
              }}
            >
              {t.clearFilter}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
