<template>
  <div class="space-y-4 md:space-y-6">
    <!-- Barre de filtres et actions - Optimisée mobile -->
    <div class="space-y-3 md:space-y-0 md:flex md:flex-row gap-4 p-3 md:p-4 bg-secondary/50 rounded-lg">
      <!-- Recherche -->
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="Rechercher une plante..."
          class="w-full text-sm"
        />
      </div>
      
      <!-- Filtres - Stack sur mobile, inline sur desktop -->
      <div class="flex flex-col sm:flex-row gap-2">
        <Select v-model="statusFilter">
          <SelectTrigger class="w-full sm:w-32 text-xs md:text-sm">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="healthy">Sain</SelectItem>
            <SelectItem value="warning">Attention</SelectItem>
            <SelectItem value="danger">Problème</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="categoryFilter">
          <SelectTrigger class="w-full sm:w-36 text-xs md:text-sm">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="légumes">Légumes</SelectItem>
            <SelectItem value="aromatiques">Aromatiques</SelectItem>
            <SelectItem value="fleurs">Fleurs</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="sortBy">
          <SelectTrigger class="w-full sm:w-40 text-xs md:text-sm">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="plantedDate">Date plantation</SelectItem>
            <SelectItem value="status">Statut</SelectItem>
            <SelectItem value="nextWatering">Prochain arrosage</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Statistiques rapides - Layout mobile optimisé -->
    <div class="flex flex-wrap gap-4">
      <Badge class="bg-green-50 border-green-200 hover:bg-green-100 transition-colors">
          <span class="text-sm md:text-md font-bold text-green-700">{{ healthyCount }}</span>
          <span class="text-xs md:text-sm text-green-600">Plantes saines</span>
      </Badge>
      <Badge class="bg-yellow-50 border-yellow-200 hover:bg-yellow-100 transition-colors">
          <div class="text-sm md:text-md font-bold text-yellow-700">{{ warningCount }}</div>
          <div class="text-xs md:text-sm text-yellow-600">À surveiller</div>
        </Badge>
      <Badge class="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors">
          <div class="text-sm md:text-md font-bold text-blue-700">{{ needsWateringCount }}</div>
          <div class="text-xs md:text-sm text-blue-600">Arrosage aujourd'hui</div>
        </Badge>
      <Badge class="bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors">
          <div class="text-sm md:text-md font-bold text-purple-700">{{ averageAge }}</div>
          <div class="text-xs md:text-sm text-purple-600">Âge moyen (jours)</div>
        </Badge>
    </div>

    <!-- Liste des plantes - Grid responsive optimisé -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
      <Card 
        v-for="plant in filteredAndSortedPlants" 
        :key="plant.id" 
        class="bg-primary/10 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <CardHeader class="pb-3">
          <CardTitle class="flex items-center gap-2 text-sm md:text-base">
            <img :src="plant.icon" :alt="plant.name" class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span class="truncate">{{ plant.name }}</span>
            <Badge 
              :variant="getStatusVariant(plant.status)"
              class="ml-auto text-xs flex-shrink-0"
            >
              {{ getStatusLabel(plant.status) }}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 md:space-y-4">
          <!-- Informations principales - Layout mobile optimisé -->
          <dl class="space-y-2">
            <div class="flex justify-between items-center">
              <dt class="text-xs md:text-sm font-medium text-gray-500">Planté le</dt>
              <dd class="text-xs md:text-sm font-medium">{{ plant.plantedDate }}</dd>
            </div>
            <div class="flex justify-between items-center">
              <dt class="text-xs md:text-sm font-medium text-gray-500">Âge</dt>
              <dd class="text-xs md:text-sm font-medium text-primary">{{ calculateAge(plant.plantedDate) }} jours</dd>
            </div>
            <div class="flex justify-between items-start">
              <dt class="text-xs md:text-sm font-medium text-gray-500">Prochain arrosage</dt>
              <dd class="text-xs md:text-sm text-right" :class="getWateringClass(plant.nextWateringDate)">
                {{ plant.nextWateringDate }}
                <div v-if="isWateringOverdue(plant.nextWateringDate)" class="text-red-600 font-medium text-xs">
                  En retard
                </div>
                <div v-else-if="isWateringToday(plant.nextWateringDate)" class="text-orange-600 font-medium text-xs">
                  Aujourd'hui
                </div>
              </dd>
            </div>
            <div v-if="plant.notes" class="pt-1 border-t border-gray-200">
              <dt class="text-xs md:text-sm font-medium text-gray-500 mb-1">Notes</dt>
              <dd class="text-xs md:text-sm text-gray-700 line-clamp-2">{{ plant.notes }}</dd>
            </div>
          </dl>

          <!-- Actions rapides - Layout mobile optimisé -->
          <div class="flex flex-col sm:flex-row gap-2 pt-2 border-t">
            <!-- Bouton d'arrosage principal -->
            <Button
              size="sm"
              :variant="needsWatering(plant.nextWateringDate) ? 'default' : 'outline'"
              @click="markAsWatered(plant)"
              :disabled="!needsWatering(plant.nextWateringDate)"
              class="flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              :class="needsWatering(plant.nextWateringDate) ? 'bg-blue-600 hover:bg-blue-700' : ''"
            >
              <DropletIcon class="w-3 h-3 md:w-4 md:h-4" />
              <span class="text-xs md:text-sm">
                {{ needsWatering(plant.nextWateringDate) ? 'Arroser maintenant' : 'Arrosé' }}
              </span>
            </Button>
            
            <!-- Menu d'actions secondaires -->
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline" 
                  class="flex items-center justify-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 sm:flex-1"
                >
                  <PlusIcon class="w-3 h-3 md:w-4 md:h-4" />
                  <span class="text-xs md:text-sm">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-48">
                <DropdownMenuItem @click="addAction(plant, 'fertilize')" class="text-sm">
                  <SparklesIcon class="w-4 h-4 mr-2 text-purple-600" />
                  Fertiliser
                </DropdownMenuItem>
                <DropdownMenuItem @click="addAction(plant, 'prune')" class="text-sm">
                  <ScissorsIcon class="w-4 h-4 mr-2 text-orange-600" />
                  Tailler
                </DropdownMenuItem>
                <DropdownMenuItem @click="addAction(plant, 'treat')" class="text-sm">
                  <ShieldIcon class="w-4 h-4 mr-2 text-red-600" />
                  Traiter
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="markAsHarvested(plant)" class="text-green-600 text-sm">
                  <HarvestIcon class="w-4 h-4 mr-2" />
                  Marquer comme récolté
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Message si aucune plante - Design amélioré -->
    <div v-if="filteredAndSortedPlants.length === 0" class="text-center py-12 text-gray-500">
      <div class="space-y-4">
        <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <SproutIcon class="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
        </div>
        <div>
          <p class="text-sm md:text-base font-medium">Aucune plante trouvée</p>
          <p class="text-xs md:text-sm mt-1">Essayez de modifier vos filtres ou ajoutez votre première plante</p>
        </div>
        <Button variant="outline" size="sm" class="mt-4">
          <PlusIcon class="w-4 h-4 mr-2" />
          Ajouter une plante
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, parseISO, differenceInDays, isToday, isPast } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  DropletIcon, 
  PlusIcon, 
  SparklesIcon, 
  ScissorsIcon, 
  ShieldIcon,
  SproutIcon
} from 'lucide-vue-next'

