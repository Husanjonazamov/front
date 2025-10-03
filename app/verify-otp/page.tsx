import { OtpForm } from "@/components/auth/otp-form"
import Link from "next/link"

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Verify OTP</h1>
            <p className="text-muted-foreground">Enter the code sent to your phone</p>
          </div>

          <OtpForm />

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Try again
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Graphic */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-cyan-600 to-pink-500 items-center justify-center p-12">
        <div className="text-white text-center space-y-6 max-w-lg">
          <h2 className="text-5xl font-bold">Almost There!</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Just one more step to secure your account and get started
          </p>
        </div>
      </div>
    </div>
  )
}
