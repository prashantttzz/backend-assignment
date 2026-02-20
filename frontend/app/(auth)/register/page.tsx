import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="text-muted-foreground mt-2">Create your account to get started</p>
      </div>
      <RegisterForm />
    </div>
  )
}
