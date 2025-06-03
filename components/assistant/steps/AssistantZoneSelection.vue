<template>
  <div class="space-y-6">
    <!-- Jardin sélectionné -->
    <div v-if="selectedGarden">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Jardin sélectionné</h4>
      <div class="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <img :src="selectedGarden.icon" :alt="selectedGarden.name" class="w-8 h-8" />
        <div>
          <div class="font-medium">{{ selectedGarden.name }}</div>
          <div class="text-sm text-gray-500">{{ selectedGarden.description }}</div>
        </div>
      </div>
    </div>

    <!-- Sélection du jardin -->
    <div v-if="!selectedGarden || showGardenSelector">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Choisir un jardin</h4>
      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="garden in allGardens"
          :key="garden.id"
          @click="selectGarden(garden)"
          class="flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
          :class="{
            'border-primary bg-primary/5': selectedGarden?.id === garden.id,
            'border-gray-200': selectedGarden?.id !== garden.id
          }"
        >
          <img :src="garden.icon" :alt="garden.name" class="w-8 h-8" />
          <div class="text-left">
            <div class="font-medium">{{ garden.name }}</div>
            <div class="text-sm text-gray-500">{{ garden.zones.length }} zone(s)</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Sélection de la zone -->
    <div v-if="selectedGarden">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-medium text-gray-700">Choisir une zone</h4>
        <button
          v-if="!showGardenSelector"
          @click="showGardenSelector = true"
          class="text-xs text-primary hover:text-primary/80"
        >
          Changer de jardin
        </button>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="zone in selectedGarden.zones"
          :key="zone.id"
          @click="selectZone(zone)"
          class="flex items-start gap-3 p-4 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
          :class="{
            'border-primary bg-primary/5': selectedZone?.id === zone.id,
            'border-gray-200': selectedZone?.id !== zone.id
          }"
        >
          <div 
            class="w-4 h-4 rounded-full flex-shrink-0 mt-1"
            :style="{ backgroundColor: zone.color }"
          ></div>
          <div class="text-left min-w-0 flex-1">
            <div class="font-medium truncate">{{ zone.name }}</div>
            <div class="text-sm text-gray-500 line-clamp-2">{{ zone.description }}</div>
            <div class="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>{{ zone.surface }}</span>
              <span>{{ zone.soilType }}</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Message si aucune zone -->
    <div v-if="selectedGarden && selectedGarden.zones.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">🏞️</div>
      <p class="text-sm text-gray-500">Aucune zone disponible dans ce jardin</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import type { Garden, Zone } from '@/types'

// Émissions
const emit = defineEmits<{
  stepValid: [valid: boolean]
  selectionChange: [data: Record<string, any>]
}>()

// Composables
const { allGardens, assistantState } = useAssistant()

// État local
const showGardenSelector = ref(false)

// Computed
const selectedGarden = computed(() => {
  if (!assistantState.value.selectedGarden) return null
  return allGardens.find((g: any) => g.id === assistantState.value.selectedGarden) || null
})

const selectedZone = computed(() => {
  if (!assistantState.value.selectedZone || !selectedGarden.value) return null
  return selectedGarden.value.zones.find((z: any) => z.id === assistantState.value.selectedZone) || null
})

const isValid = computed(() => {
  return !!selectedGarden.value && !!selectedZone.value
})

// Actions
const selectGarden = (garden: any) => {
  emit('selectionChange', { 
    selectedGarden: garden.id,
    selectedZone: null // Reset zone when changing garden
  })
  showGardenSelector.value = false
}

const selectZone = (zone: any) => {
  emit('selectionChange', { 
    selectedZone: zone.id 
  })
}

// Watchers
watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })

// Si aucun jardin n'est sélectionné et qu'il n'y en a qu'un, le sélectionner automatiquement
onMounted(() => {
  if (!assistantState.value.selectedGarden && allGardens.length === 1) {
    selectGarden(allGardens[0])
  }
})
</script> 