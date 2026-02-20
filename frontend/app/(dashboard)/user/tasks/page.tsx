'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskCard } from '@/components/tasks/task-card'
import { TaskForm } from '@/components/tasks/task-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { tasksApi } from '@/lib/api-client'
import { Task, CreateTaskPayload } from '@/lib/types'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

type TaskFilter = 'all' | 'pending' | 'completed'

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [filter, setFilter] = useState<TaskFilter>('all')

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your tasks
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

      <div className="flex gap-4">
        <Select value={filter} onValueChange={(value) => setFilter(value as TaskFilter)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks List</CardTitle>
          <CardDescription>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <p className="text-muted-foreground">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {filter === 'all' ? 'No tasks yet. Create one to get started!' : `No ${filter} tasks`}
            </p>
          ) : (
            filteredTasks.map(task => (
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
        </CardContent>
      </Card>

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
