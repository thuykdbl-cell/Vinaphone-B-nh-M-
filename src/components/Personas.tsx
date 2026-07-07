/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PERSONAS } from '../data';
import { Persona } from '../types';

interface PersonasProps {
  onSelectPackage: (pkgName: string) => void;
}

export default function Personas({ onSelectPackage }: PersonasProps) {
  const handleSelectPersona = (persona: Persona) => {
    onSelectPackage(persona.recommendedPackageId);
    
    // Smooth scroll to register form
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
    <section className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Gói Cước Cho Riêng Bạn
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* Persona cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {PERSONAS.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectPersona(persona)}
              className="glass-card p-6 rounded-3xl text-center flex flex-col items-center justify-between group hover:border-primary/20 hover:bg-white hover:shadow-xl hover-lift cursor-pointer"
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* Avatar with circle styling */}
                <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover"
                    src={persona.avatarUrl}
                    alt={persona.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-primary">{persona.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed px-2">
                    {persona.description}
                  </p>
                </div>
              </div>

              {/* Package Badge button */}
              <div className="w-full mt-6">
                <div className="bg-primary/5 text-primary text-xs font-extrabold py-3 px-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-all tracking-wider uppercase">
                  Đăng ký: {persona.recommendedPackageName}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
