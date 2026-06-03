# دليل إصلاح مشاكل Lighthouse - موقع Rakiza Vet

# Lighthouse Fix Guide - Rakiza Vet Website

**تاريخ التقرير:** 3 يونيو 2026  
**النطاق:** rakiza-vet.ly  
**الأداة:** Lighthouse 13.3.0 (Moto G Power محاكاة، شبكة 4G)

---

## 📊 ملخص النتائج

| الفئة                           | النتيجة | الحالة              |
| ------------------------------- | ------- | ------------------- |
| الأداء (Performance)            | 90/100  | ⚠️ يحتاج تحسين      |
| إمكانية الوصول (Accessibility)  | 79/100  | ❌ يحتاج إصلاح عاجل |
| أفضل الممارسات (Best Practices) | 96/100  | ⚠️ يحتاج تحسين      |
| تحسين محركات البحث (SEO)        | 100/100 | ✅ ممتاز            |

---

## 🚀 الأولوية 1: إصلاحات الأداء (Performance)

### 1.1 تحسين ذاكرة التخزين المؤقت (Cache Policy)

**التوفير المتوقع:** 1,305 KiB  
**الأثر:** FCP, LCP

#### المشكلة:

الملفات التالية لا تحتوي على TTL للتخزين المؤقت:

- ملفات JS chunks المختلفة
- ملفات الخطوط (woff2)
- ملفات CSS

#### الحل:

```javascript
// في ملف vite.config.ts أو إعدادات الخادم
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetsDir: "assets",
        assetFileNames: (assetInfo) => {
          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return "fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
```

```nginx
# في إعدادات Nginx (إذا كان الخادم Nginx)
location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(woff2?|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**ملف للتعديل:** `public/.htaccess` أو إعدادات الخادم

---

### 1.2 تحسين الصور (Image Optimization)

**التوفير المتوقع:** 936 KiB  
**الأثر:** LCP, FCP

#### المشكلة:

| الصورة | الحجم الحالي | التوفير | المشكلة |
| ------ | ------------ | ------- | ------- |

| Unsplash images | 116.7 KiB | 39.3 KiB | يمكن ضغطها أكثر |

#### الحل:

**الخطوة 1: تحويل الصور إلى WebP/AVIF**

````bash
# تثبيت sharp لتحويل الصور
npm install -D sharp





### 1.3 تقليل JavaScript القديم (Legacy JavaScript)

**التوفير المتوقع:** 13 KiB
**الأثر:** LCP, FCP

#### المشكلة:

الكود يحتوي على polyfills لميزات مدعومة في المتصفحات الحديثة:

- `Array.prototype.at`
- `Array.prototype.flat`
- `Array.prototype.flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimEnd`
- `String.prototype.trimStart`

#### الحل:

**تحديث إعدادات Babel/TypeScript:**

```json
// في tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "noEmit": true
  }
}
````

```javascript
// في vite.config.ts
export default defineConfig({
  build: {
    target: "es2020",
    minify: "esbuild",
  },
  esbuild: {
    target: "es2020",
  },
});
```

**تحديث .browserslistrc:**

```
# .browserslistrc
>0.5%
last 2 versions
not dead
not IE 11
not op_mini all
```

**الملفات للتعديل:**

- `tsconfig.json`
- `vite.config.ts`
- `.browserslistrc` (إنشاء إذا لم يوجد)

---

### 1.4 إزالة طلبات حظر العرض (Render-Blocking Requests)

**التوفير المتوقع:** 100ms  
**الأثر:** LCP, FCP

#### المشكلة:

ملف CSS يحظر العرض:

- `…chunks/0cnb16ltx9w8d.css` (8.9 KiB, 160ms)

#### الحل:

**الخطوة 1: تحميل CSS بشكل غير متزامن**

```html
<!-- في index.html -->
<link
  rel="preload"
  href="/styles/critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="/styles/critical.css" />
</noscript>
```

**الخطوة 2: استخدام CSS-in-JS للأنماط الحرجة**

```tsx
// في المكونات الرئيسية
const criticalStyles = `
  .hero-section { min-height: 100vh; }
  .nav-bar { position: fixed; top: 0; }
`;

export function HeroSection() {
  return (
    <>
      <style>{criticalStyles}</style>
      {/* باقي المحتوى */}
    </>
  );
}
```

