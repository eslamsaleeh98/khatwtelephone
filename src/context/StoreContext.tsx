import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Product, ProductColor, ProductStorage } from '../types/product';
import type { CartItem, ToastMessage } from '../types/cart';
import { products } from '../data/products';

export type ActiveView = 'home' | 'products' | 'product-detail' | 'categories';

interface StoreContextType {
  currentView: ActiveView;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  activeCategory: string | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  toasts: ToastMessage[];
  cartCount: number;
  cartTotal: number;
  // Navigation
  navigateTo: (view: ActiveView, productId?: string) => void;
  // Cart Actions
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: ProductColor,
    selectedStorage?: ProductStorage
  ) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Search & Filter
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string | null) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Initial cart with 2 items matching badge
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        product: products[0], // iPhone 16 Pro Max
        quantity: 1,
        selectedColor: products[0].colors[0],
        selectedStorage: products[0].storageOptions[0]
      },
      {
        product: products[8], // AirPods Pro 2
        quantity: 1,
        selectedColor: products[8].colors[0],
        selectedStorage: products[8].storageOptions[0]
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['phone-2']); // Galaxy S25 Ultra
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Track and restore scroll position when navigating to/from product details
  const savedScrollPosition = useRef<number>(0);
  const isInternalNav = useRef<boolean>(false);

  // Hash-based history navigation support
  useEffect(() => {
    const handleHashChange = () => {
      if (isInternalNav.current) return;
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 0) {
          savedScrollPosition.current = currentScroll;
        }
        const id = hash.replace('product/', '');
        setSelectedProductId(id);
        setCurrentView('product-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === 'products' || hash === 'all-products' || hash === 'shop') {
        const wasInDetail = currentView === 'product-detail';
        setCurrentView('products');
        if (wasInDetail && savedScrollPosition.current > 0) {
          const restoreY = savedScrollPosition.current;
          setTimeout(() => {
            window.scrollTo({ top: restoreY, behavior: 'smooth' });
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (hash === 'categories') {
        setCurrentView('categories');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const wasInDetail = currentView === 'product-detail';
        setCurrentView('home');
        if (wasInDetail && savedScrollPosition.current > 0) {
          const restoreY = savedScrollPosition.current;
          setTimeout(() => {
            window.scrollTo({ top: restoreY, behavior: 'smooth' });
          }, 80);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const navigateTo = (view: ActiveView, productId?: string) => {
    isInternalNav.current = true;
    if (view === 'product-detail' && productId) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        savedScrollPosition.current = currentScroll;
      }
      setSelectedProductId(productId);
      setCurrentView('product-detail');
      window.location.hash = `product/${productId}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => { isInternalNav.current = false; }, 120);
      return;
    }

    const wasInDetail = currentView === 'product-detail';
    setCurrentView(view);

    if (productId) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        savedScrollPosition.current = currentScroll;
      }
      setSelectedProductId(productId);
      window.location.hash = `product/${productId}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (view === 'products') {
      window.location.hash = 'products';
      if (wasInDetail && savedScrollPosition.current > 0) {
        const restoreY = savedScrollPosition.current;
        setTimeout(() => {
          window.scrollTo({ top: restoreY, behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (view === 'categories') {
      window.location.hash = 'categories';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Returning to 'home'
      window.location.hash = '';
      if (wasInDetail && savedScrollPosition.current > 0) {
        const restoreY = savedScrollPosition.current;
        setTimeout(() => {
          window.scrollTo({ top: restoreY, behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setTimeout(() => { isInternalNav.current = false; }, 120);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId) || null;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const delta = item.selectedStorage?.priceDelta || 0;
    return sum + (item.product.price + delta) * item.quantity;
  }, 0);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: ProductColor,
    selectedStorage?: ProductStorage
  ) => {
    const chosenColor = selectedColor || product.colors[0];
    const chosenStorage = selectedStorage || product.storageOptions[0];

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedColor?.name === chosenColor?.name &&
          item.selectedStorage?.size === chosenStorage?.size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: chosenColor,
          selectedStorage: chosenStorage
        }
      ];
    });

    showToast(
      'Added to Cart',
      `${product.name} (${chosenColor?.name || ''}, ${chosenStorage?.size || ''}) added!`,
      'cart'
    );
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Removed', 'Phone removed from your cart.', 'info');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', `${product?.name || 'Item'} removed.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${product?.name || 'Phone'} saved!`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <StoreContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedProduct,
        cart,
        wishlist,
        searchQuery,
        activeCategory,
        quickViewProduct,
        isCartOpen,
        isWishlistOpen,
        toasts,
        cartCount,
        cartTotal,
        navigateTo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setSearchQuery,
        setActiveCategory,
        openQuickView,
        closeQuickView,
        setIsCartOpen,
        setIsWishlistOpen,
        showToast,
        dismissToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
