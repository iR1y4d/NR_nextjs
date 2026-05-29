'use client';

import { socialLinks } from '@/lib/data';

interface SocialLinksProps {
  variant?: 'contact' | 'footer';
}

export function SocialLinks({ variant = 'contact' }: SocialLinksProps) {
  const containerClasses = 'flex gap-4 flex-wrap';

  const itemClasses =
    variant === 'contact'
      ? 'w-12 h-12 bg-slate-100 hover:bg-blue-500 rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-all cursor-pointer'
      : 'w-10 h-10 bg-slate-800 hover:bg-blue-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer';

  return (
    <div className={containerClasses}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className={itemClasses}
          aria-label={social.name}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d={social.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
}
