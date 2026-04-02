import { motion } from 'framer-motion';
import { 
  Wrench, 
  Calendar, 
  Settings, 
  ClipboardCheck, 
  Gauge,
  ArrowLeft,
  Clock,
  Star,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/mock';
import { useBookingStore, useUIStore } from '@/store';

const iconMap: Record<string, React.ElementType> = {
  diagnostic: ClipboardCheck,
  inspection: ClipboardCheck,
  maintenance: Wrench,
  installation: Settings,
  alignment: Gauge,
  programming: Wrench,
};

export function ServicesSection() {
  const { setService } = useBookingStore();
  const { setCurrentModal } = useUIStore();

  const handleBookService = (service: typeof services[0]) => {
  setService(service);
  setCurrentModal('booking');
};

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg text-[#DC2626] text-sm font-medium mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            خدمات <span className="text-[#DC2626]">الصيانة</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            احجز خدمات الصيانة والفحص مع أفضل المراكز في قطر
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.category] || Wrench;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group h-full bg-gradient-to-br from-[#1F1F1F] to-[#0A0A0A] border border-white/10 rounded-lg p-6 hover:border-[#DC2626]/50 transition-all card-hover">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center justify-center group-hover:bg-[#DC2626]/20 group-hover:scale-110 transition-all">
                      <Icon className="w-7 h-7 text-[#DC2626]" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white/80">{service.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DC2626] transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Clock className="w-4 h-4 text-[#DC2626]" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="w-4 h-4 text-[#DC2626]" />
                      <span>{service.shop.name}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-white/40">السعر</span>
                      <p className="text-lg font-bold text-[#DC2626]">
                        {service.priceType === 'starting_from' ? 'يبدأ من ' : ''}
                        {service.price} ر.ق
                      </p>
                    </div>
                    <Button
                      onClick={() => handleBookService(service)}
                      className="btn-primary"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      احجز الآن
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
          >
            عرض جميع الخدمات
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
