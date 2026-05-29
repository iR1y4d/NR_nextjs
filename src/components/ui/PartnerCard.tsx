'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface PartnerCardProps {
  name: string;
  logo: string;
}

export function PartnerCard({ name, logo }: PartnerCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
          <span className="text-3xl font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
            {logo}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
          {name}
        </p>
      </div>
    </motion.div>
  );
}
