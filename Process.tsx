/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { FormInput, PhoneCall, CheckCircle, Flame, Star } from 'lucide-react';

export default function Process() {
  const steps = [
    { number: 1, title: 'Điền thông tin', desc: 'Chọn gói cước và gửi số điện thoại', icon: FormInput },
    { number: 2, title: 'Nhân viên liên hệ', desc: 'Tư vấn chi tiết và xác nhận yêu cầu', icon: PhoneCall },
    { number: 3, title: 'Xác nhận gói', desc: 'Kiểm tra thông tin đấu nối chính chủ', icon: CheckCircle },
    { number: 4, title: 'Kích hoạt', desc: 'Kích hoạt eSIM online hoặc giao sim tận nhà', icon: Flame },
    { number: 5, title: 'Sử dụng', desc: 'Trải nghiệm internet siêu tốc 4G/5G', icon: Star },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Decorative glow elements */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quy Trình Đăng Ký Đơn Giản
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-1 bg-white/20 -z-10 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isAccentStep = step.number === 1 || step.number === 5;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle Icon Container */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shadow-xl transition-all duration-300 ring-8 ${
                        isAccentStep
                          ? 'bg-accent text-white ring-primary'
                          : 'bg-white text-primary ring-primary'
                      } group-hover:scale-110`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {/* Floating mini-step badge */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black">
                      {step.number}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="mt-5 space-y-1">
                    <h3 className="text-lg font-extrabold tracking-wide">{step.title}</h3>
                    <p className="text-xs text-blue-100 font-medium px-4 opacity-90 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
