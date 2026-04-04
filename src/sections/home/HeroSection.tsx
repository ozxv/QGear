import { motion } from 'framer-motion';
import { ArrowLeft, Play, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ParticlesBackground } from '@/components/effects/ParticlesBackground';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '10K+', label: t('heroStatProducts') },
    { value: '50+', label: t('heroStatShops') },
    { value: '5K+', label: t('heroStatCustomers') },
    { value: '24/7', label: t('heroStatSupport') },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      <ParticlesBackground />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20">
        <div className={`max-w-3xl ${isArabic ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg mb-6"
          >
            <span className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            <span className="text-[#DC2626] text-sm font-medium">{t('heroBadge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('heroTitleLine1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] to-[#EF4444]">
              {t('heroTitleLine2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`text-lg sm:text-xl text-white/70 mb-8 max-w-xl ${isArabic ? 'mr-auto' : 'ml-auto'}`}
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}
          >
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-6"
              onClick={() => scrollToSection('#categories')}
            >
              {t('heroShopNow')}
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-8 py-6"
              onClick={() => scrollToSection('#services')}
            >
              <Play className="w-5 h-5 mr-2" />
              {t('heroLearnMore')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className={`flex flex-wrap gap-8 mt-12 ${isArabic ? 'justify-end' : 'justify-start'}`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#DC2626]">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('#search')}
        >
          <span className="text-white/40 text-sm">{t('heroScrollDown')}</span>
          <ChevronDown className="w-6 h-6 text-[#DC2626]" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#DC2626]/10 rounded-full blur-3xl" />
    </section>
  );
}