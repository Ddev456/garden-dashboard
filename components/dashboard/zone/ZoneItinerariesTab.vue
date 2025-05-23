<template>
  <div class="space-y-6">
    <!-- Modal de génération de tâches -->
    <TaskGenerationModal
      v-model:open="showTaskGenerationModal"
      v-model:also-start-itinerary="alsoStartItinerary"
      :itinerary="selectedItinerary"
      :preview-tasks="previewTasks"
      @confirm="confirmTaskGeneration"
      @cancel="showTaskGenerationModal = false"
    />

    <!-- Notification de succès -->
    <div 
      v-if="showSuccessNotification" 
      class="fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out"
    >
      <div class="bg-green-600 text-white rounded-lg px-4 py-3 shadow-lg border border-green-500/20">
        <div class="flex items-center gap-3">
          <CheckCircle class="w-5 h-5" />
          <div>
            <p class="font-medium">Tâches créées avec succès</p>
            <p class="text-sm opacity-90">{{ tasksCreatedCount }} tâches ajoutées à votre zone</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <ItineraryFilters
      v-model:difficulty-filter="difficultyFilter"
      v-model:type-filter="typeFilter"
      v-model:season-filter="seasonFilter"
    />

    <!-- Liste des itinéraires -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ItineraryCard
        v-for="itinerary in filteredItineraries"
        :key="itinerary.id"
        :itinerary="itinerary"
        @view-details="goToItinerary"
        @start-itinerary="startItinerary"
        @generate-tasks="prepareTaskGeneration"
      />
    </div>

    <!-- Message si aucun itinéraire -->
    <div v-if="filteredItineraries.length === 0" class="text-center py-8 text-gray-500">
      <p>Aucun itinéraire ne correspond aux filtres sélectionnés.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import ItineraryFilters from './ItineraryFilters.vue'
import ItineraryCard from './ItineraryCard.vue'
import TaskGenerationModal from './TaskGenerationModal.vue'

const props = defineProps<{ itineraries: any[] }>()

// Filtres
const difficultyFilter = ref('all')
const typeFilter = ref('all')
const seasonFilter = ref('all')

// Navigation
const router = useRouter()

// États pour la génération de tâches
const showTaskGenerationModal = ref(false)
const selectedItinerary = ref<any>(null)
const alsoStartItinerary = ref(true)
const previewTasks = ref<any[]>([])
const showSuccessNotification = ref(false)
const tasksCreatedCount = ref(0)

// Itinéraires filtrés
const filteredItineraries = computed(() => {
  return props.itineraries.filter(itinerary => {
    const matchesDifficulty = difficultyFilter.value === 'all' || itinerary.difficulty === difficultyFilter.value
    const matchesType = typeFilter.value === 'all' || itinerary.plantType === typeFilter.value
    const matchesSeason = seasonFilter.value === 'all' || itinerary.season === seasonFilter.value
    
    return matchesDifficulty && matchesType && matchesSeason
  })
})

// Génération de tâches
const generateTasksFromItinerary = (itinerary: any) => {
  const today = new Date()
  const tasks: any[] = []
  
  // Générer des tâches pour les étapes non complétées
  const incompletedSteps = itinerary.steps.filter((step: any) => !step.completed)
  
  incompletedSteps.forEach((step: any, index: any) => {
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + (index * 7)) // Espacement d'une semaine entre les tâches
    
    tasks.push({
      id: `task-${itinerary.id}-${step.id}`,
      title: `${itinerary.name}: ${step.title}`,
      description: `${step.description}\n\nDurée estimée: ${step.duration}\nPériode optimale: ${step.optimalPeriod}`,
      status: 'todo',
      dueDate: dueDate.toLocaleDateString('fr-FR'),
      priority: index === 0 ? 'high' : 'medium',
      relatedItinerary: itinerary.id,
      relatedStep: step.id
    })
  })
  
  return tasks
}

const prepareTaskGeneration = (itinerary: any) => {
  selectedItinerary.value = itinerary
  previewTasks.value = generateTasksFromItinerary(itinerary)
  showTaskGenerationModal.value = true
}

const confirmTaskGeneration = ({ itinerary, alsoStartItinerary: shouldStart }: any) => {
  // Ici, dans une vraie app, on enverrait les tâches à l'API
  console.log('Création de tâches pour l\'itinéraire:', itinerary.name)
  console.log('Tâches à créer:', previewTasks.value)
  
  // Simulation de la création des tâches
  tasksCreatedCount.value = previewTasks.value.length
  
  // Démarrer l'itinéraire si demandé
  if (shouldStart) {
    startItinerary(itinerary)
  }
  
  // Fermer la modal et afficher la notification
  showTaskGenerationModal.value = false
  showSuccessNotification.value = true
  
  // Masquer la notification après 4 secondes
  setTimeout(() => {
    showSuccessNotification.value = false
  }, 4000)
  
  // Émettre un événement pour informer le parent
  // Dans une vraie app, on rechargerait les tâches de la zone
}

// Actions
const goToItinerary = (id: string) => {
  router.push(`/itineraires/${id}`)
}

const startItinerary = (itinerary: any) => {
  itinerary.startedDate = new Date().toLocaleDateString('fr-FR')
  console.log('Démarrer itinéraire:', itinerary.name)
  
  // Pour la démo, on redirige vers les détails
  goToItinerary(itinerary.id)
}
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style> 