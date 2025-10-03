"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Check, Building2, Mail, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { formatPhoneNumber, validatePhoneNumber } from "@/lib/auth-utils"
import { IndustrySelection } from "./industry-selection"

export function RegisterForm() {
  const [userType, setUserType] = useState<string>("")
  const [step, setStep] = useState<"basic" | "industry">("basic")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    industries: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    const type = localStorage.getItem("userType") || ""
    setUserType(type)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 9)
      setFormData({
        ...formData,
        phone: digits,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateBasicForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.firstName.length < 2) {
      newErrors.firstName = "Ism kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = "Familiya kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateBasicForm()) {
      return
    }

    setStep("industry")
  }

  const handleIndustrySelect = async (industryIds: string[]) => {
    setIsLoading(true)

    const registrationData = {
      ...formData,
      industries: industryIds,
      userType,
      fullPhone: `+998${formData.phone}`,
    }

    console.log("[v0] Ro'yxatdan o'tish ma'lumotlari:", registrationData)

    localStorage.setItem("userData", JSON.stringify(registrationData))

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Redirect to OTP verification
      router.push(`/verify-otp?phone=${encodeURIComponent(registrationData.fullPhone)}`)
    }, 1500)
  }

  if (userType === "author") {
    return (
      <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500 delay-100">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            <h3 className="text-2xl font-bold text-foreground">Yuridik shaxslar uchun</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Yuridik shaxslar uchun ro'yxatdan o'tish jarayoni hozirda ishlab chiqilmoqda. Tez orada bu xizmat mavjud
              bo'ladi.
            </p>
          </div>
          <div className="space-y-3 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            <div className="flex items-center gap-3 text-left p-3 bg-background rounded-lg hover:shadow-md transition-shadow">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Email orqali murojaat qiling</p>
                <p className="text-sm text-muted-foreground">info@platform.uz</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left p-3 bg-background rounded-lg hover:shadow-md transition-shadow">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Telefon orqali bog'laning</p>
                <p className="text-sm text-muted-foreground">+998 90 123 45 67</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left p-3 bg-background rounded-lg hover:shadow-md transition-shadow">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Ofisimizga tashrif buyuring</p>
                <p className="text-sm text-muted-foreground">Toshkent sh., Amir Temur ko'chasi 108</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (step === "industry") {
    return (
      <IndustrySelection
        onSelect={handleIndustrySelect}
        onBack={() => setStep("basic")}
        minSelection={1}
        maxSelection={4}
      />
    )
  }

  return (
    <form onSubmit={handleBasicInfoSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="firstName">Ism</Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Ismingizni kiriting"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
        />
        {errors.firstName && (
          <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Familiya</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Familiyangizni kiriting"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
        />
        {errors.lastName && (
          <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">{errors.lastName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon raqami</Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
            <Phone className="w-4 h-4 text-primary transition-all duration-200 group-focus-within:scale-110" />
            <span className="text-primary font-semibold">+998</span>
          </div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="90 123 45 67"
            value={formatPhoneNumber(formData.phone)}
            onChange={handleChange}
            required
            className="pl-24 pr-12 transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01] focus:shadow-lg group"
          />
          {formData.phone.length === 9 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-in zoom-in duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
          <div className="absolute right-3 bottom-1 text-xs text-muted-foreground">{formData.phone.length}/9</div>
        </div>
        {errors.phone && (
          <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">{errors.phone}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        Davom etish
      </Button>
    </form>
  )
}
