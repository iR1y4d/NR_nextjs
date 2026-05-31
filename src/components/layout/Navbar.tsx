'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { navItems } from '@/lib/data';

export function Navbar() {
  const { language, t, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <img
              src={isScrolled ? '/NR_nextjs/favicon.svg' : '/NR_nextjs/faviconw.webp'}
              alt="VetMed Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.replace('nav_', '')}`}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? 'text-slate-700' : 'text-white/90'
                  }`}
              >
                {t(item)}
              </a>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`mr-7 flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${isScrolled
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? t('language_ar') : t('language_en')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-white hover:bg-white/20'
              }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.replace('nav_', '')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
                  >
                    {t(item)}
                  </a>
                ))}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'en' ? t('language_ar') : t('language_en')}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
