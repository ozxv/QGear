import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Car,
  ChevronDown,
  LogOut,
  Settings,
  Languages,
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
  { key: 'home', href: '#hero' },
  { key: 'store', href: '#categories' },
  { key: 'services', href: '#services' },
  { key: 'searchNav', href: '#search' },
  { key: 'contact', href: '#footer' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { toggleMobileMenu, toggleCart, toggleLoginModal, setCurrentModal } = useUIStore();
  const { selectedCar } = useCarStore();
  const cartItemsCount = getTotalItems();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
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
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <span className="relative text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wider">GEAR</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-white/80 hover:text-white transition-colors py-2 text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {t(link.key)}
                <motion.span
                  className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#DC2626]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 px-3"
              onClick={toggleLanguage}
              title={t('changeLanguage')}
            >
              <Languages className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">
                {i18n.language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </Button>

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

            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setCurrentModal('search')}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setCurrentModal('favorites')}
            >
              <Heart className="w-5 h-5" />
            </Button>

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
                    {t('profile')}
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <Car className="w-4 h-4 ml-2" />
                    {t('myCars')}
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <Settings className="w-4 h-4 ml-2" />
                    {t('settings')}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="hidden sm:flex border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                onClick={toggleLoginModal}
              >
                {t('login')}
              </Button>
            )}

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

      <MobileMenu />
    </motion.header>
  );
}

function MobileMenu() {
  const { t, i18n } = useTranslation();
  const { isMobileMenuOpen, toggleMobileMenu, setCurrentModal, toggleLoginModal } = useUIStore();
  const { isAuthenticated, logout } = useAuthStore();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const scrollToSection = (href: string) => {
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
                key={link.key}
                href={link.href}
                className="block text-white/80 hover:text-white py-2 text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu();
                  scrollToSection(link.href);
                }}
              >
                {t(link.key)}
              </a>
            ))}

            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={toggleLanguage}
            >
              <Languages className="w-4 h-4 ml-2" />
              {i18n.language === 'ar' ? 'EN' : 'عربي'}
            </Button>

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
                {t('search')}
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
                  {t('logout')}
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
                  {t('login')}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}