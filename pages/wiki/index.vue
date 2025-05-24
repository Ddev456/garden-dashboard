<template>
  <div class="max-w-7xl mx-auto py-8 space-y-8">
    <!-- En-tête du Wiki -->
    <WikiHeader />

    <!-- Barre de recherche principale -->
    <WikiSearchBar 
      v-model:search-query="searchQuery"
      :suggestions="searchSuggestions"
      @search="handleSearch"
      @clear="clearSearch"
    />

    <!-- Filtres et options d'affichage -->
    <WikiFilters
      v-model:filters="filters"
      v-model:view-mode="viewMode"
      :results-count="filteredPlants.length"
    />

    <!-- Résultats -->
    <div v-if="filteredPlants.length > 0">
      <!-- Vue grille -->
      <div 
        v-if="viewMode === 'grid'" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <PlantCard
          v-for="plant in filteredPlants"
          :key="plant.id"
          :plant="plant"
          view-mode="card"
          @view-details="goToPlant"
          @add-to-zone="handleAddToZone"
        />
      </div>

      <!-- Vue liste -->
      <div v-else class="space-y-4">
        <PlantCard
          v-for="plant in filteredPlants"
          :key="plant.id"
          :plant="plant"
          view-mode="list"
          @view-details="goToPlant"
          @add-to-zone="handleAddToZone"
        />
      </div>
    </div>

    <!-- Message si aucun résultat -->
    <WikiEmptyState
      v-else
      :icon="SearchXIcon"
      title="Aucune plante trouvée"
      description="Essayez de modifier vos critères de recherche ou explorez nos suggestions ci-dessus."
      action-label="Réinitialiser les filtres"
      @action="resetFilters"
    />

    <!-- Statistiques en bas -->
    <WikiStats :stats="stats" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SearchXIcon } from 'lucide-vue-next'
import { mockPlantsWiki, searchPlants } from '@/mocks/plantsWiki'
import PlantCard from '@/components/wiki/PlantCard.vue'
import WikiHeader from '@/components/wiki/WikiHeader.vue'
import WikiSearchBar from '@/components/wiki/WikiSearchBar.vue'
import WikiFilters from '@/components/wiki/WikiFilters.vue'
import WikiStats from '@/components/wiki/WikiStats.vue'
import WikiEmptyState from '@/components/wiki/WikiEmptyState.vue'

// Debug - à supprimer après test
console.log('mockPlantsWiki:', mockPlantsWiki)
console.log('Nombre de plantes:', mockPlantsWiki?.length)

// Meta données de la page
useSeoMeta({
  title: 'Wiki des Plantes - Dashboard Garden',
  description: 'Découvrez notre encyclopédie des plantes cultivables avec conseils, variétés et techniques de culture.',
})

const router = useRouter()

// État local
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const filters = ref({
  category: '',
  difficulty: '',
  season: ''
})

// Suggestions de recherche
const searchSuggestions = [
  'tomate', 'basilic', 'laitue', 'carotte', 'facile', 'printemps'
]

// Plantes filtrées
const filteredPlants = computed(() => {
  const activeFilters: any = {}
  
  if (filters.value.category) activeFilters.category = [filters.value.category]
  if (filters.value.difficulty) activeFilters.difficulty = [filters.value.difficulty]
  if (filters.value.season) activeFilters.seasons = [filters.value.season]
  
  return searchPlants(searchQuery.value, activeFilters)
})

// Statistiques
const stats = computed(() => {
  const allPlants = mockPlantsWiki
  const categories = new Set(allPlants.map(p => p.category)).size
  const varieties = allPlants.reduce((sum, plant) => sum + (plant.varieties?.length || 0), 0)
  const easyPlants = allPlants.filter(p => p.difficulty === 'facile').length
  
  return {
    total: allPlants.length,
    categories,
    varieties,
    easyPlants
  }
})

// Méthodes
const handleSearch = () => {
  // La recherche est réactive via le computed filteredPlants
}

const clearSearch = () => {
  searchQuery.value = ''
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    category: '',
    difficulty: '',
    season: ''
  }
}

const goToPlant = (slug: string) => {
  router.push(`/wiki/${slug}`)
}

const handleAddToZone = (plant: any) => {
  console.log('Ajouter à la zone:', plant.name)
  // TODO: Implémenter l'ajout à la zone
  // Cette fonctionnalité sera développée plus tard
}

// Watchers pour les filtres
watch(filters, () => {
  // Les filtres sont réactifs via le computed filteredPlants
}, { deep: true })
</script> 