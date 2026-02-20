import { string } from 'zod'
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  User,
  AssignTaskPayload,
  ApiError,
} from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

// Helper to add auth token to requests
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string,string>,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error: ApiError = {
      message: `API Error: ${response.statusText}`,
      status: response.status,
    }

    try {
      const errorData = await response.json()
      error.message = errorData.message || error.message
    } catch {}

    throw error
  }

  return response.json()
}

// Auth endpoints
export const authApi = {
  login: (payload: LoginPayload) =>
    apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  register: (payload: RegisterPayload) =>
    apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

// User task endpoints
export const tasksApi = {
  list: () => apiFetch<Task[]>('/tasks'),

  create: (payload: CreateTaskPayload) =>
    apiFetch<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: UpdateTaskPayload) =>
    apiFetch<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  delete: (id: string) =>
    apiFetch<{ success: boolean }>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
}

// Admin endpoints
export const adminApi = {
  users: () => apiFetch<User[]>('/admin/users'),

  deleteUser: (id: string) =>
    apiFetch<{ success: boolean }>(`/admin/users/${id}`, {
      method: 'DELETE',
    }),

  updateUserRole: (id: string, role: 'USER' | 'ADMIN') =>
    apiFetch<User>(`/admin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    }),

  allTasks: () => apiFetch<Task[]>('/admin/tasks'),

  assignTask: (payload: AssignTaskPayload) =>
    apiFetch<Task>('/admin/assign-task', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateTask: (id: string, payload: UpdateTaskPayload) =>
    apiFetch<Task>(`/admin/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  deleteTask: (id: string) =>
    apiFetch<{ success: boolean }>(`/admin/tasks/${id}`, {
      method: 'DELETE',
    }),
}
