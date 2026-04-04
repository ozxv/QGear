import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { shops, services, productOffers, products } from '@/data/mock';

export default function GaragePage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shop = shops.find((s) => String(s.id) === String(id));

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-6 pt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{t('shopNotFound')}</h1>
        </div>
      </div>
    );
  }

  const shopName = isArabic ? shop.name : shop.nameEn || shop.name;
  const shopDescription = isArabic
    ? shop.description
    : shop.descriptionEn || shop.description;

  const shopServices = services.filter((service) => service.shopId === shop.id);

  const shopOffers = productOffers
    .filter((offer) => offer.shopId === shop.id)
    .map((offer) => {
      const product = products.find((p) => p.id === offer.productId);
      return {
        ...offer,
        productName: isArabic
          ? product?.name || t('unknownPart')
          : product?.nameEn || product?.name || t('unknownPart'),
      };
    });

  // نخليه بالعربي لأن أيام العمل المخزنة بالعربي
  const todayName = new Intl.DateTimeFormat('ar', {
    weekday: 'long',
  }).format(new Date());

  const todayWorkingHour = shop.workingHours.find((item) => item.day === todayName);
  const isOpenNow = todayWorkingHour?.isOpen ?? false;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 px-6 pb-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] to-[#0A0A0A] p-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#DC2626]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-bold">{shopName}</h1>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isOpenNow
                        ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                        : 'bg-red-600/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isOpenNow ? t('openNow') : t('closedNow')}
                  </span>
                </div>

                <p className="text-white/70 leading-7 max-w-3xl">{shopDescription}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {shop.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 min-w-[260px] space-y-3">
                <div className="text-sm text-white/60">{t('shopRating')}</div>
                <div className="text-3xl font-bold">{shop.rating} ⭐</div>
                <div className="text-sm text-white/50">
                  {t('verifiedShop')}: {shop.isVerified ? t('yes') : t('no')}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white/50 mb-1">{t('address')}</div>
                <div className="text-white">{shop.address}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white/50 mb-1">{t('phone')}</div>
                <div className="text-white">{shop.phone}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white/50 mb-1">{t('email')}</div>
                <div className="text-white break-all">{shop.email}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white/50 mb-1">{t('joinedAt')}</div>
                <div className="text-white">
                  {new Date(shop.joinedAt).toLocaleDateString(isArabic ? 'ar' : 'en')}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${shop.phone}`}
                className="bg-[#DC2626] hover:bg-[#B91C1C] transition-colors px-5 py-3 rounded-xl font-medium"
              >
                {t('callShop')}
              </a>

              <a
                href={`mailto:${shop.email}`}
                className="bg-white/10 hover:bg-white/20 transition-colors px-5 py-3 rounded-xl font-medium"
              >
                {t('sendEmail')}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('workingHours')}</h2>

          <div className="bg-[#111] rounded-2xl border border-white/10 p-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shop.workingHours.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{item.day}</div>
                    <div className="text-sm text-white/60 mt-1">
                      {item.isOpen ? `${item.open} - ${item.close}` : t('closed')}
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.isOpen
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-red-600/20 text-red-400'
                    }`}
                  >
                    {item.isOpen ? t('open') : t('closed')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('services')}</h2>

          {shopServices.length === 0 ? (
            <div className="bg-[#111] rounded-xl border border-white/10 p-5 text-white/60">
              {t('noServicesForShop')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {shopServices.map((service) => {
                const serviceName = isArabic
                  ? service.name
                  : service.nameEn || service.name;

                const serviceDescription = isArabic
                  ? service.description
                  : service.descriptionEn || service.description;

                return (
                  <div
                    key={service.id}
                    className="bg-[#111] rounded-2xl border border-white/10 p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold">{serviceName}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20">
                        {t('serviceLabel')}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm leading-6">
                      {serviceDescription}
                    </p>

                    <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10">
                      <span className="text-[#DC2626] font-bold">
                        {service.priceType === 'starting_from'
                          ? `${t('startsFrom')} ${service.price} ${t('currencyQAR')}`
                          : `${service.price} ${t('currencyQAR')}`}
                      </span>
                      <span className="text-white/50">{service.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('availableParts')}</h2>

          {shopOffers.length === 0 ? (
            <div className="bg-[#111] rounded-xl border border-white/10 p-5 text-white/60">
              {t('noPartOffersForShop')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {shopOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden"
                >
                  <div className="bg-[#1a1a1a] p-4">
                    <img
                      src={offer.image}
                      alt={offer.productName}
                      className="w-full h-44 object-contain"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold">{offer.productName}</h3>
                      <span className="text-[#DC2626] font-bold text-lg whitespace-nowrap">
                        {offer.price} {t('currencyQAR')}
                      </span>
                    </div>

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
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                        }`}
                      >
                        {offer.availability === 'in_stock'
                          ? t('available')
                          : t('notAvailable')}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm leading-6">{offer.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}