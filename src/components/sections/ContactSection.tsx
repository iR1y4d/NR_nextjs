'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { contactItems } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/ui/ContactForm';
import { ContactInfoItem } from '@/components/ui/ContactInfoItem';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

export function ContactSection() {
  const { language, t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            label={t('contact_title')}
            title={t('contact_subtitle')}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scaleIn}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('contact_info_title')}</h3>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              {contactItems.map((item) => (
                <ContactInfoItem
                  key={item.label}
                  icon={item.icon}
                  label={t(item.label)}
                  value={item.label === 'address_label' ? t(item.value) : item.value}
                  href={item.href}
                />
              ))}
            </motion.div>

            {/* Map */}
            {/* Map */}
            <motion.div variants={fadeInUp} className="mt-8">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow">
                  <iframe
                    src="https://maps.google.com/maps?q=32.48538231156976, 20.831425094790056&z=15&output=embed"
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
              </div>
            </motion.div>
              {/* <div className="bg-slate-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium">
                    {language === 'en' ? 'Google Maps Integration' : 'تكامل خرائط Google'}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {language === 'en' ? 'Embed your map here' : 'ضع خريطتك هنا'}
                  </p>
                </div>
              </div> */}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex gap-4 pt-4 flex-wrap max-md:justify-center">
              <SocialLinks variant="contact" />
            </motion.div>

        </div>
      </div>
    </section>
  );
}
