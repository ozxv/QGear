import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore, useUIStore } from '@/store';

export function LoginModal() {
  const { isLoginModalOpen, toggleLoginModal } = useUIStore();
  const { login, register, isLoading } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      await login(email, password);
    } else {
      await register(name, email, phone, password);
    }
    
    toggleLoginModal();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleLoginModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center">
                <button
                  onClick={toggleLoginModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-white">Q</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">QGEAR</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tabs */}
                <div className="flex mb-6">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-3 text-center font-medium transition-all ${
                      mode === 'login'
                        ? 'text-[#DC2626] border-b-2 border-[#DC2626]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-3 text-center font-medium transition-all ${
                      mode === 'register'
                        ? 'text-[#DC2626] border-b-2 border-[#DC2626]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type="text"
                          placeholder="الاسم الكامل"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-dark pr-12 text-right"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type="tel"
                          placeholder="رقم الهاتف"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="input-dark pr-12 text-right"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-dark pr-12 text-right"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-dark pr-12 pl-12 text-right"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {mode === 'login' && (
                    <div className="flex justify-between items-center text-sm">
                      <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                        <input type="checkbox" className="rounded border-white/20" />
                        تذكرني
                      </label>
                      <button type="button" className="text-[#DC2626] hover:underline">
                        نسيت كلمة المرور؟
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full btn-primary py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin">⏳</span>
                    ) : mode === 'login' ? (
                      'تسجيل الدخول'
                    ) : (
                      'إنشاء حساب'
                    )}
                  </Button>
                </form>

                {/* Switch Mode */}
                <div className="mt-6 text-center">
                  <p className="text-white/60 text-sm">
                    {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                    <button
                      onClick={switchMode}
                      className="text-[#DC2626] mr-1 hover:underline"
                    >
                      {mode === 'login' ? 'سجل الآن' : 'سجل دخولك'}
                    </button>
                  </p>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#0A0A0A] text-white/40">
                        أو سجل باستخدام
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Apple
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
