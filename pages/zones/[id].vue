<!-- pages/zones/[id].vue -->
<template>
  <div class="space-y-4 md:space-y-6 pb-20 md:pb-6">
    <!-- En-tête avec informations principales - Optimisé mobile -->
    <div class="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-start">
      <div class="space-y-1 min-w-0 flex-1">
        <h1 class="text-xl md:text-2xl font-semibold text-primary truncate">{{ zoneDetail.name }}</h1>
        <p class="text-xs md:text-sm text-gray-500">Créée le {{ zoneDetail.createdAt }}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <Button 
          variant="outline" 
          size="sm" 
          @click="toggleFavorite"
          class="transition-all duration-200 hover:scale-105 active:scale-95"
          :class="zoneDetail.favorite ? 'border-yellow-300 bg-yellow-50' : ''"
        >
          <Star 
            :fill="zoneDetail.favorite ? 'currentColor' : 'none'" 
            class="w-4 h-4 mr-1 md:mr-2 transition-colors"
            :class="zoneDetail.favorite ? 'text-yellow-500' : ''"
          />
          <span class="hidden sm:inline">{{ zoneDetail.favorite ? 'Favori' : 'Ajouter aux favoris' }}</span>
          <span class="sm:hidden">{{ zoneDetail.favorite ? '★' : '☆' }}</span>
        </Button>
        <Button 
          variant="default" 
          size="sm"
          class="transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <PencilIcon class="w-4 h-4 mr-1 md:mr-2" />
          <span class="hidden sm:inline">Modifier</span>
          <span class="sm:hidden">✏️</span>
        </Button>
      </div>
    </div>

    <!-- Image et informations générales - Layout responsive amélioré -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Image principale -->
      <Card class="lg:col-span-2 bg-white overflow-hidden group">
        <CardContent class="p-0">
          <div class="relative">
            <img 
              :src="zoneDetail.image" 
              :alt="zoneDetail.name"
              class="w-full h-48 md:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <!-- Overlay avec gradient pour améliorer la lisibilité -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="p-4 md:p-6 space-y-3 md:space-y-4">
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">{{ zoneDetail.description }}</p>
            <div class="flex flex-wrap gap-1.5 md:gap-2">
              <Badge 
                v-for="tag in zoneDetail.tags" 
                :key="tag" 
                variant="secondary"
                class="text-xs transition-colors hover:bg-primary/20"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Caractéristiques - Design amélioré -->
      <Card class="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg md:text-xl flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            Caractéristiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl class="space-y-3 md:space-y-4">
            <div class="group">
              <dt class="text-xs md:text-sm font-medium text-gray-500 mb-1">Surface</dt>
              <dd class="text-sm md:text-base text-gray-900 font-medium group-hover:text-primary transition-colors">
                {{ zoneDetail.surface }}
              </dd>
            </div>
            <div class="group">
              <dt class="text-xs md:text-sm font-medium text-gray-500 mb-1">Type de sol</dt>
              <dd class="text-sm md:text-base text-gray-900 font-medium group-hover:text-primary transition-colors">
                {{ zoneDetail.soilType }}
              </dd>
            </div>
            <div class="group">
              <dt class="text-xs md:text-sm font-medium text-gray-500 mb-1">Exposition</dt>
              <dd class="text-sm md:text-base text-gray-900 font-medium group-hover:text-primary transition-colors">
                {{ zoneDetail.sunExposure }}
              </dd>
            </div>
            <div class="group">
              <dt class="text-xs md:text-sm font-medium text-gray-500 mb-1">Irrigation</dt>
              <dd class="text-sm md:text-base text-gray-900 font-medium group-hover:text-primary transition-colors">
                {{ zoneDetail.irrigationType }}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>

    <!-- Onglets optimisés mobile -->
    <Tabs default-value="plants" class="w-full">
      <!-- Navigation des onglets - Scroll horizontal sur mobile -->
      <div class="relative">
        <TabsList class="flex gap-1 w-full overflow-x-auto scrollbar-hide p-1 bg-secondary/50 rounded-lg">
          <TabsTrigger 
            value="plants" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
          <img src="/icons/wiki.svg" alt="Plantes" class="w-4 h-4 mr-1 md:mr-2">
          <span class="hidden sm:inline">Plantes de la zone</span>
            <span class="sm:hidden">Plantes</span>
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <img src="/icons/calendar.svg" alt="Historique" class="w-4 h-4 mr-1 md:mr-2">
            <span class="hidden sm:inline">Historique</span>
            <span class="sm:hidden">Historique</span>
          </TabsTrigger>
          <TabsTrigger 
            value="itineraries" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <img src="/icons/culture-path.svg" alt="Itinéraires" class="w-4 h-4 mr-1 md:mr-2">
            <span class="hidden sm:inline">Itinéraires</span>
            <span class="sm:hidden">Itinéraires</span>
          </TabsTrigger>
          <TabsTrigger 
            value="journal" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <img src="/icons/season.svg" alt="Carnet de bord" class="w-4 h-4 mr-1 md:mr-2">
          <span class="hidden sm:inline">Carnet de bord</span>
            <span class="sm:hidden">Carnet</span>
          </TabsTrigger>
        </TabsList>
        
        <!-- Indicateur de scroll sur mobile -->
        <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden"></div>
      </div>

      <!-- Contenu des onglets avec animations -->
      <div class="mt-4 md:mt-6">
        <TabsContent value="plants" class="animate-in fade-in-50 duration-300">
          <ZonePlantsTab 
            :plants="zoneDetail.currentPlants" 
            @watered="handlePlantWatered"
            @action-added="handleActionAdded"
            @harvested="handlePlantHarvested"
          />
        </TabsContent>

        <TabsContent value="history" class="animate-in fade-in-50 duration-300">
          <ZoneHistoryTab :history="zoneDetail.plantingHistory" />
        </TabsContent>

        <TabsContent value="itineraries" class="animate-in fade-in-50 duration-300">
          <ZoneItinerariesTab :itineraries="zoneDetail.itineraries || []" />
        </TabsContent>

        <TabsContent value="journal" class="animate-in fade-in-50 duration-300">
          <ZoneJournalTab 
            :journal="zoneDetail.journal || []" 
            :available-plants="zoneDetail.currentPlants"
            @note-added="handleNoteAdded"
            @note-edited="handleNoteEdited"
            @note-deleted="handleNoteDeleted"
          />
        </TabsContent>
      </div>
    </Tabs>

    <!-- Toast de feedback (à implémenter avec un système de toast) -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300"
    >
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span class="text-sm font-medium">{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mockZoneDetail } from '@/mocks/zoneDetails'
import { Star, PencilIcon } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
// Nouveaux composants de tabs
import ZonePlantsTab from '@/components/dashboard/zone/ZonePlantsTab.vue'
import ZoneHistoryTab from '@/components/dashboard/zone/ZoneHistoryTab.vue'
import ZoneItinerariesTab from '@/components/dashboard/zone/ZoneItinerariesTab.vue'
import ZoneJournalTab from '@/components/dashboard/zone/ZoneJournalTab.vue'

