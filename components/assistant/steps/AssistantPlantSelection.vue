<template>
  <div class="space-y-6">
    <div v-if="availablePlants.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">🌱</div>
      <p class="text-sm text-gray-500">Aucune plante disponible pour ce type</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Filtre par compatibilité avec la zone -->
      <div v-if="zoneCompatiblePlants.length !== availablePlants.length" class="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="text-blue-600">ℹ️</div>
        <div class="text-sm text-blue-700">
          {{ zoneCompatiblePlants.length }} plante(s) compatible(s) avec votre zone
        </div>
      </div>

      <!-- Liste des plantes -->
      <div class="grid grid-cols-1 gap-4">
        <button
          v-for="plant in sortedPlants"
          :key="plant.id"
          @click="selectPlant(plant)"
          class="flex items-start gap-4 p-4 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
          :class="{
            'border-primary bg-primary/5': selectedPlant?.id === plant.id,
            'border-gray-200': selectedPlant?.id !== plant.id,
            'opacity-60': !isPlantCompatible(plant)
          }"
        >
          <img :src="plant.icon" :alt="plant.name" class="w-10 h-10 flex-shrink-0" />
          <div class="text-left flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <div class="font-medium">{{ plant.name }}</div>
              <div 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': plant.difficulty === 'facile',
                  'bg-orange-100 text-orange-700': plant.difficulty === 'moyen',
                  'bg-red-100 text-red-700': plant.difficulty === 'difficile'
                }"
              >
                {{ plant.difficulty }}
              </div>
              <div v-if="!isPlantCompatible(plant)" class="text-xs text-orange-600 font-medium">
                ⚠️ Non optimal pour votre zone
              </div>
            </div>
            <div class="text-sm text-gray-500 mb-2">{{ plant.description }}</div>
            <div class="flex items-center gap-4 text-xs text-gray-400">
              <span>🕐 {{ plant.growthDuration }}</span>
              <span>📏 {{ plant.spacing }}</span>
              <span v-if="plant.varieties?.length">{{ plant.varieties.length }} variété(s)</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import type { PlantDatabase } from '@/types/assistant'

const emit = defineEmits<{
  stepValid: [valid: boolean]
  selectionChange: [data: Record<string, any>]
}>()

const { 
  assistantState, 
  availablePlants, 
  compatiblePlantsForZone 
} = useAssistant()

const selectedPlant = computed(() => assistantState.value.selectedPlant)
const isValid = computed(() => !!selectedPlant.value)

const zoneCompatiblePlants = computed(() => compatiblePlantsForZone.value)

// Trier les plantes : compatibles en premier, puis par difficulté
const sortedPlants = computed(() => {
  return [...availablePlants.value].sort((a, b) => {
    // Compatibilité d'abord
    const aCompatible = isPlantCompatible(a)
    const bCompatible = isPlantCompatible(b)
    
    if (aCompatible && !bCompatible) return -1
    if (!aCompatible && bCompatible) return 1
    
    // Puis par difficulté
    const difficultyOrder = { 'facile': 0, 'moyen': 1, 'difficile': 2 }
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  })
})

const isPlantCompatible = (plant: PlantDatabase) => {
  return zoneCompatiblePlants.value.some(p => p.id === plant.id)
}

const selectPlant = (plant: PlantDatabase) => {
  emit('selectionChange', { 
    selectedPlant: plant,
    selectedSeason: null, // Reset season when changing plant
    selectedVariety: null,
    selectedCompanions: []
  })
}

watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })
</script> 