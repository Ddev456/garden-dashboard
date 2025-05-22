import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PlantHistory {
  id: string;
  plantName: string;
  plantIcon: string;
  plantedDate: string;
  harvestedDate?: string;
  yield?: string;
  notes?: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface EnvironmentalCondition {
  date: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
}

export interface Plant {
  id: string;
  name: string;
  icon: string;
  plantedDate: string;
  status: 'healthy' | 'warning' | 'danger';
  nextWateringDate: string;
  notes: string;
}

export interface Itinerary {
  id: string;
  name: string;
  icon: string;
  description: string;
  steps: string[];
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  author: string;
  photos?: string[];
}

export interface ZoneDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  favorite: boolean;
  surface: string;
  soilType: string;
  sunExposure: string;
  irrigationType: string;
  createdAt: string;
  currentPlants: Plant[];
  plantingHistory: PlantHistory[];
  tasks: Task[];
  notes: Note[];
  environmentalConditions: EnvironmentalCondition[];
  itineraries?: Itinerary[];
  journal?: JournalEntry[];
}

const today = new Date();

export const mockZoneDetail: ZoneDetail = {
  id: '1',
  name: 'Zone de culture 1',
  image: '/images/zone1.jpeg',
  description: 'Parcelle dans la serre avec la vigne type "muscat". Cette zone est idéale pour les cultures précoces et bénéficie d\'un microclimat favorable.',
  tags: ['Serre', 'Bio', 'Irrigation automatique', 'Sol fertile'],
  favorite: true,
  surface: '25m²',
  soilType: 'Terreau enrichi',
  sunExposure: 'Plein soleil - 6-8h/jour',
  irrigationType: 'Goutte à goutte automatique',
  createdAt: format(subDays(today, 180), 'dd MMMM yyyy', { locale: fr }),
  currentPlants: [
    {
      id: 'p1',
      name: 'Tomates Roma',
      icon: '/icons/plants/tomatoes.svg',
      plantedDate: format(subDays(today, 45), 'dd/MM/yyyy'),
      status: 'healthy',
      nextWateringDate: format(subDays(today, -1), 'dd/MM/yyyy'),
      notes: 'Croissance excellente, premiers fruits en formation'
    },
    {
      id: 'p2',
      name: 'Courgettes',
      icon: '/icons/plants/zucchini.svg',
      plantedDate: format(subDays(today, 30), 'dd/MM/yyyy'),
      status: 'warning',
      nextWateringDate: format(today, 'dd/MM/yyyy'),
      notes: 'Quelques signes de mildiou sur les feuilles basses'
    },
    {
      id: 'p3',
      name: 'Haricots verts',
      icon: '/icons/plants/beans.svg',
      plantedDate: format(subDays(today, 20), 'dd/MM/yyyy'),
      status: 'healthy',
      nextWateringDate: format(subDays(today, -2), 'dd/MM/yyyy'),
      notes: 'Début de la formation des gousses'
    }
  ],
  plantingHistory: [
    {
      id: 'ph1',
      plantName: 'Laitues',
      plantIcon: '/icons/plants/lettuce.svg',
      plantedDate: format(subDays(today, 90), 'dd/MM/yyyy'),
      harvestedDate: format(subDays(today, 45), 'dd/MM/yyyy'),
      yield: '15 têtes',
      notes: 'Récolte excellente, variété bien adaptée'
    },
    {
      id: 'ph2',
      plantName: 'Navets',
      plantIcon: '/icons/plants/turnip.svg',
      plantedDate: format(subDays(today, 120), 'dd/MM/yyyy'),
      harvestedDate: format(subDays(today, 90), 'dd/MM/yyyy'),
      yield: '3kg',
      notes: 'Croissance rapide, saveur excellente'
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Taille des tomates',
      description: 'Retirer les gourmands et attacher les nouvelles pousses',
      status: 'todo',
      dueDate: format(subDays(today, -3), 'dd/MM/yyyy'),
      priority: 'high'
    },
    {
      id: 't2',
      title: 'Traitement préventif bio',
      description: 'Pulvérisation de purin d\'ortie sur les courgettes',
      status: 'todo',
      dueDate: format(subDays(today, -1), 'dd/MM/yyyy'),
      priority: 'medium'
    },
    {
      id: 't3',
      title: 'Installation support haricots',
      description: 'Mettre en place les tuteurs supplémentaires',
      status: 'done',
      dueDate: format(subDays(today, 2), 'dd/MM/yyyy'),
      priority: 'low'
    }
  ],
  notes: [
    {
      id: 'n1',
      content: 'La production est excellente cette année. Le système d\'irrigation automatique a vraiment fait ses preuves.',
      createdAt: format(subDays(today, 5), 'dd/MM/yyyy HH:mm'),
      updatedAt: format(subDays(today, 5), 'dd/MM/yyyy HH:mm'),
      author: 'Dylan'
    },
    {
      id: 'n2',
      content: 'Attention à surveiller l\'apparition de mildiou sur les courgettes. Traitement préventif à prévoir.',
      createdAt: format(subDays(today, 2), 'dd/MM/yyyy HH:mm'),
      updatedAt: format(subDays(today, 2), 'dd/MM/yyyy HH:mm'),
      author: 'Sophie'
    }
  ],
  environmentalConditions: [
    {
      date: format(subDays(today, 0), 'dd/MM/yyyy'),
      temperature: 24,
      humidity: 65,
      soilMoisture: 75,
      lightLevel: 85
    },
    {
      date: format(subDays(today, 1), 'dd/MM/yyyy'),
      temperature: 23,
      humidity: 68,
      soilMoisture: 72,
      lightLevel: 80
    },
    {
      date: format(subDays(today, 2), 'dd/MM/yyyy'),
      temperature: 25,
      humidity: 62,
      soilMoisture: 70,
      lightLevel: 90
    }
  ],
  itineraries: [
    {
      id: 'i1',
      name: 'Itinéraire Tomates',
      icon: '/icons/plants/tomatoes.svg',
      description: 'De la plantation à la récolte des tomates Roma.',
      steps: ['Préparer le sol', 'Semer les graines', 'Tuteurer', 'Récolter les fruits']
    },
    {
      id: 'i2',
      name: 'Itinéraire Courgettes',
      icon: '/icons/plants/zucchini.svg',
      description: 'Toutes les étapes pour réussir la culture des courgettes.',
      steps: ['Préparer la planche', 'Planter les jeunes plants', 'Arroser', 'Récolter']
    }
  ],
  journal: [
    {
      id: 'j1',
      content: 'Première note du carnet de bord, météo idéale aujourd\'hui.',
      createdAt: format(subDays(today, 1), 'dd/MM/yyyy HH:mm'),
      author: 'Dylan',
      photos: ['/images/zone1.jpeg']
    },
    {
      id: 'j2',
      content: 'Ajout de compost ce matin, à surveiller l\'humidité.',
      createdAt: format(today, 'dd/MM/yyyy HH:mm'),
      author: 'Sophie'
    }
  ]
}; 