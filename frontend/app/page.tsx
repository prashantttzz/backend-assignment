'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, isAdmin } from '@/lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      // Redirect based on role
      const redirectPath = isAdmin() ? '/admin' : '/user'
      router.push(redirectPath)
    } else {
      router.push('/login')
    }
  }, [router])

  return null
}
