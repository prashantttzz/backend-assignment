'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskForm } from '@/components/tasks/task-form'
import { tasksApi } from '@/lib/api-client'
import { Task, CreateTaskPayload } from '@/lib/types'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

export default function UserDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    setIsLoading(true)
    try {
      const data = await tasksApi.list()
      setTasks(data)
    } catch (error) {
      toast.error('Failed to load tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTask = async (data: CreateTaskPayload) => {
    try {
      const newTask = await tasksApi.create(data)
      setTasks([newTask, ...tasks])
      toast.success('Task created successfully')
    } catch (error) {
      toast.error('Failed to create task')
      throw error
    }
  }

  const handleUpdateTask = async (data: CreateTaskPayload) => {
    if (!editingTask) return
    try {
      const updated = await tasksApi.update(editingTask.id, data)
      setTasks(tasks.map(t => t.id === editingTask.id ? updated : t))
      setEditingTask(undefined)
      toast.success('Task updated successfully')
    } catch (error) {
      toast.error('Failed to update task')
      throw error
    }
  }

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await tasksApi.update(task.id, { completed: !task.completed })
      setTasks(tasks.map(t => t.id === task.id ? updated : t))
      toast.success(updated.completed ? 'Task completed' : 'Task reopened')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (task: Task) => {
    try {
      await tasksApi.delete(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const completedCount = tasks.filter(t => t.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your daily tasks and track progress
          </p>
        </div>
        <Button onClick={() => {
          setEditingTask(undefined)
          setIsFormOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {tasks.filter(t => !t.completed).length} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Waiting for action
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No tasks yet. Create one to get started!
            </CardContent>
          </Card>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              isLoading={isLoading}
            />
          ))
        )}
      </div>

      <TaskForm
        open={isFormOpen}
        task={editingTask}
        onOpenChange={setIsFormOpen}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        isLoading={isLoading}
      />
    </div>
  )
}
