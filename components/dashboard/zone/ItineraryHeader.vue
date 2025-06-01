<template>
  <div class="border-2 border-dashed border-primary bg-primary/5 rounded-lg p-4 md:p-6 transform transition-all duration-300 hover:bg-primary/8">
    <div class="flex items-start gap-4 md:gap-6">
      <div class="relative flex-shrink-0">
        <img :src="itinerary.icon" :alt="itinerary.name" class="size-12 md:size-16 transition-transform duration-300 hover:scale-110" />
        <!-- Badge de progression sur l'icône -->
        <div 
          v-if="itinerary.progress > 0"
          class="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
        >
          {{ Math.round(itinerary.progress) }}%
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <!-- En-tête avec zone et difficulté -->
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex-1 min-w-0">
            <!-- Information de zone avec navigation -->
            <div 
              v-if="zoneInfo" 
              class="flex items-center gap-2 mb-2 cursor-pointer group transition-all duration-300 hover:bg-white/50 rounded p-2 -m-2"
              @click="navigateToZone"
            >
              <img :src="zoneInfo.gardenIcon" class="size-10 opacity-70" />
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :style="{ backgroundColor: zoneInfo.zoneColor }"
              ></div>
              <span class="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">
                {{ zoneInfo.zone.name }}
              </span>
              <ExternalLinkIcon class="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            
            <h1 class="text-xl md:text-3xl font-bold text-primary transition-colors duration-300 truncate">
              {{ itinerary.name }}
            </h1>
            <p class="text-gray-600 mt-1 md:mt-2 text-sm md:text-base line-clamp-2">
              {{ itinerary.description }}
            </p>
          </div>
          
          <div class="flex flex-col gap-2 flex-shrink-0">
            <Badge 
              :variant="getDifficultyVariant(itinerary.difficulty)"
              class="text-xs md:text-sm px-2 md:px-3 py-1 transition-all duration-300 hover:scale-105"
            >
              {{ itinerary.difficulty }}
            </Badge>
            
            <!-- Prochaine étape mise en avant -->
            <div v-if="nextStep" class="text-right">
              <div class="text-xs text-gray-500 mb-1">Prochaine étape</div>
              <div class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium border border-yellow-200">
                {{ nextStep.title }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Informations générales avec animations -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-4 md:mt-6">
          <div 
            v-for="(info, index) in informationCards" 
            :key="info.label"
            class="bg-white rounded-lg p-2 md:p-3 text-center md:text-left"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="text-xs text-gray-500 uppercase tracking-wide">{{ info.label }}</div>
            <div class="text-sm md:text-lg font-semibold truncate">{{ info.value }}</div>
          </div>
        </div>

        <!-- Barre de progression globale avec animation -->
        <div class="mt-4 md:mt-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">Progression globale</span>
            <span class="text-sm font-semibold text-primary transition-all duration-500">{{ itinerary.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-primary to-primary/80 h-2 md:h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
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

        <!-- Timeline visuelle compacte pour mobile -->
        <div v-if="itinerary.steps.length > 0" class="mt-4 block md:hidden">
          <div class="text-xs text-gray-500 mb-2">Aperçu des étapes</div>
          <div class="flex gap-1">
            <div 
              v-for="(step, index) in itinerary.steps.slice(0, 6)" 
              :key="step.id"
              class="flex-1 h-2 rounded-sm transition-all duration-300"
              :class="[
                step.completed ? 'bg-primary' : 
                isNextStep(step) ? 'bg-yellow-400' : 'bg-gray-200'
              ]"
              :title="step.title"
            ></div>
            <div v-if="itinerary.steps.length > 6" class="text-xs text-gray-400 ml-1">
              +{{ itinerary.steps.length - 6 }}
            </div>
          </div>
        </div>

        <!-- Dates importantes -->
        <div v-if="itinerary.startedDate" class="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
import { useRouter } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { ExternalLinkIcon } from 'lucide-vue-next'
import { useGarden } from '@/composables/useGarden'
import type { ZoneItinerary, ItineraryStep } from '@/types'

interface Props {
  itinerary: ZoneItinerary
}

const props = defineProps<Props>()
const router = useRouter()
const { getZoneInfoForItinerary } = useGarden()

// Computed
const completedSteps = computed(() => {
  return props.itinerary.steps.filter((step: ItineraryStep) => step.completed).length
})

const nextStep = computed(() => {
  return props.itinerary.steps.find((step: ItineraryStep) => !step.completed)
})

const zoneInfo = computed(() => {
  return getZoneInfoForItinerary(props.itinerary)
})

const informationCards = computed(() => [
  { label: 'Durée totale', value: props.itinerary.totalDuration },
  { label: 'Type', value: formatPlantType(props.itinerary.plantType) },
  { label: 'Saison', value: formatSeason(props.itinerary.season) },
  { label: 'Étapes', value: props.itinerary.steps.length.toString() }
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

const isNextStep = (step: any) => {
  return nextStep.value && nextStep.value.id === step.id
}

// Navigation
const navigateToZone = () => {
  if (zoneInfo.value) {
    router.push(`/zones/${zoneInfo.value.zone.id}`)
  }
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