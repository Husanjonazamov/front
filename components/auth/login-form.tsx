"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Phone } from "lucide-react"

export function LoginForm() {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    // Limit to 9 digits (after +998)
    const limitedDigits = digits.slice(0, 9)
    setPhone(limitedDigits)
  }

  const formatPhoneDisplay = (value: string) => {
    if (value.length <= 2) return value
    if (value.length <= 5) return `${value.slice(0, 2)} ${value.slice(2)}`
    if (value.length <= 7) return `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5)}`
    return `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 7)} ${value.slice(7)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (phone.length !== 9) {
      setError("Telefon raqami 9 ta raqamdan iborat bo'lishi kerak")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-otp?phone=${encodeURIComponent("+998" + phone)}`)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Telefon raqami
        </Label>
        <div className={`relative group transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
            <Phone
              className={`h-4 w-4 transition-colors duration-300 ${
                isFocused ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span
              className={`font-semibold text-base transition-colors duration-300 ${
                isFocused ? "text-primary" : "text-muted-foreground"
              }`}
            >
              +998
            </span>
            <span className="text-muted-foreground/50">|</span>
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="90 123 45 67"
            value={formatPhoneDisplay(phone)}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            className={`pl-[120px] pr-4 h-12 text-base font-medium transition-all duration-300 border-2 ${
              isFocused
                ? "border-primary shadow-lg shadow-primary/20 bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${error ? "border-destructive" : ""}`}
          />
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 ${
              isFocused ? "w-full" : "w-0"
            }`}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-muted-foreground">{phone.length > 0 && `${phone.length}/9 raqam kiritildi`}</p>
          {phone.length === 9 && (
            <span className="text-xs text-green-600 font-medium animate-in fade-in slide-in-from-right-2">
              ✓ To'liq
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md animate-in fade-in slide-in-from-top-1 border border-destructive/20">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        disabled={isLoading || phone.length !== 9}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            OTP yuborilmoqda...
          </span>
        ) : (
          "OTP yuborish"
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Yoki davom eting</span>
        </div>
      </div>
    </form>
  )
}