**الخطوة 3: تقسيم CSS (Code Splitting)**

```tsx
// في vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          styles: ["./src/styles/main.css"],
        },
      },
    },
  },
});
```

**الملفات للتعديل:**

- `index.html`
- `vite.config.ts`
- `src/main.tsx`

---

### 1.5 تقليل حجم DOM

**القيمة الحالية:** 550 عنصر  
**الحد الموصى به:** < 1500 عنصر

#### المشكلة:

- الحد الأقصى للعناصر المضمّنة: 11
- الحد الأقصى للعناصر الفرعية: 12

#### الحل:

**تبسيط الهيكل:**

```tsx
// ❌ قبل (هيكل معقد)
<div className="flex">
  <div className="w-14">
    <svg className="lucide">
      <path d="..." />
    </svg>
  </div>
</div>

// ✅ بعد (هيكل مبسط)
<svg className="lucide w-14" aria-hidden="true">
  <path d="..." />
</svg>
```

**تقليل العناصر غير الضرورية:**

```tsx
// إزالة divs الزائدة
// استخدام Fragment حيثما أمكن
<>
  <Component />
  <Component />
</>
```

**الملفات للتعديل:**

- جميع مكونات `src/components/`

---

### 1.6 تقليل JavaScript غير المستخدم (Unused JavaScript)

**التوفير المتوقع:** 81 KiB  
**الأثر:** LCP, FCP

#### المشكلة:

| الملف              | الحجم    | التوفير  |
| ------------------ | -------- | -------- |
| `0r8nt2o8muejo.js` | 49.2 KiB | 30.1 KiB |
| `07lhk_q6pmm3r.js` | 69.3 KiB | 28.4 KiB |
| `0gg3ci2dnjv1t.js` | 47.4 KiB | 22.4 KiB |

#### الحل:

**الخطوة 1: تفعيل Tree Shaking**

```javascript
// في vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
```

**الخطوة 2: استخدام Dynamic Imports**

```tsx
// استيراد ديناميكي للمكونات غير الحرجة
const ContactForm = lazy(() => import("./ContactForm"));
const MapSection = lazy(() => import("./MapSection"));

// في المكون
<Suspense fallback={<Loading />}>
  <ContactForm />
</Suspense>;
```

**الخطوة 3: إزالة المكتبات غير المستخدمة**

```bash
# تحليل حجم الحزمة
npm install -D rollup-plugin-visualizer

# في vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true })
  ]
});
```

**الملفات للتعديل:**

- `vite.config.ts`
- `src/main.tsx`
- `src/App.tsx`

---

### 1.7 إضافة Preconnect للمصادر الخارجية

**الأثر:** LCP

#### المشكلة:

لا توجد اتصالات مسبقة لأي مصادر خارجية

#### الحل:

```html
<!-- في index.html، داخل <head> -->
<link rel="preconnect" href="https://images.unsplash.com" crossorigin />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://maps.google.com" />
```

**الملفات للتعديل:**

- `index.html`

---

## ♿ الأولوية 2: إصلاحات إمكانية الوصول (Accessibility)

### 2.1 أزرار بدون أسماء يمكن الوصول إليها

**الأثر:** قارئات الشاشة

#### المشكلة:

```html
<button
  class="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/20"
>
  <!-- لا يوجد نص أو aria-label -->
</button>
```

#### الحل:

```tsx
// ✅ إضافة aria-label
<button
  className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/20"
  aria-label="فتح القائمة"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  <MenuIcon />
</button>
```

**الملفات للتعديل:**

- `src/components/Navbar.tsx`

---

### 2.2 عناصر نموذج بدون تسميات (Labels)

**الأثر:** قارئات الشاشة، التنقل بلوحة المفاتيح

#### المشكلة:

```html
<input type="text" class="w-full px-4 py-3..." required />
<input type="tel" class="w-full px-4 py-3..." required />
<input type="email" class="w-full px-4 py-3..." required />
<textarea rows="5" class="w-full px-4 py-3..." required />
```

#### الحل:

