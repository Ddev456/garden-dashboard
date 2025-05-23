<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-semibold text-primary">Itinéraires de culture</h1>
        <p class="text-sm text-gray-500 mt-1">
          Découvrez nos guides complets pour réussir vos cultures étape par étape
        </p>
      </div>
      <Button variant="outline" class="flex items-center gap-2">
        <PlusIcon class="w-4 h-4" />
        Créer un itinéraire
      </Button>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card class="bg-primary/5">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapIcon class="w-5 h-5 text-primary" />
            </div>
            <div>
              <div class="text-lg font-semibold">{{ totalItineraries }}</div>
              <div class="text-xs text-gray-500">Itinéraires disponibles</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-green-50">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon class="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div class="text-lg font-semibold">{{ inProgressItineraries }}</div>
              <div class="text-xs text-gray-500">En cours</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-blue-50">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClockIcon class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div class="text-lg font-semibold">{{ completedItineraries }}</div>
              <div class="text-xs text-gray-500">Complétés</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-orange-50">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <StarIcon class="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div class="text-lg font-semibold">{{ easyItineraries }}</div>
              <div class="text-xs text-gray-500">Faciles</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap gap-4 p-4 bg-secondary/50 rounded-lg">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Difficulté :</label>
        <Select v-model="difficultyFilter">
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="facile">Facile</SelectItem>
            <SelectItem value="moyen">Moyen</SelectItem>
            <SelectItem value="difficile">Difficile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Type :</label>
        <Select v-model="typeFilter">
          <SelectTrigger class="w-40">
            <SelectValue placeholder="Tous types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            <SelectItem value="légume-fruit">Légume-fruit</SelectItem>
            <SelectItem value="légume-feuille">Légume-feuille</SelectItem>
            <SelectItem value="légume-racine">Légume-racine</SelectItem>
            <SelectItem value="aromate">Aromate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Saison :</label>
        <Select v-model="seasonFilter">
          <SelectTrigger class="w-36">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="printemps">Printemps</SelectItem>
            <SelectItem value="été">Été</SelectItem>
            <SelectItem value="automne">Automne</SelectItem>
            <SelectItem value="hiver">Hiver</SelectItem>
            <SelectItem value="toute-saison">Toute saison</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Statut :</label>
        <Select v-model="statusFilter">
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Tous" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="not-started">Non commencé</SelectItem>
            <SelectItem value="in-progress">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Liste des itinéraires -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="itinerary in filteredItineraries" :key="itinerary.id">
        <Card class="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer h-full" @click="goToItinerary(itinerary.id)">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <img :src="itinerary.icon" :alt="itinerary.name" class="w-8 h-8" />
                <div>
                  <CardTitle class="text-lg">{{ itinerary.name }}</CardTitle>
                  <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ itinerary.description }}</p>
                </div>
              </div>
              <Badge 
                :variant="getDifficultyVariant(itinerary.difficulty)"
                class="shrink-0"
              >
                {{ itinerary.difficulty }}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent class="space-y-4">
            <!-- Informations générales -->
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-500">Durée :</span>
                <div>{{ itinerary.totalDuration }}</div>
              </div>
              <div>
                <span class="font-medium text-gray-500">Type :</span>
                <div>{{ formatPlantType(itinerary.plantType) }}</div>
              </div>
              <div>
                <span class="font-medium text-gray-500">Saison :</span>
                <div>{{ formatSeason(itinerary.season) }}</div>
              </div>
              <div>
                <span class="font-medium text-gray-500">Étapes :</span>
                <div>{{ itinerary.steps?.length || 0 }} étapes</div>
              </div>
            </div>

            <!-- Barre de progression -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-500">Progression</span>
                <span class="text-sm font-medium">{{ itinerary.progress || 0 }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full transition-all duration-300" 
                  :style="{ width: `${itinerary.progress || 0}%` }"
                ></div>
              </div>
            </div>

            <!-- Statut -->
            <div class="flex items-center justify-between pt-2 border-t border-gray-200">
              <Badge 
                :variant="getStatusVariant(getItineraryStatus(itinerary))"
                class="text-xs"
              >
                {{ getStatusLabel(getItineraryStatus(itinerary)) }}
              </Badge>
              
              <Button variant="outline" size="sm" @click.stop="goToItinerary(itinerary.id)">
                <EyeIcon class="w-4 h-4 mr-2" />
                Voir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Message si aucun itinéraire -->
    <div v-if="filteredItineraries.length === 0" class="text-center py-12 text-gray-500">
      <MapIcon class="w-12 h-12 mx-auto text-gray-300 mb-4" />
      <p class="text-lg font-medium">Aucun itinéraire trouvé</p>
      <p class="text-sm">Modifiez vos filtres pour voir plus de résultats</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  PlusIcon, 
  MapIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  StarIcon,
  EyeIcon
} from 'lucide-vue-next'
import { mockZoneDetail } from '@/mocks/zoneDetails'

// Données (pour la démo, on utilise les itinéraires de la zone mock)
const allItineraries = ref(mockZoneDetail.itineraries || [])

// Filtres
const difficultyFilter = ref('all')
const typeFilter = ref('all')
const seasonFilter = ref('all')
const statusFilter = ref('all')

// Navigation
const router = useRouter()

// Statistiques
const totalItineraries = computed(() => allItineraries.value.length)
const inProgressItineraries = computed(() => 
  allItineraries.value.filter(i => i.progress > 0 && i.progress < 100).length
)
const completedItineraries = computed(() => 
  allItineraries.value.filter(i => i.progress === 100).length
)
const easyItineraries = computed(() => 
  allItineraries.value.filter(i => i.difficulty === 'facile').length
)

// Itinéraires filtrés
const filteredItineraries = computed(() => {
  return allItineraries.value.filter(itinerary => {
    const matchesDifficulty = difficultyFilter.value === 'all' || itinerary.difficulty === difficultyFilter.value
    const matchesType = typeFilter.value === 'all' || itinerary.plantType === typeFilter.value
    const matchesSeason = seasonFilter.value === 'all' || itinerary.season === seasonFilter.value
    
    let matchesStatus = true
    if (statusFilter.value !== 'all') {
      const status = getItineraryStatus(itinerary)
      matchesStatus = status === statusFilter.value
    }
    
    return matchesDifficulty && matchesType && matchesSeason && matchesStatus
  })
})

// Fonctions utilitaires
const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}

const formatPlantType = (type: string) => {
  const types: Record<string, string> = {
    'légume-fruit': 'Légume-fruit',
    'légume-feuille': 'Légume-feuille',
    'légume-racine': 'Légume-racine',
    'aromate': 'Aromate'
  }
  return types[type] || type
}

const formatSeason = (season: string) => {
  const seasons: Record<string, string> = {
    'printemps': 'Printemps',
    'été': 'Été',
    'automne': 'Automne',
    'hiver': 'Hiver',
    'toute-saison': 'Toute saison'
  }
  return seasons[season] || season
}

const getItineraryStatus = (itinerary: any) => {
  if (!itinerary.startedDate) return 'not-started'
  if (itinerary.progress === 100) return 'completed'
  return 'in-progress'
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'not-started': return 'outline'
    case 'in-progress': return 'default'
    case 'completed': return 'secondary'
    default: return 'outline'
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'not-started': 'Non commencé',
    'in-progress': 'En cours',
    'completed': 'Terminé'
  }
  return labels[status] || status
}

// Actions
const goToItinerary = (id: string) => {
  router.push(`/itineraires/${id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 