<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-h-[95vh] w-[95vw] max-w-4xl lg:max-w-5xl xl:max-w-6xl flex flex-col">
      <!-- Header avec progression -->
      <DialogHeader class="text-center pb-4 lg:pb-6 border-b flex-shrink-0">
        <DialogTitle class="flex items-center justify-center gap-2 text-lg sm:text-xl lg:text-2xl">
          <div class="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <img src="/icons/settings.svg" alt="Assistant" class="size-6 lg:size-8" />
          </div>
          Assistant Culture
        </DialogTitle>
        <DialogDescription class="text-sm lg:text-base text-gray-600 mt-2">
          {{ currentStepData.description }}
        </DialogDescription>
        
        <!-- Barre de progression -->
        <div class="mt-4 lg:mt-6">
          <div class="flex justify-between text-xs lg:text-sm text-gray-500 mb-2">
            <span>Étape {{ currentStep + 1 }} sur {{ totalSteps }}</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 lg:h-3">
            <div 
              class="bg-primary h-2 lg:h-3 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Navigation des étapes -->
        <div class="flex justify-center mt-4 lg:mt-6 space-x-2 lg:space-x-3">
          <button
            v-for="(step, index) in assistantSteps"
            :key="step.id"
            @click="goToStep(index)"
            :disabled="index > currentStep && !step.isValid"
            class="w-8 h-8 lg:w-10 lg:h-10 rounded-full text-xs lg:text-sm font-medium transition-all duration-200"
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
      </DialogHeader>

      <!-- Contenu de l'étape courante -->
      <div class="flex-1 overflow-y-auto min-h-0">
        <div class="p-4 sm:p-6 lg:p-8 xl:p-10">
          <div class="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <!-- Titre de l'étape -->
            <h3 class="text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center gap-3">
              <div class="w-6 h-6 lg:w-8 lg:h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm lg:text-base">
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
      </div>

      <!-- Footer avec navigation -->
      <div class="border-t bg-gray-50/50 p-4 lg:p-6 flex-shrink-0">
        <div class="flex items-center justify-between gap-4 lg:gap-6 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full">
          <!-- Bouton Précédent -->
          <Button
            variant="outline"
            size="sm"
            @click="previousStep"
            :disabled="isFirstStep"
            class="flex-1 sm:flex-none lg:px-6 lg:py-3"
          >
            <ChevronLeftIcon class="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <!-- Indicateur d'étape central sur desktop -->
          <div class="hidden lg:flex items-center text-sm text-gray-500 px-4">
            Étape {{ currentStep + 1 }} / {{ totalSteps }}
          </div>

          <!-- Bouton Suivant/Terminer -->
          <Button
            size="sm"
            @click="handleNextAction"
            :disabled="!currentStepData.isValid"
            class="flex-1 sm:flex-none lg:px-6 lg:py-3"
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
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, XIcon } from 'lucide-vue-next'
import type { AssistantState } from '@/types/assistant'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
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

const handleNextAction = async () => {
  if (isLastStep.value) {
    await validateAndSaveItinerary()
  } else {
    nextStep()
  }
}
</script> 