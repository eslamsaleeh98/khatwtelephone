import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    showToast
  } = useStore();
  const { t, language, isRTL } = useLanguage();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartTotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      showToast(t.orderSuccessTitle, t.orderSuccessMsg, 'success');
      setTimeout(() => {
        clearCart();
        setOrderSuccess(false);
        setIsCartOpen(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className={`drawer-overlay ${isRTL ? 'is-rtl' : 'is-ltr'}`}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <ShoppingBag size={20} />
            <h3 className="drawer-title">{t.cartTitle} ({cartCount})</h3>
          </div>
          <button
            id="close-cart-btn"
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="cart-shipping-meter">
          <div className="cart-shipping-text">
            {cartTotal >= freeShippingThreshold ? (
              <span className="cart-shipping-free">{t.freeShippingUnlocked}</span>
            ) : (
              <span>{t.addMoreForFreeShipping.replace('{amount}', amountNeeded.toFixed(2))}</span>
            )}
          </div>
          <div className="cart-shipping-bar-bg">
            <div
              className="cart-shipping-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content */}
        {orderSuccess ? (
          <div className="cart-order-success">
            <CheckCircle2 size={56} className="cart-success-icon" />
            <h4>{t.orderSuccessTitle}</h4>
            <p>{t.orderSuccessMsg}</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingBag size={48} className="cart-empty-icon" />
            <p className="cart-empty-title">{t.cartEmpty}</p>
            <p className="cart-empty-desc">{t.cartEmptyDesc}</p>
            <button
              className="cart-continue-btn"
              onClick={() => setIsCartOpen(false)}
            >
              {t.startShopping}
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item, index) => {
                const itemPrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
                return (
                  <div key={`${item.product.id}-${index}`} className="cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item__image"
                    />
                    <div className="cart-item__info">
                      <div className="cart-item__top">
                        <h4 className="cart-item__title">
                          {language === 'ar' ? item.product.nameAr : item.product.name}
                        </h4>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeFromCart(index)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Selected Color & Storage Badge */}
                      <div className="cart-item__variant-tags">
                        {item.selectedColor && (
                          <span className="cart-variant-tag">
                            <span
                              className="cart-variant-color-dot"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {language === 'ar' ? item.selectedColor.nameAr : item.selectedColor.name}
                          </span>
                        )}
                        {item.selectedStorage && (
                          <span className="cart-variant-tag">
                            {item.selectedStorage.size}
                          </span>
                        )}
                      </div>

                      <div className="cart-item__bottom">
                        <div className="cart-item__qty-control">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="cart-item__price">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>{t.subtotal}</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <div className="cart-summary-row">
                <span>{t.shipping}</span>
                <span>{cartTotal >= freeShippingThreshold ? t.free : '$5.99'}</span>
              </div>
              <div className="cart-summary-row cart-summary-row--total">
                <span>{t.total}</span>
                <span>
                  ${(cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + 5.99).toFixed(2)}
                </span>
              </div>

              <button
                id="checkout-btn"
                className="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <span>{isCheckingOut ? 'Processing...' : t.proceedToCheckout}</span>
                {!isCheckingOut && <ArrowRight size={18} className={isRTL ? 'flip-rtl' : ''} />}
              </button>

              <button
                id="continue-shopping-btn"
                className="cart-clear-btn"
                onClick={() => setIsCartOpen(false)}
              >
                {t.continueShopping}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
