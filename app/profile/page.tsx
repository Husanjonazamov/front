"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Phone, Briefcase, Check, Edit2, Save, X } from "lucide-react"
import { formatPhoneNumber, validatePhoneNumber } from "@/lib/auth-utils"
import { IndustrySelection, industries } from "@/components/auth/industry-selection"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingIndustries, setIsEditingIndustries] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    fullPhone: "",
    industries: [] as string[],
    userType: "",
  })

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setUserData(data)
      setEditData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
      })
    }
  }, [])

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      })
      setErrors({})
    }
    setIsEditing(!isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 9)
      setEditData({
        ...editData,
        phone: digits,
      })
    } else {
      setEditData({
        ...editData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (editData.firstName.length < 2) {
      newErrors.firstName = "Ism kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (editData.lastName.length < 2) {
      newErrors.lastName = "Familiya kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (!validatePhoneNumber(editData.phone)) {
      newErrors.phone = "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        ...userData,
        ...editData,
        fullPhone: `+998${editData.phone}`,
      }

      setUserData(updatedData)
      localStorage.setItem("userData", JSON.stringify(updatedData))

      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleIndustryUpdate = (industryIds: string[]) => {
    const updatedData = {
      ...userData,
      industries: industryIds,
    }

    setUserData(updatedData)
    localStorage.setItem("userData", JSON.stringify(updatedData))
    setIsEditingIndustries(false)
  }

  const getIndustryNames = (industryIds: string[]) => {
    return industryIds.map((id) => industries.find((ind) => ind.id === id)?.name).filter(Boolean)
  }

  if (isEditingIndustries) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <IndustrySelection
            onSelect={handleIndustryUpdate}
            onBack={() => setIsEditingIndustries(false)}
            initialSelected={userData.industries}
            minSelection={1}
            maxSelection={4}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-xl">Profil</h1>
              <p className="text-sm text-muted-foreground">Shaxsiy ma'lumotlaringiz</p>
            </div>
          </div>
          <Button
            onClick={isEditing ? handleEditToggle : handleEditToggle}
            variant={isEditing ? "outline" : "default"}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Bekor qilish
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Tahrirlash
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Avatar */}
          <div className="flex justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Personal Information */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Shaxsiy ma'lumotlar
              </CardTitle>
              <CardDescription>Ismingiz va familiyangiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ism</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleChange}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive animate-in fade-in">{errors.firstName}</p>
                    )}
                  </>
                ) : (
                  <p className="text-lg font-medium">{userData.firstName || "—"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Familiya</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleChange}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive animate-in fade-in">{errors.lastName}</p>
                    )}
                  </>
                ) : (
                  <p className="text-lg font-medium">{userData.lastName || "—"}</p>
                )}
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full gap-2 transition-all duration-200 hover:scale-[1.02]"
                >
                  {isSaving ? (
                    "Saqlanmoqda..."
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Saqlash
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-600" />
                Aloqa ma'lumotlari
              </CardTitle>
              <CardDescription>Telefon raqamingiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqami</Label>
                {isEditing ? (
                  <>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-primary font-semibold">+998</span>
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="90 123 45 67"
                        value={formatPhoneNumber(editData.phone)}
                        onChange={handleChange}
                        className="pl-24 pr-12 transition-all duration-300 focus:ring-2 focus:ring-primary"
                      />
                      {editData.phone.length === 9 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-in zoom-in duration-300">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.phone && <p className="text-sm text-destructive animate-in fade-in">{errors.phone}</p>}
                  </>
                ) : (
                  <p className="text-lg font-medium">{userData.fullPhone || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Industries */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    Faoliyat sohalari
                  </CardTitle>
                  <CardDescription>Siz tanlagan yo'nalishlar</CardDescription>
                </div>
                <Button onClick={() => setIsEditingIndustries(true)} variant="outline" size="sm" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  O'zgartirish
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {userData.industries && userData.industries.length > 0 ? (
                <div className="grid gap-3">
                  {getIndustryNames(userData.industries).map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 animate-in fade-in slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-medium text-foreground">{name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Hali yo'nalish tanlanmagan</p>
              )}
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            <CardHeader>
              <CardTitle>Hisob turi</CardTitle>
              <CardDescription>Foydalanuvchi toifangiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {userData.userType === "user" ? "Jismoniy shaxs" : "Yuridik shaxs"}
                  </p>
                  <p className="text-sm text-muted-foreground">Standart foydalanuvchi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