const zoneDetail = ref(mockZoneDetail)

// États pour les feedbacks UX
const showToast = ref(false)
const toastMessage = ref('')

const toggleFavorite = () => {
  zoneDetail.value.favorite = !zoneDetail.value.favorite
  showToastMessage(zoneDetail.value.favorite ? 'Ajouté aux favoris ⭐' : 'Retiré des favoris')
}

// Gestionnaires d'événements avec feedback
const handlePlantWatered = (plantId: string) => {
  showToastMessage('Plante arrosée 💧')
  // Logique d'arrosage...
}

const handleActionAdded = (plantId: string, action: string) => {
  const actionLabels: Record<string, string> = {
    fertilize: 'Fertilisation ajoutée 🌿',
    prune: 'Taille programmée ✂️',
    treat: 'Traitement appliqué 🛡️'
  }
  showToastMessage(actionLabels[action] || 'Action ajoutée ✅')
}

const handlePlantHarvested = (plantId: string) => {
  showToastMessage('Récolte enregistrée 🌾')
}

const handleNoteAdded = (note: any) => {
  showToastMessage('Note ajoutée au carnet 📝')
}

const handleNoteEdited = (id: string, note: any) => {
  showToastMessage('Note modifiée ✏️')
}

const handleNoteDeleted = (id: string) => {
  showToastMessage('Note supprimée 🗑️')
}

// Fonction utilitaire pour les toasts
const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
/* Masquer la scrollbar sur les onglets mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Animations personnalisées */
@keyframes fade-in-50 {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-from-bottom-2 {
  from {
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-in {
  animation-fill-mode: both;
}

.fade-in-50 {
  animation: fade-in-50 0.3s ease-out;
}

.slide-in-from-bottom-2 {
  animation: slide-in-from-bottom-2 0.3s ease-out;
}
</style> 