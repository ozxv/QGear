// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  savedCars: Car[];
  favorites: string[];
  orders: Order[];
  bookings: Booking[];
  addresses: Address[];
  createdAt: Date;
}

// Car Types
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  trim?: string;
  engine?: string;
  image?: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  compatibility: CarCompatibility[];
  condition: 'original' | 'aftermarket' | 'used';
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  quantity: number;
  shopId: string;
  shop: Shop;
  rating: number;
  reviews: Review[];
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
  deliveryTime?: string;
  warranty?: string;
  tags: string[];
  createdAt: Date;
}

export interface CarCompatibility {
  brand: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  priceType: 'fixed' | 'starting_from';
  duration: string;
  category: string;
  shopId: string;
  shop: Shop;
  rating: number;
  reviews: Review[];
  availableSlots: TimeSlot[];
  images: string[];
  tags: string[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

// Shop Types
export interface Shop {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  logo: string;
  coverImage?: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email?: string;
  workingHours: WorkingHours[];
  rating: number;
  reviews: Review[];
  products: Product[];
  services: Service[];
  categories: string[];
  isVerified: boolean;
  isActive: boolean;
  joinedAt: Date;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  discount: number;
  finalTotal: number;
  status: OrderStatus;
  deliveryType: 'delivery' | 'pickup';
  address?: Address;
  shopId: string;
  shop: Shop;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'new'
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'rejected';

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  service: Service;
  shopId: string;
  shop: Shop;
  car: Car;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string;
  problemDescription?: string;
  price: number;
  paymentStatus: 'pending' | 'deposit_paid' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus =
  | 'new'
  | 'pending_confirmation'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'rejected'
  | 'no_show';

// Review Types
export interface Review {
  id: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  images?: string[];
  type: 'product' | 'shop' | 'service';
  targetId: string;
  createdAt: Date;
}

// Address Types
export interface Address {
  id: string;
  userId: string;
  name: string;
  street: string;
  building?: string;
  floor?: string;
  apartment?: string;
  area: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn?: string;
  image: string;
  icon: string;
  subcategories: Subcategory[];
  productCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
  productCount: number;
}

// Common Problem Types
export interface CommonProblem {
  id: string;
  name: string;
  nameEn?: string;
  icon: string;
  category: string;
}

// Search Types
export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  model?: string;
  year?: number;
  priceMin?: number;
  priceMax?: number;
  condition?: string;
  availability?: string;
  delivery?: boolean;
  pickup?: boolean;
  rating?: number;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'booking' | 'promotion' | 'system';
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Admin Types
export interface DashboardStats {
  totalUsers: number;
  totalShops: number;
  totalProducts: number;
  totalOrders: number;
  totalBookings: number;
  revenue: number;
  recentOrders: Order[];
  recentBookings: Booking[];
  topProducts: Product[];
  topShops: Shop[];
}

// Camping Gear Types
export interface CampingProduct {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  shopId: string;
  shop: Shop;
  rating: number;
  availability: string;
  tags: string[];
}