```tsx
// ✅ إضافة labels مرتبطة
<div className="grid gap-6">
  <div>
    <label
      htmlFor="name"
      className="block text-sm font-medium text-slate-700 mb-2"
    >
      الاسم الكامل
    </label>
    <input
      type="text"
      id="name"
      name="name"
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
      required
      autoComplete="name"
    />
  </div>

  <div>
    <label
      htmlFor="phone"
      className="block text-sm font-medium text-slate-700 mb-2"
    >
      رقم الهاتف
    </label>
    <input
      type="tel"
      id="phone"
      name="phone"
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
      required
      autoComplete="tel"
    />
  </div>

  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-slate-700 mb-2"
    >
      البريد الإلكتروني
    </label>
    <input
      type="email"
      id="email"
      name="email"
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
      required
      autoComplete="email"
    />
  </div>

  <div>
    <label
      htmlFor="message"
      className="block text-sm font-medium text-slate-700 mb-2"
    >
      الرسالة
    </label>
    <textarea
      id="message"
      name="message"
      rows={5}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
      required
    />
  </div>
</div>
```

**الملفات للتعديل:**

- `src/components/ContactForm.tsx` أو قسم الاتصال في `App.tsx`

---

### 2.3 iframe بدون عنوان

**الأثر:** قارئات الشاشة

#### المشكلة:

```html
<iframe
  src="https://maps.google.com/maps?q=32.48538231156976,20.831425094790056&z=15&..."
  class="absolute inset-0 w-full h-full"
  loading="lazy"
></iframe>
```

#### الحل:

```tsx
<iframe
  src="https://maps.google.com/maps?q=32.48538231156976,20.831425094790056&z=15&output=embed"
  className="absolute inset-0 w-full h-full"
  title="موقعنا على الخريطة - العنوان: ليبيا"
  loading="lazy"
  aria-label="خريطة توضح موقع عيادتنا البيطرية"
/>
```

**الملفات للتعديل:**

- `src/components/ContactSection.tsx` أو قسم الخريطة

---

### 2.4 روابط بدون أسماء مميزة

**الأثر:** قارئات الشاشة، التنقل

#### المشكلة:

```html
<a href="https://wa.me/218916110593" class="fixed bottom-8 right-8...">
  <!-- أيقونة فقط بدون نص بديل -->
</a>
```

#### الحل:

```tsx
<a
  href="https://wa.me/218916110593"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
  aria-label="تواصل معنا عبر واتساب - رقم: 218916110593"
>
  <WhatsAppIcon className="w-7 h-7 text-white" />
  <span className="sr-only">تواصل عبر واتساب</span>
</a>
```

**الملفات للتعديل:**

- `src/components/WhatsAppButton.tsx` أو المكون المماثل

---

### 2.5 مشاكل التباين (Color Contrast)

**الأثر:** المستخدمين ضعاف البصر

#### المشكلة:

1. رابط "Contact Us" - تباين غير كافٍ
2. نص الفوتر `text-slate-500` - تباين غير كافٍ على الخلفية الداكنة

#### الحل:

```tsx
// ✅ تحسين التباين
// Contact Us button
<a
  href="#contact"
  className="group flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
>
  <span className="text-white">Contact Us</span>
</a>

// Footer text
<footer className="bg-slate-900 text-white py-16">
  <p className="text-slate-300 text-sm">
    © 2026 AL-Rakiza AL-jadida. All rights reserved.
  </p>
  <p className="text-slate-200 text-base mt-2">
    AL-Rakiza AL-jadida - Your trusted partner in veterinary equipment and medicines
  </p>
</footer>
```

**الملفات للتعديل:**

- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

**أدوات التحقق من التباين:**

- https://webaim.org/resources/contrastchecker/
- نسبة التباين المطلوبة: 4.5:1 للنص العادي، 3:1 للنص الكبير

---

## 🔒 الأولوية 3: أفضل الممارسات (Best Practices)

### 3.1 إصلاح أخطاء المتصفح (404)

### 3.2 إضافة سياسة أمان المحتوى (CSP)

**الأثر:** الحماية من هجمات XSS

#### الحل:

```nginx
# في إعدادات Nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://images.unsplash.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com data:; frame-src https://maps.google.com; connect-src 'self';" always;
```

أو في `index.html`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com data:; frame-src https://maps.google.com;"
/>
```

**الملفات للتعديل:**

- إعدادات الخادم أو `index.html`

---

### 3.3 إضافة HSTS Header

**الأثر:** الحماية من هجمات downgrade

#### الحل:

```nginx
# في إعدادات Nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

