<template>
  <div class="space-y-6">
    <!-- Génération de l'itinéraire -->
    <div v-if="!generatedItinerary" class="text-center py-8">
      <Button @click="generatePreview" class="mx-auto">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" v-if="isGenerating"></div>
          <span>{{ isGenerating ? 'Génération...' : 'Générer l\'itinéraire' }}</span>
        </div>
      </Button>
    </div>

    <!-- Prévisualisation de l'itinéraire -->
    <div v-else class="space-y-6">
      <!-- En-tête de l'itinéraire -->
      <div class="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <img :src="generatedItinerary.icon" :alt="generatedItinerary.name" class="w-12 h-12" />
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-primary">{{ generatedItinerary.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ generatedItinerary.description }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>📍 {{ generatedItinerary.zoneName }}</span>
            <span>🕐 {{ generatedItinerary.totalDuration }}</span>
            <span>📅 Début: {{ generatedItinerary.startedDate }}</span>
            <span>🎯 Récolte: {{ generatedItinerary.expectedHarvestDate }}</span>
          </div>
        </div>
      </div>

      <!-- Étapes de l'itinéraire -->
      <div>
        <h4 class="font-medium text-gray-800 mb-4">📋 Étapes de culture</h4>
        <div class="space-y-3">
          <div
            v-for="(step, index) in generatedItinerary.steps"
            :key="step.id"
            class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <img v-if="step.icon" :src="step.icon" :alt="step.title" class="w-5 h-5" />
                <img v-else src="/icons/planting.svg" alt="Assistant" class="w-5 h-5" />
                <h5 class="font-medium">{{ step.title }}</h5>
                <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {{ step.optimalPeriod }}
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ step.description }}</p>
              <div class="flex items-center gap-4 text-xs text-gray-400">
                <span>⏱️ {{ step.duration }}</span>
                <span>🔧 {{ step.tools.join(', ') }}</span>
              </div>
              <div v-if="step.tips.length" class="mt-2">
                <div class="text-xs text-green-600 font-medium mb-1">💡 Conseils :</div>
                <ul class="text-xs text-green-600 list-disc list-inside space-y-1">
                  <li v-for="tip in step.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuration personnalisée -->
      <div v-if="hasCustomConfiguration" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="font-medium text-blue-800 mb-3">⚙️ Votre configuration personnalisée</h4>
        <div class="space-y-2 text-sm">
          <div v-if="selectedVariety" class="flex items-center gap-2">
            <span class="text-blue-700">Variété :</span>
            <span class="font-medium text-blue-800">{{ selectedVariety }}</span>
          </div>
          <div v-if="selectedCompanions.length" class="flex items-start gap-2">
            <span class="text-blue-700">Compagnons :</span>
            <span class="font-medium text-blue-800">{{ selectedCompanions.join(', ') }}</span>
          </div>
          <div v-if="customNotes" class="flex items-start gap-2">
            <span class="text-blue-700">Notes :</span>
            <span class="font-medium text-blue-800">{{ customNotes }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t">
        <Button variant="outline" @click="generatePreview" size="sm">
          🔄 Régénérer
        </Button>
        <Button variant="outline" @click="customizeItinerary" size="sm">
          ✏️ Personnaliser les étapes
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import { Button } from '@/components/ui/button'

const emit = defineEmits<{
  stepValid: [valid: boolean]
  selectionChange: [data: Record<string, any>]
}>()

const { 
  assistantState, 
  generateItinerary 
} = useAssistant()

// État local
const isGenerating = ref(false)

// Computed
const generatedItinerary = computed(() => assistantState.value.generatedItinerary)
const selectedVariety = computed(() => assistantState.value.selectedVariety)
const selectedCompanions = computed(() => assistantState.value.selectedCompanions || [])
const customNotes = computed(() => assistantState.value.customNotes)

const hasCustomConfiguration = computed(() => {
  return selectedVariety.value || selectedCompanions.value.length > 0 || customNotes.value
})

// Cette étape est valide dès qu'un itinéraire est généré
const isValid = computed(() => !!generatedItinerary.value)

// Actions
const generatePreview = async () => {
  isGenerating.value = true
  
  // Simulation d'une génération (dans un vrai cas, ça pourrait être un appel API)
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    generateItinerary()
  } catch (error) {
    console.error('Erreur lors de la génération:', error)
  } finally {
    isGenerating.value = false
  }
}

const customizeItinerary = () => {
  // Ici on pourrait ouvrir un modal pour personnaliser les étapes
  // Pour l'instant, on ne fait que logger
  console.log('Personnalisation des étapes - à implémenter')
}

// Watcher pour la validation
watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })

// Générer automatiquement l'itinéraire à l'arrivée sur cette étape
onMounted(() => {
  if (!generatedItinerary.value) {
    generatePreview()
  }
})
</script> 