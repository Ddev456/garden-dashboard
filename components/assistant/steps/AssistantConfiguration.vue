<template>
  <div class="space-y-6">
    <!-- Sélection de variété -->
    <div v-if="selectedPlant?.varieties?.length">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Choisir une variété (optionnel)</h4>
      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="variety in selectedPlant.varieties"
          :key="variety.name"
          @click="selectVariety(variety.name)"
          class="flex items-start gap-3 p-3 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
          :class="{
            'border-primary bg-primary/5': selectedVariety === variety.name,
            'border-gray-200': selectedVariety !== variety.name
          }"
        >
          <div class="flex-1 text-left">
            <div class="flex items-center gap-2 mb-1">
              <div class="font-medium">{{ variety.name }}</div>
              <div 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': variety.difficulty === 'facile',
                  'bg-orange-100 text-orange-700': variety.difficulty === 'moyen',
                  'bg-red-100 text-red-700': variety.difficulty === 'difficile'
                }"
              >
                {{ variety.difficulty }}
              </div>
            </div>
            <div class="text-sm text-gray-500 mb-1">{{ variety.characteristics }}</div>
            <div class="text-xs text-gray-400">Récolte en {{ variety.harvestTime }}</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Sélection de plantes compagnes -->
    <div v-if="selectedPlant?.companions?.length">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Plantes compagnes recommandées (optionnel)</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="companion in selectedPlant.companions"
          :key="companion.plant"
          @click="toggleCompanion(companion.plant)"
          class="flex items-start gap-3 p-3 border rounded-lg transition-all duration-200 hover:border-primary/50"
          :class="{
            'border-primary bg-primary/5': isCompanionSelected(companion.plant),
            'border-gray-200 hover:bg-gray-50': !isCompanionSelected(companion.plant)
          }"
        >
          <img :src="companion.icon" :alt="companion.plant" class="w-8 h-8 flex-shrink-0" />
          <div class="flex-1 text-left">
            <div class="font-medium text-sm">{{ companion.plant }}</div>
            <div class="text-xs text-gray-500 mb-1">{{ companion.benefit }}</div>
            <div class="text-xs text-gray-400">Distance : {{ companion.distance }}</div>
          </div>
          <div v-if="isCompanionSelected(companion.plant)" class="text-primary">
            ✓
          </div>
        </button>
      </div>
    </div>

    <!-- Notes personnalisées -->
    <div>
      <h4 class="text-sm font-medium text-gray-700 mb-3">Notes personnalisées (optionnel)</h4>
      <textarea
        v-model="customNotes"
        @input="updateNotes"
        placeholder="Ajoutez vos propres notes, objectifs ou contraintes pour cette culture..."
        class="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        rows="3"
      ></textarea>
    </div>

    <!-- Récapitulatif des sélections -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-medium text-gray-800 mb-3">📋 Récapitulatif de votre configuration</h4>
      <div class="space-y-2 text-sm">
        <div v-if="selectedVariety" class="flex items-center gap-2">
          <span class="text-gray-600">Variété :</span>
          <span class="font-medium">{{ selectedVariety }}</span>
        </div>
        <div v-if="selectedCompanions.length" class="flex items-start gap-2">
          <span class="text-gray-600">Compagnons :</span>
          <span class="font-medium">{{ selectedCompanions.join(', ') }}</span>
        </div>
        <div v-if="customNotes" class="flex items-start gap-2">
          <span class="text-gray-600">Notes :</span>
          <span class="font-medium">{{ customNotes }}</span>
        </div>
        <div v-if="!selectedVariety && !selectedCompanions.length && !customNotes" class="text-gray-500 italic">
          Configuration par défaut - vous pourrez personnaliser plus tard
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAssistant } from '@/composables/useAssistant'

const emit = defineEmits<{
  stepValid: [valid: boolean]
  selectionChange: [data: Record<string, any>]
}>()

const { assistantState } = useAssistant()

// État local
const customNotes = ref('')

// Computed
const selectedPlant = computed(() => assistantState.value.selectedPlant)
const selectedVariety = computed(() => assistantState.value.selectedVariety)
const selectedCompanions = computed(() => assistantState.value.selectedCompanions || [])

// Cette étape est toujours valide car tout est optionnel
const isValid = computed(() => true)

// Actions
const selectVariety = (varietyName: string) => {
  const newVariety = selectedVariety.value === varietyName ? null : varietyName
  emit('selectionChange', { 
    selectedVariety: newVariety
  })
}

const toggleCompanion = (companionName: string) => {
  const companions = [...selectedCompanions.value]
  const index = companions.indexOf(companionName)
  
  if (index > -1) {
    companions.splice(index, 1)
  } else {
    companions.push(companionName)
  }
  
  emit('selectionChange', { 
    selectedCompanions: companions
  })
}

const isCompanionSelected = (companionName: string) => {
  return selectedCompanions.value.includes(companionName)
}

const updateNotes = () => {
  emit('selectionChange', { 
    customNotes: customNotes.value
  })
}

// Initialiser les notes depuis l'état
onMounted(() => {
  if (assistantState.value.customNotes) {
    customNotes.value = assistantState.value.customNotes
  }
})

// Watcher pour la validation
watch(isValid, (valid) => {
  emit('stepValid', valid)
}, { immediate: true })
</script> 