import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Car, Wrench, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { carBrands, carModels, carYears, commonProblems } from '@/data/mock';
import { useSearchStore, useCarStore } from '@/store';

export function SearchSection() {
  const [searchType, setSearchType] = useState<'product' | 'problem' | 'service'>('product');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { setFilters, search } = useSearchStore();
  const { selectedCar } = useCarStore();

  const handleSearch = async () => {
    setFilters({ 
      query: searchQuery,
      brand: selectedBrand,
    });
    await search(searchQuery);
  };

  const handleProblemClick = (problem: string) => {
    setSearchQuery(problem);
    setSearchType('service');
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
              بحث عن منتج
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
              عندك مشكلة؟
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
              خدمات
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
                    placeholder="ابحث عن قطع الغيار..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark pr-12 text-right"
                  />
                </div>
              </div>
              
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder="الماركة" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  {carBrands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id} className="text-right">
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select disabled={!selectedBrand}>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder="الموديل" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  {selectedBrand && carModels[selectedBrand]?.map((model) => (
                    <SelectItem key={model} value={model} className="text-right">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder="السنة" />
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
                اختر المشكلة التي تواجهك وسنوجهك للحل المناسب
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
                    placeholder="ابحث عن خدمة..."
                    className="input-dark pr-12 text-right"
                  />
                </div>
              </div>
              
              <Select>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder="نوع الخدمة" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  <SelectItem value="diagnostic" className="text-right">فحص وتشخيص</SelectItem>
                  <SelectItem value="maintenance" className="text-right">صيانة دورية</SelectItem>
                  <SelectItem value="repair" className="text-right">إصلاح</SelectItem>
                  <SelectItem value="installation" className="text-right">تركيب</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="input-dark text-right">
                  <SelectValue placeholder="المنطقة" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F1F1F] border-white/10">
                  <SelectItem value="doha" className="text-right">الدوحة</SelectItem>
                  <SelectItem value="westbay" className="text-right">الخليج الغربي</SelectItem>
                  <SelectItem value="alkhor" className="text-right">الخور</SelectItem>
                  <SelectItem value="wakra" className="text-right">الوكرة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <Button
              size="lg"
              className="btn-primary px-12"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              بحث
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
                السيارة المختارة: {selectedCar.brand} {selectedCar.model} {selectedCar.year}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
