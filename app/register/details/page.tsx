import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"
import Image from "next/image"

export default function RegisterDetailsPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Logo (hidden on mobile, shown on desktop) */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center relative items-center justify-center p-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80')", // ✅ Yuridik & jismoniy shaxslar uchun mos rasm
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* overlay */}

        <div className="relative text-white text-center space-y-6 max-w-lg">
          {/* ✅ Haqiqiy logotip */}
          <div className="flex justify-center mb-4">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg bg-white p-2"
            />
          </div>

          <h2 className="text-5xl font-bold">Biz bilan boshlang!</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Yuridik yoki jismoniy shaxs sifatida ro'yxatdan o'ting va barcha onlayn xizmatlardan foydalaning.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* ✅ Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full bg-white shadow-md p-2"
            />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Ro'yxatdan o'tish</h1>
            <p className="text-muted-foreground">Ma'lumotlaringizni to'ldiring</p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
