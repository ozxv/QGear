import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useUIStore } from '@/store';

export function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#DC2626]" />
                <h2 className="text-xl font-bold text-white">سلة التسوق</h2>
                <span className="px-2 py-1 bg-[#DC2626]/20 text-[#DC2626] text-sm rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-20 h-20 text-white/20 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    السلة فارغة
                  </h3>
                  <p className="text-white/60 mb-6">
                    أضف بعض المنتجات إلى سلة التسوق
                  </p>
                  <Button
                    onClick={toggleCart}
                    className="btn-primary"
                  >
                    مواصلة التسوق
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 bg-[#1F1F1F] border border-white/10 rounded-lg p-4"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-[#0A0A0A] rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0] || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[#DC2626] font-bold mb-2">
                          {item.product.price} ر.ق
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded bg-white/5 flex items-center justify-center hover:bg-[#DC2626] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded bg-white/5 flex items-center justify-center hover:bg-[#DC2626] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-white/40 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-white/60">
                  <span>المجموع الفرعي</span>
                  <span>{total} ر.ق</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>التوصيل</span>
                  <span>حسب المنطقة</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold text-white pt-4 border-t border-white/10">
                  <span>الإجمالي</span>
                  <span className="text-[#DC2626]">{total} ر.ق</span>
                </div>

                <Button className="w-full btn-primary py-6 text-lg">
                  إتمام الطلب
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-white/40 hover:text-red-500 text-sm transition-colors"
                >
                  إفراغ السلة
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
