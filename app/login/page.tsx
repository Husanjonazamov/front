import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:hidden flex justify-center pt-8 pb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600 to-pink-500 flex items-center justify-center shadow-lg animate-in zoom-in duration-500">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Xush kelibsiz</h1>
            <p className="text-muted-foreground">Davom etish uchun tizimga kiring</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz yo'qmi?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium transition-all">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>

      <div
          className="hidden lg:flex flex-1 bg-cover bg-center items-center justify-center p-12 animate-in fade-in slide-in-from-right-4 duration-700"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <div className="text-white text-center space-y-6 max-w-lg bg-black/50 p-6 rounded-2xl backdrop-blur-sm">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl animate-in zoom-in duration-1000">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-5xl font-bold">Sayohatingizni boshlang</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Platformamizga ishongan minglab foydalanuvchilarga qo'shiling
            </p>
          </div>
        </div>

    </div>
  )
}
