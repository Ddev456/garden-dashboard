import type { Task, User } from '~/types/task'

export const mockUsers: User[] = [
  {
    id: '0',
    name: 'Dylan Admin',
    email: 'dylan@carnetpotager.fr',
    avatar: '/avatar.png',
    role: 'admin'
  },
  {
    id: '1',
    name: 'Thomas Dupont',
    email: 'thomas.dupont@jardin.fr',
    avatar: '/avatars/thomas.jpg',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Marie Laurent',
    email: 'marie.laurent@jardin.fr',
    avatar: '/avatars/marie.jpg',
    role: 'user'
  },
  {
    id: '3',
    name: 'Pierre Martin',
    email: 'pierre.martin@jardin.fr',
    avatar: '/avatars/pierre.jpg',
    role: 'user'
  }
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Planter les tomates cerises',
    description: 'Préparer les semis pour la nouvelle saison',
    assigneeId: '1',
    priority: 'haute',
    status: 'à_faire',
    dueDate: new Date('2024-04-15'),
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20')
  },
  {
    id: '2',
    title: 'Entretien des rosiers',
    description: 'Tailler et fertiliser les rosiers du jardin principal',
    assigneeId: '2',
    priority: 'moyenne',
    status: 'en_cours',
    createdAt: new Date('2024-03-19'),
    updatedAt: new Date('2024-03-19')
  },
  {
    id: '3',
    title: 'Installation système irrigation',
    description: 'Mettre en place le nouveau système d\'arrosage automatique',
    assigneeId: '3',
    priority: 'haute',
    status: 'en_cours',
    dueDate: new Date('2024-04-01'),
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-18')
  },
  {
    id: '4',
    title: 'Commande de terreau bio',
    description: 'Renouveler le stock de terreau pour les plantations',
    assigneeId: '1',
    priority: 'basse',
    status: 'terminé',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-17')
  }
]

export const taskStats = {
  today: mockTasks.filter(t => t.status === 'à_faire').length,
  enCours: mockTasks.filter(t => t.status === 'en_cours').length,
  termine: mockTasks.filter(t => t.status === 'terminé').length,
  total: mockTasks.length
} 