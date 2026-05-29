'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

interface WhyChooseUsCardProps {
  icon: LucideIcon;
  title: string;
  color: 'blue' | 'emerald';
}

export function WhyChooseUsCard({ icon: Icon, title, color }: WhyChooseUsCardProps) {
  const iconBg = color === 'blue' ? 'bg-blue-100' : 'bg-emerald-100';
  const iconColor = color === 'blue' ? 'text-blue-600' : 'text-emerald-600';

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -5 }}
      className="flex items-center space-x-4 rtl:space-x-reverse bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all"
    >
      <div className={`flex-shrink-0 w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <p className="font-semibold text-slate-800 mr-3">{title}</p>
      </div>
    </motion.div>
  );
}
