<template>
  <div class="space-y-6">
    <div v-if="availableSeasons.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">🕗</div>
      <p class="text-sm text-gray-500">Aucune saison disponible pour cette plante</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        v-for="season in availableSeasons"
        :key="season.id"
        @click="selectSeason(season.id)"
        class="flex items-center gap-4 p-4 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
        :class="{
          'border-primary bg-primary/5': selectedSeason === season.id,
          'border-gray-200': selectedSeason !== season.id
        }"
      >
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          :style="{ backgroundColor: season.color + '20', color: season.color }"
        >
          {{ season.icon }}
        </div>
        <div class="text-left flex-1">
          <div class="font-medium">{{ season.name }}</div>
          <div class="text-sm text-gray-500 mb-1">{{ season.description }}</div>
          <div class="text-xs text-gray-400">
            {{ season.months.join(', ') }}
          </div>
          <div v-if="getPlantingInfo(season.id)" class="text-xs text-primary mt-1 font-medium">
            {{ getPlantingInfo(season.id) }}
          </div>
        </div>
      </button>
    </div>

    <!-- Informations sur la plante sélectionnée pour la saison -->
    <div v-if="selectedPlant && selectedSeason" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-800 mb-2">📅 Calendrier prévisionnel</h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div v-if="selectedPlant.seedingPeriod.length">
          <div class="text-green-700 font-medium">Semis</div>
          <div class="text-green-600">{{ selectedPlant.seedingPeriod.join(', ') }}</div>
        </div>
        <div v-if="selectedPlant.transplantPeriod.length">
          <div class="text-green-700 font-medium">Plantation</div>
          <div class="text-green-600">{{ selectedPlant.transplantPeriod.join(', ') }}</div>
        </div>
        <div v-if="selectedPlant.harvestPeriod.length">
          <div class="text-green-700 font-medium">Récolte</div>
          <div class="text-green-600">{{ selectedPlant.harvestPeriod.join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAssistant } from '@/composables/useAssistant'

const emit = defineEmits<{
  stepValid: [valid: boolean]
  selectionChange: [data: Record<string, any>]
}>()

const { 
  assistantState, 
  availableSeasons 
} = useAssistant()

const selectedSeason = computed(() => assistantState.value.selectedSeason)
const selectedPlant = computed(() => assistantState.value.selectedPlant)
const isValid = computed(() => !!selectedSeason.value)

const selectSeason = (seasonId: string) => {
  emit('selectionChange', { 
    selectedSeason: seasonId
  })
}

const getPlantingInfo = (seasonId: string) => {
  if (!selectedPlant.value) return null
  
  const plant = selectedPlant.value
  const season = availableSeasons.value.find(s => s.id === seasonId)
  
  if (!season) return null
  
  // Vérifier si c'est une bonne période pour semer ou planter
  const canSeed = plant.seedingPeriod.some(month => season.months.includes(month))
  const canPlant = plant.transplantPeriod.some(month => season.months.includes(month))
  
  if (canSeed && canPlant) return '🌱 Semis et plantation possibles'
  if (canSeed) return '🌱 Période de semis'
  if (canPlant) return '🌱 Période de plantation'
  
  return 'Croissance et développement'
}

watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })
</script> 