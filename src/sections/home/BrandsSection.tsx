import { motion } from 'framer-motion';
import { carBrands } from '@/data/mock';

export function BrandsSection() {
  // Double the brands for seamless loop
  const allBrands = [...carBrands, ...carBrands];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A]" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-4"
        >
          <span className="inline-block px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg text-[#DC2626] text-sm font-medium mb-4">
            الماركات
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            الماركات <span className="text-[#DC2626]">المدعومة</span>
          </h2>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

          {/* Marquee Track */}
          <div className="flex overflow-hidden">
            <div className="flex gap-12 marquee-track">
              {allBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-32 h-20 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#DC2626]/50 transition-all cursor-pointer">
                    <span className="text-white/60 group-hover:text-white font-semibold text-lg transition-colors">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Reverse Direction */}
        <div className="relative mt-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

          <div className="flex overflow-hidden">
            <div 
              className="flex gap-12"
              style={{
                animation: 'marquee 30s linear infinite reverse',
              }}
            >
              {[...allBrands].reverse().map((brand, index) => (
                <div
                  key={`${brand.id}-rev-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-32 h-20 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#DC2626]/50 transition-all cursor-pointer">
                    <span className="text-white/40 group-hover:text-white/80 text-sm transition-colors">
                      {brand.nameEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
