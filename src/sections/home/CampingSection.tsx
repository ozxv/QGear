import { motion } from 'framer-motion';
import { Tent, Thermometer, Lightbulb, Battery, Gauge, Package, ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { campingProducts } from '@/data/mock';
import { useCartStore, useFavoritesStore } from '@/store';

const iconMap: Record<string, React.ElementType> = {
  tents: Tent,
  fridges: Thermometer,
  lights: Lightbulb,
  power: Battery,
  tools: Gauge,
  storage: Package,
};

export function CampingSection() {
  const { addToCart } = useCartStore();
  const { toggleProduct, isProductFavorite } = useFavoritesStore();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg text-[#DC2626] text-sm font-medium mb-4">
              البر والتخييم
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              مستلزمات <span className="text-[#DC2626]">البر</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md">
            كل ما تحتاجه لرحلات البر والتخييم من أفضل الموردين
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campingProducts.map((product, index) => {
            const Icon = iconMap[product.category] || Package;
            const isFavorite = isProductFavorite(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative bg-gradient-to-br from-[#1F1F1F] to-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden card-hover">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0] || '/placeholder-camping.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#DC2626]/80 text-white">
                        <Icon className="w-3 h-3 mr-1" />
                        {product.category}
                      </Badge>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleProduct(product.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-[#DC2626]"
                    >
                      <Heart 
                        className={`w-5 h-5 ${isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : 'text-white'}`} 
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DC2626] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-white/40">السعر</span>
                        <p className="text-xl font-bold text-[#DC2626]">
                          {product.price} ر.ق
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product as any)}
                        className="btn-primary"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        أضف للسلة
                      </Button>
                    </div>
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
            عرض جميع منتجات البر
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
