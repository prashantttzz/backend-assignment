'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { adminApi } from '@/lib/api-client'
import { User, Task } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/user')
      return
    }
    loadStats()
  }, [router])

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const [users, tasks] = await Promise.all([
        adminApi.users(),
        adminApi.allTasks(),
      ])
      
      setStats({
        totalUsers: users.length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.completed).length,
      })
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your task management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active users in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All tasks created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% completion
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Manage your system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a 
              href="/admin/users" 
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium">Manage Users</div>
              <div className="text-sm text-muted-foreground">View and manage user accounts</div>
            </a>
            <a 
              href="/admin/tasks" 
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium">Manage Tasks</div>
              <div className="text-sm text-muted-foreground">View and manage all tasks</div>
            </a>
            <a 
              href="/admin/assign-task" 
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium">Assign Task</div>
              <div className="text-sm text-muted-foreground">Create and assign new tasks</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">API Connection</span>
              <span className="text-sm text-green-500">✓ Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Database</span>
              <span className="text-sm text-green-500">✓ Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">Now</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
