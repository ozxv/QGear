import { useEffect } from 'react';
import { Navbar } from '@/components/ui-custom/Navbar';
import { Footer } from '@/components/ui-custom/Footer';
import { CartDrawer } from '@/components/ui-custom/CartDrawer';
import { LoginModal } from '@/components/ui-custom/LoginModal';
import { BookingModal } from '@/components/ui-custom/BookingModal';
import { CarSelector } from '@/components/ui-custom/CarSelector';
import { HeroSection } from '@/sections/home/HeroSection';
import { SearchSection } from '@/sections/home/SearchSection';
import { CategoriesSection } from '@/sections/home/CategoriesSection';
import { FeaturedProductsSection } from '@/sections/home/FeaturedProductsSection';
import { ServicesSection } from '@/sections/home/ServicesSection';
import { BrandsSection } from '@/sections/home/BrandsSection';
import { CampingSection } from '@/sections/home/CampingSection';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Section */}
        <SearchSection />
        
        {/* Categories Section */}
        <CategoriesSection />
        
        {/* Featured Products Section */}
        <FeaturedProductsSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Brands Section */}
        <BrandsSection />
        
        {/* Camping Section */}
        <CampingSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Modals & Drawers */}
      <CartDrawer />
      <LoginModal />
      <BookingModal />
      <CarSelector />
    </div>
  );
}

export default App;
