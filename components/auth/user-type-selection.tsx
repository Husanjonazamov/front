"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Building2 } from "lucide-react"

export function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState<"individual" | "legal" | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedType) {
      localStorage.setItem("userType", selectedType)
      router.push("/register/details")
    }
  }

  return (
    <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Foydalanuvchi turini tanlang</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Platformadan qanday maqsadda foydalanmoqchi bo'lsangiz o'sha birini tanlang
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 ${
            selectedType === "individual"
              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => setSelectedType("individual")}
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedType === "individual" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}
            >
              <User className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Jismoniy shaxs</h3>
              <p className="text-muted-foreground leading-relaxed">Jismoniy shaxs sifatida davom etish</p>
            </div>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 ${
            selectedType === "legal"
              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => setSelectedType("legal")}
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedType === "legal" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}
            >
              <Building2 className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Yuridik shaxs</h3>
              <p className="text-muted-foreground leading-relaxed">Tashkilot yoki korxona sifatida ro'yxatdan o'tish</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full h-14 text-lg font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Davom etish
        </Button>

        <p className="text-center text-muted-foreground">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  )
}
