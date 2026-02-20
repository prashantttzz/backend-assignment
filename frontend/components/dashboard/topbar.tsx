'use client'

import { getUser } from '@/lib/auth'
import { Card } from '@/components/ui/card'

export function Topbar() {
  const user = getUser()

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Welcome</h2>
          <p className="text-sm text-muted-foreground">
            {user?.name || 'User'}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  )
}
