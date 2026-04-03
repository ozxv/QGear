import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/ui-custom/Navbar';
import { Footer } from '@/components/ui-custom/Footer';
import { HeroSection } from '@/sections/home/HeroSection';
import { SearchSection } from '@/sections/home/SearchSection';
import { CategoriesSection } from '@/sections/home/CategoriesSection';
import { FeaturedProductsSection } from '@/sections/home/FeaturedProductsSection';
import { ServicesSection } from '@/sections/home/ServicesSection';
import { BrandsSection } from '@/sections/home/BrandsSection';
import { CampingSection } from '@/sections/home/CampingSection';
import GaragePage from '@/pages/GaragePage';
import ProductPage from '@/pages/ProductPage';
import './App.css';

function HomePage() {
  return (
    <main>
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <ServicesSection />
      <BrandsSection />
      <CampingSection />
    </main>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garage/:id" element={<GaragePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

<Footer />

{/* <CartDrawer />
<LoginModal />
<BookingModal />
<CarSelector /> */}
    </div>
  );
}

export default App;