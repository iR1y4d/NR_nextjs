'use client';

import { LucideIcon } from 'lucide-react';

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export function ContactInfoItem({ icon: Icon, label, value, href }: ContactInfoItemProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex items-start gap-6 group p-2 -m-2 rounded-2xl hover:bg-slate-50 transition-all"
    >
      <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
        <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          <span dir="ltr" className="">{value}</span>
        </p>
      </div>
    </a>
  );
}
