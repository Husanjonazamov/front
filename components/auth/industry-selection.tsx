"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"

export interface Industry {
  id: string
  name: string
  image: string
}

const industries: Industry[] = [
  {
    id: "safety",
    name: "Xavfsizlik va himoya",
    image: "/safety-security-protection.jpg",
  },
  {
    id: "appliances",
    name: "Maishiy texnika",
    image: "/home-appliances-kitchen.jpg",
  },
  {
    id: "health",
    name: "Sog'liqni saqlash va tibbiyot",
    image: "/healthcare-medical-doctor.jpg",
  },
  {
    id: "home",
    name: "Uy va bog'",
    image: "/home-garden-house.jpg",
  },
  {
    id: "food",
    name: "Oziq-ovqat va ichimliklar",
    image: "/food-beverages-restaurant.jpg",
  },
  {
    id: "toys",
    name: "O'yinchoqlar va sevimli mashg'ulotlar",
    image: "/toys-hobbies-games.jpg",
  },
  {
    id: "tools",
    name: "Asboblar va uskunalar",
    image: "/tools-equipment-construction.jpg",
  },
  {
    id: "services",
    name: "Tijorat xizmatlari",
    image: "/business-services-office.jpg",
  },
  {
    id: "beauty",
    name: "Go'zallik va shaxsiy gigiena",
    image: "/beauty-cosmetics-personal-care.jpg",
  },
  {
    id: "lighting",
    name: "Lampalar va yoritish",
    image: "/lighting-lamps-illumination.jpg",
  },
  {
    id: "furniture",
    name: "Mebel",
    image: "/furniture-interior-design.jpg",
  },
  {
    id: "minerals",
    name: "Minerallar va metallurgiya",
    image: "/minerals-metallurgy-mining.jpg",
  },
]

interface IndustrySelectionProps {
  onSelect: (industryIds: string[]) => void
  onBack: () => void
  initialSelected?: string[]
  minSelection?: number
  maxSelection?: number
}

export function IndustrySelection({
  onSelect,
  onBack,
  initialSelected = [],
  minSelection = 1,
  maxSelection = 4,
}: IndustrySelectionProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(initialSelected)

  const handleSelect = (industryId: string) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industryId)) {
        return prev.filter((id) => id !== industryId)
      }

      if (prev.length >= maxSelection) {
        return prev
      }

      return [...prev, industryId]
    })
  }

  const handleContinue = () => {
    if (selectedIndustries.length >= minSelection) {
      onSelect(selectedIndustries)
    }
  }

  const selectionCount = selectedIndustries.length
  const isMinReached = selectionCount >= minSelection
  const isMaxReached = selectionCount >= maxSelection

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 pb-2 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">Faoliyat sohalarini tanlang</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {maxSelection} tagacha soha tanlashingiz mumkin ({selectionCount} tanlandi)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {industries.map((industry, index) => {
          const isSelected = selectedIndustries.includes(industry.id)
          const isDisabled = isMaxReached && !isSelected

          return (
            <div
              key={industry.id}
              onClick={() => !isDisabled && handleSelect(industry.id)}
              className={`cursor-pointer transition-all duration-300 overflow-hidden group relative rounded-xl ${
                isSelected
                  ? "ring-2 ring-primary shadow-2xl scale-[1.02]"
                  : isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:ring-2 hover:ring-primary/50 hover:shadow-xl hover:scale-[1.01]"
              } animate-in fade-in slide-in-from-bottom-2`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="relative h-36 sm:h-44 overflow-hidden rounded-xl">
                <img
                  src={industry.image || "/placeholder.svg"}
                  alt={industry.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isSelected
                      ? "scale-110 brightness-90"
                      : isDisabled
                        ? "grayscale"
                        : "group-hover:scale-110 group-hover:brightness-95"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm sm:text-base leading-tight drop-shadow-lg">
                  {industry.name}
                </h3>

                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300 ring-2 ring-white">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!isMinReached}
        className="w-full h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {!isMinReached ? `Kamida ${minSelection} ta soha tanlang` : `Ro'yxatdan o'tish (${selectionCount} ta tanlandi)`}
      </Button>
    </div>
  )
}

export { industries }
