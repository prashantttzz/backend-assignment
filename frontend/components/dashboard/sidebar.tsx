'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, CheckSquare, Users, LogOut } from 'lucide-react'
import { isAdmin } from '@/lib/auth'

interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
  adminOnly?: boolean
}

const sidebarLinks: SidebarLink[] = [
  {
    href: '/user',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    href: '/user/tasks',
    label: 'My Tasks',
    icon: <CheckSquare className="h-4 w-4" />,
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: <Users className="h-4 w-4" />,
    adminOnly: true,
  },
  {
    href: '/admin/tasks',
    label: 'All Tasks',
    icon: <CheckSquare className="h-4 w-4" />,
    adminOnly: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const admin = isAdmin()

  const visibleLinks = sidebarLinks.filter(link => !link.adminOnly || admin)

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-bold text-xl">TaskManager</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">
          {admin ? 'Administrator' : 'User'}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {visibleLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2',
                  isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
              >
                {link.icon}
                {link.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/logout">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
