import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarStore, useUIStore } from '@/store';
import { carBrands, carModels, carYears } from '@/data/mock';

export function CarSelector() {
  const { currentModal, setCurrentModal } = useUIStore();
  const { savedCars, selectCar, saveCar } = useCarStore();
  
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [trim, setTrim] = useState('');

  const isOpen = currentModal === 'carSelector';

  const handleClose = () => {
    setCurrentModal(null);
    setStep(1);
    setBrand('');
    setModel('');
    setYear('');
    setTrim('');
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const newCar = {
      id: Date.now().toString(),
      brand: carBrands.find(b => b.id === brand)?.name || '',
      model: model,
      year: parseInt(year),
      trim: trim,
    };
    
    saveCar(newCar);
    selectCar(newCar);
    handleClose();
  };

  const handleSelectSavedCar = (car: typeof savedCars[0]) => {
    selectCar(car);
    handleClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">اختر الماركة</h3>
            <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {carBrands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { setBrand(b.id); handleNext(); }}
                  className={`p-4 border rounded-lg text-center transition-all hover:border-[#DC2626] ${
                    brand === b.id ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-white/10'
                  }`}
                >
                  <span className="text-white text-sm">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">اختر الموديل</h3>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {brand && carModels[brand]?.map((m) => (
                <button
                  key={m}
                  onClick={() => { setModel(m); handleNext(); }}
                  className={`p-4 border rounded-lg text-center transition-all hover:border-[#DC2626] ${
                    model === m ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-white/10'
                  }`}
                >
                  <span className="text-white text-sm">{m}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">اختر السنة</h3>
            <div className="grid grid-cols-4 gap-3 max-h-64 overflow-y-auto">
              {carYears.map((y) => (
                <button
                  key={y}
                  onClick={() => { setYear(y.toString()); handleNext(); }}
                  className={`p-3 border rounded-lg text-center transition-all hover:border-[#DC2626] ${
                    year === y.toString() ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-white/10'
                  }`}
                >
                  <span className="text-white text-sm">{y}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">الفئة (اختياري)</h3>
            <div className="grid grid-cols-2 gap-3">
              {['ستاندر', 'نص فل', 'فل كامل', 'فل أوبشن'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTrim(t)}
                  className={`p-4 border rounded-lg text-center transition-all hover:border-[#DC2626] ${
                    trim === t ? 'border-[#DC2626] bg-[#DC2626]/10' : 'border-white/10'
                  }`}
                >
                  <span className="text-white text-sm">{t}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setTrim('')}
              className="w-full p-3 text-white/60 hover:text-white text-sm"
            >
              تخطي
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white/60" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-white">اختيار السيارة</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Saved Cars */}
              {savedCars.length > 0 && step === 1 && (
                <div className="px-6 pt-4">
                  <h3 className="text-sm text-white/60 mb-3">سياراتك المحفوظة</h3>
                  <div className="flex gap-3 overflow-x-auto pb-4">
                    {savedCars.map((car) => (
                      <button
                        key={car.id}
                        onClick={() => handleSelectSavedCar(car)}
                        className="flex-shrink-0 p-3 bg-[#1F1F1F] border border-white/10 rounded-lg hover:border-[#DC2626] transition-colors"
                      >
                        <Car className="w-6 h-6 text-[#DC2626] mx-auto mb-2" />
                        <p className="text-white text-sm">{car.brand}</p>
                        <p className="text-white/60 text-xs">{car.model}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {renderStep()}

                {/* Actions */}
                {step === 4 && (
                  <div className="mt-6">
                    <Button
                      onClick={handleSave}
                      className="w-full btn-primary"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      حفظ السيارة
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
