<template>
  <div class="max-w-7xl mx-auto py-8 space-y-8">
    <!-- En-tête du Wiki -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        🌱 Wiki des Plantes
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Découvrez tout ce qu'il faut savoir sur vos plantes préférées : conseils de culture, variétés, compagnons et bien plus encore.
      </p>
    </div>

    <!-- Barre de recherche principale -->
    <div class="max-w-2xl mx-auto">
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une plante..."
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
          @input="handleSearch"
        />
        <div v-if="searchQuery" class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <button @click="clearSearch" class="text-gray-400 hover:text-gray-600">
            <XIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <!-- Suggestions de recherche rapide -->
      <div class="flex flex-wrap gap-2 mt-4 justify-center">
        <button
          v-for="suggestion in searchSuggestions"
          :key="suggestion"
          @click="searchQuery = suggestion; handleSearch()"
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>

    <!-- Filtres et options d'affichage -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Filtres -->
        <div class="flex flex-wrap gap-4">
          <!-- Catégorie -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Catégorie :</label>
            <Select v-model="filters.category">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Toutes</SelectItem>
                <SelectItem value="légume-fruit">Légume-fruit</SelectItem>
                <SelectItem value="légume-feuille">Légume-feuille</SelectItem>
                <SelectItem value="légume-racine">Légume-racine</SelectItem>
                <SelectItem value="aromate">Aromate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Difficulté -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Difficulté :</label>
            <Select v-model="filters.difficulty">
              <SelectTrigger class="w-32">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes</SelectItem>
                <SelectItem value="facile">Facile</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="difficile">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Saison -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Saison :</label>
            <Select v-model="filters.season">
              <SelectTrigger class="w-36">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes</SelectItem>
                <SelectItem value="printemps">Printemps</SelectItem>
                <SelectItem value="été">Été</SelectItem>
                <SelectItem value="automne">Automne</SelectItem>
                <SelectItem value="hiver">Hiver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Options d'affichage -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Affichage :</span>
            <div class="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'px-3 py-2 text-sm transition-colors',
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                ]"
              >
                <GridIcon class="w-4 h-4" />
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'px-3 py-2 text-sm transition-colors border-l border-gray-300',
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                ]"
              >
                <ListIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <!-- Nombre de résultats -->
          <div class="text-sm text-gray-500">
            {{ filteredPlants.length }} plante{{ filteredPlants.length > 1 ? 's' : '' }}
          </div>
        </div>
      </div>
    </div>

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
    <div v-else class="text-center py-16">
      <SearchXIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucune plante trouvée</h3>
      <p class="text-gray-600 max-w-md mx-auto">
        Essayez de modifier vos critères de recherche ou explorez nos suggestions ci-dessus.
      </p>
      <Button @click="resetFilters" variant="outline" class="mt-4">
        Réinitialiser les filtres
      </Button>
    </div>

    <!-- Statistiques en bas -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Notre collection</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-3xl font-bold text-primary">{{ stats.total }}</div>
          <div class="text-sm text-gray-600">Plantes</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">{{ stats.categories }}</div>
          <div class="text-sm text-gray-600">Catégories</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">{{ stats.varieties }}</div>
          <div class="text-sm text-gray-600">Variétés</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600">{{ stats.easyPlants }}</div>
          <div class="text-sm text-gray-600">Faciles</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { 
  SearchIcon, 
  XIcon, 
  GridIcon, 
  ListIcon, 
  SearchXIcon 
} from 'lucide-vue-next'
import { mockPlantsWiki, searchPlants } from '@/mocks/plantsWiki'
import PlantCard from '@/components/wiki/PlantCard.vue'

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