// Icône pour la récolte (à remplacer par une vraie icône si disponible)
const HarvestIcon = SparklesIcon

const props = defineProps<{ plants: any[] }>()
const emit = defineEmits<{
  watered: [plantId: string]
  actionAdded: [plantId: string, action: string]
  harvested: [plantId: string]
}>()

// États des filtres
const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const sortBy = ref('name')

// Fonctions utilitaires
const calculateAge = (plantedDate: string) => {
  try {
    const planted = parseISO(plantedDate.split('/').reverse().join('-'))
    return differenceInDays(new Date(), planted)
  } catch {
    return 0
  }
}

const needsWatering = (nextWateringDate: string) => {
  try {
    const wateringDate = parseISO(nextWateringDate.split('/').reverse().join('-'))
    return isPast(wateringDate) || isToday(wateringDate)
  } catch {
    return false
  }
}

const isWateringToday = (nextWateringDate: string) => {
  try {
    const wateringDate = parseISO(nextWateringDate.split('/').reverse().join('-'))
    return isToday(wateringDate)
  } catch {
    return false
  }
}

const isWateringOverdue = (nextWateringDate: string) => {
  try {
    const wateringDate = parseISO(nextWateringDate.split('/').reverse().join('-'))
    return isPast(wateringDate) && !isToday(wateringDate)
  } catch {
    return false
  }
}

