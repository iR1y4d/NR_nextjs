'use client';

import { Heart, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { navItems, socialLinks } from '@/lib/data';

export function Footer() {
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div> */}
              <span className="text-xl font-bold"> {language === 'en'
                ? 'AL-Rakiza AL- jadida'
                : 'الركيزة الجديدة'}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === 'en'
                ? 'Your trusted partner in veterinary equipment and medicines. Quality products for better animal health.'
                : 'شريكك الموثوق في معدات وأدوية البيطرية. منتجات عالية الجودة لصحة الحيوانات الأفضل.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer_quick_links')}</h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.replace('nav_', '')}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer_contact')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a href="tel:+12345678900" className="hover:text-white transition-colors block">
                  +1 234 567 8900
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vetmedimports.com"
                  className="hover:text-white transition-colors block"
                >
                  info@vetmedimports.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Veterinary+District+Medical+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  {t('address_value')}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer_follow_us')}</h4>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">{t('footer_copyright')}</p>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? t('language_ar') : t('language_en')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
