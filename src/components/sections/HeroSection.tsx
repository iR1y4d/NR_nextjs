'use client';

import { motion } from 'framer-motion';
import { Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function HeroSection() {
  const { language, t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-6 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
              {language === 'en' ? 'Welcome to AL-Rakiza AL- jadida' : 'مرحباً بكم في الركيزة الجديدة'}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {t('hero_title')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group flex items-center space-x-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <Phone className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
              <span>{t('hero_cta_contact')}</span>
            </a>

            <a
              href="#services"
              className="group flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold transition-all backdrop-blur-sm"
            >
              <span>{t('hero_cta_services')}</span>
              <ArrowRight
                className={`w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:translate-x-1 ${
                  language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-sm mb-2">{language === 'en' ? 'Scroll Down' : 'انتقل للأسفل'}</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
