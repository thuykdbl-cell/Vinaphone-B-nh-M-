/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Zap, Phone, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <header className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Background waves decoration */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -mr-64 -mt-32 animate-pulse" />
        <div className="absolute bottom-12 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -ml-48" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              <span className="inline-flex items-center gap-1 bg-accent text-white px-4.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm orange-glow animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                Chỉ từ 3.300đ/ngày
              </span>
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                5G Ready
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black text-primary leading-tight tracking-tight uppercase"
            >
              Kết nối không giới hạn – <span className="text-accent">Data khủng</span> chỉ từ 3.300đ/ngày
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl"
            >
              Trải nghiệm Internet siêu tốc độ 4G/5G không giới hạn dung lượng truy cập TikTok, Facebook, YouTube, gọi điện thoải mái thả ga, đăng ký dễ dàng nhận sim tận nhà miễn phí.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={onRegisterClick}
                className="bg-accent text-white px-10 py-4.5 rounded-full font-bold text-base hover:scale-105 active:scale-95 hover:shadow-lg transition-all orange-glow text-center uppercase cursor-pointer"
              >
                Đăng ký ngay
              </button>
              <a
                href="tel:0912000000"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-4.5 rounded-full font-bold text-base hover:bg-primary/5 transition-all text-center cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Nhận tư vấn miễn phí
              </a>
            </motion.div>

            {/* Micro value badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100 max-w-lg"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                </div>
                <div>
                  <p className="font-bold text-primary text-sm sm:text-base">Data đến 8GB/ngày</p>
                  <p className="text-xs text-slate-500 font-medium">Tốc độ siêu cao 4G/5G</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl font-bold">call</span>
                </div>
                <div>
                  <p className="font-bold text-primary text-sm sm:text-base">1.500 phút gọi nội mạng</p>
                  <p className="text-xs text-slate-500 font-medium">Miễn phí, không lo giới hạn</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero banner image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, r: 20 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glass background decoration */}
              <div className="glass-card p-4 rounded-[2.5rem] relative z-10 shadow-2xl overflow-hidden border-slate-200/40">
                <img
                  className="w-full h-[450px] sm:h-[520px] object-cover rounded-[1.8rem] hover:scale-102 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsGlK6uzJPS8gfcEYMydCilezioO7eQPP3vmTDLGul-4rOxOmU_TyBDgkNcGtfIfDrfA0Fx0w7l2lnkgWJFiQ7WJCAqQ3oODp6oiEDZPel6KSRwggNR9BHtVkDZVGFAoyNWEeq0BMhyFdpaOyOQUWqXN0XW7_cpBP2Q5j5hbTGnomRITqySigONq1nistivpETuyfDzmqS-c3ITJ-jDZ1DeOjsXiJBnSWtiUgSbJlwole9_XZA91aY"
                  alt="Nhân viên trẻ VNPT tư vấn di động 5G"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -left-6 bg-white py-3 px-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 z-20 hover-lift">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Mạng Cực Khỏe</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Công nghệ VNPT 5G</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white py-3 px-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 z-20 hover-lift">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Giao Tận Nơi</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Miễn phí tại Bình Mỹ</p>
                </div>
              </div>

              {/* Aesthetic light blobs behind image */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
    </header>
  );
}
