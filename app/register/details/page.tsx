import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterDetailsPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Logo (hidden on mobile, shown on desktop) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-pink-500 to-cyan-600 items-center justify-center p-12">
        <div className="text-white text-center space-y-6 max-w-lg">
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-24 h-24 bg-white rounded-full" />
          </div>
          <h2 className="text-5xl font-bold">Xush kelibsiz!</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Platformamizga qo'shiling va barcha imkoniyatlardan foydalaning
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo - shown only on mobile at top */}
          <div className="lg:hidden flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-cyan-600 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full" />
            </div>
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
