# AuthApp - Modern Authentication System

To'liq autentifikatsiya tizimi Next.js, TypeScript va Tailwind CSS bilan qurilgan.

## Xususiyatlar

- 📱 Telefon raqami bilan kirish (+998 format)
- 🔐 OTP (One-Time Password) tasdiqlash
- 👤 Jismoniy va yuridik shaxslar uchun ro'yxatdan o'tish
- 🎨 Zamonaviy va responsive dizayn
- ⚡ Tez va xavfsiz
- 🌐 To'liq o'zbek tilida

## Texnologiyalar

- **Framework**: Next.js 15 (App Router)
- **Til**: TypeScript
- **Stillar**: Tailwind CSS v4
- **UI Komponentlar**: shadcn/ui
- **Ikonkalar**: Lucide React
- **Fontlar**: Geist Sans & Geist Mono

## Loyiha strukturasi

\`\`\`
├── app/
│   ├── page.tsx                 # Bosh sahifa
│   ├── login/page.tsx           # Login sahifasi
│   ├── register/
│   │   ├── page.tsx             # Foydalanuvchi turi tanlash
│   │   └── details/page.tsx     # Ro'yxatdan o'tish formasi
│   ├── verify-otp/page.tsx      # OTP tasdiqlash
│   ├── dashboard/page.tsx       # Foydalanuvchi dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global stillar
├── components/
│   ├── auth/
│   │   ├── login-form.tsx       # Login forma komponenti
│   │   ├── register-form.tsx    # Register forma komponenti
│   │   ├── otp-form.tsx         # OTP forma komponenti
│   │   └── user-type-selection.tsx  # Foydalanuvchi turi tanlash
│   └── ui/                      # shadcn/ui komponentlar
├── lib/
│   ├── utils.ts                 # Utility funksiyalar
│   ├── auth-utils.ts            # Auth utility funksiyalar
│   └── types.ts                 # TypeScript turlari
└── public/                      # Statik fayllar
\`\`\`

## O'rnatish

1. Loyihani yuklab oling
2. Dependencylarni o'rnating:

\`\`\`bash
npm install
# yoki
pnpm install
\`\`\`

3. Development serverni ishga tushiring:

\`\`\`bash
npm run dev
# yoki
pnpm dev
\`\`\`

4. Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## Foydalanish

### Login

1. `/login` sahifasiga o'ting
2. Telefon raqamingizni kiriting (+998 avtomatik qo'shiladi)
3. "OTP yuborish" tugmasini bosing
4. 6 raqamli OTP kodni kiriting
5. Dashboard sahifasiga yo'naltirilasiz

### Ro'yxatdan o'tish

1. `/register` sahifasiga o'ting
2. Foydalanuvchi turini tanlang (Jismoniy yoki Yuridik shaxs)
3. Formani to'ldiring:
   - Ism
   - Familiya
   - Telefon raqami
   - Parol
4. Shartlarga rozilik bering
5. OTP tasdiqlashga yo'naltirilasiz

## Xususiyatlar

### Telefon raqami formati

- Avtomatik +998 prefiksi
- Formatli ko'rinish: 90 123 45 67
- Real-time validatsiya
- Animatsiyali input

### OTP tasdiqlash

- 6 raqamli kod
- Avtomatik keyingi inputga o'tish
- Paste qo'llab-quvvatlash
- 60 soniyalik qayta yuborish timer

### Responsive dizayn

- Desktop va mobil uchun optimallashtirilgan
- Mobilda logo formaning tepasida
- Touch-friendly interfeys

## Keyingi qadamlar

- [ ] Backend API integratsiyasi
- [ ] Real OTP yuborish (SMS)
- [ ] Database integratsiyasi
- [ ] Session management
- [ ] Password reset funksiyasi
- [ ] Social login (Google, GitHub)
- [ ] Email tasdiqlash

## Litsenziya

MIT
