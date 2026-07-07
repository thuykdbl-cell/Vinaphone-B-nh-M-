/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Mail, Phone, Globe, MessageSquare, Home, Award, ChevronRight, Map } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-20 pb-28 md:pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
          
          {/* Brand block */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-container to-blue-500 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl font-black">cell_tower</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight leading-none">VinaPhone</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">VNPT Bình Mỹ</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 font-semibold italic leading-relaxed">
              Kết nối giá trị – Đồng hành vững chắc cùng mọi khách hàng trên mọi nẻo đường.
            </p>

            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact block */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6 pb-2 border-b border-slate-800 max-w-[100px]">Liên hệ</h4>
            <ul className="space-y-4 text-xs sm:text-sm font-semibold">
              <li className="flex items-start gap-3 text-slate-400 leading-relaxed">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>774 Trần Hưng Đạo, Bình Mỹ, Ninh Bình</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>hotro@vnptbinhmy.vn</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>Hotline: 0912.xxx.xxx</span>
              </li>
            </ul>
          </div>

          {/* Links block */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6 pb-2 border-b border-slate-800 max-w-[100px]">Liên kết</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => scrollToSection('benefits')} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  Về chúng tôi
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('packages')} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  Gói cước ưu đãi
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  Quy trình 5 bước
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  Câu hỏi thường gặp
                </button>
              </li>
            </ul>
          </div>

          {/* Map block */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6 pb-2 border-b border-slate-800 max-w-[100px]">Bản đồ</h4>
            <div className="rounded-2xl overflow-hidden h-36 bg-slate-800 border border-slate-800 flex flex-col items-center justify-center relative group shadow-inner">
              <Map className="w-10 h-10 text-primary-container group-hover:scale-105 transition-transform" />
              <p className="text-[10px] text-slate-500 font-extrabold mt-2.5 uppercase tracking-widest">Bình Mỹ, Ninh Bình</p>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

        </div>

        {/* CopyRight row */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-500 font-semibold flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p>© 2026 VinaPhone VNPT Bình Mỹ. Bảo lưu mọi quyền.</p>
          <p className="text-slate-600 text-[10px]">Phát triển bởi VNPT Ninh Bình Digital Platform</p>
        </div>

      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/95 backdrop-blur-xl border-t border-slate-100 h-20 px-4 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-t-2xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          <Home className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Trang chủ</span>
        </button>
        
        <button
          onClick={() => scrollToSection('packages')}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          <Award className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Gói cước</span>
        </button>
        
        <button
          onClick={() => scrollToSection('register')}
          className="flex flex-col items-center justify-center bg-accent text-white rounded-full w-14 h-14 shadow-lg shadow-orange-500/30 -translate-y-5 border-4 border-white cursor-pointer active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
        </button>
        
        <button
          onClick={() => scrollToSection('faq')}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">help</span>
          <span className="text-[10px] font-bold">Hỏi đáp</span>
        </button>
      </nav>
    </footer>
  );
}
