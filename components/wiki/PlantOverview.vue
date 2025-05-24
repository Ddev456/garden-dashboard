<template>
  <div class="space-y-6">
    <!-- Caractéristiques principales -->
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Caractéristiques principales</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="characteristic in plant.characteristics" 
          :key="characteristic"
          class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <CheckIcon class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <span class="text-gray-700">{{ characteristic }}</span>
        </div>
      </div>
    </div>

    <!-- Informations de culture -->
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Informations de culture</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <SparklesIcon class="w-4 h-4 text-brown-600" />
            Semis
          </h4>
          <p class="text-gray-600">{{ plant.sowingPeriod }}</p>
          <p v-if="plant.plantingPeriod" class="text-sm text-gray-500">
            Plantation : {{ plant.plantingPeriod }}
          </p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <CalendarIcon class="w-4 h-4 text-green-600" />
            Récolte
          </h4>
          <p class="text-gray-600">{{ plant.harvestPeriod }}</p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <SunIcon class="w-4 h-4 text-yellow-600" />
            Exposition
          </h4>
          <p class="text-gray-600">{{ plant.exposure }}</p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <MountainIcon class="w-4 h-4 text-gray-600" />
            Sol
          </h4>
          <p class="text-gray-600">{{ plant.soil }}</p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <DropletIcon class="w-4 h-4 text-blue-600" />
            Arrosage
          </h4>
          <p class="text-gray-600">{{ plant.watering }}</p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center gap-2">
            <ThermometerIcon class="w-4 h-4 text-red-600" />
            Température
          </h4>
          <p class="text-gray-600">{{ plant.temperature.min }}°C - {{ plant.temperature.max }}°C</p>
          <p class="text-sm text-gray-500">Optimal : {{ plant.temperature.optimal }}°C</p>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in (plant.tags || [])" 
          :key="tag"
          class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Valeurs nutritionnelles si disponibles -->
    <div v-if="plant.nutritionalValues?.length">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Valeurs nutritionnelles</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="nutrition in plant.nutritionalValues" 
          :key="nutrition.nutrient"
          class="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <h4 class="font-semibold text-green-800">{{ nutrition.nutrient }}</h4>
          <p class="text-lg font-bold text-green-700">{{ nutrition.amount }} {{ nutrition.unit }}</p>
          <p class="text-sm text-gray-600 mt-1">{{ nutrition.description }}</p>
          <p class="text-xs text-green-600 mt-2">{{ nutrition.healthBenefit }}</p>
        </div>
      </div>
    </div>

    <!-- Conseils culturaux si disponibles -->
    <div v-if="plant.culturalTips?.length">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Conseils de culture</h3>
      <div class="space-y-4">
        <div 
          v-for="tip in plant.culturalTips" 
          :key="tip.title"
          class="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div class="flex items-start justify-between mb-2">
            <h4 class="font-semibold text-blue-800">{{ tip.title }}</h4>
            <Badge :variant="getDifficultyVariant(tip.difficulty || 'facile')" class="text-xs">
              {{ tip.difficulty || 'facile' }}
            </Badge>
          </div>
          <p class="text-gray-600 mb-2">{{ tip.description }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>Saison : {{ (tip.season || []).join(', ') }}</span>
            <span>Catégorie : {{ tip.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { 
  CheckIcon,
  SparklesIcon,
  CalendarIcon,
  SunIcon,
  MountainIcon,
  DropletIcon,
  ThermometerIcon
} from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
}

defineProps<Props>()

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}
</script> 