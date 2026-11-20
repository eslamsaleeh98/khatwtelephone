import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigateTo
  } = useStore();
  const { t, language } = useLanguage();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <Heart size={20} fill="#E53E3E" stroke="#E53E3E" />
            <h3 className="drawer-title">{t.wishlistTitle} ({wishlist.length})</h3>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="cart-empty-state">
            <Heart size={48} className="cart-empty-icon" stroke="#9CA3AF" />
            <p className="cart-empty-title">{t.wishlistEmpty}</p>
            <p className="cart-empty-desc">{t.wishlistEmptyDesc}</p>
            <button
              className="cart-continue-btn"
              onClick={() => {
                setIsWishlistOpen(false);
                navigateTo('products');
              }}
            >
              {t.startShopping}
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item__image"
                  onClick={() => {
                    navigateTo('product-detail', product.id);
                    setIsWishlistOpen(false);
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <div className="cart-item__info">
                  <div className="cart-item__top">
                    <h4
                      className="cart-item__title"
                      onClick={() => {
                        navigateTo('product-detail', product.id);
                        setIsWishlistOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {language === 'ar' ? product.nameAr : product.name}
                    </h4>
                    <button
                      className="cart-item__remove"
                      onClick={() => toggleWishlist(product.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <span className="cart-item__cat">
                    {language === 'ar' ? product.categoryAr : product.category}
                  </span>
                  <div className="cart-item__bottom" style={{ marginTop: '8px' }}>
                    <span className="cart-item__price">${product.price.toFixed(2)}</span>
                    <button
                      className="wishlist-add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={14} />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
