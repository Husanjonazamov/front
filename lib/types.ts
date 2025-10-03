export type UserType = "user" | "author"

export interface User {
  id: string
  phone: string
  userType: UserType
  firstName?: string
  lastName?: string
  organizationName?: string
  industries?: string[]
  createdAt: Date
}

export interface LoginFormData {
  phone: string
}

export interface OTPFormData {
  otp: string
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  phone: string
  userType: UserType
  industries: string[]
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}
