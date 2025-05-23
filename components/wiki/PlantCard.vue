<template>
  <!-- Vue carte (grid) -->
  <Card 
    v-if="viewMode === 'card'"
    class="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
    @click="$emit('view-details', plant.slug)"
  >
    <CardContent class="p-0">
      <!-- Image/Icône de la plante -->
      <div class="relative h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-t-lg flex items-center justify-center overflow-hidden">
        <img 
          :src="plant.icon" 
          :alt="plant.name"
          class="w-20 h-20 transition-transform duration-300 group-hover:scale-110"
        />
        
        <!-- Badge difficulté -->
        <Badge 
          :variant="getDifficultyVariant(plant.difficulty)"
          class="absolute top-3 right-3"
        >
          {{ plant.difficulty }}
        </Badge>
        
        <!-- Badge "Déjà cultivé" si applicable -->
        <div 
          v-if="plant.userHistory?.hasGrown"
          class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
        >
          <CheckCircleIcon class="w-3 h-3" />
          Cultivé
        </div>
      </div>
      
      <div class="p-4 space-y-3">
        <!-- Nom et nom scientifique -->
        <div>
          <h3 class="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {{ plant.name }}
          </h3>
          <p class="text-sm text-gray-500 italic">{{ plant.scientificName }}</p>
        </div>
        
        <!-- Description courte -->
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ plant.description }}
        </p>
        
        <!-- Informations principales -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="flex items-center gap-1">
            <SproutIcon class="w-3 h-3 text-green-600" />
            <span class="text-gray-600">{{ formatCategory(plant.category) }}</span>
          </div>
          <div class="flex items-center gap-1">
            <CalendarIcon class="w-3 h-3 text-blue-600" />
            <span class="text-gray-600">{{ plant.growthDuration }}</span>
          </div>
          <div class="flex items-center gap-1">
            <SunIcon class="w-3 h-3 text-yellow-600" />
            <span class="text-gray-600">{{ plant.seasons.join(', ') }}</span>
          </div>
          <div class="flex items-center gap-1">
            <StarIcon class="w-3 h-3 text-purple-600" />
            <span class="text-gray-600">{{ plant.averageRating }}/5</span>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="tag in plant.tags.slice(0, 3)" 
            :key="tag"
            class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            {{ tag }}
          </span>
          <span 
            v-if="plant.tags.length > 3"
            class="text-xs text-gray-400"
          >
            +{{ plant.tags.length - 3 }}
          </span>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            class="flex-1"
            @click.stop="$emit('view-details', plant.slug)"
          >
            <BookOpenIcon class="w-4 h-4 mr-1" />
            Voir détails
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            @click.stop="$emit('add-to-zone', plant)"
            class="hover:bg-green-50 hover:border-green-300"
          >
            <PlusIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Vue liste -->
  <Card 
    v-else
    class="hover:shadow-md transition-all duration-300 cursor-pointer group"
    @click="$emit('view-details', plant.slug)"
  >
    <CardContent class="p-4">
      <div class="flex items-start gap-4">
        <!-- Icône de la plante -->
        <div class="relative flex-shrink-0">
          <div class="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
            <img 
              :src="plant.icon" 
              :alt="plant.name"
              class="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          <!-- Badge "Déjà cultivé" -->
          <div 
            v-if="plant.userHistory?.hasGrown"
            class="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1"
          >
            <CheckCircleIcon class="w-3 h-3" />
          </div>
        </div>
        
        <!-- Contenu principal -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <!-- Nom et badges -->
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                  {{ plant.name }}
                </h3>
                <Badge 
                  :variant="getDifficultyVariant(plant.difficulty)"
                  class="text-xs"
                >
                  {{ plant.difficulty }}
                </Badge>
              </div>
              
              <!-- Nom scientifique -->
              <p class="text-sm text-gray-500 italic mb-2">{{ plant.scientificName }}</p>
              
              <!-- Description -->
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                {{ plant.description }}
              </p>
              
              <!-- Informations détaillées -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                <div>
                  <span class="font-medium text-gray-500">Catégorie :</span>
                  <div class="text-gray-700">{{ formatCategory(plant.category) }}</div>
                </div>
                <div>
                  <span class="font-medium text-gray-500">Durée :</span>
                  <div class="text-gray-700">{{ plant.growthDuration }}</div>
                </div>
                <div>
                  <span class="font-medium text-gray-500">Saisons :</span>
                  <div class="text-gray-700">{{ plant.seasons.join(', ') }}</div>
                </div>
                <div>
                  <span class="font-medium text-gray-500">Note :</span>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-700">{{ plant.averageRating }}/5</span>
                    <div class="flex">
                      <StarIcon 
                        v-for="i in 5" 
                        :key="i"
                        :class="[
                          'w-3 h-3',
                          i <= Math.floor(plant.averageRating || 0) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in plant.tags.slice(0, 5)" 
                  :key="tag"
                  class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="plant.tags.length > 5"
                  class="text-xs text-gray-400"
                >
                  +{{ plant.tags.length - 5 }}
                </span>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col gap-2 ml-4">
              <Button 
                variant="outline" 
                size="sm"
                @click.stop="$emit('view-details', plant.slug)"
              >
                <BookOpenIcon class="w-4 h-4 mr-1" />
                Détails
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                @click.stop="$emit('add-to-zone', plant)"
                class="hover:bg-green-50 hover:border-green-300"
              >
                <PlusIcon class="w-4 h-4 mr-1" />
                Ajouter
              </Button>
              
              <!-- Lien vers itinéraire si disponible -->
              <Button 
                v-if="plant.relatedItineraries?.length"
                variant="ghost" 
                size="sm"
                @click.stop="goToItinerary"
                class="text-xs text-blue-600 hover:text-blue-800"
              >
                <RouteIcon class="w-3 h-3 mr-1" />
                Itinéraire
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon,
  SproutIcon,
  CalendarIcon,
  SunIcon,
  StarIcon,
  BookOpenIcon,
  PlusIcon,
  RouteIcon
} from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
  viewMode: 'card' | 'list'
}

interface Emits {
  (e: 'view-details', slug: string): void
  (e: 'add-to-zone', plant: Plant): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Utilitaires
const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}

const formatCategory = (category: string) => {
  const categories: Record<string, string> = {
    'légume-fruit': 'Légume-fruit',
    'légume-feuille': 'Légume-feuille',
    'légume-racine': 'Légume-racine',
    'aromate': 'Aromate'
  }
  return categories[category] || category
}

const goToItinerary = () => {
  // TODO: Navigation vers l'itinéraire correspondant
  console.log('Navigation vers itinéraire:', props.plant.relatedItineraries?.[0])
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