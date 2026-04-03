import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Car,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuthStore, useCartStore, useUIStore, useCarStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'المتجر', href: '#categories' },
  { name: 'الخدمات', href: '#services' },
  { name: 'البحث', href: '#search' },
  { name: 'تواصل معنا', href: '#footer' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { toggleMobileMenu, toggleCart, toggleLoginModal, setCurrentModal } = useUIStore();
  const { selectedCar } = useCarStore();
  const cartItemsCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
  // إذا مش في الصفحة الرئيسية
  if (window.location.pathname !== '/') {
    window.location.href = '/' + href;
    return;
  }

  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a 
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <span className="relative text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wider">
              GEAR
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="relative text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#DC2626]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Selected Car */}
            {selectedCar && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10"
              >
                <Car className="w-4 h-4 text-[#DC2626]" />
                <span className="text-sm text-white/80">
                  {selectedCar.brand} {selectedCar.model}
                </span>
              </motion.div>
            )}

            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setCurrentModal('search')}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setCurrentModal('favorites')}
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white/80 hover:text-white hover:bg-white/10"
              onClick={toggleCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#1F1F1F] border-white/10">
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <User className="w-4 h-4 ml-2" />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <Car className="w-4 h-4 ml-2" />
                    سياراتي
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <Settings className="w-4 h-4 ml-2" />
                    الإعدادات
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="hidden sm:flex border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                onClick={toggleLoginModal}
              >
                تسجيل الدخول
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white/80 hover:text-white hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </motion.header>
  );
}

function MobileMenu() {
  const { isMobileMenuOpen, toggleMobileMenu, setCurrentModal, toggleLoginModal } = useUIStore();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#0A0A0A]/98 backdrop-blur-lg border-t border-white/5"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-white/80 hover:text-white py-2 text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  toggleMobileMenu();
                  setCurrentModal('search');
                }}
              >
                <Search className="w-4 h-4 ml-2" />
                البحث
              </Button>
              
              {isAuthenticated ? (
                <Button
                  variant="destructive"
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
                  onClick={() => {
                    toggleMobileMenu();
                    logout();
                  }}
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              ) : (
                <Button
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
                  onClick={() => {
                    toggleMobileMenu();
                    toggleLoginModal();
                  }}
                >
                  <User className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
