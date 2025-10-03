"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { validateOTP, storeAuthData } from "@/lib/auth-utils"

export function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")

  useEffect(() => {
    inputRefs.current[0]?.focus()

    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]

    // Handle multiple digits pasted or typed quickly
    if (value.length > 1) {
      const digits = value.slice(0, 6 - index).split("")
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit
        }
      })
      setOtp(newOtp)

      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, 5)
      inputRefs.current[nextIndex]?.focus()
      inputRefs.current[nextIndex]?.select()
    } else {
      // Single digit
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
        inputRefs.current[index + 1]?.select()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus()
        inputRefs.current[index - 1]?.select()
      } else if (otp[index]) {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
      inputRefs.current[index - 1]?.select()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
      inputRefs.current[index + 1]?.select()
    }
  }

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char
    })
    setOtp(newOtp)

    const lastIndex = Math.min(pastedData.length, 5)
    inputRefs.current[lastIndex]?.focus()
    inputRefs.current[lastIndex]?.select()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (!validateOTP(otpCode)) {
      setError("Iltimos, barcha 6 ta raqamni kiriting")
      return
    }

    setError("")
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      // Store auth data
      if (phone) {
        storeAuthData(phone, "user")
      }

      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  const handleResend = () => {
    if (resendTimer > 0) return

    setResendTimer(60)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Kod yuborildi: <span className="font-medium text-foreground">{phone}</span>
        </div>

        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              className="w-12 h-14 text-center text-2xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-primary focus:scale-110"
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md text-center border border-destructive/20 animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Tekshirilmoqda...
          </span>
        ) : (
          "OTP ni tasdiqlash"
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendTimer > 0}
          className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed transition-all duration-200"
        >
          {resendTimer > 0 ? `Qayta yuborish ${resendTimer}s` : "Kodni qayta yuborish"}
        </button>
      </div>
    </form>
  )
}