**الملفات للتعديل:**

- إعدادات الخادم

---

### 3.4 إضافة COOP Header

**الأثر:** عزل النطاق

#### الحل:

```nginx
# في إعدادات Nginx
add_header Cross-Origin-Opener-Policy "same-origin" always;
```

**الملفات للتعديل:**

- إعدادات الخادم

---

### 3.5 إضافة X-Frame-Options أو CSP frame-ancestors

**الأثر:** الحماية من clickjacking

#### الحل:

```nginx
# في إعدادات Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
# أو
add_header Content-Security-Policy "frame-ancestors 'self';" always;
```

**الملفات للتعديل:**

- إعدادات الخادم

---

### 3.6 إضافة Trusted Types

**الأثر:** الحماية من هجمات XSS المستندة إلى DOM

#### الحل:

```nginx
# في إعدادات Nginx
add_header Content-Security-Policy "require-trusted-types-for 'script';" always;
```

وفي الكود:

```typescript
// تفعيل Trusted Types
if (window.trustedTypes && trustedTypes.createPolicy) {
  trustedTypes.createPolicy("default", {
    createHTML: (string) => string,
    createScriptURL: (string) => string,
  });
}
```

**الملفات للتعديل:**

- إعدادات الخادم
- `src/main.tsx`

---

## 🔍 الأولوية 4: تحسين محركات البحث (SEO)

### 4.1 ملف robots.txt

**المشكلة:** ملف robots.txt غير صالح

#### الحل:

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://rakiza-vet.ly/sitemap.xml

# حظر مجلدات غير ضرورية
Disallow: /admin/
Disallow: /api/
```

**الملفات للتعديل:**

- إنشاء `public/robots.txt`

---

### 4.2 رابط rel=canonical

**المشكلة:** رابط canonical غير صالح أو مفقود

#### الحل:

```html
<!-- في index.html -->
<head>
  <link rel="canonical" href="https://rakiza-vet.ly/" />
</head>
```

أو ديناميكيًا في React:

```tsx
// في App.tsx أو مكون Helmet
<Helmet>
  <link rel="canonical" href="https://rakiza-vet.ly/" />
</Helmet>
```

**الملفات للتعديل:**

- `index.html` أو `src/App.tsx`

---

## 📋 قائمة التحقق النهائية

### قبل النشر:

- [ ] تم إعداد Cache-Control headers
- [ ] تم إضافة preconnect للمصادر الخارجية
- [ ] تم تقليل JavaScript غير المستخدم
- [ ] جميع الأزرار تحتوي على aria-label
- [ ] جميع حقول النموذج تحتوي على labels
- [ ] جميع iframes تحتوي على title
- [ ] جميع الروابط لها أسماء مميزة
- [ ] تم التحقق من تباين الألوان (4.5:1 على الأقل)
- [ ] تم إصلاح جميع أخطاء 404
- [ ] تم إضافة CSP header
- [ ] تم إضافة HSTS header
- [ ] تم إضافة COOP header
- [ ] تم إضافة X-Frame-Options
- [ ] ملف robots.txt موجود وصالح
- [ ] رابط canonical موجود

### أدوات التحقق:

1. **Lighthouse** - https://pagespeed.web.dev/
2. **WAVE** - https://wave.webaim.org/
3. **axe DevTools** - إضافة المتصفح
4. **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
5. **Google Search Console** - للتحقق من SEO

---

## 🎯 جدول زمني مقترح

| المرحلة | المهام                        | المدة المتوقعة |
| ------- | ----------------------------- | -------------- |
| 1       | إصلاحات إمكانية الوصول الحرجة | 1-2 يوم        |
| 2       | تحسين الصور والـ Cache        | 1 يوم          |
| 3       | تحسين JavaScript و CSS        | 1-2 يوم        |
| 4       | إعدادات الأمان (Headers)      | 1 يوم          |
| 5       | اختبار شامل والتحقق           | 1 يوم          |

**الإجمالي:** 5-7 أيام

---

## 📞 الدعم

لأي استفسارات أو مشاكل تقنية، يرجى التواصل مع فريق التطوير.

**آخر تحديث:** 3 يونيو 2026
