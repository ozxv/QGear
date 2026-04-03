import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mock';
import { useCartStore, useFavoritesStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export function FeaturedProductsSection() {
  const { addToCart } = useCartStore();
  const { toggleProduct, isProductFavorite } = useFavoritesStore();
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DC2626]/5 rounded-full blur-3xl" />

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
              منتجات مميزة
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              منتجات <span className="text-[#DC2626]">مميزة</span>
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 text-[#DC2626] hover:text-white transition-colors">
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const isFavorite = isProductFavorite(product.id);
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-[#1F1F1F] border border-white/10 rounded-lg overflow-hidden card-hover">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={product.images[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
  size="icon"
  variant="secondary"
  className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-[#DC2626]"
  onClick={() => navigate(`/product/${product.id}`)}
>
  <Eye className="w-4 h-4" />
</Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-[#DC2626]"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {discount > 0 && (
                        <Badge className="bg-[#DC2626] text-white">
                          خصم {discount}%
                        </Badge>
                      )}
                      {product.condition === 'original' && (
                        <Badge className="bg-green-500/80 text-white">
                          أصلي
                        </Badge>
                      )}
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
                    {/* Shop */}
                    <p className="text-xs text-white/50 mb-1">{product.shop.name}</p>
                    
                    {/* Name */}
                    <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-[#DC2626] transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white/80">{product.rating}</span>
                      <span className="text-xs text-white/40">({product.reviews.length})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#DC2626]">
                        {product.price} ر.ق
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-white/40 line-through">
                          {product.originalPrice} ر.ق
                        </span>
                      )}
                    </div>

                    {/* Availability */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        product.availability === 'in_stock' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-white/60">
                        {product.availability === 'in_stock' ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
