// Types pour l'assistant de génération d'itinéraires

export interface PlantDatabase {
  id: string
  name: string
  type: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  description: string
  icon: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  
  // Contraintes de culture
  soilTypes: string[]
  sunExposure: string[]
  seasons: string[]
  spacing: string
  depth: string
  
  // Timing
  seedingPeriod: string[]
  transplantPeriod: string[]
  harvestPeriod: string[]
  growthDuration: string
  
  // Informations détaillées (reprises du type ZoneItinerary)
  varieties?: {
    name: string
    characteristics: string
    difficulty: 'facile' | 'moyen' | 'difficile'
    harvestTime: string
  }[]
  
  companions?: {
    plant: string
    benefit: string
    distance: string
    icon: string
  }[]
  
  pests?: {
    name: string
    description: string
    prevention: string
    treatment: string
  }[]
  
  diseases?: {
    name: string
    symptoms: string
    prevention: string
    treatment: string
  }[]
  
  nutritionalBenefits?: {
    nutrient: string
    description: string
  }[]
  
  storageAdvice?: {
    method: string
    duration: string
    tips: string[]
  }
  
  // Template d'étapes pour génération automatique
  stepTemplates: {
    title: string
    description: string
    duration: string
    relativeWeek: number // Semaine relative au démarrage
    icon: string
    tools: string[]
    tips: string[]
  }[]
}

export interface AssistantStep {
  id: string
  title: string
  description: string
  component: string
  isValid: boolean
  data?: any
}

export interface AssistantState {
  currentStep: number
  isOpen: boolean
  
  // Données collectées
  selectedGarden?: string
  selectedZone?: string
  selectedPlantType?: string
  selectedPlant?: PlantDatabase
  selectedSeason?: string
  selectedVariety?: string
  selectedCompanions?: string[]
  customNotes?: string
  
  // Itinéraire généré
  generatedItinerary?: any
}

export interface SeasonInfo {
  id: string
  name: string
  description: string
  months: string[]
  icon: string
  color: string
} 