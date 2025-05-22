<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="itinerary in itineraries" :key="itinerary.id">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Card class="bg-primary/10 cursor-pointer" @click="goToItinerary(itinerary.id)">
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <img :src="itinerary.icon" :alt="itinerary.name" class="w-6 h-6" />
                  {{ itinerary.name }}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-sm text-gray-500">{{ itinerary.description }}</div>
                <div class="mt-2 text-xs text-gray-400">(Cliquer pour voir la chronologie complète)</div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent class="bg-white text-primary p-4 rounded-lg shadow-lg">
            <div>
              <div class="font-semibold">{{ itinerary.name }}</div>
              <div class="text-xs text-gray-500 mb-1">{{ itinerary.description }}</div>
              <ul v-if="itinerary.steps" class="text-xs list-disc pl-4">
                <li v-for="(step, idx) in itinerary.steps.slice(0, 4)" :key="idx">{{ step }}</li>
              </ul>
              <div v-else class="text-xs text-gray-400">Aperçu non disponible</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

defineProps<{ itineraries: any[] }>()

const router = useRouter()
function goToItinerary(id: string) {
  // Placeholder navigation
  router.push(`/itineraires/${id}`)
}
</script> 