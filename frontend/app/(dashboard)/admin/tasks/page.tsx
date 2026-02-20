'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { adminApi } from '@/lib/api-client'
import { Task } from '@/lib/types'
import { toast } from 'sonner'
import { Trash2, Plus } from 'lucide-react'

export default function AdminTasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<Task | null>(null)

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/user')
      return
    }
    loadTasks()
  }, [router])

  const loadTasks = async () => {
    setIsLoading(true)
    try {
      const data = await adminApi.allTasks()
      setTasks(data)
    } catch (error) {
      toast.error('Failed to load tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await adminApi.updateTask(task.id, { completed: !task.completed })
      setTasks(tasks.map(t => t.id === task.id ? updated : t))
      toast.success(updated.completed ? 'Task completed' : 'Task reopened')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (task: Task) => {
    try {
      await adminApi.deleteTask(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
      setDeleteConfirm(null)
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all tasks in the system
          </p>
        </div>
        <Button onClick={() => router.push('/admin/assign-task')}>
          <Plus className="h-4 w-4 mr-2" />
          Assign Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>
            Total tasks: {tasks.length} ({tasks.filter(t => !t.completed).length} pending)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No tasks found</p>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Done</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task)}
                        />
                      </TableCell>
                      <TableCell className={task.completed ? 'line-through text-muted-foreground' : 'font-medium'}>
                        {task.title}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {task.description}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {task.user?.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {task.user?.email || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteConfirm(task)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{deleteConfirm?.title}"? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteTask(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
