// Types pour le Wiki des Plantes

export interface PlantVariety {
  id: string
  name: string
  description: string
  characteristics: string[]
  difficulty: 'facile' | 'moyen' | 'difficile'
  harvestTime: string
  specialFeatures?: string[]
}

export interface PlantCompanion {
  plantId: string
  plantName: string
  plantIcon: string
  benefit: string
  distance: string
  type: 'beneficial' | 'neutral' | 'avoid'
}

export interface PlantPest {
  id: string
  name: string
  description: string
  symptoms: string[]
  prevention: string[]
  treatment: string[]
  severity: 'low' | 'medium' | 'high'
  season: ('printemps' | 'été' | 'automne' | 'hiver')[]
}

export interface PlantDisease {
  id: string
  name: string
  description: string
  symptoms: string[]
  causes: string[]
  prevention: string[]
  treatment: string[]
  severity: 'low' | 'medium' | 'high'
}

export interface NutritionalValue {
  nutrient: string
  amount: string
  unit: string
  description: string
  healthBenefit: string
}

export interface UserNote {
  id: string
  userId: string
  content: string
  rating?: number
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

export interface CulturalTip {
  title: string
  description: string
  season?: ('printemps' | 'été' | 'automne' | 'hiver')[]
  difficulty?: 'facile' | 'moyen' | 'difficile'
  category: 'semis' | 'plantation' | 'entretien' | 'récolte' | 'conservation'
}

export interface Plant {
  id: string
  slug: string
  name: string
  scientificName: string
  icon: string
  images?: string[]
  category: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  difficulty: 'facile' | 'moyen' | 'difficile'
  seasons: ('printemps' | 'été' | 'automne' | 'hiver')[]
  
  // Infos de base
  description: string
  characteristics: string[]
  origin?: string
  family: string
  
  // Culture
  sowingPeriod: string
  plantingPeriod?: string
  harvestPeriod: string
  growthDuration: string
  spacing: string
  exposure: string
  soil: string
  watering: string
  temperature: {
    min: number
    max: number
    optimal: number
  }
  
  // Enrichi
  varieties?: PlantVariety[]
  companions?: PlantCompanion[]
  pests?: PlantPest[]
  diseases?: PlantDisease[]
  nutritionalValues?: NutritionalValue[]
  culturalTips?: CulturalTip[]
  
  // Metadata
  tags: string[]
  relatedItineraries?: string[]
  averageRating?: number
  ratingsCount?: number
  userNotes?: UserNote[]
  popularity?: number
  
  // Historique utilisateur (sera rempli dynamiquement)
  userHistory?: {
    hasGrown: boolean
    lastGrown?: string
    successRate?: number
    personalRating?: number
  }
}

export interface PlantFilter {
  category?: string[]
  difficulty?: string[]
  seasons?: string[]
  characteristics?: string[]
  search?: string
}

export interface PlantSearchResult {
  plants: Plant[]
  total: number
  filters: {
    categories: { value: string; count: number }[]
    difficulties: { value: string; count: number }[]
    seasons: { value: string; count: number }[]
    characteristics: { value: string; count: number }[]
  }
} 