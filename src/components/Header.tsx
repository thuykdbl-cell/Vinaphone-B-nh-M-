/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Shield, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  isAdminMode: boolean;
}

export default function Header({ onAdminClick, isAdminMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">cell_tower</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-primary tracking-tight leading-none flex items-center gap-1">
                VinaPhone
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                VNPT Bình Mỹ
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center lg:gap-8 md:gap-4">
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Lợi ích
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Gói cước
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Quy trình
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Hỏi đáp
            </button>
            
            {/* Hidden Admin Button for business owners */}
            <button
              onClick={onAdminClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                isAdminMode
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'text-slate-400 border-transparent hover:border-slate-200 hover:text-slate-600'
              }`}
              title="Quản trị viên đăng ký"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Thoát Admin' : 'Quản trị'}</span>
            </button>

            <button
              onClick={() => scrollToSection('register')}
              className="bg-accent text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all orange-glow uppercase cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onAdminClick}
              className={`p-2 rounded-lg border transition-all ${
                isAdminMode
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'text-slate-400 border-transparent'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg px-4 pt-4 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('benefits')}
            className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-all"
          >
            Lợi ích dịch vụ
          </button>
          <button
            onClick={() => scrollToSection('packages')}
            className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-all"
          >
            Gói cước ưu đãi
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-all"
          >
            Quy trình đăng ký
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-all"
          >
            Câu hỏi thường gặp
          </button>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:0912000000"
              className="flex items-center justify-center gap-2 border-2 border-primary/20 text-primary py-3 rounded-full font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Gọi tổng đài hỗ trợ
            </a>
            <button
              onClick={() => scrollToSection('register')}
              className="bg-accent text-white py-3.5 rounded-full font-bold text-sm text-center uppercase orange-glow"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
