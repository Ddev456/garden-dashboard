<template>
  <div class="border-2 border-dashed border-primary bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8">
    <div class="flex items-start gap-6">
      <div class="relative">
        <div class="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center">
          <img :src="plant.icon" :alt="plant.name" class="w-16 h-16" />
        </div>
        <!-- Badge cultivé -->
        <div 
          v-if="plant.userHistory?.hasGrown"
          class="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-2"
          title="Déjà cultivé"
        >
          <CheckCircleIcon class="w-4 h-4" />
        </div>
      </div>
      
      <div class="flex-1">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ plant.name }}</h1>
            <p class="text-xl text-gray-600 italic mb-4">{{ plant.scientificName }}</p>
            <p class="text-gray-700 text-lg max-w-2xl">{{ plant.description }}</p>
          </div>
          
          <div class="flex items-start gap-3">
            <Badge 
              :variant="getDifficultyVariant(plant.difficulty)"
              class="text-lg px-4 py-2"
            >
              {{ plant.difficulty }}
            </Badge>
            
            <!-- Note moyenne avec étoiles -->
            <div class="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div class="flex items-center gap-2">
                <div class="flex">
                  <StarIcon 
                    v-for="i in 5" 
                    :key="i"
                    :class="[
                      'w-5 h-5',
                      i <= Math.floor(plant.averageRating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="font-semibold">{{ plant.averageRating || 0 }}/5</span>
                <span class="text-gray-500 text-sm">({{ plant.ratingsCount || 0 }} avis)</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Informations principales -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-white rounded-lg p-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide">Catégorie</div>
            <div class="text-lg font-semibold">{{ formatCategory(plant.category) }}</div>
          </div>
          <div class="bg-white rounded-lg p-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide">Durée</div>
            <div class="text-lg font-semibold">{{ plant.growthDuration }}</div>
          </div>
          <div class="bg-white rounded-lg p-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide">Saisons</div>
            <div class="text-lg font-semibold">{{ (plant.seasons || []).join(', ') }}</div>
          </div>
          <div class="bg-white rounded-lg p-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide">Espacement</div>
            <div class="text-lg font-semibold">{{ plant.spacing }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Actions rapides -->
    <div class="flex gap-3 mt-6">
      <Button class="flex-1 md:flex-initial" @click="$emit('add-to-zone')">
        <PlusIcon class="w-4 h-4 mr-2" />
        Ajouter à ma zone
      </Button>
      <Button 
        v-if="plant.relatedItineraries?.length" 
        variant="outline"
        @click="$emit('view-itinerary')"
      >
        <RouteIcon class="w-4 h-4 mr-2" />
        Voir l'itinéraire
      </Button>
      <Button variant="outline" @click="$emit('toggle-favorite')">
        <HeartIcon class="w-4 h-4 mr-2" />
        Favoris
      </Button>
      <Button variant="outline" @click="$emit('share')">
        <ShareIcon class="w-4 h-4 mr-2" />
        Partager
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon,
  StarIcon,
  PlusIcon,
  RouteIcon,
  HeartIcon,
  ShareIcon
} from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
}

interface Emits {
  (e: 'add-to-zone'): void
  (e: 'view-itinerary'): void
  (e: 'toggle-favorite'): void
  (e: 'share'): void
}

defineProps<Props>()
defineEmits<Emits>()

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
</script> 