/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BENEFITS } from '../data';

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="benefits" className="py-20 md:py-28 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Vì sao hàng triệu khách hàng lựa chọn VinaPhone?
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
        >
          {BENEFITS.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover-lift group border border-slate-200/50 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100/50 group-hover:from-primary group-hover:to-primary-container flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-all duration-300">
                  {benefit.icon}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                {benefit.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
