import { Task } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit2, Trash2 } from 'lucide-react'

interface TaskCardProps {
  task: Task
  onToggle?: (task: Task) => void
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
  isLoading?: boolean
}

export function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
  isLoading = false,
}: TaskCardProps) {
  return (
    <Card className="border border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle?.(task)}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="flex-1">
              <CardTitle className={task.completed ? 'line-through text-muted-foreground' : ''}>
                {task.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {task.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(task)}
              disabled={isLoading}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(task)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}
