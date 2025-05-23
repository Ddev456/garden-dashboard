<!-- pages/zones/[id].vue -->
<template>
  <div class="space-y-6">
    <!-- En-tête avec informations principales -->
    <div class="flex justify-between items-start">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-primary">{{ zoneDetail.name }}</h1>
        <p class="text-sm text-gray-500">Créée le {{ zoneDetail.createdAt }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="toggleFavorite">
          <Star :fill="zoneDetail.favorite ? 'currentColor' : 'none'" class="w-4 h-4 mr-2" />
          {{ zoneDetail.favorite ? 'Favori' : 'Ajouter aux favoris' }}
        </Button>
        <Button variant="default" size="sm">
          <PencilIcon class="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>
    </div>

    <!-- Image et informations générales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="md:col-span-2 bg-white">
        <CardContent class="p-8">
          <img 
            :src="zoneDetail.image" 
            :alt="zoneDetail.name"
            class="w-full h-[250px] object-cover rounded-xl"
          />
          <div class="p-6 space-y-4">
            <p class="text-gray-600">{{ zoneDetail.description }}</p>
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="tag in zoneDetail.tags" 
                :key="tag" 
                variant="secondary"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="bg-primary/10">
        <CardHeader>
          <CardTitle>Caractéristiques</CardTitle>
        </CardHeader>
        <CardContent>
          <dl class="space-y-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">Surface</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.surface }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Type de sol</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.soilType }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Exposition</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.sunExposure }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Irrigation</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.irrigationType }}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>

    <!-- Onglets pour le contenu détaillé -->
    <Tabs default-value="plants" class="w-full">
      <TabsList class="flex gap-2 w-full overflow-x-auto">
        <TabsTrigger value="plants" class="w-full">Plantes de la zone</TabsTrigger>
        <TabsTrigger value="history" class="w-full">Historique</TabsTrigger>
        <TabsTrigger value="itineraries" class="w-full">Itinéraires de cultures</TabsTrigger>
        <TabsTrigger value="journal" class="w-full">Carnet de bord</TabsTrigger>
      </TabsList>

      <!-- Onglet Plantes de la zone -->
      <TabsContent value="plants">
        <ZonePlantsTab :plants="zoneDetail.currentPlants" />
      </TabsContent>

      <!-- Onglet Historique -->
      <TabsContent value="history">
        <ZoneHistoryTab :history="zoneDetail.plantingHistory" />
      </TabsContent>

      <!-- Onglet Itinéraires de cultures -->
      <TabsContent value="itineraries">
        <ZoneItinerariesTab :itineraries="zoneDetail.itineraries || []" />
      </TabsContent>

      <!-- Onglet Carnet de bord (notes + environnement) -->
      <TabsContent value="journal">
        <ZoneJournalTab :journal="zoneDetail.journal || []" />
      </TabsContent>
    </Tabs>
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

const toggleFavorite = () => {
  zoneDetail.value.favorite = !zoneDetail.value.favorite
}
</script> 