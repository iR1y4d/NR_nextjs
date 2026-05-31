'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Truck,
  FlaskConical,
  Globe,
  ShieldCheck,
  Microscope,
  Stethoscope,
  Handshake,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const pillars = [
  {
    id: 1,
    icon: MapPin,
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-600',
    badge: 'الموقع الاستراتيجي',
    title: 'قلب الهجرة الموسمية',
    points: [
      {
        icon: ShieldCheck,
        text: 'تُعد مدينة المرج من أغنى المناطق بالثروة الحيوانية، وتعاني في الوقت ذاته نقصاً حاداً في الخدمات البيطرية المتقدمة.',
      },
      {
        icon: Truck,
        text: 'تُمثّل المرج المسار الأكبر لهجرة القطعان في ليبيا طوال النصف الأكبر من العام (مارس–أكتوبر)، مما يستوجب تدخلاً بيطرياً استباقياً يحمي الأمن الغذائي الوطني.',
      },
    ],
  },
  {
    id: 2,
    icon: Truck,
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-600',
    badge: 'الرعاية الحقلية',
    title: 'منظومة الوصول إلى المربّي',
    points: [
      {
        icon: Stethoscope,
        text: 'لا ننتظر قدوم الحالات؛ فرقنا البيطرية المتخصصة والمتحركة تصل إلى المربين في حقولهم ومزارعهم لتقديم المتابعة الدورية والخدمات العلاجية الفورية.',
      },
      {
        icon: ShieldCheck,
        text: 'كوادرنا مؤهلة للتعامل مع الحيوانات الكبيرة (المجترات)، وقطاع الدواجن، والحيوانات الأليفة — خدمة شاملة بلا استثناء.',
      },
    ],
  },
  {
    id: 3,
    icon: FlaskConical,
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-600',
    badge: 'التشخيص المتقدم',
    title: 'التكنولوجيا ورؤيتنا المستقبلية',
    points: [
      {
        icon: Microscope,
        text: 'مختبر بيطري متكامل في مدينة المرج للكشف المبكر عن الأمراض وإجراء التحاليل الدقيقة في أسرع وقت ممكن.',
      },
      {
        icon: ShieldCheck,
        text: 'خدمات تصوير متقدمة: أشعة سينية (X-Ray) وأجهزة سونار (Ultrasound) داخل المنطقة التي كانت تفتقر إليها تماماً.',
      },
    ],
  },
  {
    id: 4,
    icon: Globe,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-600',
    badge: 'الشراكات الدولية',
    title: 'نقل المعرفة والمعايير العالمية',
    points: [
      {
        icon: Handshake,
        text: 'نستضيف خبراء دوليين وزيارات علمية من كبرى الشركات العالمية التي عقدنا معها شراكات استراتيجية، لرفع مستوى الكوادر المحلية.',
      },
      {
        icon: ShieldCheck,
        text: 'نستورد أجود الأدوية والمعدات البيطرية وفق أعلى المعايير الدولية، مواكبةً لأحدث ما توصّل إليه العلم في مجال علاج الدواجن والمواشي والحيوانات الأليفة.',
      },
    ],
  },
];

export function PartnersSection() {
  return (
    <section id="partners" className="py-24 bg-slate-50 overflow-hidden" dir="rtl">
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
            "الركيزة الجديدة"
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mt-2 leading-tight"
          >
            لماذا مدينة المرج؟
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            تنطلق شركة الركيزة الجديدة من رؤية استراتيجية واضحة تهدف إلى سد الفجوة بين
            الإمكانات الرعوية الضخمة ومستوى الخدمات المتاحة، مرتكزةً على المرج نقطةً
            للانطلاق ومحوراً لخدماتها البيطرية المتكاملة.
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
                    <span className={`text-xs font-bold uppercase tracking-widest text-slate-400`}>
                      {pillar.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 leading-snug mt-0.5">
                      {pillar.title}
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
                          {point.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Number badge */}
                <div className={`absolute top-6 left-6 w-8 h-8 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-md`}>
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
            نحن هنا لأن المرج تستحق الأفضل
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto text-base leading-relaxed">
            نسعى في "الركيزة الجديدة" إلى تحويل المنطقة من منطقة تفتقر إلى الخدمات
            إلى نموذج يُحتذى به في تقديم الرعاية البيطرية الشاملة على المستوى الوطني.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
