'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { pillars } from '@/lib/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function PartnersSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="partners"
      className="py-24 bg-slate-50 overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-4 border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-full"
          >
            {t('partners_badge')}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mt-2 leading-tight"
          >
            {t('partners_heading')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('partners_description')}
          </motion.p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={fadeInUp}
                className="group relative bg-white rounded-3xl shadow-sm border border-slate-100 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-l ${pillar.color}`} />

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${pillar.iconBg} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <PillarIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {t(pillar.badgeKey)}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 leading-snug mt-0.5">
                      {t(pillar.titleKey)}
                    </h3>
                  </div>
                </div>

                {/* Points */}
                <div className="space-y-4">
                  {pillar.points.map((point, idx) => {
                    const PointIcon = point.icon;
                    return (
                      <div key={idx} className={`flex gap-3 ${pillar.bg} rounded-2xl p-4`}>
                        <div className="flex-shrink-0 mt-0.5">
                          <PointIcon className="w-5 h-5 text-slate-500" />
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {t(point.textKey)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Number badge */}
                <div className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'}  w-8 h-8 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-xs font-bold">{pillar.id}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="mt-16 bg-gradient-to-l from-blue-600 to-blue-800 rounded-3xl p-10 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {t('partners_cta_title')}
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto text-base leading-relaxed">
            {t('partners_cta_desc')}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
