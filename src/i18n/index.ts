import i18n from 'i18next'; 
import { initReactI18next } from 'react-i18next';


const resources = {
  ar: {
    translation: {
      // Navbar
      search: "بحث",
      products: "منتجات",
      services: "الخدمات",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      myCars: "سياراتي",
      settings: "الإعدادات",
      changeLanguage: "English",

      home: "الرئيسية",
      store: "المتجر",
      searchNav: "البحث",
      contact: "تواصل معنا",

      // General
      yes: "نعم",
      no: "لا",
      currencyQAR: "ر.ق",
      startsFrom: "يبدأ من",

      // Hero Section
      heroBadge: "منصة قطع الغيار الأولى في قطر",
      heroTitleLine1: "قطع غيار و",
      heroTitleLine2: "إكسسوارات السيارات",
      heroSubtitle:
        "اكتشف تشكيلتنا الواسعة من قطع الغيار الأصلية والإكسسوارات عالية الجودة. نوفر لك تجربة تسوق سهلة مع أفضل المحلات والمراكز في قطر.",
      heroShopNow: "تسوق الآن",
      heroLearnMore: "اعرف المزيد",
      heroScrollDown: "اسحب للأسفل",
      heroStatProducts: "منتج",
      heroStatShops: "محل",
      heroStatCustomers: "عميل",
      heroStatSupport: "دعم",

      // Categories Section
      categoriesBadge: "الفئات",
      browseBy: "تصفح حسب",
      category: "الفئة",
      categoriesSubtitle: "اختر الفئة المناسبة لتجد ما تبحث عنه بسهولة",
      spareParts: "قطع الغيار",
      accessories: "الإكسسوارات",
      viewAllCategories: "عرض جميع الفئات",

      // Services Section
      servicesBadge: "خدماتنا",
      servicesTitle: "خدمات",
      servicesHighlight: "الصيانة",
      servicesSubtitle: "احجز خدمات الصيانة والفحص مع أفضل المراكز في قطر",
      price: "السعر",
      bookNow: "احجز الآن",
      viewAllServices: "عرض جميع الخدمات",

      // Search Section
      searchProductTab: "بحث عن منتج",
      haveProblemTab: "عندك مشكلة؟",
      servicesTab: "خدمات",
      searchPartsPlaceholder: "ابحث عن قطع الغيار...",
      brandPlaceholder: "الماركة",
      modelPlaceholder: "الموديل",
      yearPlaceholder: "السنة",
      problemHelpText: "اختر المشكلة التي تواجهك وسنوجهك لأقرب نتيجة مناسبة",
      searchServicePlaceholder: "ابحث عن خدمة أو قطعة مرتبطة بالخدمة...",
      serviceTypePlaceholder: "نوع الخدمة",
      regionPlaceholder: "المنطقة",
      diagnosticService: "فحص وتشخيص",
      maintenanceService: "صيانة دورية",
      repairService: "إصلاح",
      installationService: "تركيب",
      regionDoha: "الدوحة",
      regionWestBay: "الخليج الغربي",
      regionAlKhor: "الخور",
      regionWakra: "الوكرة",
      selectedCarLabel: "السيارة المختارة",
      searchNoResults:
        "ما لقينا نتيجة مطابقة الآن. جرّب اسم قطعة مثل: فحمات، بطارية، فلتر زيت",

      // Product
      productNotFound: "المنتج غير موجود",
      partType: "نوع القطعة",
      available: "متوفر",
      notAvailable: "غير متوفر",
      original: "أصلي",
      commercial: "تجاري",

      // Offers
      cheapest: "الأرخص",
      delivery: "توصيل",
      pickup: "استلام",
      orderNow: "اطلب الآن",
      viewShop: "عرض المحل",
      noOffersAvailable: "لا توجد عروض متاحة",

      // Featured Products
      featuredProductsBadge: "منتجات مميزة",
      featuredProductsTitle: "أفضل",
      featuredProductsHighlight: "القطع",
      viewAll: "عرض الكل",
      shopsProvideIt: "محل يوفرها",
      noShopsAvailable: "لا توجد محلات",

      // Garage / Shop
      shopNotFound: "المحل غير موجود",
      shopRating: "تقييم المحل",
      verifiedShop: "محل موثق",
      address: "العنوان",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      joinedAt: "تاريخ الانضمام",
      callShop: "اتصال",
      sendEmail: "إرسال بريد",
      workingHours: "أوقات العمل",
      open: "مفتوح",
      closed: "مغلق",
      openNow: "مفتوح الآن",
      closedNow: "مغلق الآن",

      // Services / Garage
      noServicesForShop: "لا توجد خدمات لهذا المحل",
      serviceLabel: "خدمة",

      // Parts
      availableParts: "القطع المتوفرة",
      noPartOffersForShop: "لا توجد قطع متوفرة",
      unknownPart: "قطعة غير معروفة",

      // Product Page
      shopsProvidingPart: "المحلات التي توفر هذه القطعة",
      compareOffersText: "قارن بين العروض واختر الأنسب",
    },
  },

  en: {
    translation: {
      // Navbar
      search: "Search",
      products: "Products",
      services: "Services",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
      myCars: "My Cars",
      settings: "Settings",
      changeLanguage: "عربي",

      home: "Home",
      store: "Store",
      searchNav: "Search",
      contact: "Contact Us",

      // General
      yes: "Yes",
      no: "No",
      currencyQAR: "QAR",
      startsFrom: "Starts from",

      // Hero Section
      heroBadge: "The leading spare parts platform in Qatar",
      heroTitleLine1: "Spare Parts &",
      heroTitleLine2: "Car Accessories",
      heroSubtitle:
        "Discover our wide range of original spare parts and high-quality accessories. We provide you with an easy shopping experience with the best shops and service centers in Qatar.",
      heroShopNow: "Shop Now",
      heroLearnMore: "Learn More",
      heroScrollDown: "Scroll Down",
      heroStatProducts: "Products",
      heroStatShops: "Shops",
      heroStatCustomers: "Customers",
      heroStatSupport: "Support",

      // Categories Section
      categoriesBadge: "Categories",
      browseBy: "Browse by",
      category: "Category",
      categoriesSubtitle: "Choose the right category to find what you need easily",
      spareParts: "Spare Parts",
      accessories: "Accessories",
      viewAllCategories: "View All Categories",

      // Services Section
      servicesBadge: "Our Services",
      servicesTitle: "Maintenance",
      servicesHighlight: "Services",
      servicesSubtitle:
        "Book maintenance and inspection services with the best centers in Qatar",
      price: "Price",
      bookNow: "Book Now",
      viewAllServices: "View All Services",

      // Search Section
      searchProductTab: "Search Product",
      haveProblemTab: "Have a problem?",
      servicesTab: "Services",
      searchPartsPlaceholder: "Search for spare parts...",
      brandPlaceholder: "Brand",
      modelPlaceholder: "Model",
      yearPlaceholder: "Year",
      problemHelpText:
        "Choose the issue you have and we will guide you to the closest matching result",
      searchServicePlaceholder: "Search for a service or related part...",
      serviceTypePlaceholder: "Service Type",
      regionPlaceholder: "Region",
      diagnosticService: "Diagnostics",
      maintenanceService: "Maintenance",
      repairService: "Repair",
      installationService: "Installation",
      regionDoha: "Doha",
      regionWestBay: "West Bay",
      regionAlKhor: "Al Khor",
      regionWakra: "Al Wakra",
      selectedCarLabel: "Selected Car",
      searchNoResults:
        "No matching result found right now. Try a part name like: brake pads, battery, oil filter",

      // Product
      productNotFound: "Product not found",
      partType: "Part type",
      available: "Available",
      notAvailable: "Not available",
      original: "Original",
      commercial: "Aftermarket",

      // Offers
      cheapest: "Cheapest",
      delivery: "Delivery",
      pickup: "Pickup",
      orderNow: "Order Now",
      viewShop: "View Shop",
      noOffersAvailable: "No offers available",

      // Featured Products
      featuredProductsBadge: "Featured Products",
      featuredProductsTitle: "Best",
      featuredProductsHighlight: "Parts",
      viewAll: "View All",
      shopsProvideIt: "shops provide it",
      noShopsAvailable: "No shops available",

      // Garage / Shop
      shopNotFound: "Shop not found",
      shopRating: "Shop Rating",
      verifiedShop: "Verified",
      address: "Address",
      phone: "Phone",
      email: "Email",
      joinedAt: "Joined At",
      callShop: "Call",
      sendEmail: "Send Email",
      workingHours: "Working Hours",
      open: "Open",
      closed: "Closed",
      openNow: "Open Now",
      closedNow: "Closed Now",

      // Services / Garage
      noServicesForShop: "No services for this shop",
      serviceLabel: "Service",

      // Parts
      availableParts: "Available Parts",
      noPartOffersForShop: "No parts available",
      unknownPart: "Unknown part",

      // Product Page
      shopsProvidingPart: "Shops providing this part",
      compareOffersText: "Compare offers and choose the best",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
