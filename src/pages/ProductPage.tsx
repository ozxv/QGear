import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { products, productOffers } from '@/data/mock';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  const product = products.find((p) => String(p.id) === String(id));

  const offers = productOffers
    .filter((o) => String(o.productId) === String(id))
    .sort((a, b) => a.price - b.price);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111] rounded-xl p-6 border border-white/10">
            {t('productNotFound')}
          </div>
        </div>
      </div>
    );
  }

  const productName = isArabic ? product.name : product.nameEn || product.name;
  const productDescription = isArabic
    ? product.description
    : product.descriptionEn || product.description;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-[#111] rounded-xl p-4 border border-white/10">
            <img
              src={product.images?.[0] || '/placeholder-product.jpg'}
              alt={productName}
              className="w-full h-[300px] object-contain bg-[#1a1a1a] rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="text-sm text-white/50">{t('partType')}</div>

            <h1 className="text-3xl font-bold">{productName}</h1>

            <p className="text-white/70 leading-7">{productDescription}</p>

            <p className="text-red-500 text-2xl font-bold">
              {t('startsFrom')} {product.price} {t('currencyQAR')}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('shopsProvidingPart')}</h2>
            <p className="text-white/60">{t('compareOffersText')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {offers.map((offer, index) => {
              const shopName = isArabic
                ? offer.shop.name
                : offer.shop.nameEn || offer.shop.name;

              return (
                <div
                  key={offer.id}
                  className="bg-[#111] p-4 rounded-xl space-y-4 border border-white/10 hover:border-[#DC2626]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      {index === 0 && (
                        <div className="text-xs bg-green-500 text-white px-2 py-1 rounded w-fit">
                          {t('cheapest')}
                        </div>
                      )}

                      <h3 className="font-bold text-lg">{shopName}</h3>
                    </div>

                    <p className="text-red-500 font-bold text-xl whitespace-nowrap">
                      {offer.price} {t('currencyQAR')}
                    </p>
                  </div>

                  <img
                    src={offer.image}
                    alt={shopName}
                    className="w-full h-44 object-contain bg-[#1a1a1a] rounded-lg"
                  />

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className={`px-2 py-1 rounded ${
                        offer.condition === 'original'
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}
                    >
                      {offer.condition === 'original' ? t('original') : t('commercial')}
                    </span>

                    {offer.deliveryAvailable && (
                      <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                        {t('delivery')}
                      </span>
                    )}

                    {offer.pickupAvailable && (
                      <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                        {t('pickup')}
                      </span>
                    )}

                    <span
                      className={`px-2 py-1 rounded ${
                        offer.availability === 'in_stock'
                          ? 'bg-emerald-600/20 text-emerald-400'
                          : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {offer.availability === 'in_stock'
                        ? t('available')
                        : t('notAvailable')}
                    </span>
                  </div>

                  <p className="text-white/60 text-sm leading-6">{offer.note}</p>

                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 bg-[#DC2626] px-4 py-2 rounded hover:bg-[#B91C1C] transition-colors">
                      {t('orderNow')}
                    </button>

                    <button
                      onClick={() => navigate(`/garage/${offer.shopId}`)}
                      className="flex-1 bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
                    >
                      {t('viewShop')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {offers.length === 0 && (
            <div className="bg-[#111] rounded-xl p-6 border border-white/10 text-white/60">
              {t('noOffersAvailable')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}