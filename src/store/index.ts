import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Car, 
  Product, 
  Service, 
  Shop, 
  CartItem, 
  SearchFilters,
  Booking
} from '@/types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, _password) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          name: 'أحمد محمد',
          email: email,
          phone: '+974 5000 0000',
          savedCars: [],
          favorites: [],
          orders: [],
          bookings: [],
          addresses: [],
          createdAt: new Date(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      register: async (name, email, phone, _password) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          phone: phone,
          savedCars: [],
          favorites: [],
          orders: [],
          bookings: [],
          addresses: [],
          createdAt: new Date(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Cart Store
interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return { items: [...state.items, { product, quantity }] };
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Car Selection Store
interface CarState {
  selectedCar: Car | null;
  savedCars: Car[];
  selectCar: (car: Car) => void;
  saveCar: (car: Car) => void;
  removeSavedCar: (carId: string) => void;
  clearSelectedCar: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      selectedCar: null,
      savedCars: [],
      
      selectCar: (car) => set({ selectedCar: car }),
      
      saveCar: (car) => {
        set((state) => ({
          savedCars: [...state.savedCars.filter(c => c.id !== car.id), car],
        }));
      },
      
      removeSavedCar: (carId) => {
        set((state) => ({
          savedCars: state.savedCars.filter(c => c.id !== carId),
        }));
      },
      
      clearSelectedCar: () => set({ selectedCar: null }),
    }),
    {
      name: 'car-storage',
    }
  )
);

// Search Store
interface SearchState {
  filters: SearchFilters;
  searchResults: Product[];
  isSearching: boolean;
  recentSearches: string[];
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  search: (query: string) => Promise<void>;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      filters: {},
      searchResults: [],
      isSearching: false,
      recentSearches: [],
      
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },
      
      clearFilters: () => set({ filters: {} }),
      
      search: async (query) => {
        set({ isSearching: true });
        
        // Simulate API search
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock results - will be replaced with real API
        const mockResults: Product[] = [];
        
        set({ searchResults: mockResults, isSearching: false });
        
        if (query) {
          get().addRecentSearch(query);
        }
      },
      
      addRecentSearch: (query) => {
        set((state) => ({
          recentSearches: [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 10),
        }));
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage',
    }
  )
);

// Favorites Store
interface FavoritesState {
  products: string[];
  shops: string[];
  toggleProduct: (productId: string) => void;
  toggleShop: (shopId: string) => void;
  isProductFavorite: (productId: string) => boolean;
  isShopFavorite: (shopId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      products: [],
      shops: [],
      
      toggleProduct: (productId) => {
        set((state) => ({
          products: state.products.includes(productId)
            ? state.products.filter(id => id !== productId)
            : [...state.products, productId],
        }));
      },
      
      toggleShop: (shopId) => {
        set((state) => ({
          shops: state.shops.includes(shopId)
            ? state.shops.filter(id => id !== shopId)
            : [...state.shops, shopId],
        }));
      },
      
      isProductFavorite: (productId) => {
        return get().products.includes(productId);
      },
      
      isShopFavorite: (shopId) => {
        return get().shops.includes(shopId);
      },
      
      clearFavorites: () => set({ products: [], shops: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

// UI Store
interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  currentModal: string | null;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleCart: () => void;
  toggleLoginModal: () => void;
  setCurrentModal: (modal: string | null) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  isLoginModalOpen: false,
  currentModal: null,
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  setCurrentModal: (modal) => set({ currentModal: modal }),
  closeAllModals: () => set({ 
    isMobileMenuOpen: false, 
    isSearchOpen: false, 
    isCartOpen: false, 
    isLoginModalOpen: false,
    currentModal: null 
  }),
}));

// Booking Store
interface BookingState {
  currentBooking: Partial<Booking> | null;
  selectedService: Service | null;
  selectedShop: Shop | null;
  selectedDate: string | null;
  selectedTime: string | null;
  setService: (service: Service) => void;
  setShop: (shop: Shop) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setBookingData: (data: Partial<Booking>) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()((set) => ({
  currentBooking: null,
  selectedService: null,
  selectedShop: null,
  selectedDate: null,
  selectedTime: null,
  
  setService: (service) => set({ selectedService: service }),
  setShop: (shop) => set({ selectedShop: shop }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setBookingData: (data) => set((state) => ({ 
    currentBooking: { ...state.currentBooking, ...data } 
  })),
  clearBooking: () => set({ 
    currentBooking: null, 
    selectedService: null, 
    selectedShop: null,
    selectedDate: null,
    selectedTime: null,
  }),
}));