const getWateringClass = (nextWateringDate: string) => {
  if (isWateringOverdue(nextWateringDate)) return 'text-red-600'
  if (isWateringToday(nextWateringDate)) return 'text-orange-600'
  return 'text-gray-900'
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'healthy': return 'secondary'
    case 'warning': return 'outline'
    case 'danger': return 'destructive'
    default: return 'secondary'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'healthy': return 'Sain'
    case 'warning': return 'Attention'
    case 'danger': return 'Problème'
    default: return status
  }
}

// Catégorisation simple basée sur le nom (à améliorer avec de vraies données)
const getPlantCategory = (plantName: string) => {
  const name = plantName.toLowerCase()
  if (name.includes('basilic') || name.includes('persil') || name.includes('thym') || name.includes('romarin')) {
    return 'aromatiques'
  }
  if (name.includes('rose') || name.includes('tulipe') || name.includes('œillet')) {
    return 'fleurs'
  }
  return 'légumes'
}

// Computed pour les statistiques
const healthyCount = computed(() => 
  props.plants.filter(p => p.status === 'healthy').length
)

const warningCount = computed(() => 
  props.plants.filter(p => p.status === 'warning' || p.status === 'danger').length
)

const needsWateringCount = computed(() => 
  props.plants.filter(p => needsWatering(p.nextWateringDate)).length
)

const averageAge = computed(() => {
  if (props.plants.length === 0) return 0
  const totalAge = props.plants.reduce((sum, plant) => sum + calculateAge(plant.plantedDate), 0)
  return Math.round(totalAge / props.plants.length)
})

// Computed pour les plantes filtrées et triées
const filteredAndSortedPlants = computed(() => {
  let filtered = props.plants.filter(plant => {
    // Filtre par recherche
    if (searchQuery.value && !plant.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    
    // Filtre par statut
    if (statusFilter.value !== 'all' && plant.status !== statusFilter.value) {
      return false
    }
    
    // Filtre par catégorie
    if (categoryFilter.value !== 'all' && getPlantCategory(plant.name) !== categoryFilter.value) {
      return false
    }
    
    return true
  })

  // Tri
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'plantedDate':
        return calculateAge(b.plantedDate) - calculateAge(a.plantedDate)
      case 'status':
        const statusOrder: Record<string, number> = { 'danger': 0, 'warning': 1, 'healthy': 2 }
        return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3)
      case 'nextWatering':
        return needsWatering(a.nextWateringDate) ? -1 : 1
      default:
        return 0
    }
  })

  return filtered
})

// Actions
const markAsWatered = (plant: any) => {
  emit('watered', plant.id)
}

const addAction = (plant: any, action: string) => {
  emit('actionAdded', plant.id, action)
}

const markAsHarvested = (plant: any) => {
  emit('harvested', plant.id)
}
</script>

<style scoped>
/* Limitation du nombre de lignes pour les notes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 