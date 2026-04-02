import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBookingStore, useUIStore, useCarStore } from '@/store';
import { carBrands, carModels, carYears, shops } from '@/data/mock';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export function BookingModal() {
  const { currentModal, setCurrentModal } = useUIStore();
  const { selectedService, selectedShop, selectedDate, selectedTime, setShop, setDate, setTime, clearBooking } = useBookingStore();
  const { selectedCar } = useCarStore();
  
  const [step, setStep] = useState(1);
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = currentModal === 'booking';

  const handleClose = () => {
    setCurrentModal(null);
    clearBooking();
    setStep(1);
    setIsSuccess(false);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">اختر المركز</h3>
            <div className="grid gap-4 max-h-64 overflow-y-auto">
              {shops.map((shop) => (
                <button
                  key={shop.id}
                  onClick={() => setShop(shop)}
                  className={`p-4 border rounded-lg text-right transition-all ${
                    selectedShop?.id === shop.id
                      ? 'border-[#DC2626] bg-[#DC2626]/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{shop.name}</h4>
                      <p className="text-white/60 text-sm">{shop.address}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-[#DC2626] font-bold">{shop.rating} ⭐</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">اختر التاريخ والوقت</h3>
            
            <div>
              <label className="block text-white/60 text-sm mb-2">التاريخ</label>
              <Input
                type="date"
                value={selectedDate || ''}
                onChange={(e) => setDate(e.target.value)}
                className="input-dark"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">الوقت</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setTime(time)}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      selectedTime === time
                        ? 'border-[#DC2626] bg-[#DC2626]/10 text-white'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">بيانات السيارة</h3>
            
            {selectedCar ? (
              <div className="p-4 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Car className="w-8 h-8 text-[#DC2626]" />
                  <div>
                    <h4 className="text-white font-medium">
                      {selectedCar.brand} {selectedCar.model}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {selectedCar.year} - {selectedCar.trim}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Select>
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

                <Select>
                  <SelectTrigger className="input-dark text-right">
                    <SelectValue placeholder="الموديل" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] border-white/10">
                    {carModels.toyota?.map((model) => (
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
                  <SelectContent className="bg-[#1F1F1F] border-white/10">
                    {carYears.map((year) => (
                      <SelectItem key={year} value={year.toString()} className="text-right">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-white/60 text-sm mb-2">وصف المشكلة</label>
              <Textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="اشرح المشكلة التي تواجهك..."
                className="input-dark min-h-[100px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">تأكيد الحجز</h3>
            
            <div className="space-y-3 bg-[#1F1F1F] rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-white/60">الخدمة:</span>
                <span className="text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">المركز:</span>
                <span className="text-white">{selectedShop?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">التاريخ:</span>
                <span className="text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">الوقت:</span>
                <span className="text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">السعر:</span>
                <span className="text-[#DC2626] font-bold">{selectedService?.price} ر.ق</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-500 text-sm text-center">
                سيتم خصم عربون 50 ر.ق عند تأكيد الحجز
              </p>
            </div>
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
                      <ChevronRight className="w-5 h-5 text-white/60" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-white">حجز خدمة</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex px-6 pt-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        s <= step
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {s < step ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          s < step ? 'bg-[#DC2626]' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      تم الحجز بنجاح!
                    </h3>
                    <p className="text-white/60 mb-6">
                      سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
                    </p>
                    <Button onClick={handleClose} className="btn-primary">
                      موافق
                    </Button>
                  </div>
                ) : (
                  <>
                    {renderStep()}

                    {/* Actions */}
                    <div className="mt-6">
                      {step < 4 ? (
                        <Button
                          onClick={handleNext}
                          className="w-full btn-primary"
                          disabled={
                            (step === 1 && !selectedShop) ||
                            (step === 2 && (!selectedDate || !selectedTime))
                          }
                        >
                          التالي
                          <ChevronLeft className="w-5 h-5 mr-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          className="w-full btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            'تأكيد الحجز'
                          )}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
