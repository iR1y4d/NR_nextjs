'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { partners } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PartnerCard } from '@/components/ui/PartnerCard';
import { staggerContainer } from '@/lib/animations';

export function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            label={t('partners_title')}
            title={t('partners_subtitle')}
            description={t('partners_description')}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {partners.map((partner) => (
            <PartnerCard
              key={partner.name}
              name={partner.name}
              logo={partner.logo}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
