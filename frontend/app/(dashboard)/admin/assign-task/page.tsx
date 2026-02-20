'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { adminApi } from '@/lib/api-client'
import { User } from '@/lib/types'
import { toast } from 'sonner'

const assignTaskSchema = z.object({
  userId: z.string().min(1, 'Please select a user'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

type AssignTaskFormData = z.infer<typeof assignTaskSchema>

export default function AssignTaskPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<AssignTaskFormData>({
    resolver: zodResolver(assignTaskSchema),
  })

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/user')
      return
    }
    loadUsers()
  }, [router])

  const loadUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const data = await adminApi.users()
      setUsers(data)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const onSubmit = async (data: AssignTaskFormData) => {
    setIsLoading(true)
    try {
      await adminApi.assignTask({
        userId: data.userId,
        title: data.title,
        description: data.description,
      })
      toast.success('Task assigned successfully')
      reset()
      router.push('/admin/tasks')
    } catch (error) {
      toast.error('Failed to assign task')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assign Task</h1>
        <p className="text-muted-foreground mt-1">
          Create and assign a new task to a user
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New Task Assignment</CardTitle>
          <CardDescription>
            Fill in the details below to assign a task to a user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Assign To</Label>
              <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="userId" disabled={isLoadingUsers}>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.userId && (
                <p className="text-sm text-destructive">{errors.userId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                {...register('title')}
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                {...register('description')}
                disabled={isLoading}
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/tasks')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || isLoadingUsers}>
                {isLoading ? 'Assigning...' : 'Assign Task'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
