// Types centralisés pour le système de jardinage

export interface ItineraryStep {
  id: string
  title: string
  description: string
  duration: string
  optimalPeriod: string
  completed: boolean
  completedDate?: string
  icon?: string
  tools: string[]
  tips: string[]
}

export interface Variety {
  name: string
  characteristics: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  harvestTime: string
}

export interface Companion {
  plant: string
  benefit: string
  distance: string
  icon: string
}

export interface Pest {
  name: string
  description: string
  prevention: string
  treatment: string
}

export interface Disease {
  name: string
  symptoms: string
  prevention: string
  treatment: string
}

export interface NutritionalBenefit {
  nutrient: string
  description: string
}

export interface StorageAdvice {
  method: string
  duration: string
  tips: string[]
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'guide' | 'forum'
}

export interface ZoneItinerary {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  totalDuration: string
  plantType: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  season: 'printemps' | 'été' | 'automne' | 'hiver' | 'toute-saison'
  progress: number
  startedDate?: string
  expectedHarvestDate?: string
  zoneId: string
  zoneName: string
  steps: ItineraryStep[]
  
  // Nouvelles propriétés pour l'onglet Informations
  images?: string[]
  varieties?: Variety[]
  companions?: Companion[]
  pests?: Pest[]
  diseases?: Disease[]
  nutritionalBenefits?: NutritionalBenefit[]
  storageAdvice?: StorageAdvice
  resources?: Resource[]
}

export interface Zone {
  id: string
  name: string
  description: string
  image: string
  icon?: string
  surface: string
  soilType: string
  sunExposure: string
  irrigationType: string
  color: string
  gardenId: string
  itineraries: ZoneItinerary[]
}

export interface Garden {
  id: string
  name: string
  description: string
  icon: string
  createdAt: string
  location?: string
  zones: Zone[]
} 