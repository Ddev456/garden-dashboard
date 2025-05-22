export type TaskPriority = 'haute' | 'moyenne' | 'basse'
export type TaskStatus = 'à_faire' | 'en_cours' | 'terminé'

export interface Task {
  id: string
  title: string
  description?: string
  assigneeId: string
  priority: TaskPriority
  status: TaskStatus
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
} 