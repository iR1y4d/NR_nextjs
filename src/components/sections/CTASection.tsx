'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function CTASection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-white">
            {t('cta_title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-blue-100 leading-relaxed">
            {t('cta_subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl cursor-pointer"
            >
              <span>{t('cta_button')}</span>
              <ArrowRight
                className={`w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 ${
                  language === 'ar' ? 'rotate-180' : ''
                }`}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
