'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { whyChooseUsItems } from '@/lib/data';
import { WhyChooseUsCard } from '@/components/ui/WhyChooseUsCard';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

export function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image Side */}
          <motion.div variants={scaleIn} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504329779896-a7e131ac23af?&fit=crop"
                alt="Veterinary professional"
                className="w-full h-[500px]  object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>

            {/* Stats Card */}
            <motion.div
              variants={fadeInUp}
              className="absolute -bottom-8 right-0 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-blue-600" />
                </div>
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <p className="text-3xl font-bold text-slate-800">15+</p>
                  <p className="text-slate-600 text-sm">
                    {language === 'en' ? 'Years Experience' : 'سنوات الخبرة'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={staggerContainer} className="space-y-8 text-center sm:text-left ">
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">
                {t('about_title')}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mt-3 leading-tight ">
                {t('about_subtitle')}
              </h2>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
              {t('about_description')}
            </motion.p>

            {/* Mission & Vision */}
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6 text-start">
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t('mission_title')}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t('mission_text')}</p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t('vision_title')}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t('vision_text')}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800">{t('why_choose_title')}</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsItems.map((item) => (
              <WhyChooseUsCard
                key={item.key}
                icon={item.icon}
                title={t(item.key)}
                color={item.color}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
