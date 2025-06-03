<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        v-for="plantType in plantTypes"
        :key="plantType.id"
        @click="selectPlantType(plantType.id)"
        class="flex items-center gap-4 p-4 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
        :class="{
          'border-primary bg-primary/5': selectedPlantType === plantType.id,
          'border-gray-200': selectedPlantType !== plantType.id
        }"
      >
        <div class="text-3xl">{{ plantType.icon }}</div>
        <div class="text-left">
          <div class="font-medium">{{ plantType.name }}</div>
          <div class="text-sm text-gray-500">{{ plantType.description }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ plantType.count }} plante(s) disponible(s)</div>
        </div>
      </button>
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

const { assistantState, plantsDatabase } = useAssistant()

const plantTypes = [
  {
    id: 'légume-fruit',
    name: 'Légumes-fruits',
    description: 'Tomates, courgettes, aubergines...',
    icon: '🍅',
    count: plantsDatabase.filter(p => p.type === 'légume-fruit').length
  },
  {
    id: 'légume-feuille',
    name: 'Légumes-feuilles',
    description: 'Laitues, épinards, choux...',
    icon: '🥬',
    count: plantsDatabase.filter(p => p.type === 'légume-feuille').length
  },
  {
    id: 'légume-racine',
    name: 'Légumes-racines',
    description: 'Carottes, radis, navets...',
    icon: '🥕',
    count: plantsDatabase.filter(p => p.type === 'légume-racine').length
  },
  {
    id: 'aromate',
    name: 'Aromates',
    description: 'Basilic, persil, thym...',
    icon: '🌿',
    count: plantsDatabase.filter(p => p.type === 'aromate').length
  }
]

const selectedPlantType = computed(() => assistantState.value.selectedPlantType)
const isValid = computed(() => !!selectedPlantType.value)

const selectPlantType = (typeId: string) => {
  emit('selectionChange', { 
    selectedPlantType: typeId,
    selectedPlant: null // Reset plant when changing type
  })
}

watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })
</script> 