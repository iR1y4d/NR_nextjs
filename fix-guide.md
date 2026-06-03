# دليل إصلاح Lighthouse ومشاكل الأداء - موقع الركيزة الجديدة
# Lighthouse Fix & Performance Optimization Guide - Al-Rakiza Al-Jadida

**تاريخ التحديث:** 3 يونيو 2026  
**النطاق:** rakiza-vet.ly  
**إطار العمل:** Next.js 16.2 (App Router)  
**طريقة النشر:** تصدير ثابت (Static Export - `output: 'export'`) على GitHub Pages  

---

## 📊 ملخص حالة الأداء الحالية والتقييم
| الفئة | النتيجة الحالية | الحالة | المستهدف |
| :--- | :---: | :---: | :---: |
| **الأداء (Performance)** | 90/100 | ⚠️ يحتاج تحسين | **98-100** |
| **إمكانية الوصول (Accessibility)** | 79/100 | ❌ يحتاج إصلاح عاجل | **100** |
| **أفضل الممارسات (Best Practices)** | 96/100 | ⚠️ يحتاج تحسين | **100** |
| **تحسين محركات البحث (SEO)** | 100/100 | ✅ ممتاز | **100** |

---

## 🚀 1. إصلاحات الأداء (Performance Optimizations)

### 1.1 تحسين الصور عبر CDN وتجنب التحميل الكسول للعناصر المرئية الأولى (Above-the-Fold Images)
> [!IMPORTANT]
> بما أن المشروع يستخدم التصدير الثابت (`output: 'export'`)، فإن ميزة تحسين الصور التلقائية في Next.js تكون غير مفعلة (`unoptimized: true` في [next.config.ts](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/next.config.ts)).  
> لحل هذه المشكلة وتحسين أداء تحميل الصور الخارجي (Unsplash)، نقوم بتحسينها مباشرة عبر خادم Unsplash CDN نفسه بدلاً من تحميل صور ثقيلة غير مضغوطة.

#### أ) تحسين روابط الصور في ملف البيانات [src/lib/data.ts](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/lib/data.ts)
جميع صور Unsplash حالياً تُطلب بدون تحديد صيغة حديثة (WebP/AVIF). نقوم بإضافة معاملات تحويل الصيغة والجودة التلقائية (`auto=format&q=75`):

```diff
// في src/lib/data.ts
export const products: Product[] = [
  {
    icon: Syringe,
    title: 'product_vaccines',
-   image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop',
+   image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&h=400&q=75',
    description: { ... }
  },
  {
    icon: HeartPulse,
    title: 'product_surgical',
-   image: 'https://images.unsplash.com/photo-1564732278233-674355414c2c?w=600&h=400&fit=crop',
+   image: 'https://images.unsplash.com/photo-1564732278233-674355414c2c?auto=format&fit=crop&w=600&h=400&q=75',
    description: { ... }
  },
  // قم بتطبيق نفس التعديل على بقية روابط Unsplash في data.ts و AboutSection.tsx
]
```

#### ب) إصلاح شعار الموقع في شريط التنقل [src/components/layout/Navbar.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/layout/Navbar.tsx)
شعار الموقع يقع في الجزء العلوي المرئي فوراً (Above-the-fold) ويؤثر مباشرة على مؤشرات FCP و LCP. استخدام `loading="lazy"` هنا يعتبر خطأ أداء.

```diff
// في src/components/layout/Navbar.tsx (السطر 32-37)
            <img
              src={isScrolled ? '/favicon.svg' : '/faviconw.svg'}
              alt="VetMed Logo"
              className="size-17 object-contain"
-             loading="lazy"
+             loading="eager"
+             fetchPriority="high"
            />
```

---

### 1.2 تحسين حجم حزمة الجافا سكريبت عبر ضغط حركات Framer Motion
الموقع يعتمد على مكتبة `framer-motion` بشكل مكثف مما يزيد من حجم حزم الـ JavaScript الأولية. يمكننا تقليص حجم الحزمة بـ 45KB على الأقل باستخدام ميزة التحميل الكسول للحركات `LazyMotion`.

#### الحل:
1. في ملف [src/app/layout.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/app/layout.tsx):
```tsx
import { LazyMotion, domAnimation } from 'framer-motion';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cairo.variable} antialiased`}>
        <LazyMotion features={domAnimation}>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <FloatingWhatsApp />
            <ScrollToTop />
          </LanguageProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
