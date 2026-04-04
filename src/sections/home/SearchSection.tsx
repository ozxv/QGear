import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Car, Wrench, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  carBrands,
  carModels,
  carYears,
  commonProblems,
  products,
  searchSynonyms,
} from '@/data/mock';
import { useSearchStore, useCarStore } from '@/store';

export function SearchSection() {
  const [searchType, setSearchType] = useState<'product' | 'problem' | 'service'>('product');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { t, i18n } = useTranslation();
  const { setFilters } = useSearchStore();
  const { selectedCar } = useCarStore();
  const navigate = useNavigate();

  const isArabic = i18n.language === 'ar';

  const normalizeText = (text: string) => text.trim().toLowerCase();

  const findMatchingProduct = (query: string) => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) return null;

    const matchedByName = products.find((product) => {
      const name = normalizeText(product.name);
      const nameEn = normalizeText(product.nameEn || '');
      const description = normalizeText(product.description || '');
      const tags = (product.tags || []).map((tag) => normalizeText(tag));

      return (
        name.includes(normalizedQuery) ||
        nameEn.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        tags.some((tag) => tag.includes(normalizedQuery))
      );
    });

    if (matchedByName) return matchedByName;

    const synonymEntry = Object.entries(searchSynonyms).find(([key, synonyms]) => {
      const normalizedKey = normalizeText(key);
      const normalizedSynonyms = synonyms.map((item) => normalizeText(item));

      return (
        normalizedKey.includes(normalizedQuery) ||
        normalizedSynonyms.some((item) => item.includes(normalizedQuery)) ||
        normalizedSynonyms.some((item) => normalizedQuery.includes(item))
      );
    });

    if (synonymEntry) {
      const [matchedKeyword] = synonymEntry;

      const matchedBySynonym = products.find((product) => {
        const name = normalizeText(product.name);
        const nameEn = normalizeText(product.nameEn || '');
        const description = normalizeText(product.description || '');
        const tags = (product.tags || []).map((tag) => normalizeText(tag));

        return (
          name.includes(normalizeText(matchedKeyword)) ||
          nameEn.includes(normalizeText(matchedKeyword)) ||
          description.includes(normalizeText(matchedKeyword)) ||
          tags.some((tag) => tag.includes(normalizeText(matchedKeyword)))
        );
      });

      if (matchedBySynonym) return matchedBySynonym;
    }

    return null;
  };

  const handleSearch = () => {
    setFilters({
      query: searchQuery,
      brand: selectedBrand,
    });

    const matchedProduct = findMatchingProduct(searchQuery);

    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`);
      return;
    }

    alert(t('searchNoResults'));
  };

  const handleProblemClick = (problem: string) => {
    setSearchQuery(problem);
    setSearchType('product');
  };

  return (
    <section id="search" className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8 xl:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        {/* Search Tabs */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-[#1F1F1F] rounded-t-lg overflow-hidden">
            <button
              onClick={() => setSearchType('product')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                searchType === 'product'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-4 h-4 inline-block ml-2" />
              {t('searchProductTab')}
            </button>

            <button
              onClick={() => setSearchType('problem')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                searchType === 'problem'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <AlertCircle className="w-4 h-4 inline-block ml-2" />
              {t('haveProblemTab')}
            </button>

            <button
              onClick={() => setSearchType('service')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                searchType === 'service'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="w-4 h-4 inline-block ml-2" />
              {t('servicesTab')}
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="glass rounded-b-lg rounded-tl-lg p-6">
          {searchType === 'product' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder={t('searchPartsPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark pr-12 text-right"
                  />
                </div>
              </div>

              <Select
                value={selectedBrand}
                onValueChange={(value) => {
                  setSelectedBrand(value);
                  setSelectedModel('');
                }}
              >
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder={t('brandPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  {carBrands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id} className="text-right">
                      {isArabic ? brand.name : brand.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={!selectedBrand}
              >
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder={t('modelPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  {selectedBrand &&
                    carModels[selectedBrand]?.map((model) => (
                      <SelectItem key={model} value={model} className="text-right">
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder={t('yearPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10 max-h-48">
                  {carYears.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-right">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {searchType === 'problem' && (
            <div className="space-y-4">
              <p className="text-white/60 text-center mb-4">
                {t('problemHelpText')}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {commonProblems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => handleProblemClick(problem.name)}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-[#DC2626]/20 hover:border-[#DC2626]/50 border border-transparent transition-all"
                  >
                    <span className="text-2xl">🔧</span>
                    <span className="text-sm text-white/80 text-center">{problem.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchType === 'service' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Wrench className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder={t('searchServicePlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark pr-12 text-right"
                  />
                </div>
              </div>

              <Select>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder={t('serviceTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  <SelectItem value="diagnostic" className="text-right">
                    {t('diagnosticService')}
                  </SelectItem>
                  <SelectItem value="maintenance" className="text-right">
                    {t('maintenanceService')}
                  </SelectItem>
                  <SelectItem value="repair" className="text-right">
                    {t('repairService')}
                  </SelectItem>
                  <SelectItem value="installation" className="text-right">
                    {t('installationService')}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder={t('regionPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  <SelectItem value="doha" className="text-right">
                    {t('regionDoha')}
                  </SelectItem>
                  <SelectItem value="westbay" className="text-right">
                    {t('regionWestBay')}
                  </SelectItem>
                  <SelectItem value="alkhor" className="text-right">
                    {t('regionAlKhor')}
                  </SelectItem>
                  <SelectItem value="wakra" className="text-right">
                    {t('regionWakra')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <Button size="lg" className="btn-primary px-12" onClick={handleSearch}>
              <Search className="w-5 h-5 mr-2" />
              {t('search')}
            </Button>
          </div>
        </div>

        {/* Selected Car Info */}
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg">
              <Car className="w-4 h-4 text-[#DC2626]" />
              <span className="text-sm text-white/80">
                {t('selectedCarLabel')}: {selectedCar.brand} {selectedCar.model} {selectedCar.year}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}