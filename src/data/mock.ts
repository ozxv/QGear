import type {
  Product,
  Service,
  Shop,
  Category,
  Review,
  CampingProduct,
  CommonProblem,
} from '@/types';

import oilFilterImg from '../assets/oil-filter.jpg';
import batteryImg from '../assets/battery.jpg';
import brakePadImg from '../assets/brake-pad.jpg';

// =========================
// CAR BRANDS
// =========================
export const carBrands = [
  { id: 'toyota', name: 'تويوتا', nameEn: 'Toyota' },
  { id: 'nissan', name: 'نيسان', nameEn: 'Nissan' },
];

// =========================
// CAR MODELS
// =========================
export const carModels: Record<string, string[]> = {
  toyota: ['كامري', 'كورولا', 'لاند كروزر'],
  nissan: ['باترول', 'التيما', 'سنترا'],
  lexus: ['LX', 'RX', 'ES'],
  bmw: ['X5', 'X6'],
  mercedes: ['C-Class', 'E-Class'],
};

// =========================
// YEARS
// =========================
export const carYears = Array.from({ length: 25 }, (_, i) => 2025 - i);

// =========================
// CATEGORIES
// =========================
export const categories: Category[] = [
  {
    id: 'engine',
    name: 'محرك السيارة',
    nameEn: 'Engine',
    description: 'قطع المحرك',
    descriptionEn: 'Engine parts',
    image: '',
    icon: 'Engine',
    subcategories: [],
    productCount: 0,
  },
];

// =========================
// ACCESSORIES CATEGORIES
// =========================
export const accessoriesCategories: Category[] = [
  {
    id: 'screens',
    name: 'شاشات',
    nameEn: 'Screens',
    description: 'شاشات سيارات وأنظمة ترفيه',
    descriptionEn: 'Car screens and infotainment systems',
    image: '/categories/screens.jpg',
    icon: 'Monitor',
    subcategories: [],
    productCount: 120,
  },
  {
    id: 'cameras',
    name: 'كاميرات',
    nameEn: 'Cameras',
    description: 'كاميرات خلفية وكاميرات مراقبة',
    descriptionEn: 'Rear cameras and monitoring cameras',
    image: '/categories/cameras.jpg',
    icon: 'Camera',
    subcategories: [],
    productCount: 85,
  },
  {
    id: 'sensors',
    name: 'حساسات',
    nameEn: 'Sensors',
    description: 'حساسات ركن وحساسات مختلفة',
    descriptionEn: 'Parking sensors and other sensors',
    image: '/categories/sensors.jpg',
    icon: 'Activity',
    subcategories: [],
    productCount: 95,
  },
  {
    id: 'mats',
    name: 'دعاسات',
    nameEn: 'Floor Mats',
    description: 'دعاسات داخلية للسيارة',
    descriptionEn: 'Interior floor mats for cars',
    image: '/categories/mats.jpg',
    icon: 'LayoutGrid',
    subcategories: [],
    productCount: 150,
  },
];

// =========================
// SERVICES (BILINGUAL)
// =========================
export const services: Service[] = [
  {
    id: '1',
    name: 'فحص كمبيوتر',
    nameEn: 'Computer Diagnostics',
    description: 'فحص شامل بجهاز الكمبيوتر',
    descriptionEn: 'Full car diagnostics using computer',
    price: 150,
    priceType: 'fixed',
    duration: '30 دقيقة',
    category: 'diagnostic',
    shopId: 'shop1',
    shop: {} as Shop,
    rating: 4.8,
    reviews: [],
    availableSlots: [],
    images: [],
    tags: ['diagnostic'],
  },
];

// =========================
// SHOPS (BILINGUAL)
// =========================
export const shops: Shop[] = [
  {
    id: 'shop1',
    name: 'مركز القمة',
    nameEn: 'Al Qimma Center',
    description: 'مركز صيانة سيارات',
    descriptionEn: 'Car service center',
    logo: '',
    address: 'الدوحة',
    location: { lat: 0, lng: 0 },
    phone: '0000',
    workingHours: [],
    rating: 4.8,
    reviews: [],
    products: [],
    services: [],
    categories: ['service'],
    isVerified: true,
    isActive: true,
    joinedAt: new Date(),
  },
];

