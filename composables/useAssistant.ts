import { ref, computed } from 'vue'
import type { AssistantState, AssistantStep, PlantDatabase } from '@/types/assistant'
import { plantsDatabase, seasonInfo } from '@/mocks/plantsDatabase'
import { useGarden } from './useGarden'
import type { ZoneItinerary, ItineraryStep } from '@/types'

// État global de l'assistant
const assistantState = ref<AssistantState>({
  currentStep: 0,
  isOpen: false
})

const assistantSteps = ref<AssistantStep[]>([
  {
    id: 'zone-selection',
    title: 'Sélection de la zone',
    description: 'Choisissez le jardin et la zone pour votre culture',
    component: 'AssistantZoneSelection',
    isValid: false
  },
  {
    id: 'plant-type',
    title: 'Type de plante',
    description: 'Sélectionnez le type de culture que vous souhaitez',
    component: 'AssistantPlantType',
    isValid: false
  },
  {
    id: 'plant-selection',
    title: 'Choix de la plante',
    description: 'Choisissez la plante spécifique à cultiver',
    component: 'AssistantPlantSelection',
    isValid: false
  },
  {
    id: 'season-selection',
    title: 'Période de culture',
    description: 'Sélectionnez la saison pour commencer la culture',
    component: 'AssistantSeasonSelection',
    isValid: false
  },
  {
    id: 'configuration',
    title: 'Configuration',
    description: 'Personnalisez votre itinéraire (variété, compagnons)',
    component: 'AssistantConfiguration',
    isValid: false
  },
  {
    id: 'preview',
    title: 'Prévisualisation',
    description: 'Vérifiez et personnalisez votre itinéraire avant validation',
    component: 'AssistantPreview',
    isValid: false
  }
])

