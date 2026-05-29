'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <motion.span
        variants={fadeInUp}
        className="text-blue-600 font-semibold text-sm tracking-wider uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeInUp}
        className="text-4xl sm:text-5xl font-bold text-slate-800 mt-3"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
