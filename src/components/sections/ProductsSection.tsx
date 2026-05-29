'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { staggerContainer } from '@/lib/animations';

export function ProductsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            label={t('products_title')}
            title={t('products_subtitle')}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.title}
              icon={product.icon}
              title={t(product.title)}
              image={product.image}
              description={product.description[language]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
