'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const redirectPath = isAdmin() ? '/admin' : '/user'
    router.push(redirectPath)
  }, [router])

  return null
}
