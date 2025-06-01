<!-- pages/zones/[id].vue -->
<template>
  <div v-if="!zoneDetail" class="text-center py-12">
    <div class="text-gray-400 mb-4">
      <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
        <span class="text-2xl">🏞️</span>
      </div>
    </div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-2">Zone non trouvée</h1>
    <p class="text-gray-600 mb-6">La zone demandée n'existe pas ou n'est plus disponible.</p>
    <Button variant="outline" @click="$router.go(-1)">
      Retour
    </Button>
  </div>

  <div v-else class="space-y-4 md:space-y-6 pb-20 md:pb-6">
    <!-- En-tête avec informations principales - Optimisé mobile -->
    <div class="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-start">
      <div class="space-y-1 min-w-0 flex-1">
        <h1 class="text-xl md:text-2xl font-semibold text-primary truncate">{{ zoneDetail.name }}</h1>
        <p class="text-xs md:text-sm text-gray-500">Zone du {{ currentGarden.name }}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <Button 
          variant="outline" 
          size="sm" 
          @click="toggleFavorite"
          class="transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Star 
            fill="none" 
            class="w-4 h-4 mr-1 md:mr-2 transition-colors"
          />
          <span class="hidden sm:inline">Ajouter aux favoris</span>
          <span class="sm:hidden">☆</span>
        </Button>
        <Button 
          variant="default" 
          size="sm"
          class="transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <NotebookPenIcon class="w-4 h-4 mr-1 md:mr-2" />
          <span class="hidden sm:inline">Modifier</span>
          <span class="sm:hidden">✏️</span>
        </Button>
      </div>
    </div>

    <!-- Image et informations générales - Layout responsive amélioré -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Zone principale avec image -->
      <div class="lg:col-span-2">
        <Card class="overflow-hidden">
          <div class="relative h-48 md:h-64 bg-gradient-to-br from-green-100 to-green-200">
            <div class="absolute inset-0 flex items-center justify-center">
              <img :src="zoneDetail.image" alt="Zone" class="w-full h-full object-cover" />
            </div>
            <div class="absolute bottom-4 left-4 right-4">
              <p class="text-sm md:text-base text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                {{ zoneDetail.description }}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Informations détaillées de la zone -->
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
    <Tabs default-value="itineraries" class="w-full">
      <!-- Navigation des onglets - Scroll horizontal sur mobile -->
      <div class="relative">
        <TabsList class="flex gap-1 w-full overflow-x-auto scrollbar-hide p-1 bg-secondary/50 rounded-lg">
          <TabsTrigger 
            value="itineraries" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <img src="/icons/culture-path.svg" alt="Itinéraires" class="w-4 h-4 mr-1 md:mr-2">
            <span class="hidden sm:inline">Itinéraires</span>
            <span class="sm:hidden">Itinéraires</span>
          </TabsTrigger>
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
            value="journal" 
            class="flex-shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <img src="/icons/journal.svg" alt="Carnet" class="w-4 h-4 mr-1 md:mr-2">
            <span class="hidden sm:inline">Carnet</span>
            <span class="sm:hidden">Carnet</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <!-- Contenu des onglets -->
      <div class="mt-4 md:mt-6">
        <!-- Onglet Itinéraires -->
        <TabsContent value="itineraries" class="mt-0">
          <ZoneItinerariesTab :itineraries="zoneDetail.itineraries" />
        </TabsContent>

        <!-- Onglet Plantes -->
        <TabsContent value="plants" class="mt-0">
          <ZonePlantsTab 
            :plants="[]"
            @watered="handlePlantWatered"
            @action-added="handleActionAdded"
            @harvested="handlePlantHarvested"
          />
        </TabsContent>

        <!-- Onglet Historique -->
        <TabsContent value="history" class="mt-0">
          <ZoneHistoryTab :history="[]" />
        </TabsContent>

        <!-- Onglet Carnet -->
        <TabsContent value="journal" class="mt-0">
          <ZoneJournalTab :journal="[]" />
        </TabsContent>
      </div>
    </Tabs>

    <!-- Toast de notification UX -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 right-4 z-50 transform transition-all duration-500 ease-out bg-primary text-white rounded-lg px-4 py-3 shadow-lg"
      :class="showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
    >
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span class="text-sm font-medium">{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, NotebookPenIcon } from 'lucide-vue-next'
import { useGarden } from '@/composables/useGarden'
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

const route = useRoute()
const zoneId = route.params.id as string
const { getZone, currentGarden } = useGarden()

// Récupération de la zone depuis le nouveau système de données
const zoneDetail = computed(() => getZone(zoneId))

// États pour les feedbacks UX
const showToast = ref(false)
const toastMessage = ref('')

const toggleFavorite = () => {
  showToastMessage('Fonctionnalité à venir')
}

// Fonction pour afficher les messages toast
const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
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