import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* 📱 Mobile Logo */}
      <div className="lg:hidden flex justify-center pt-8 pb-4">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // ✅ Register bilan bir xil logo
          alt="Platform Logo"
          width={100}
          height={100}
          className="rounded-full bg-white p-2 shadow-lg animate-in zoom-in duration-500"
        />
      </div>

      {/* 📝 Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Xush kelibsiz 👋</h1>
            <p className="text-muted-foreground">Davom etish uchun tizimga kiring</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz yo‘qmi?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium transition-all">
              Ro‘yhatdan o‘tish
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden lg:flex flex-1 bg-cover bg-center relative items-center justify-center p-12 animate-in fade-in slide-in-from-right-4 duration-700"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-white text-center space-y-6 max-w-lg bg-black/50 p-6 rounded-2xl backdrop-blur-sm shadow-2xl">
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              className="w-32 h-32 rounded-full bg-white p-2 shadow-lg animate-in zoom-in duration-1000"
            />
          </div>
          <h2 className="text-5xl font-bold">Sayohatingizni boshlang 🚀</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Platformamizga ishongan minglab foydalanuvchilarga qo‘shiling va xizmatlardan hoziroq foydalaning.
          </p>
        </div>
      </div>

    </div>
  )
}
