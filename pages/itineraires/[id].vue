<template>
  <div class="max-w-3xl mx-auto py-8 space-y-8">
    <div class="flex items-center gap-4">
      <img :src="itinerary.icon" :alt="itinerary.name" class="size-10" />
      <div>
        <h1 class="text-2xl font-bold text-primary">{{ itinerary.name }}</h1>
        <p class="text-gray-500">{{ itinerary.description }}</p>
      </div>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Chronologie de culture</CardTitle>
      </CardHeader>
      <CardContent>
        <ol class="relative border-l-2 border-primary/30 ml-4">
          <li v-for="(step, idx) in itinerary.steps" :key="idx" class="mb-8 ml-6">
            <span class="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full ring-4 ring-white">{{ idx + 1 }}</span>
            <h3 class="font-semibold text-primary">{{ step }}</h3>
            <!-- Placeholder pour détails de l'étape -->
            <p class="text-xs text-gray-500 mt-1">Détail de l'étape à venir...</p>
          </li>
        </ol>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { mockZoneDetail } from '@/mocks/zoneDetails'

const route = useRoute()
const itineraryId = route.params.id as string
// Pour la démo, on récupère l'itinéraire dans le mock de la zone courante
const itinerary = ref(
  mockZoneDetail.itineraries?.find(i => i.id === itineraryId) || {
    name: 'Itinéraire inconnu',
    icon: '',
    description: '',
    steps: []
  }
)
</script> 