import { User, UserRole } from './types'

// Token management
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}

// User management
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = (): void => {
  localStorage.removeItem('user')
}

// Authentication state
export const isAuthenticated = (): boolean => {
  return getToken() !== null
}

export const isAdmin = (): boolean => {
  const user = getUser()
  return user?.role === 'ADMIN'
}

// Logout
export const logout = (): void => {
  removeToken()
  removeUser()
}
