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

// Zones de jardinage
export const mockZones = [
  {
    id: 'zone-1',
    name: 'Potager principal',
    description: 'Zone principale pour les légumes de saison',
    color: '#10b981',
    area: 25
  },
  {
    id: 'zone-2', 
    name: 'Serre',
    description: 'Espace protégé pour les semis et plantes fragiles',
    color: '#3b82f6',
    area: 12
  },
  {
    id: 'zone-3',
    name: 'Jardin aromatique',
    description: 'Herbes aromatiques et plantes médicinales',
    color: '#8b5cf6',
    area: 8
  },
  {
    id: 'zone-4',
    name: 'Verger',
    description: 'Arbres fruitiers et petits fruits',
    color: '#f59e0b',
    area: 40
  }
]

// Interface pour les tâches du calendrier
export interface CalendarTask {
  id: string
  title: string
  type: 'arrosage' | 'plantation' | 'taille' | 'fertilisation' | 'traitement' | 'récolte' | 'observation'
  date: string
  zoneId: string
  zoneName: string
  plantName?: string
  plantIcon?: string
  priority: 'haute' | 'moyenne' | 'basse'
  duration?: number // en minutes
  notes?: string
  completed?: boolean
}

// Tâches du calendrier
export const mockCalendarTasks: CalendarTask[] = [
  // Avril 2024
  {
    id: 'cal-1',
    title: 'Arrosage matinal',
    type: 'arrosage',
    date: '2024-04-15',
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Tomates',
    plantIcon: '/icons/plants/tomatoes.svg',
    priority: 'haute',
    duration: 30,
    notes: 'Arroser abondamment, vérifier l\'humidité du sol'
  },
  {
    id: 'cal-2',
    title: 'Plantation des courgettes',
    type: 'plantation',
    date: '2024-04-16',
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Courgettes',
    plantIcon: '/icons/plants/zucchini.svg',
    priority: 'haute',
    duration: 60,
    notes: 'Planter après les dernières gelées'
  },
  {
    id: 'cal-3',
    title: 'Taille des rosiers',
    type: 'taille',
    date: '2024-04-17',
    zoneId: 'zone-4',
    zoneName: 'Verger',
    plantName: 'Rosiers',
    plantIcon: '/icons/plants/roses.svg',
    priority: 'moyenne',
    duration: 45,
    notes: 'Taille de printemps, enlever le bois mort'
  },
  {
    id: 'cal-4',
    title: 'Fertilisation des herbes',
    type: 'fertilisation',
    date: '2024-04-18',
    zoneId: 'zone-3',
    zoneName: 'Jardin aromatique',
    plantName: 'Basilic',
    plantIcon: '/icons/plants/basil.svg',
    priority: 'basse',
    duration: 20,
    notes: 'Engrais organique liquide'
  },
  {
    id: 'cal-5',
    title: 'Semis en serre',
    type: 'plantation',
    date: '2024-04-19',
    zoneId: 'zone-2',
    zoneName: 'Serre',
    plantName: 'Aubergines',
    plantIcon: '/icons/plants/eggplant.svg',
    priority: 'haute',
    duration: 40,
    notes: 'Température optimale 20-25°C'
  },
  {
    id: 'cal-6',
    title: 'Récolte des radis',
    type: 'récolte',
    date: '2024-04-20',
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Radis',
    plantIcon: '/icons/plants/turnip.svg',
    priority: 'moyenne',
    duration: 15,
    notes: 'Récolter avant qu\'ils deviennent piquants'
  },
  {
    id: 'cal-7',
    title: 'Traitement préventif',
    type: 'traitement',
    date: '2024-04-21',
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Tomates',
    plantIcon: '/icons/plants/tomatoes.svg',
    priority: 'haute',
    duration: 25,
    notes: 'Bouillie bordelaise contre le mildiou'
  },
  {
    id: 'cal-8',
    title: 'Observation des semis',
    type: 'observation',
    date: '2024-04-22',
    zoneId: 'zone-2',
    zoneName: 'Serre',
    priority: 'basse',
    duration: 10,
    notes: 'Vérifier la germination et l\'état général'
  },
  // Tâches récurrentes pour le mois
  {
    id: 'cal-9',
    title: 'Arrosage quotidien serre',
    type: 'arrosage',
    date: '2024-04-23',
    zoneId: 'zone-2',
    zoneName: 'Serre',
    priority: 'haute',
    duration: 15,
    notes: 'Maintenir l\'humidité constante'
  },
  {
    id: 'cal-10',
    title: 'Arrosage quotidien serre',
    type: 'arrosage',
    date: '2024-04-24',
    zoneId: 'zone-2',
    zoneName: 'Serre',
    priority: 'haute',
    duration: 15,
    notes: 'Maintenir l\'humidité constante'
  },
  // Tâches pour aujourd'hui (pour tester la vue mobile)
  {
    id: 'cal-today-1',
    title: 'Arrosage matinal urgent',
    type: 'arrosage',
    date: new Date().toISOString().split('T')[0],
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Tomates',
    plantIcon: '/icons/plants/tomatoes.svg',
    priority: 'haute',
    duration: 20,
    notes: 'Vérifier l\'humidité du sol'
  },
  {
    id: 'cal-today-2',
    title: 'Récolte des radis',
    type: 'récolte',
    date: new Date().toISOString().split('T')[0],
    zoneId: 'zone-1',
    zoneName: 'Potager principal',
    plantName: 'Radis',
    plantIcon: '/icons/plants/turnip.svg',
    priority: 'moyenne',
    duration: 10,
    notes: 'Récolter avant la montée en graines'
  },
  {
    id: 'cal-today-3',
    title: 'Observation des semis',
    type: 'observation',
    date: new Date().toISOString().split('T')[0],
    zoneId: 'zone-2',
    zoneName: 'Serre',
    priority: 'basse',
    duration: 5,
    notes: 'Vérifier la germination'
  }
] 