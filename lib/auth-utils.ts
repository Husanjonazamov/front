export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "")

  // Format as XX XXX XX XX
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`
  if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`
}

export function validatePhoneNumber(phone: string): boolean {
  // Check if phone has exactly 9 digits
  const digits = phone.replace(/\D/g, "")
  return digits.length === 9
}

export function generateOTP(): string {
  // Generate 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function validateOTP(otp: string): boolean {
  // Check if OTP is 6 digits
  return /^\d{6}$/.test(otp)
}

export function storeAuthData(phone: string, userType: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("userPhone", phone)
    localStorage.setItem("userType", userType)
  }
}

export function clearAuthData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userType")
  }
}

export function getAuthData() {
  if (typeof window !== "undefined") {
    return {
      phone: localStorage.getItem("userPhone"),
      userType: localStorage.getItem("userType"),
    }
  }
  return { phone: null, userType: null }
}
