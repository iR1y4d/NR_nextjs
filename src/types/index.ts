import type { LucideIcon } from 'lucide-react';
import type { ElementType } from 'react';

export type Language = 'en' | 'ar';

export interface TranslationEntry {
  en: string;
  ar: string;
}

export interface Translations {
  [key: string]: TranslationEntry;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Product {
  icon: LucideIcon;
  title: string;
  image: string;
  description: TranslationEntry;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface WhyChooseUsItem {
  icon: LucideIcon;
  key: string;
  color: 'blue' | 'emerald';
}

export interface PillarPoint {
  icon: ElementType;
  textKey: string;
}

export interface Pillar {
  id: number;
  icon: ElementType;
  color: string;
  bg: string;
  iconBg: string;
  badgeKey: string;
  titleKey: string;
  points: PillarPoint[];
}
