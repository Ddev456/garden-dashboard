<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-primary">Test de l'Assistant</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Boutons de test -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">Actions de test</h2>
        
        <Button @click="openAssistant()" class="w-full">
          🌱 Ouvrir l'assistant
        </Button>
        
        <Button @click="openAssistant('zone-1-1')" variant="outline" class="w-full">
          🌱 Ouvrir avec zone pré-sélectionnée
        </Button>
        
        <Button @click="resetAssistant" variant="outline" class="w-full">
          🔄 Reset de l'assistant
        </Button>
      </div>

      <!-- État actuel -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">État de l'assistant</h2>
        
        <div class="p-4 bg-gray-50 border rounded-lg">
          <div class="space-y-2 text-sm">
            <div><strong>Ouvert:</strong> {{ assistantState.isOpen ? 'Oui' : 'Non' }}</div>
            <div><strong>Étape:</strong> {{ assistantState.currentStep + 1 }}/{{ assistantSteps.length }}</div>
            <div><strong>Jardin:</strong> {{ assistantState.selectedGarden || 'Non sélectionné' }}</div>
            <div><strong>Zone:</strong> {{ assistantState.selectedZone || 'Non sélectionnée' }}</div>
            <div><strong>Type:</strong> {{ assistantState.selectedPlantType || 'Non sélectionné' }}</div>
            <div><strong>Plante:</strong> {{ assistantState.selectedPlant?.name || 'Non sélectionnée' }}</div>
            <div><strong>Saison:</strong> {{ assistantState.selectedSeason || 'Non sélectionnée' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Jardins et zones disponibles -->
    <div class="space-y-4">
      <h2 class="text-lg font-medium">Jardins et zones disponibles</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="garden in allGardens" :key="garden.id" class="border rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <img :src="garden.icon" :alt="garden.name" class="w-6 h-6" />
            <h3 class="font-medium">{{ garden.name }}</h3>
          </div>
          
          <div class="space-y-2">
            <div
              v-for="zone in garden.zones"
              :key="zone.id"
              class="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm"
            >
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: zone.color }"
              ></div>
              <span>{{ zone.name }}</span>
              <Button 
                @click="openAssistant(zone.id)" 
                size="sm" 
                variant="outline"
                class="ml-auto text-xs"
              >
                Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAssistant } from '@/composables/useAssistant'
import { Button } from '@/components/ui/button'

const { 
  assistantState, 
  assistantSteps,
  allGardens,
  openAssistant, 
  resetState 
} = useAssistant()

const resetAssistant = () => {
  resetState()
}
</script> 