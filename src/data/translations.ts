export type Language = 'en' | 'ar';

export interface Translations {
  // Top Banner
  freeShippingText: string;
  easyReturnsText: string;
  trackOrder: string;
  helpCenter: string;
  sellOnNovella: string;

  // Header
  searchPlaceholder: string;
  account: string;
  wishlist: string;
  cart: string;
  productsFound: string;
  noProductsFound: string;

  // SubNav
  categories: string;
  allDepartments: string;
  newArrivals: string;
  topDeals: string;
  bestSellers: string;
  flagshipPhones: string;
  appleIphones: string;
  samsungGalaxy: string;
  googlePixel: string;
  smartAccessories: string;
  hotBadge: string;

  // Hero
  heroTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  shopNow: string;
  securePayments: string;
  premiumQuality: string;
  fastDelivery: string;

  // Sections
  shopByCategory: string;
  viewAllCategories: string;
  trendingNow: string;
  recommendedForYou: string;
  viewAllProducts: string;
  viewAllRecommendations: string;
  filteredBy: string;
  clearFilter: string;

  // Product Card & Details
  addToCart: string;
  buyNow: string;
  inStockReady: string;
  reviewsCount: string;
  chooseColor: string;
  selectedColor: string;
  chooseStorage: string;
  selectedStorage: string;
  specifications: string;
  display: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
  features: string;
  backToProducts: string;
  relatedProducts: string;
  reviews: string;

  // Features Bar
  freeShippingTitle: string;
  freeShippingSub: string;
  easyReturnsTitle: string;
  easyReturnsSub: string;
  securePaymentsTitle: string;
  securePaymentsSub: string;
  supportTitle: string;
  supportSub: string;

  // All Products Page & Pagination
  allProductsTitle: string;
  allProductsSubtitle: string;
  allBrands: string;
  sortBy: string;
  sortFeatured: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortRating: string;
  showingPage: string;
  prevPage: string;
  nextPage: string;
  pageOf: string;
  itemsPerPage: string;

  // Cart Drawer
  cartTitle: string;
  freeShippingUnlocked: string;
  addMoreForFreeShipping: string;
  cartEmpty: string;
  cartEmptyDesc: string;
  startShopping: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  proceedToCheckout: string;
  continueShopping: string;
  orderSuccessTitle: string;
  orderSuccessMsg: string;

  // Wishlist Drawer
  wishlistTitle: string;
  wishlistEmpty: string;
  wishlistEmptyDesc: string;

  // Newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
  emailPlaceholder: string;
  subscribeBtn: string;
  subscribedBtn: string;

  // Footer
  footerDesc: string;
  shop: string;
  customerService: string;
  aboutUs: string;
  downloadApp: string;
  downloadAppSub: string;
  rightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    freeShippingText: 'Free shipping on orders over $50',
    easyReturnsText: 'Easy 30-day returns',
    trackOrder: 'Track Order',
    helpCenter: 'Help Center',
    sellOnNovella: 'Sell on Mobily',

    searchPlaceholder: 'Search smartphones, brands, specs...',
    account: 'Account',
    wishlist: 'Wishlist',
    cart: 'Cart',
    productsFound: 'Phones found',
    noProductsFound: 'No phones found matching',

    categories: 'Categories',
    allDepartments: 'All Categories',
    newArrivals: 'New Arrivals',
    topDeals: 'Top Deals',
    bestSellers: 'Best Sellers',
    flagshipPhones: 'Flagships',
    appleIphones: 'Apple iPhone',
    samsungGalaxy: 'Samsung Galaxy',
    googlePixel: 'Google Pixel',
    smartAccessories: 'Accessories',
    hotBadge: 'HOT',

    heroTagline: 'FLAGSHIP PHONES • UNBEATABLE PRICES',
    heroTitle1: 'Next-Gen Smartphones,',
    heroTitle2: 'Delivered to Your Door.',
    heroDesc: 'Discover the latest iPhones, Samsung Galaxy, and Google Pixel flagships with authentic warranty, multi-color choices, and flexible storage options.',
    shopNow: 'Explore Phones',
    securePayments: 'Secure Checkout',
    premiumQuality: '100% Genuine',
    fastDelivery: 'Same Day Dispatch',

    shopByCategory: 'Shop by Category',
    viewAllCategories: 'View all categories',
    trendingNow: 'Trending Smartphones',
    recommendedForYou: 'Recommended for You',
    viewAllProducts: 'View all phones',
    viewAllRecommendations: 'View all recommendations',
    filteredBy: 'Filtered by',
    clearFilter: 'Clear',

    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    inStockReady: 'In Stock & Ready to Ship',
    reviewsCount: 'customer reviews',
    chooseColor: 'Color Option',
    selectedColor: 'Selected Color',
    chooseStorage: 'Storage Capacity',
    selectedStorage: 'Selected Storage',
    specifications: 'Technical Specifications',
    display: 'Display',
    processor: 'Chipset / Processor',
    camera: 'Camera System',
    battery: 'Battery & Charging',
    os: 'Operating System',
    features: 'Key Features',
    backToProducts: 'Back to Store',
    relatedProducts: 'Similar Smartphones',
    reviews: 'reviews',