```

2. استبدال استيراد `motion` بـ `m` في المكونات المتحركة (مثل `HeroSection`, `AboutSection`, `ProductsSection` إلخ):
```diff
- import { motion } from 'framer-motion';
+ import { m as motion } from 'framer-motion';
```

---

### 1.3 الاتصال المسبق بخوادم الصور الخارجية (Preconnect)
> [!NOTE]
> لا نحتاج للاتصال المسبق بخوادم Google Fonts لأن Next.js يقوم تلقائياً باستضافة الخطوط محلياً عبر `next/font`. لكننا بحاجة للاتصال المسبق بخوادم صور Unsplash.

نقوم بإضافة وسم `preconnect` لـ Unsplash داخل ملف [src/app/layout.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/app/layout.tsx):

```tsx
// في src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="...">
         {/* ... */}
      </body>
    </html>
  );
}
```

---

### 1.4 سياسات التخزين المؤقت (Cache-Control) للمواقع الثابتة
بما أن الموقع يتم تصديره كملفات ثابتة ويستضاف على GitHub Pages، فإن خوادم GitHub هي من تتحكم بالـ Headers الافتراضية.
إذا تم استخدام **Cloudflare** كـ Reverse Proxy للموقع (وهو الخيار الأمثل والمنصوح به للنطاقات المخصصة)، يجب إعداد **Page Rules** أو **Cache Rules** كالتالي:

1. **القاعدة الأولى لمجلد الأصول الثابتة الخاصة بـ Next.js:**
   - **الرابط:** `https://rakiza-vet.ly/_next/static/*`
   - **الإعدادات:** Edge Cache TTL = 1 Year, Browser Cache TTL = 1 Year.
   - **رأس التحكم بالتخزين (Cache-Control Header):** `public, max-age=31536000, immutable`
2. **القاعدة الثانية للصور والخطوط في مجلد `public`:**
   - **الرابط:** `https://rakiza-vet.ly/*.{svg,png,jpg,jpeg,webp,woff2}`
   - **الإعدادات:** Edge Cache TTL = 1 Month, Browser Cache TTL = 1 Month.

---

### 1.5 إصلاح الأخطاء البرمجية المؤثرة على الأداء
في ملف [src/components/sections/HeroSection.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/sections/HeroSection.tsx) سطر 14، يوجد خطأ كتابي (Typo) في فئات التنسيق:
```diff
- <div className="absolute inset-0 z-0')] bg-cover bg-center">
+ <div className="absolute inset-0 z-0 bg-cover bg-center">
```

---

## ♿ 2. إصلاحات إمكانية الوصول (Accessibility)

### 2.1 إضافة أسماء مميزة للأزرار التفاعلية (Accessible Names)

#### أ) زر القائمة المتنقلة (Mobile Menu Button) في [src/components/layout/Navbar.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/layout/Navbar.tsx)
```diff
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
+           aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
+           aria-expanded={isMobileMenuOpen}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-white hover:bg-white/20'
              }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
```

#### ب) زر الواتساب العائم في [src/components/layout/FloatingWhatsApp.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/layout/FloatingWhatsApp.tsx)
```diff
    <motion.a
      href="https://wa.me/218916110593"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
+     aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-colors"
    >
      <MessageCircle className="w-7 h-7 text-white" />
+     <span className="sr-only">تواصل معنا عبر واتساب</span>
    </motion.a>
```

---

### 2.2 ربط التسميات (Labels) بحقول نماذج الاتصال
في ملف [src/components/ui/ContactForm.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/ui/ContactForm.tsx)، يجب ربط عناصر `<label>` بمدخلاتها باستخدام `htmlFor` و `id` مع إضافة خاصية الإكمال التلقائي `autoComplete`.

```diff
// مثال لحقل الاسم الكامل
          <div>
-           <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_name')}</label>
+           <label htmlFor="name-input" className="block text-sm font-medium text-slate-700 mb-2">{t('form_name')}</label>
            <input
+             id="name-input"
              type="text"
              value={formData.name}
+             autoComplete="name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="..."
              required
            />
          </div>

// حقل الهاتف
          <div>
-           <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_phone')}</label>
+           <label htmlFor="phone-input" className="block text-sm font-medium text-slate-700 mb-2">{t('form_phone')}</label>
            <input
+             id="phone-input"
              type="tel"
              value={formData.phone}
+             autoComplete="tel"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="..."
              required
            />
          </div>

// حقل البريد الإلكتروني
          <div>
-           <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_email')}</label>
+           <label htmlFor="email-input" className="block text-sm font-medium text-slate-700 mb-2">{t('form_email')}</label>
            <input
+             id="email-input"
              type="email"
              value={formData.email}
+             autoComplete="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="..."
              required
            />
          </div>

// حقل الرسالة
          <div>
-           <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_message')}</label>
+           <label htmlFor="message-input" className="block text-sm font-medium text-slate-700 mb-2">{t('form_message')}</label>
            <textarea
+             id="message-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="..."
              required
            />
          </div>
```

---

### 2.3 إضافة عنوان وصفي لـ Google Maps Iframe
في ملف [src/components/sections/ContactSection.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/sections/ContactSection.tsx):

