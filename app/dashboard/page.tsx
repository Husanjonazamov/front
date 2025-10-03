"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User, Phone, Calendar, Edit2, Briefcase } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userType")
    localStorage.removeItem("userData")
    router.push("/login")
  }

  // Get user data from localStorage (in real app, this would come from auth context/API)
  const userPhone = typeof window !== "undefined" ? localStorage.getItem("userPhone") : null
  const userType = typeof window !== "undefined" ? localStorage.getItem("userType") : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl">AuthApp</span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Chiqish
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Xush kelibsiz!</h1>
            <p className="text-gray-600 text-lg">
              {userData?.firstName && userData?.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : "Siz muvaffaqiyatli tizimga kirdingiz"}
            </p>
          </div>

          {/* User Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Telefon raqam
                </CardTitle>
                <CardDescription>Sizning ro'yxatdan o'tgan raqamingiz</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{userData?.fullPhone || userPhone || "+998 90 123 45 67"}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Foydalanuvchi turi
                </CardTitle>
                <CardDescription>Sizning hisob turingiz</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {userType === "user" ? "Jismoniy shaxs" : userType === "author" ? "Yuridik shaxs" : "Foydalanuvchi"}
                </p>
              </CardContent>
            </Card>

            {userData?.industries && userData.industries.length > 0 && (
              <Card className="hover:shadow-lg transition-shadow md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    Faoliyat sohalari
                  </CardTitle>
                  <CardDescription>Siz tanlagan yo'nalishlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{userData.industries.length} ta soha tanlangan</p>
                </CardContent>
              </Card>
            )}

            <Card className="hover:shadow-lg transition-shadow md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Hisob ma'lumotlari
                </CardTitle>
                <CardDescription>Sizning profilingiz haqida</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Holat:</span>
                  <span className="font-medium text-green-600">Faol</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Ro'yxatdan o'tgan sana:</span>
                  <span className="font-medium">{new Date().toLocaleDateString("uz-UZ")}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tasdiqlangan:</span>
                  <span className="font-medium text-green-600">Ha</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Tezkor harakatlar</CardTitle>
              <CardDescription>Profilingizni boshqaring</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 bg-transparent hover:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => router.push("/profile")}
              >
                <Edit2 className="w-6 h-6" />
                <span>Profilni tahrirlash</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 bg-transparent hover:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => router.push("/profile")}
              >
                <Phone className="w-6 h-6" />
                <span>Ma'lumotlarni ko'rish</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