// =========================
// PRODUCTS (BILINGUAL)
// =========================
export const products: Product[] = [
  {
    id: 'prod1',
    name: 'فحمات فرامل',
    nameEn: 'Brake Pads',
    description: 'فحمات فرامل أصلية',
    descriptionEn: 'Original brake pads',
    price: 180,
    images: [brakePadImg],
    category: 'brakes',
    brand: 'Generic',
    compatibility: [],
    condition: 'original',
    availability: 'in_stock',
    quantity: 100,
    shopId: 'shop1',
    shop: shops[0],
    rating: 4.8,
    reviews: [],
    deliveryAvailable: true,
    pickupAvailable: true,
    tags: ['brake'],
    createdAt: new Date(),
  },
  {
    id: 'prod2',
    name: 'بطارية',
    nameEn: 'Battery',
    description: 'بطارية سيارة',
    descriptionEn: 'Car battery',
    price: 200,
    images: [batteryImg],
    category: 'electrical',
    brand: 'Generic',
    compatibility: [],
    condition: 'original',
    availability: 'in_stock',
    quantity: 100,
    shopId: 'shop1',
    shop: shops[0],
    rating: 4.9,
    reviews: [],
    deliveryAvailable: true,
    pickupAvailable: true,
    tags: ['battery'],
    createdAt: new Date(),
  },
  {
    id: 'prod3',
    name: 'فلتر زيت',
    nameEn: 'Oil Filter',
    description: 'فلتر زيت محرك',
    descriptionEn: 'Engine oil filter',
    price: 30,
    images: [oilFilterImg],
    category: 'engine',
    brand: 'Generic',
    compatibility: [],
    condition: 'original',
    availability: 'in_stock',
    quantity: 100,
    shopId: 'shop1',
    shop: shops[0],
    rating: 4.7,
    reviews: [],
    deliveryAvailable: true,
    pickupAvailable: true,
    tags: ['oil'],
    createdAt: new Date(),
  },
];

// =========================
// OFFERS
// =========================
export const productOffers = [
  {
    id: 'offer1',
    productId: 'prod1',
    shopId: 'shop1',
    shop: shops[0],
    price: 180,
    image: brakePadImg,
    condition: 'original',
    availability: 'in_stock',
    deliveryAvailable: true,
    pickupAvailable: true,
    note: 'متوفر',
  },
];

// =========================
// CAMPING
// =========================
export const campingProducts: CampingProduct[] = [
  {
    id: 'camp1',
    name: 'خيمة',
    description: 'خيمة للرحلات',
    price: 1000,
    images: [],
    category: 'tents',
    brand: 'Generic',
    shopId: 'shop1',
    shop: shops[0],
    rating: 4.5,
    availability: 'in_stock',
    tags: ['camp'],
  },
];

// =========================
// PROBLEMS (BILINGUAL)
// =========================
export const commonProblems: CommonProblem[] = [
  {
    id: '1',
    name: 'صوت فرامل',
    nameEn: 'Brake noise',
    icon: 'AlertCircle',
    category: 'brakes',
  },
  {
    id: '2',
    name: 'لمبة المكينة',
    nameEn: 'Check engine light',
    icon: 'AlertTriangle',
    category: 'engine',
  },
];

// =========================
// SEARCH
// =========================
export const searchSynonyms: Record<string, string[]> = {
  فحمات: ['brake'],
  بطارية: ['battery'],
  فلتر: ['filter'],
};

// =========================
// REVIEWS
// =========================
export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    user: {} as any,
    rating: 5,
    comment: 'ممتاز',
    type: 'product',
    targetId: 'prod1',
    createdAt: new Date(),
  },
];