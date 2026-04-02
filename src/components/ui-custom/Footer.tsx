import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'المتجر', href: '#categories' },
  { name: 'الخدمات', href: '#services' },
  { name: 'من نحن', href: '#about' },
  { name: 'تواصل معنا', href: '#contact' },
];

const serviceLinks = [
  { name: 'قطع الغيار', href: '#' },
  { name: 'الإكسسوارات', href: '#' },
  { name: 'خدمات الصيانة', href: '#' },
  { name: 'حجز المواعيد', href: '#' },
  { name: 'الاستشارات الفنية', href: '#' },
];

const supportLinks = [
  { name: 'الأسئلة الشائعة', href: '#' },
  { name: 'سياسة الإرجاع', href: '#' },
  { name: 'شروط الاستخدام', href: '#' },
  { name: 'سياسة الخصوصية', href: '#' },
  { name: 'الدعم الفني', href: '#' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0A0A0A] border-t border-white/5">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-lg transform rotate-45" />
                <span className="relative text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-wider">GEAR</span>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              منصة QGear هي وجهتك الأولى لقطع غيار السيارات والإكسسوارات وخدمات الصيانة في قطر. 
              نوفر لك تجربة تسوق سهلة وسريعة مع أفضل المحلات والمراكز.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#DC2626]" />
                <span>الدوحة، قطر - منطقة الصناعية</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[#DC2626]" />
                <span>+974 4000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#DC2626]" />
                <span>info@qgear.qa</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Clock className="w-4 h-4 text-[#DC2626]" />
                <span>السبت - الخميس: 8 ص - 8 م</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#DC2626] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">خدماتنا</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#DC2626] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">النشرة البريدية</h3>
            <p className="text-white/60 text-sm mb-4">
              اشترك في نشرتنا البريدية ليصلك أحدث العروض والأخبار
            </p>
            
            <div className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Button className="bg-[#DC2626] hover:bg-[#B91C1C] px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#DC2626] hover:border-[#DC2626] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2024 QGear. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              {supportLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/40 hover:text-white/60 text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
