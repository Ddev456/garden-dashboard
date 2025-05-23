<template>
  <div class="bg-primary/5 rounded-lg p-6 transform transition-all duration-300 hover:bg-primary/8">
    <div class="flex items-start gap-6">
      <div class="relative">
        <img :src="itinerary.icon" :alt="itinerary.name" class="size-16 transition-transform duration-300 hover:scale-110" />
        <!-- Badge de progression sur l'icône -->
        <div 
          v-if="itinerary.progress > 0"
          class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
        >
          {{ Math.round(itinerary.progress) }}%
        </div>
      </div>
      <div class="flex-1">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-primary transition-colors duration-300">{{ itinerary.name }}</h1>
            <p class="text-gray-600 mt-2">{{ itinerary.description }}</p>
          </div>
          <Badge 
            :variant="getDifficultyVariant(itinerary.difficulty)"
            class="text-sm px-3 py-1 transition-all duration-300 hover:scale-105"
          >
            {{ itinerary.difficulty }}
          </Badge>
        </div>
        
        <!-- Informations générales avec animations -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div 
            v-for="(info, index) in informationCards" 
            :key="info.label"
            class="bg-white rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="text-xs text-gray-500 uppercase tracking-wide">{{ info.label }}</div>
            <div class="text-lg font-semibold">{{ info.value }}</div>
          </div>
        </div>

        <!-- Barre de progression globale avec animation -->
        <div class="mt-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">Progression globale</span>
            <span class="text-sm font-semibold text-primary transition-all duration-500">{{ itinerary.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              :style="{ width: `${itinerary.progress}%` }"
            >
              <!-- Effet de brillance animé -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
            </div>
          </div>
          <div class="text-xs text-gray-500 mt-1 transition-all duration-300">
            {{ completedSteps }} sur {{ itinerary.steps.length }} étapes complétées
          </div>
        </div>

        <!-- Dates importantes -->
        <div v-if="itinerary.startedDate" class="mt-4 grid grid-cols-2 gap-4">
          <div class="transition-all duration-300 hover:bg-white/50 rounded p-2">
            <span class="text-xs text-gray-500 uppercase tracking-wide">Commencé le</span>
            <div class="text-sm font-medium">{{ itinerary.startedDate }}</div>
          </div>
          <div v-if="itinerary.expectedHarvestDate" class="transition-all duration-300 hover:bg-white/50 rounded p-2">
            <span class="text-xs text-gray-500 uppercase tracking-wide">Récolte prévue</span>
            <div class="text-sm font-medium">{{ itinerary.expectedHarvestDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'

interface ItineraryStep {
  id: string
  title: string
  description: string
  duration: string
  optimalPeriod: string
  completed: boolean
  completedDate?: string
}

interface Itinerary {
  id: string
  name: string
  description: string
  icon: string
  difficulty: string
  totalDuration: string
  plantType: string
  season: string
  steps: ItineraryStep[]
  progress: number
  startedDate?: string
  expectedHarvestDate?: string
}

interface Props {
  itinerary: Itinerary
}

const props = defineProps<Props>()

// Computed
const completedSteps = computed(() => {
  return props.itinerary.steps.filter(step => step.completed).length
})

const informationCards = computed(() => [
  { label: 'Durée totale', value: props.itinerary.totalDuration },
  { label: 'Type', value: formatPlantType(props.itinerary.plantType) },
  { label: 'Saison', value: formatSeason(props.itinerary.season) },
  { label: 'Étapes', value: props.itinerary.steps.length }
])

// Utilitaires
const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}

const formatPlantType = (type: string) => {
  const types: Record<string, string> = {
    'légume-fruit': 'Légume-fruit',
    'légume-feuille': 'Légume-feuille',
    'légume-racine': 'Légume-racine',
    'aromate': 'Aromate'
  }
  return types[type] || type
}

const formatSeason = (season: string) => {
  const seasons: Record<string, string> = {
    'printemps': 'Printemps',
    'été': 'Été',
    'automne': 'Automne',
    'hiver': 'Hiver',
    'toute-saison': 'Toute saison'
  }
  return seasons[season] || season
}
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}
</style> 