    freeShippingTitle: 'Free Shipping',
    freeShippingSub: 'On all orders over $50',
    easyReturnsTitle: 'Easy Returns',
    easyReturnsSub: '30-day hassle-free replacement',
    securePaymentsTitle: 'Secure Payments',
    securePaymentsSub: '256-bit encrypted checkout',
    supportTitle: '24/7 Expert Support',
    supportSub: 'Official phone tech assistance',

    allProductsTitle: 'Smartphone Marketplace Catalog',
    allProductsSubtitle: 'Browse our complete lineup of certified flagships, foldables, and accessories.',
    allBrands: 'All Brands',
    sortBy: 'Sort By',
    sortFeatured: 'Featured',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Top Rated',
    showingPage: 'Showing',
    prevPage: 'Previous',
    nextPage: 'Next',
    pageOf: 'of',
    itemsPerPage: 'Phones per page',

    cartTitle: 'Shopping Cart',
    freeShippingUnlocked: '🎉 Congratulations! You unlocked Free Delivery!',
    addMoreForFreeShipping: 'Add {amount} more to unlock Free Shipping!',
    cartEmpty: 'Your shopping cart is empty',
    cartEmptyDesc: 'Discover our newest smartphone models and flagship deals.',
    startShopping: 'Browse Phones',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'FREE',
    total: 'Total Amount',
    proceedToCheckout: 'Proceed to Checkout',
    continueShopping: 'Continue Shopping',
    orderSuccessTitle: 'Order Placed Successfully!',
    orderSuccessMsg: 'Your order confirmation has been sent to your email.',

    wishlistTitle: 'My Wishlist',
    wishlistEmpty: 'Your wishlist is empty',
    wishlistEmptyDesc: 'Save your favorite smartphones by clicking the heart icon.',

    newsletterTitle: 'Stay in the Loop',
    newsletterSubtitle: 'Get early access to flash smartphone sales, pre-order alerts, and discounts.',
    emailPlaceholder: 'Enter your email address',
    subscribeBtn: 'Subscribe',
    subscribedBtn: 'Subscribed!',

