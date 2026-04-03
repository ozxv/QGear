import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/mock';
export default function ProductPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">المنتج غير موجود</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-[#111] border border-white/10 rounded-xl p-4">
          <div className="w-full h-[350px] bg-[#1a1a1a] rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={product.images?.[0] || '/placeholder-product.jpg'}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-white/50">{product.shop.name}</p>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#DC2626]">
              {product.price} ر.ق
            </span>

            {product.originalPrice && (
              <span className="text-white/40 line-through">
                {product.originalPrice} ر.ق
              </span>
            )}
          </div>

          <p className="text-white/70">
            {product.description || 'وصف المنتج سيضاف لاحقًا.'}
          </p>

          <div className="space-y-2 text-white/80">
            <p>
              الحالة:{' '}
              <span className="text-white">
                {product.condition === 'original' ? 'أصلي' : 'بديل'}
              </span>
            </p>

            <p>
              التوفر:{' '}
              <span className="text-white">
                {product.availability === 'in_stock' ? 'متوفر' : 'غير متوفر'}
              </span>
            </p>

            <p>
              التقييم: <span className="text-white">{product.rating}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="rounded-lg bg-[#DC2626] px-5 py-3 font-medium hover:bg-[#B91C1C]">
              أضف إلى السلة
            </button>

            <button className="rounded-lg bg-white/10 px-5 py-3 font-medium hover:bg-white/20">
              اطلب الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}