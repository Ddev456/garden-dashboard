<template>
  <Drawer v-model:open="isOpen">
    <DrawerContent class="max-h-[90vh] sm:max-h-[80vh]">
      <!-- Header avec progression -->
      <DrawerHeader class="text-center pb-4 border-b">
        <DrawerTitle class="flex items-center justify-center gap-2 text-lg sm:text-xl">
          <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <img src="/icons/settings.svg" alt="Assistant" class="size-10" />
          </div>
          Assistant Culture
        </DrawerTitle>
        <DrawerDescription class="text-sm text-gray-600 mt-2">
          {{ currentStepData.description }}
        </DrawerDescription>
        
        <!-- Barre de progression -->
        <div class="mt-4">
          <div class="flex justify-between text-xs text-gray-500 mb-2">
            <span>Étape {{ currentStep + 1 }} sur {{ totalSteps }}</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Navigation des étapes (desktop) -->
        <div class="hidden sm:flex justify-center mt-4 space-x-2">
          <button
            v-for="(step, index) in assistantSteps"
            :key="step.id"
            @click="goToStep(index)"
            :disabled="index > currentStep && !step.isValid"
            class="w-8 h-8 rounded-full text-xs font-medium transition-all duration-200"
            :class="{
              'bg-primary text-white': index === currentStep,
              'bg-green-500 text-white': index < currentStep && step.isValid,
              'bg-gray-200 text-gray-500': index > currentStep || !step.isValid,
              'hover:bg-primary/80': index <= currentStep || step.isValid,
              'cursor-not-allowed': index > currentStep && !step.isValid
            }"
          >
            {{ index + 1 }}
          </button>
        </div>
      </DrawerHeader>

      <!-- Contenu de l'étape courante -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="max-w-2xl mx-auto">
          <!-- Titre de l'étape -->
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm">
              {{ currentStep + 1 }}
            </div>
            {{ currentStepData.title }}
          </h3>

          <!-- Composant dynamique pour chaque étape -->
          <component 
            :is="componentMap[currentStepData.component as keyof typeof componentMap]" 
            @step-valid="onStepValid"
            @selection-change="onSelectionChange"
          />
        </div>
      </div>

      <!-- Footer avec navigation -->
      <DrawerFooter class="border-t bg-gray-50/50">
        <div class="flex items-center justify-between gap-4 max-w-2xl mx-auto w-full">
          <!-- Bouton Précédent -->
          <Button
            variant="outline"
            size="sm"
            @click="previousStep"
            :disabled="isFirstStep"
            class="flex-1 sm:flex-none"
          >
            <ChevronLeftIcon class="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <!-- Indicateur mobile -->
          <div class="flex sm:hidden items-center gap-1">
            <div
              v-for="(step, index) in assistantSteps"
              :key="step.id"
              class="w-2 h-2 rounded-full transition-all duration-200"
              :class="{
                'bg-primary': index === currentStep,
                'bg-green-500': index < currentStep && step.isValid,
                'bg-gray-300': index > currentStep || !step.isValid
              }"
            ></div>
          </div>

          <!-- Bouton Suivant/Terminer -->
          <Button
            size="sm"
            @click="handleNextAction"
            :disabled="!currentStepData.isValid"
            class="flex-1 sm:flex-none"
            :class="{
              'bg-green-600 hover:bg-green-700': isLastStep,
              'bg-primary hover:bg-primary/90': !isLastStep
            }"
          >
            <template v-if="isLastStep">
              <CheckIcon class="w-4 h-4 mr-2" />
              Créer l'itinéraire
            </template>
            <template v-else>
              Suivant
              <ChevronRightIcon class="w-4 h-4 ml-2" />
            </template>
          </Button>
        </div>

        <!-- Bouton fermer -->
        <button
          @click="closeAssistant"
          class="absolute top-4 right-4 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, XIcon } from 'lucide-vue-next'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

import AssistantZoneSelection from './steps/AssistantZoneSelection.vue'
import AssistantPlantType from './steps/AssistantPlantType.vue'
import AssistantPlantSelection from './steps/AssistantPlantSelection.vue'
import AssistantSeasonSelection from './steps/AssistantSeasonSelection.vue'
import AssistantConfiguration from './steps/AssistantConfiguration.vue'
import AssistantPreview from './steps/AssistantPreview.vue'

const {
  assistantState,
  assistantSteps,
  currentStepData,
  progress,
  isFirstStep,
  isLastStep,
  closeAssistant,
  nextStep,
  previousStep,
  goToStep,
  setStepValid,
  updateSelection,
  validateAndSaveItinerary
} = useAssistant()

// Mapping des noms de composants vers les composants réels
const componentMap = {
  'AssistantZoneSelection': AssistantZoneSelection,
  'AssistantPlantType': AssistantPlantType,
  'AssistantPlantSelection': AssistantPlantSelection,
  'AssistantSeasonSelection': AssistantSeasonSelection,
  'AssistantConfiguration': AssistantConfiguration,
  'AssistantPreview': AssistantPreview
}

// Computed
const isOpen = computed({
  get: () => assistantState.value.isOpen,
  set: (value: boolean) => {
    if (!value) closeAssistant()
  }
})

const currentStep = computed(() => assistantState.value.currentStep)
const totalSteps = computed(() => assistantSteps.value.length)

// Handlers
const onStepValid = (valid: boolean) => {
  setStepValid(currentStepData.value.id, valid)
}

const onSelectionChange = (data: Record<string, any>) => {
  Object.entries(data).forEach(([key, value]) => {
    updateSelection(key as any, value)
  })
}

const handleNextAction = () => {
  if (isLastStep.value) {
    // Dernière étape : valider et sauvegarder
    const success = validateAndSaveItinerary()
    if (success) {
      // Optionnel : afficher un toast de succès
      console.log('Itinéraire créé avec succès!')
    }
  } else {
    nextStep()
  }
}
</script>

<style scoped>
/* Styles pour la scrollbar personnalisée */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style> 