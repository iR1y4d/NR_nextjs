import {
  Pill,
  Stethoscope,
  Building2,
  Truck,
  Shield,
  Syringe,
  HeartPulse,
  Microscope,
  Package,
  Warehouse,
  Globe,
  Award,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import type { Service, Product, Partner, ContactItem, SocialLink, WhyChooseUsItem } from '@/types';

// Navigation items
export const navItems = [
  'nav_home',
  'nav_about',
  'nav_services',
  'nav_products',
  'nav_partners',
  'nav_contact',
] as const;

// Services data
export const services: Service[] = [
  {
    icon: Pill,
    title: 'service_medicines_title',
    description: 'service_medicines_desc',
  },
  {
    icon: Stethoscope,
    title: 'service_equipment_title',
    description: 'service_equipment_desc',
  },
  {
    icon: Building2,
    title: 'service_supply_title',
    description: 'service_supply_desc',
  },
  {
    icon: Truck,
    title: 'service_logistics_title',
    description: 'service_logistics_desc',
  },
  {
    icon: Shield,
    title: 'service_regulatory_title',
    description: 'service_regulatory_desc',
  },
];

// Products data
export const products: Product[] = [
  {
    icon: Syringe,
    title: 'product_vaccines',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop',
    description: {
      en: 'Essential vaccines for disease prevention in animals',
      ar: 'لقاحات أساسية للوقاية من الأمراض في الحيوانات',
    },
  },
  {
    icon: HeartPulse,
    title: 'product_surgical',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    description: {
      en: 'High-quality surgical instruments and equipment',
      ar: 'أدوات ومعدات جراحية عالية الجودة',
    },
  },
  {
    icon: Microscope,
    title: 'product_diagnostic',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop',
    description: {
      en: 'Advanced diagnostic devices for accurate testing',
      ar: 'أجهزة تشخيصية متقدمة للاختبارات الدقيقة',
    },
  },
  {
    icon: Package,
    title: 'product_supplements',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop',
    description: {
      en: 'Nutritional supplements for optimal animal health',
      ar: 'مكملات غذائية لصحة الحيوانات المثلى',
    },
  },
  {
    icon: Warehouse,
    title: 'product_farm',
    image: '/NR_nextjs/images/cow.jpg',
    description: {
      en: 'Specialized products for farm animals and livestock',
      ar: 'منتجات متخصصة لحيوانات المزرعة والماشية',
    },
  },
];

// Partners data
export const partners: Partner[] = [
  { name: 'Zoetis', logo: 'Z' },
  { name: 'MSD Animal Health', logo: 'M' },
  { name: 'Boehringer Ingelheim', logo: 'B' },
  { name: 'Elanco', logo: 'E' },
  { name: 'Bayer Animal Health', logo: 'Ba' },
  { name: 'Virbac', logo: 'V' },
  { name: 'Ceva', logo: 'C' },
  { name: 'Vetoquinol', logo: 'Ve' },
];

// Contact items
export const contactItems: ContactItem[] = [
  {
    icon: Phone,
    label: 'phone_label',
    value: '+1 234 567 8900',
    href: 'tel:+12345678900',
  },
  {
    icon: Mail,
    label: 'email_label',
    value: 'info@vetmedimports.com',
    href: 'mailto:info@vetmedimports.com',
  },
  {
    icon: MapPin,
    label: 'address_label',
    value: 'address_value',
    href: 'https://maps.google.com/?q=Veterinary+District+Medical+City',
  },
  {
    icon: MessageCircle,
    label: 'whatsapp_label',
    value: '+1 234 567 8900',
    href: 'https://wa.me/12345678900',
  },
];

// Social media links
export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    name: 'Twitter',
    href: '#',
    icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z',
  },
];

// Why Choose Us items
export const whyChooseUsItems: WhyChooseUsItem[] = [
  { icon: Shield, key: 'why_certified', color: 'blue' },
  { icon: Globe, key: 'why_international', color: 'emerald' },
  { icon: Truck, key: 'why_delivery', color: 'blue' },
  { icon: Award, key: 'why_pricing', color: 'emerald' },
  { icon: Clock, key: 'why_support', color: 'blue' },
  { icon: Users, key: 'why_expertise', color: 'emerald' },
];
