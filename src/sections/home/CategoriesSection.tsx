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
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
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

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function CategoriesSection() {
  const [activeTab, setActiveTab] = useState<'parts' | 'accessories'>('parts');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const currentCategories = activeTab === 'parts' ? categories : accessoriesCategories;

  return (
    <section id="categories" className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg text-[#DC2626] text-sm font-medium mb-4">
            الفئات
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            تصفح حسب <span className="text-[#DC2626]">الفئة</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            اختر الفئة المناسبة لتجد ما تبحث عنه بسهولة
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-[#1F1F1F] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('parts')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'parts'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              قطع الغيار
            </button>
            <button
              onClick={() => setActiveTab('accessories')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'accessories'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              الإكسسوارات
            </button>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1F1F1F] border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-[#DC2626] hover:border-[#DC2626] transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1F1F1F] border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-[#DC2626] hover:border-[#DC2626] transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Categories Grid */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-16 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentCategories.map((category, index) => {
              const Icon = iconMap[category.icon] || Settings;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <TiltCard className="w-64">
                    <div className="group relative h-80 bg-gradient-to-b from-[#1F1F1F] to-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden cursor-pointer card-hover">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity"
                        style={{ backgroundImage: `url(${category.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#DC2626]/20 transition-all">
                          <Icon className="w-8 h-8 text-[#DC2626]" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">
                          {category.name}
                        </h3>
                        
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-[#DC2626] text-sm">
                          <span>{category.productCount}+ منتج</span>
                          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="inline-flex items-center gap-2 text-[#DC2626] hover:text-white transition-colors">
            <span>عرض جميع الفئات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