export const useAssistant = () => {
  const { getZone, allGardens } = useGarden()

  // Computed
  const isLastStep = computed(() => assistantState.value.currentStep === assistantSteps.value.length - 1)
  const isFirstStep = computed(() => assistantState.value.currentStep === 0)
  const currentStepData = computed(() => assistantSteps.value[assistantState.value.currentStep])
  const progress = computed(() => ((assistantState.value.currentStep + 1) / assistantSteps.value.length) * 100)

  // Données filtrées selon les sélections
  const availablePlants = computed(() => {
    if (!assistantState.value.selectedPlantType) return plantsDatabase
    return plantsDatabase.filter(plant => plant.type === assistantState.value.selectedPlantType)
  })

  const availableSeasons = computed(() => {
    if (!assistantState.value.selectedPlant) return seasonInfo
    return seasonInfo.filter(season => 
      assistantState.value.selectedPlant?.seasons.includes(season.id)
    )
  })

  const compatiblePlantsForZone = computed(() => {
    if (!assistantState.value.selectedZone) return plantsDatabase
    
    const zone = getZone(assistantState.value.selectedZone)
    if (!zone) return plantsDatabase

    return plantsDatabase.filter(plant => {
      // Vérifier la compatibilité du sol
      const soilCompatible = plant.soilTypes.includes(zone.soilType)
      // Vérifier la compatibilité de l'exposition
      const exposureCompatible = plant.sunExposure.includes(zone.sunExposure)
      
      return soilCompatible && exposureCompatible
    })
  })

  // Actions
  const openAssistant = (preSelectedZone?: string) => {
    assistantState.value.isOpen = true
    if (preSelectedZone) {
      assistantState.value.selectedZone = preSelectedZone
      // Valider la première étape si une zone est pré-sélectionnée
      assistantSteps.value[0].isValid = true
    }
    resetToFirstStep()
  }

  const closeAssistant = () => {
    assistantState.value.isOpen = false
    resetState()
  }

  const nextStep = () => {
    if (!isLastStep.value && currentStepData.value.isValid) {
      assistantState.value.currentStep++
    }
  }

  const previousStep = () => {
    if (!isFirstStep.value) {
      assistantState.value.currentStep--
    }
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < assistantSteps.value.length) {
      assistantState.value.currentStep = stepIndex
    }
  }

  const setStepValid = (stepId: string, valid: boolean) => {
    const step = assistantSteps.value.find(s => s.id === stepId)
    if (step) {
      step.isValid = valid
    }
  }

  const updateSelection = (field: keyof AssistantState, value: any) => {
    ;(assistantState.value as any)[field] = value
  }

  const resetState = () => {
    assistantState.value = {
      currentStep: 0,
      isOpen: false
    }
    // Reset validation des étapes
    assistantSteps.value.forEach(step => {
      step.isValid = false
    })
  }

  const resetToFirstStep = () => {
    assistantState.value.currentStep = 0
  }

  // Génération d'itinéraire
  const generateItinerary = (): ZoneItinerary => {
    const plant = assistantState.value.selectedPlant!
    const zone = getZone(assistantState.value.selectedZone!)!
    const season = availableSeasons.value.find(s => s.id === assistantState.value.selectedSeason)!

    // Calculer les dates basées sur la saison
    const today = new Date()
    const currentMonth = today.getMonth()
    const seasonStartMonth = getSeasonStartMonth(season.id)
    
    let startDate = new Date(today.getFullYear(), seasonStartMonth, 1)
    // Si la saison est déjà passée cette année, prendre l'année prochaine
    if (seasonStartMonth < currentMonth) {
      startDate.setFullYear(today.getFullYear() + 1)
    }

    // Générer les étapes basées sur les templates
    const steps: ItineraryStep[] = plant.stepTemplates.map((template, index) => {
      const stepDate = new Date(startDate)
      stepDate.setDate(stepDate.getDate() + (template.relativeWeek * 7))

      return {
        id: `step-${index + 1}`,
        title: template.title,
        description: template.description,
        duration: template.duration,
        optimalPeriod: formatDate(stepDate),
        completed: false,
        icon: template.icon,
        tools: template.tools,
        tips: template.tips
      }
    })

    // Calculer la date de récolte estimée
    const harvestWeeks = Math.max(...plant.stepTemplates.map(t => t.relativeWeek))
    const expectedHarvestDate = new Date(startDate)
    expectedHarvestDate.setDate(expectedHarvestDate.getDate() + (harvestWeeks * 7))

    const itinerary: ZoneItinerary = {
      id: `itinerary-${Date.now()}`,
      name: `Culture de ${plant.name}`,
      description: plant.description,
      icon: plant.icon,
      difficulty: plant.difficulty,
      totalDuration: plant.growthDuration,
      plantType: plant.type,
      season: assistantState.value.selectedSeason as any,
      progress: 0,
      startedDate: formatDate(startDate),
      expectedHarvestDate: formatDate(expectedHarvestDate),
      zoneId: zone.id,
      zoneName: zone.name,
      steps,
      
      // Informations détaillées
      varieties: plant.varieties,
      companions: plant.companions,
      pests: plant.pests,
      diseases: plant.diseases,
      nutritionalBenefits: plant.nutritionalBenefits,
      storageAdvice: plant.storageAdvice
    }

    assistantState.value.generatedItinerary = itinerary
    return itinerary
  }

  const validateAndSaveItinerary = () => {
    if (!assistantState.value.generatedItinerary) return false

    // Ici, on ajouterait la logique pour sauvegarder l'itinéraire
    // Dans la zone sélectionnée
    console.log('Itinéraire sauvegardé:', assistantState.value.generatedItinerary)
    
    // Fermer l'assistant après sauvegarde
    closeAssistant()
    return true
  }

  // Helpers
  const getSeasonStartMonth = (seasonId: string): number => {
    const seasonMap: Record<string, number> = {
      'printemps': 2, // Mars
      'été': 5,       // Juin
      'automne': 8,   // Septembre
      'hiver': 11     // Décembre
    }
    return seasonMap[seasonId] || 2
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return {
    // État
    assistantState: readonly(assistantState),
    assistantSteps: readonly(assistantSteps),
    
    // Computed
    isLastStep,
    isFirstStep,
    currentStepData,
    progress,
    availablePlants,
    availableSeasons,
    compatiblePlantsForZone,
    
    // Données
    allGardens,
    plantsDatabase,
    seasonInfo,
    
    // Actions
    openAssistant,
    closeAssistant,
    nextStep,
    previousStep,
    goToStep,
    setStepValid,
    updateSelection,
    resetState,
    generateItinerary,
    validateAndSaveItinerary
  }
} 