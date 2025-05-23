<template>
  <Card class="bg-primary/5 hover:bg-primary/10 transition-all duration-300 cursor-pointer h-full group" @click="handleViewDetails">
    <CardHeader>
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <img :src="itinerary.icon" :alt="itinerary.name" class="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
            <div 
              v-if="itinerary.progress > 0"
              class="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold"
            >
              {{ Math.round(itinerary.progress) }}%
            </div>
          </div>
          <div>
            <CardTitle class="text-lg group-hover:text-primary transition-colors duration-300">{{ itinerary.name }}</CardTitle>
            <p class="text-sm text-gray-500 mt-1">{{ itinerary.description }}</p>
          </div>
        </div>
        <Badge 
          :variant="getDifficultyVariant(itinerary.difficulty)"
          class="shrink-0 transition-all duration-300 group-hover:scale-105"
        >
          {{ itinerary.difficulty }}
        </Badge>
      </div>
    </CardHeader>
    
    <CardContent class="space-y-4">
      <!-- Informations générales -->
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="font-medium text-gray-500">Durée totale :</span>
          <div>{{ itinerary.totalDuration }}</div>
        </div>
        <div>
          <span class="font-medium text-gray-500">Type :</span>
          <div>{{ formatPlantType(itinerary.plantType) }}</div>
        </div>
        <div>
          <span class="font-medium text-gray-500">Saison :</span>
          <div>{{ formatSeason(itinerary.season) }}</div>
        </div>
        <div>
          <span class="font-medium text-gray-500">Étapes :</span>
          <div>{{ itinerary.steps.length }} étapes</div>
        </div>
      </div>

      <!-- Barre de progression avec animation -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-500">Progression</span>
          <span class="text-sm font-medium">{{ itinerary.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out relative"
            :style="{ width: `${itinerary.progress}%` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
          </div>
        </div>
        <div class="text-xs text-gray-500">
          {{ getCompletedSteps() }} sur {{ itinerary.steps.length }} étapes complétées
        </div>
      </div>

      <!-- Statut et dates -->
      <div v-if="itinerary.startedDate" class="pt-3 border-t border-gray-200">
        <div class="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span class="font-medium">Commencé le :</span>
            <div>{{ itinerary.startedDate }}</div>
          </div>
          <div v-if="itinerary.expectedHarvestDate">
            <span class="font-medium">Récolte prévue :</span>
            <div>{{ itinerary.expectedHarvestDate }}</div>
          </div>
        </div>
      </div>

      <!-- Prochaine étape -->
      <div v-if="getNextStep()" class="pt-3 border-t border-gray-200">
        <div class="text-sm">
          <span class="font-medium text-primary">Prochaine étape :</span>
          <div class="text-gray-600 mt-1">{{ getNextStep()?.title }}</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-3 border-t border-gray-200 flex gap-2">
        <Button variant="outline" size="sm" class="flex-1 transition-all duration-300 hover:scale-105" @click.stop="handleViewDetails">
          <Eye class="w-4 h-4 mr-2" />
          Voir détails
        </Button>
        <div class="flex gap-1">
          <Button 
            v-if="!itinerary.startedDate" 
            variant="default" 
            size="sm" 
            @click.stop="handleStart"
            class="transition-all duration-300 hover:scale-105"
          >
            <Play class="w-4 h-4 mr-2" />
            Démarrer
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click.stop="handleGenerateTasks"
            class="transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:border-blue-300"
            title="Générer des tâches"
          >
            <ListChecks class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Play, ListChecks } from 'lucide-vue-next'

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

interface Emits {
  (e: 'view-details', id: string): void
  (e: 'start-itinerary', itinerary: Itinerary): void
  (e: 'generate-tasks', itinerary: Itinerary): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed
const getCompletedSteps = () => {
  return props.itinerary.steps.filter(step => step.completed).length
}

const getNextStep = () => {
  return props.itinerary.steps.find(step => !step.completed)
}

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

// Handlers
const handleViewDetails = () => {
  emit('view-details', props.itinerary.id)
}

const handleStart = () => {
  emit('start-itinerary', props.itinerary)
}

const handleGenerateTasks = () => {
  emit('generate-tasks', props.itinerary)
}
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style> 