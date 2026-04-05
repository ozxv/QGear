import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Cog,
  CircleDot,
  Settings,
  Zap,
  Thermometer,
  Wind,
  Square,
  Lightbulb,
  Monitor,
  Camera,
  Activity,
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { categories, accessoriesCategories } from '@/data/mock';

const iconMap: Record<string, React.ElementType> = {
  Engine: Cog,
  CircleDot,
  Settings,
  Zap,
  Thermometer,
  Wind,
  Square,
  Lightbulb,
  Monitor,
  Camera,
  Activity,
  LayoutGrid,
};

function TiltCard({ children, className = '' }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')}
    >
      {children}
    </div>
  );
}

export function CategoriesSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState<'parts' | 'accessories'>('parts');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  const currentCategories = activeTab === 'parts' ? categories : accessoriesCategories;

  return (
    <section id="categories" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Header */}
        <motion.div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg text-[#DC2626] text-sm font-medium mb-4">
            {t('categoriesBadge')}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('browseBy')}{' '}
            <span className="text-[#DC2626]">{t('category')}</span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto">
            {t('categoriesSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#1F1F1F] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('parts')}
              className={`px-6 py-3 rounded-lg ${
                activeTab === 'parts' ? 'bg-[#DC2626] text-white' : 'text-white/60'
              }`}
            >
              {t('spareParts')}
            </button>

            <button
              onClick={() => setActiveTab('accessories')}
              className={`px-6 py-3 rounded-lg ${
                activeTab === 'accessories' ? 'bg-[#DC2626] text-white' : 'text-white/60'
              }`}
            >
              {t('accessories')}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <ChevronRight />
          </button>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <ChevronLeft />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-16 py-4">
            {currentCategories.map((category) => {
              const Icon = iconMap[category.icon] || Settings;

              const name = isArabic
                ? category.name
                : category.nameEn || category.name;

              const desc = isArabic
                ? category.description
                : category.descriptionEn || category.description;

              return (
                <TiltCard key={category.id} className="w-64">
                  <div className="h-80 bg-[#1F1F1F] border rounded-lg p-6 text-center">
                    <Icon className="w-8 h-8 text-[#DC2626] mx-auto mb-3" />

                    <h3 className="text-white font-bold">{name}</h3>

                    <p className="text-white/60 text-sm">{desc}</p>

                    <div className="text-[#DC2626] mt-2">
                      {category.productCount}+ {t('products')}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <button className="text-[#DC2626]">
            {t('viewAllCategories')}
          </button>
        </div>
      </div>
    </section>
  );
}