```diff
                  <iframe
                    src="https://maps.google.com/maps?q=32.48538231156976, 20.831425094790056&z=15&output=embed"
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
+                   title={language === 'en' ? "Google Maps showing our office location" : "خريطة جوجل توضح موقع مكتبنا"}
                  />
```

---

### 2.4 تحسين نسب التباين للألوان (Color Contrast)
النصوص الرمادية الفاتحة على الخلفية الداكنة في التذييل (Footer) تفشل في اختبار التباين الأدنى (4.5:1).
نقوم بتعديل فئات الألوان في [src/components/layout/Footer.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/components/layout/Footer.tsx):

```diff
// السطر 24
- <p className="text-slate-400 text-sm leading-relaxed">
+ <p className="text-slate-300 text-sm leading-relaxed">

// السطر 39
- className="text-slate-400 hover:text-white transition-colors text-sm"
+ className="text-slate-300 hover:text-white transition-colors text-sm font-medium"

// السطر 51
- <ul className="space-y-3 text-slate-400 text-sm">
+ <ul className="space-y-3 text-slate-300 text-sm">

// السطر 99
- <p className="text-slate-500 text-sm">{t('footer_copyright')}</p>
+ <p className="text-slate-400 text-sm">{t('footer_copyright')}</p>
```

---

## 🔒 3. أفضل الممارسات (Best Practices)

بما أن الموقع مستضاف بالكامل كملفات ثابتة، فإن إعدادات الـ Security Headers (مثل CSP, HSTS, X-Frame-Options) لا يمكن تحديدها من خلال ملف `next.config.ts` في حالة التصدير الثابت، بل يجب تكوينها من جهة خادم الاستضافة أو خدمات الحماية مثل **Cloudflare**:

1. **Content Security Policy (CSP):**
   إعداد رأس CSP لتأمين الموقع مع السماح لمصادر خارجية موثوقة (Unsplash و Google Maps):
   ```http
   default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; frame-src https://maps.google.com https://www.google.com; connect-src 'self' https://formsubmit.co;
   ```
2. **HTTP Strict Transport Security (HSTS):**
   تفعيلها عبر إعدادات Cloudflare SSL/TLS -> Edge Certificates -> **HTTP Strict Transport Security (HSTS)**.
3. **أمن النوافذ (Cross-Origin-Opener-Policy):**
   إضافة رأس `Cross-Origin-Opener-Policy: same-origin` عبر قواعد التحويل في Cloudflare.

---

## 🔍 4. تحسين محركات البحث (SEO)

### 4.1 إضافة الرابط الأساسي Canonical Link بطريقة Next.js الرسمية
نقوم بإضافة الرابط الأساسي إلى كائن الميتا في ملف [src/app/layout.tsx](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/src/app/layout.tsx):

```diff
export const metadata: Metadata = {
  title: 'شركة الركيزة الجديدة | AL Rakiza AL Jadida Company',
  description:
    'Al Rakiza AL Jadida Company – Integrated Veterinary Solutions. شركة الركيزة الجديدة - حلول بيطرية متكاملة.',
  keywords:
    'veterinary equipment, veterinary medicines, animal health, vet supplies, pet care, veterinary imports',
  authors: [{ name: 'VetMed Imports' }],
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'theme-color': '#3B82F6',
  },
+ alternates: {
+   canonical: 'https://rakiza-vet.ly/',
+ },
};
```

### 4.2 ملف robots.txt
يجب إنشاء الملف في المسار المخصص للملفات العامة [public/robots.txt](file:///c:/Users/Admin/Desktop/bilingual-veterinary-equipment-website-nextjs/nextjs-temp/public/robots.txt):
```txt
User-agent: *
Allow: /

Sitemap: https://rakiza-vet.ly/sitemap.xml
```

---

## 📋 قائمة التحقق النهائية قبل النشر (Final Checklist)
- [ ] تعديل روابط Unsplash في `data.ts` و `AboutSection.tsx` لإضافة معاملات `auto=format&q=75`.
- [ ] إزالة `loading="lazy"` وإضافة `loading="eager"` لشعار الموقع في `Navbar.tsx`.
- [ ] تطبيق `LazyMotion` لتقليل حجم حزمة جافا سكريبت الخاصة بالحركات.
- [ ] ربط جميع وسوم `<label>` بمعرفات المدخلات `id` في نموذج الاتصال.
- [ ] إضافة `title` للـ `iframe` الخاص بالخريطة.
- [ ] تحسين ألوان نصوص التذييل (Footer) لزيادة تباين القراءة.
- [ ] تفعيل إعدادات الأمان والتخزين المؤقت عبر Cloudflare للنطاق المباشر.
- [ ] التحقق من وجود وسم `canonical` وملف `robots.txt`.
