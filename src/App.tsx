/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Packages from './components/Packages';
import Personas from './components/Personas';
import Process from './components/Process';
import Faq from './components/Faq';
import RegisterForm from './components/RegisterForm';
import AdminPanel from './components/AdminPanel';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('D159V');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
  };

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
    
    // Smooth scroll to admin panel if activating
    if (!isAdminMode) {
      setTimeout(() => {
        const element = document.getElementById('admin');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleHeroRegisterClick = () => {
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
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden antialiased">
      {/* Global Navigation header */}
      <Header onAdminClick={toggleAdminMode} isAdminMode={isAdminMode} />

      <main className="flex-grow">
        {/* Cinematic Hero Section */}
        <Hero onRegisterClick={handleHeroRegisterClick} />

        {/* 10 core benefits of selecting VinaPhone */}
        <Benefits />

        {/* Dynamic packages presentation and interactive recommendation */}
        <Packages onSelectPackage={handleSelectPackage} />

        {/* Persona targets with appropriate selection triggers */}
        <Personas onSelectPackage={handleSelectPackage} />

        {/* Easy 5-steps registration flowchart */}
        <Process />

        {/* Frequently Asked Questions accordion */}
        <Faq />

        {/* Main conversion Registration form */}
        <RegisterForm selectedPackageName={selectedPackage} />

        {/* Dynamic Admin panel for tracking reservations (Visible on demand) */}
        {isAdminMode && <AdminPanel />}
      </main>

      {/* Floating Smart Virtual Assistant AI Chatbot */}
      <Chatbot />

      {/* Structured Site Footer and Mobile bottom navigation bar */}
      <Footer />
    </div>
  );
}