    footerDesc: 'Your trusted smartphone destination. Official warranties, direct delivery, and premium flagships. Shop smart with Mobily.',
    shop: 'Shop Smartphones',
    customerService: 'Customer Service',
    aboutUs: 'About Mobily',
    downloadApp: 'Download Our App',
    downloadAppSub: 'Shop phones anywhere on iOS & Android',
    rightsReserved: '© 2025 Mobily Marketplace. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy'
  },
  ar: {
    freeShippingText: 'شحن مجاني للطلبات فوق 50 دولار',
    easyReturnsText: 'إرجاع سهل واستبدال خلال 30 يوماً',
    trackOrder: 'تتبع طلبك',
    helpCenter: 'مركز المساعدة',
    sellOnNovella: 'بيع معنا',

    searchPlaceholder: 'ابحث عن الهواتف، الماركات، المواصفات...',
    account: 'حسابي',
    wishlist: 'المفضلة',
    cart: 'السلة',
    productsFound: 'الهواتف المتاحة',
    noProductsFound: 'لم يتم العثور على هواتف مطابقة لـ',

    categories: 'الأقسام',
    allDepartments: 'جميع الأقسام',
    newArrivals: 'وصل حديثاً',
    topDeals: 'أقوى العروض',
    bestSellers: 'الأكثر مبيعاً',
    flagshipPhones: 'الهواتف الرائدة',
    appleIphones: 'آبل آيفون',
    samsungGalaxy: 'سامسونج جالاكسي',
    googlePixel: 'جوجل بكسل',
    smartAccessories: 'إكسسوارات ذكية',
    hotBadge: 'عروض',

    heroTagline: 'أحدث الهواتف الذكية • بأفضل الأسعار الرسمية',
    heroTitle1: 'كل ما تحبه من الهواتف،',
    heroTitle2: 'في مكان واحد وبضمان رسمي.',
    heroDesc: 'اكتشف أحدث هواتف آيفون وسامسونج وبكسل بألوان متعددة، وسعات تخزين مختلفة، وأسعار منافسة مع تجربة تسوق فورية وسلسة.',
    shopNow: 'تصفح الهواتف الآن',
    securePayments: 'دفع آمن 100%',
    premiumQuality: 'منتجات أصلية مضمونة',
    fastDelivery: 'توصيل فوري وسريع',

    shopByCategory: 'تسوق حسب الفئات',
    viewAllCategories: 'عرض جميع الفئات',
    trendingNow: 'الهواتف الأكثر طلباً',
    recommendedForYou: 'ترشيحات مختارة لك',
    viewAllProducts: 'عرض جميع الهواتف',
    viewAllRecommendations: 'عرض كل الترشيحات',
    filteredBy: 'تصفية حسب',
    clearFilter: 'إلغاء',

    addToCart: 'إضافة إلى السلة',
    buyNow: 'شراء الآن',
    inStockReady: 'متوفر في المخزون وجاهز للشحن الفوري',
    reviewsCount: 'تقييم من المشترين',
    chooseColor: 'اختر اللون',
    selectedColor: 'اللون المحدد',
    chooseStorage: 'سعة التخزين',
    selectedStorage: 'السعة المحددة',
    specifications: 'المواصفات التقنية',
    display: 'الشاشة',
    processor: 'المعالج',
    camera: 'منظومة الكاميرات',
    battery: 'البطارية والشحن',
    os: 'نظام التشغيل',
    features: 'الميزات الرئيسية',
    backToProducts: 'العودة للمتجر',
    relatedProducts: 'هواتف مشابهة قد تعجبك',
    reviews: 'تقييم',

    freeShippingTitle: 'شحن مجاني',
    freeShippingSub: 'للطلبات التي تتجاوز 50$',
    easyReturnsTitle: 'إرجاع سهل',
    easyReturnsSub: 'ضمان استرجاع واستبدال 30 يوم',
    securePaymentsTitle: 'دفع آمن ومحمي',
    securePaymentsSub: 'حماية كاملة ومشفرة 100%',
    supportTitle: 'دعم فني 24/7',
    supportSub: 'فريق متخصص لمساعدتك دائماً',

    allProductsTitle: 'دليل كتالوج الهواتف الذكية',
    allProductsSubtitle: 'تصفح تشكيلتنا الكاملة من الهواتف الرائدة والقابلة للطي والإكسسوارات.',
    allBrands: 'جميع الشركات',
    sortBy: 'ترتيب حسب',
    sortFeatured: 'المميزة أولاً',
    sortPriceAsc: 'السعر: من الأقل للأعلى',
    sortPriceDesc: 'السعر: من الأعلى للأقل',
    sortRating: 'الأعلى تقييماً',
    showingPage: 'عرض',
    prevPage: 'السابق',
    nextPage: 'التالي',
    pageOf: 'من',
    itemsPerPage: 'هواتف بالصفحة',

    cartTitle: 'سلة المشتريات',
    freeShippingUnlocked: '🎉 مبروك! لقد حصلت على شحن قياسي مجاني!',
    addMoreForFreeShipping: 'أضف {amount}$ أخرى لتفعيل الشحن المجاني!',
    cartEmpty: 'سلة مشترياتك فارغة حالياً',
    cartEmptyDesc: 'تصفح أحدث الهواتف والعروض الحصرية لإضافتها إلى سلتك.',
    startShopping: 'ابدأ التسوق',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'المجموع الكلي',
    proceedToCheckout: 'إتمام الطلب والدفع',
    continueShopping: 'متابعة التسوق',
    orderSuccessTitle: 'تم تأكيد طلبك بنجاح!',
    orderSuccessMsg: 'شكراً لتسوقك من موبايلي، تم إرسال تفاصيل الفاتورة لبريدك.',

    wishlistTitle: 'قائمة رغباتي',
    wishlistEmpty: 'قائمة المفضلة فارغة',
    wishlistEmptyDesc: 'احفظ الهواتف التي تنال إعجابك عبر الضغط على أيقونة القلب.',

    newsletterTitle: 'ابقَ على اطلاع دائم',
    newsletterSubtitle: 'اشترك لتصلك أحدث عروض الخصم على الهواتف الجديدة وإشعارات الحجز المسبق.',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    subscribeBtn: 'اشترك الآن',
    subscribedBtn: 'تم الاشتراك!',

    footerDesc: 'وجهتك الموثوقة لأحدث الهواتف الذكية والإكسسوارات الأصلية مع ضمان رسمي وتوصيل فوري. تسوق بذكاء مع موبايلي.',
    shop: 'تسوق الهواتف',
    customerService: 'خدمة العملاء',
    aboutUs: 'عن موبايلي',
    downloadApp: 'حمّل تطبيقنا',
    downloadAppSub: 'تسوق الهواتف بسهولة عبر iOS وأندرويد',
    rightsReserved: '© 2025 موبايلي - جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    cookiePolicy: 'سياسة ملفات الارتباط'
  }
};
