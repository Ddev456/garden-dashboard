<template>
  <div class="max-w-6xl mx-auto py-8 space-y-8">
    <!-- Effet de célébration -->
    <CelebrationEffect :show="showCelebration" />

    <!-- Notification de progression -->
    <div 
      v-if="showProgressNotification" 
      class="fixed top-4 right-4 z-40 transform transition-all duration-500 ease-out"
      :class="showProgressNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
    >
      <div class="bg-primary text-white rounded-lg px-4 py-3 shadow-lg border border-primary/20">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <CheckIcon class="w-4 h-4" />
          </div>
          <div>
            <p class="font-medium">Progression mise à jour</p>
            <p class="text-sm opacity-90">{{ itinerary?.progress }}% complété</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message d'erreur si itinéraire non trouvé -->
    <div v-if="!itinerary" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <BookOpenIcon class="w-16 h-16 mx-auto" />
      </div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Itinéraire non trouvé</h1>
      <p class="text-gray-600 mb-6">L'itinéraire demandé n'existe pas ou n'est plus disponible.</p>
      <Button variant="outline" @click="$router.go(-1)">
        <ArrowLeftIcon class="w-4 h-4 mr-2" />
        Retour
      </Button>
    </div>

    <template v-else>
      <!-- En-tête de l'itinéraire -->
      <ItineraryHeader :itinerary="itinerary" />

      <!-- Système d'onglets -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Navigation des onglets -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2'
              ]"
            >
              <component :is="tab.icon" class="w-4 h-4" />
              <span class="hidden sm:inline">{{ tab.name }}</span>
              <span class="sm:hidden">{{ tab.shortName || tab.name }}</span>
              <span v-if="tab.badge" class="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {{ tab.badge }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Contenu des onglets -->
        <div class="p-4 md:p-6">
          <!-- Timeline des étapes -->
          <div v-if="activeTab === 'timeline'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg md:text-xl font-semibold">Chronologie des étapes</h2>
              <div class="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  @click="scrollToNextStep"
                  v-if="getNextStep()"
                  class="transition-all duration-300 hover:scale-105"
                >
                  <ArrowDownIcon class="w-4 h-4 mr-2" />
                  <span class="hidden sm:inline">Prochaine étape</span>
                  <span class="sm:hidden">Suivant</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  @click="toggleAllSteps"
                  class="transition-all duration-300 hover:scale-105"
                >
                  <span class="hidden sm:inline">{{ allExpanded ? 'Tout réduire' : 'Tout développer' }}</span>
                  <span class="sm:hidden">{{ allExpanded ? 'Réduire' : 'Développer' }}</span>
                </Button>
              </div>
            </div>

            <div class="relative">
              <!-- Ligne verticale de timeline avec animation -->
              <div class="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-primary/10"></div>
              
              <div class="space-y-6 md:space-y-8">
                <ItineraryStep
                  v-for="(step, index) in itinerary.steps"
                  :key="step.id"
                  :ref="el => { if (el) stepRefs[step.id] = el as any }"
                  :step="step"
                  :index="index"
                  :is-next="isNextStep(step)"
                  :is-expanded="expandedSteps.includes(step.id)"
                  @mark-completed="markStepCompleted(step)"
                  @toggle-expanded="toggleStep(step.id)"
                />
              </div>
            </div>
          </div>

          <!-- Contenu enrichi -->
          <div v-if="activeTab === 'enriched'">
            <ItineraryEnrichedContent :itinerary="itinerary" @open-image="handleOpenImage" />
          </div>

          <!-- Guide détaillé des étapes -->
          <div v-if="activeTab === 'guide'" class="space-y-6">
            <h2 class="text-lg md:text-xl font-semibold">Guide détaillé</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card 
                v-for="(step, index) in itinerary.steps" 
                :key="step.id"
                class="hover:shadow-md transition-all duration-300"
                :class="{ 'ring-2 ring-primary ring-offset-2': isNextStep(step) }"
              >
                <CardContent class="p-4 md:p-6">
                  <div class="flex items-start gap-3 md:gap-4 mb-4">
                    <div 
                      class="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0"
                      :class="[
                        step.completed 
                          ? 'bg-primary text-white' 
                          : isNextStep(step)
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-600'
                      ]"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-base md:text-lg mb-2 truncate">{{ step.title }}</h3>
                      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ step.description }}</p>
                      
                      <!-- Instructions détaillées -->
                      <div v-if="step.detailedInstructions" class="bg-blue-50 rounded-lg p-3 md:p-4 mb-4">
                        <h4 class="font-medium text-blue-900 mb-2 text-sm">Instructions détaillées</h4>
                        <p class="text-blue-800 text-sm">{{ step.detailedInstructions }}</p>
                      </div>

                      <!-- Erreurs communes -->
                      <div v-if="step.commonMistakes?.length" class="bg-red-50 rounded-lg p-3 md:p-4 mb-4">
                        <h4 class="font-medium text-red-900 mb-2 text-sm flex items-center gap-2">
                          <AlertTriangleIcon class="w-4 h-4" />
                          Erreurs à éviter
                        </h4>
                        <ul class="space-y-1">
                          <li v-for="mistake in step.commonMistakes" :key="mistake" class="text-red-800 text-xs flex items-start gap-2">
                            <div class="w-1 h-1 bg-red-600 rounded-full mt-2 shrink-0"></div>
                            <span>{{ mistake }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- Explication scientifique -->
                      <div v-if="step.scientificExplanation" class="bg-green-50 rounded-lg p-3 md:p-4 mb-4">
                        <h4 class="font-medium text-green-900 mb-2 text-sm flex items-center gap-2">
                          <BeakerIcon class="w-4 h-4" />
                          Pourquoi cette étape ?
                        </h4>
                        <p class="text-green-800 text-sm">{{ step.scientificExplanation }}</p>
                      </div>

                      <!-- Conditions météo -->
                      <div v-if="step.weatherRecommendations" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div class="bg-blue-50 rounded-lg p-3">
                          <h5 class="font-medium text-blue-900 mb-1 text-xs flex items-center gap-1">
                            <SunIcon class="w-3 h-3" />
                            Idéal
                          </h5>
                          <p class="text-blue-800 text-xs">{{ step.weatherRecommendations.ideal }}</p>
                        </div>
                        <div class="bg-orange-50 rounded-lg p-3">
                          <h5 class="font-medium text-orange-900 mb-1 text-xs flex items-center gap-1">
                            <CloudRainIcon class="w-3 h-3" />
                            À éviter
                          </h5>
                          <p class="text-orange-800 text-xs">{{ step.weatherRecommendations.avoid }}</p>
                        </div>
                      </div>

                      <!-- Informations sur le sol -->
                      <div v-if="step.soilRequirements" class="bg-amber-50 rounded-lg p-3 md:p-4">
                        <h4 class="font-medium text-amber-900 mb-2 text-sm flex items-center gap-2">
                          <MountainIcon class="w-4 h-4" />
                          Exigences du sol
                        </h4>
                        <div class="space-y-2 text-xs">
                          <div><span class="font-medium text-amber-800">Type :</span> {{ step.soilRequirements.type }}</div>
                          <div><span class="font-medium text-amber-800">pH :</span> {{ step.soilRequirements.ph }}</div>
                          <div v-if="step.soilRequirements.nutrients?.length">
                            <span class="font-medium text-amber-800">Nutriments :</span> 
                            {{ step.soilRequirements.nutrients.join(', ') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions en bas -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
        <Button 
          variant="outline" 
          @click="$router.go(-1)"
          class="transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            v-if="!itinerary.startedDate" 
            variant="default"
            @click="startItinerary"
            class="transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
          >
            <PlayIcon class="w-4 h-4 mr-2" />
            Commencer cet itinéraire
          </Button>
          <Button 
            variant="outline"
            class="transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <ShareIcon class="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckIcon, 
  ArrowLeftIcon, 
  PlayIcon, 
  ShareIcon,
  ArrowDownIcon,
  ListIcon,
  BookOpenIcon,
  GraduationCapIcon,
  AlertTriangleIcon,
  BeakerIcon,
  SunIcon,
  CloudRainIcon,
  MountainIcon
} from 'lucide-vue-next'
import { useGarden } from '@/composables/useGarden'
import type { ItineraryStep as ItineraryStepType } from '@/types'
import CelebrationEffect from '@/components/dashboard/zone/CelebrationEffect.vue'
import ItineraryHeader from '@/components/dashboard/zone/ItineraryHeader.vue'
import ItineraryStep from '@/components/dashboard/zone/ItineraryStep.vue'
import ItineraryEnrichedContent from '@/components/dashboard/zone/ItineraryEnrichedContent.vue'

const route = useRoute()
const itineraryId = route.params.id as string
const { getItinerary } = useGarden()

// État local pour les onglets
const activeTab = ref('timeline')

// État local pour les étapes expandues
const expandedSteps = ref<string[]>([])
const allExpanded = ref(false)
const stepRefs = ref<Record<string, any>>({})

// États pour les animations
const showCelebration = ref(false)
const showProgressNotification = ref(false)

// Récupération de l'itinéraire via le composable
const itinerary = computed(() => getItinerary(itineraryId))

// Onglets disponibles
const tabs = computed(() => [
  { 
    id: 'timeline', 
    name: 'Étapes', 
    shortName: 'Étapes',
    icon: ListIcon,
    badge: `${getCompletedSteps()}/${itinerary.value?.steps.length || 0}`
  },
  { 
    id: 'enriched', 
    name: 'Informations', 
    shortName: 'Infos',
    icon: BookOpenIcon,
    badge: hasEnrichedContent.value ? 'Nouveau' : null
  },
  { 
    id: 'guide', 
    name: 'Guide détaillé', 
    shortName: 'Guide',
    icon: GraduationCapIcon
  }
])

// Computed
const hasEnrichedContent = computed(() => {
  if (!itinerary.value) return false
  return !!(
    itinerary.value.varieties?.length ||
    itinerary.value.companions?.length ||
    itinerary.value.pests?.length ||
    itinerary.value.diseases?.length ||
    itinerary.value.nutritionalBenefits?.length ||
    itinerary.value.storageAdvice ||
    itinerary.value.resources?.length
  )
})

const getCompletedSteps = () => {
  if (!itinerary.value) return 0
  return itinerary.value.steps.filter((step: ItineraryStepType) => step.completed).length
}

// Fonctions utilitaires
const getNextStep = () => {
  if (!itinerary.value) return null
  return itinerary.value.steps.find((step: ItineraryStepType) => !step.completed)
}

const isNextStep = (step: ItineraryStepType) => {
  const nextStep = getNextStep()
  return nextStep && nextStep.id === step.id
}

// Fonctions d'interaction
const scrollToNextStep = async () => {
  const nextStep = getNextStep()
  if (nextStep && stepRefs.value[nextStep.id]) {
    await nextTick()
    stepRefs.value[nextStep.id]?.$el?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }
}

const toggleStep = (stepId: string) => {
  const index = expandedSteps.value.indexOf(stepId)
  if (index > -1) {
    expandedSteps.value.splice(index, 1)
  } else {
    expandedSteps.value.push(stepId)
  }
}

const toggleAllSteps = () => {
  if (!itinerary.value) return
  
  if (allExpanded.value) {
    expandedSteps.value = []
  } else {
    expandedSteps.value = itinerary.value.steps.map((step: ItineraryStepType) => step.id)
  }
  allExpanded.value = !allExpanded.value
}

const markStepCompleted = (step: ItineraryStepType) => {
  if (!itinerary.value) return
  
  step.completed = true
  step.completedDate = new Date().toLocaleDateString('fr-FR')
  
  // Mettre à jour la progression
  const completedCount = getCompletedSteps()
  const totalSteps = itinerary.value.steps.length
  itinerary.value.progress = Math.round((completedCount / totalSteps) * 100)
  
  // Animations de feedback
  if (itinerary.value.progress === 100) {
    showCelebration.value = true
    setTimeout(() => showCelebration.value = false, 3000)
  } else {
    showProgressNotification.value = true
    setTimeout(() => showProgressNotification.value = false, 3000)
  }
}

const startItinerary = () => {
  if (!itinerary.value) return
  
  itinerary.value.startedDate = new Date().toLocaleDateString('fr-FR')
  console.log('Démarrer itinéraire:', itinerary.value.name)
}

const handleOpenImage = (image: string, index: number) => {
  console.log('Ouvrir image:', image, 'à l\'index:', index)
  // Ici on pourrait ouvrir une modal d'image
}
</script> 