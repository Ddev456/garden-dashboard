<template>
  <div v-if="plant" class="max-w-6xl mx-auto py-8 space-y-8">
    <!-- En-tête de la plante -->
    <PlantHeader 
      :plant="plant"
      @add-to-zone="handleAddToZone"
      @view-itinerary="goToItinerary"
      @toggle-favorite="handleToggleFavorite"
      @share="handleShare"
    />

    <!-- Système d'onglets -->
    <div class="bg-white rounded-lg shadow-sm border">
      <!-- Navigation des onglets -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 mr-2 inline" />
            {{ tab.name }}
            <span v-if="tab.badge" class="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {{ tab.badge }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div class="p-6">
        <!-- Onglet Aperçu -->
        <PlantOverview v-if="activeTab === 'overview'" :plant="plant" />

        <!-- Onglet Variétés -->
        <PlantVarieties v-if="activeTab === 'varieties'" :plant="plant" />

        <!-- Onglet Compagnons -->
        <PlantCompanions 
          v-if="activeTab === 'companions'" 
          :plant="plant" 
          @view-companion="handleViewCompanion"
        />

        <!-- Onglet Santé -->
        <PlantHealth v-if="activeTab === 'health'" :plant="plant" />
      </div>
    </div>

    <!-- Actions en bas -->
    <div class="flex justify-between items-center pt-6">
      <Button 
        variant="outline" 
        @click="$router.go(-1)"
      >
        <ArrowLeftIcon class="w-4 h-4 mr-2" />
        Retour au wiki
      </Button>
      
      <div class="flex gap-3">
        <Button>
          <PlusIcon class="w-4 h-4 mr-2" />
          Ajouter à ma zone
        </Button>
        <Button variant="outline">
          <ShareIcon class="w-4 h-4 mr-2" />
          Partager cette fiche
        </Button>
      </div>
    </div>
  </div>
  
  <!-- Message d'erreur si plante non trouvée -->
  <div v-else class="max-w-4xl mx-auto py-16 text-center">
    <SearchXIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Plante non trouvée</h1>
    <p class="text-gray-600 mb-6">
      La plante "{{ $route.params.slug }}" n'existe pas dans notre base de données.
    </p>
    <Button @click="$router.push('/wiki')">
      <ArrowLeftIcon class="w-4 h-4 mr-2" />
      Retour au wiki
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, SearchXIcon, InfoIcon, SproutIcon, HeartHandshakeIcon, ShieldAlertIcon, PlusIcon, ShareIcon } from 'lucide-vue-next'
import { getPlantBySlug } from '@/mocks/plantsWiki'
import PlantHeader from '@/components/wiki/PlantHeader.vue'
import PlantOverview from '@/components/wiki/PlantOverview.vue'
import PlantVarieties from '@/components/wiki/PlantVarieties.vue'
import PlantCompanions from '@/components/wiki/PlantCompanions.vue'
import PlantHealth from '@/components/wiki/PlantHealth.vue'

const route = useRoute()
const router = useRouter()
const plantSlug = route.params.slug as string

// Récupération de la plante
const plant = getPlantBySlug(plantSlug)

// Meta données de la page
useSeoMeta({
  title: plant ? `${plant.name} - Wiki des Plantes` : 'Plante non trouvée - Wiki des Plantes',
  description: plant ? plant.description : 'Cette plante n\'existe pas dans notre base de données.',
})

// État des onglets
const activeTab = ref('overview')

// Configuration des onglets
const tabs = [
  { 
    id: 'overview', 
    name: 'Aperçu', 
    icon: InfoIcon
  },
  { 
    id: 'varieties', 
    name: 'Variétés', 
    icon: SproutIcon,
    badge: plant?.varieties?.length || 0
  },
  { 
    id: 'companions', 
    name: 'Compagnons', 
    icon: HeartHandshakeIcon,
    badge: plant?.companions?.length || 0
  },
  { 
    id: 'health', 
    name: 'Santé', 
    icon: ShieldAlertIcon,
    badge: (plant?.pests?.length || 0) + (plant?.diseases?.length || 0)
  }
]

// Actions
const goToItinerary = () => {
  if (plant?.relatedItineraries?.[0]) {
    router.push(`/itineraires/${plant.relatedItineraries[0]}`)
  }
}

const handleAddToZone = () => {
  console.log('Ajouter à la zone:', plant?.name)
  // TODO: Implémenter l'ajout à la zone
}

const handleToggleFavorite = () => {
  console.log('Toggle favoris:', plant?.name)
  // TODO: Implémenter le système de favoris
}

const handleShare = () => {
  console.log('Partager plante:', plant?.name)
  // TODO: Implémenter le partage
}

const handleViewCompanion = (plantId: string) => {
  router.push(`/wiki/${plantId}`)
}
</script> 