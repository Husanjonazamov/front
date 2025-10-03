import { UserTypeSelection } from "@/components/auth/user-type-selection"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <UserTypeSelection />
    </div>
  )
}
