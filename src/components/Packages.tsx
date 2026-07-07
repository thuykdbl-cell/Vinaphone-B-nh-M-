/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { PACKAGES } from '../data';
import { Package } from '../types';
import { Sparkles, Check, Flame, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (pkgName: string) => void;
}

type FilterType = 'all' | 'data' | 'voice' | 'yearly';

export default function Packages({ onSelectPackage }: PackagesProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [maxBudget, setMaxBudget] = useState<number>(200000); // 100k to 200k for slider, or more for yearly

  // Filter logic
  const filteredPackages = PACKAGES.filter((pkg) => {
    // Check Budget filter (yearly packages are 1.5M, so we handle it as special if filter is yearly)
    const isYearly = pkg.id === 'U1500';
    
    // Budget slider check
    if (activeFilter !== 'yearly' && !isYearly) {
      if (pkg.priceValue > maxBudget) return false;
    }

    // Tab category filter
    if (activeFilter === 'data') {
      return pkg.id === 'YOLO100M' || pkg.id === 'SODA125';
    }
    if (activeFilter === 'voice') {
      return pkg.id === 'VD120M' || pkg.id === 'D159V';
    }
    if (activeFilter === 'yearly') {
      return isYearly;
    }
    
    return true;
  });

  const handleChoosePackage = (pkgName: string) => {
    onSelectPackage(pkgName);
    const element = document.getElementById('register');
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
    <section id="packages" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Gói Cước Ưu Đãi Nhất
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Lựa chọn gói cước phù hợp với nhu cầu sử dụng thực tế và ngân sách của bạn.
          </p>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* Interactive Filters Panel */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl mb-12 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Category tabs */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                Lọc theo nhu cầu sử dụng
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tất cả gói' },
                  { id: 'data', label: 'Chỉ cần Data' },
                  { id: 'voice', label: 'Data + Gọi thoại' },
                  { id: 'yearly', label: 'Gói năm tiết kiệm' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id as FilterType)}
                    className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider (Only show when not on yearly tab) */}
            {activeFilter !== 'yearly' && (
              <div className="space-y-2.5 flex-grow max-w-xs md:border-l md:border-slate-200/80 md:pl-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Ngân sách tối đa</span>
                  <span className="text-primary font-extrabold normal-case text-sm">
                    {maxBudget >= 200000 ? 'Không giới hạn' : `${maxBudget / 1000}k / tháng`}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="200000"
                  step="20000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>100K/tháng</span>
                  <span>150K/tháng</span>
                  <span>200K+</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const isBestSeller = pkg.isHot;
            return (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`glass-card rounded-3xl overflow-hidden flex flex-col hover-lift relative ${
                  isBestSeller
                    ? 'border-2 border-accent scale-103 md:scale-105 z-10 shadow-2xl bg-gradient-to-b from-white to-orange-50/10'
                    : 'border border-slate-200/60 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Hot badge */}
                {isBestSeller && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shadow-sm animate-bounce">
                    <Flame className="w-3 h-3 fill-white" />
                    Hot
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`p-6 text-center ${
                    isBestSeller
                      ? 'bg-accent text-white'
                      : 'bg-primary text-white'
                  }`}
                >
                  <h3 className="text-2xl font-black tracking-tight">{pkg.name}</h3>
                  <p className="text-xs font-semibold opacity-90 mt-1 uppercase tracking-widest">
                    {pkg.targetGroup}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">{pkg.price}</span>
                    <span className="text-slate-500 font-bold text-sm">
                      {pkg.id === 'U1500' ? '/12 tháng' : '/tháng'}
                    </span>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3.5">
                      <span className="material-symbols-outlined text-primary text-2xl font-bold">
                        database
                      </span>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dung lượng</p>
                        <p className="text-sm font-extrabold text-slate-800 leading-none mt-0.5">{pkg.dataPerDay}</p>
                      </div>
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm">
                      {pkg.extraBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-semibold text-slate-700 leading-tight">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {pkg.voiceInternal && (
                        <li className="flex items-start gap-2.5 font-semibold text-slate-700 leading-tight">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pkg.voiceInternal}</span>
                        </li>
                      )}
                      {pkg.voiceExternal && (
                        <li className="flex items-start gap-2.5 font-semibold text-slate-700 leading-tight">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pkg.voiceExternal}</span>
                        </li>
                      )}
                      {pkg.notIncluded && pkg.notIncluded.map((notPkg, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-400 font-medium leading-tight">
                          <AlertCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          <span>{notPkg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleChoosePackage(pkg.name)}
                    className={`w-full py-4.5 rounded-2xl font-bold text-sm uppercase transition-all tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                      isBestSeller
                        ? 'bg-accent text-white orange-glow hover:scale-[1.03]'
                        : 'bg-primary text-white hover:bg-primary/95 hover:shadow-lg'
                    }`}
                  >
                    <span>{isBestSeller ? 'Đăng ký ngay' : 'Chọn gói này'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic empty state */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-xl mx-auto">
            <p className="text-slate-500 font-bold">Không tìm thấy gói cước phù hợp với bộ lọc.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setMaxBudget(200000);
              }}
              className="mt-3 text-primary text-sm font-extrabold underline cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
