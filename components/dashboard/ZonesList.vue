<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="zone in zones"
      :key="zone.id"
      class="relative bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group hover:shadow-lg"
    >
      <!-- En-tête de la zone -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div 
            class="w-4 h-4 rounded-full flex-shrink-0"
            :style="{ backgroundColor: zone.color }"
          ></div>
          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-gray-900 group-hover:text-primary truncate">{{ zone.name }}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">{{ zone.description }}</p>
          </div>
        </div>
        <img :src="zone.icon" :alt="zone.name" class="w-8 h-8 flex-shrink-0" />
      </div>

      <!-- Informations de la zone -->
      <div class="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" class="text-xs">{{ zone.surface }}</Badge>
        <Badge variant="secondary" class="text-xs">{{ zone.soilType }}</Badge>
      </div>

      <!-- Itinéraires actifs -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Itinéraires actifs</span>
          <span class="text-xs text-gray-500">{{ zone.itineraries.length }}</span>
        </div>
        
        <div v-if="zone.itineraries.length > 0" class="flex flex-wrap gap-1">
          <div 
            v-for="itinerary in zone.itineraries.slice(0, 2)" 
            :key="itinerary.id"
            class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs"
          >
            <img :src="itinerary.icon" :alt="itinerary.name" class="w-3 h-3" />
            <span class="text-primary truncate max-w-16">{{ itinerary.name }}</span>
          </div>
          <div v-if="zone.itineraries.length > 2" class="text-xs text-gray-400 px-2 py-1">
            +{{ zone.itineraries.length - 2 }}
          </div>
        </div>
        <div v-else class="text-xs text-gray-400 italic">Aucun itinéraire</div>
      </div>

      <!-- Tooltip -->
      <TooltipProvider>
        <Tooltip :delayDuration="300">
          <TooltipTrigger as-child>
            <div class="absolute inset-0 cursor-pointer" @click="router.push(`/zones/${zone.id}`)">
              <!-- Bouton info visible uniquement sur mobile -->
              <button 
                class="md:hidden absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
                @click.stop
              >
                <Info class="w-5 h-5" />
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            class="w-[20rem] bg-white border border-primary/20 rounded-lg shadow-lg p-4 transition-all duration-300"
            :side="'right'"
            :sideOffset="5"
          >
            <div class="space-y-4">
              <!-- En-tête du tooltip -->
              <div class="flex items-start gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: zone.color + '20' }"
                >
                  <img :src="zone.icon" :alt="zone.name" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="font-semibold text-primary">{{ zone.name }}</h4>
                  <p class="text-sm text-gray-600">{{ zone.description }}</p>
                </div>
              </div>

              <!-- Caractéristiques -->
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="space-y-1">
                  <div class="text-gray-500">Surface</div>
                  <div class="font-medium text-primary">{{ zone.surface }}</div>
                </div>
                <div class="space-y-1">
                  <div class="text-gray-500">Sol</div>
                  <div class="font-medium text-primary">{{ zone.soilType }}</div>
                </div>
                <div class="space-y-1">
                  <div class="text-gray-500">Exposition</div>
                  <div class="font-medium text-primary">{{ zone.sunExposure }}</div>
                </div>
                <div class="space-y-1">
                  <div class="text-gray-500">Irrigation</div>
                  <div class="font-medium text-primary">{{ zone.irrigationType }}</div>
                </div>
              </div>

              <!-- Itinéraires -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Itinéraires actifs</span>
                  <span class="text-xs text-gray-500">{{ zone.itineraries.length }}</span>
                </div>
                <div v-if="zone.itineraries.length > 0" class="flex flex-wrap gap-1">
                  <div 
                    v-for="itinerary in zone.itineraries.slice(0, 3)" 
                    :key="itinerary.id"
                    class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs"
                  >
                    <img :src="itinerary.icon" :alt="itinerary.name" class="w-3 h-3" />
                    <span class="text-primary truncate max-w-16">{{ itinerary.name }}</span>
                  </div>
                  <div v-if="zone.itineraries.length > 3" class="text-xs text-gray-400 px-2 py-1">
                    +{{ zone.itineraries.length - 3 }}
                  </div>
                </div>
                <div v-else class="flex items-center gap-1 text-amber-400">
                  <MessageCircleWarning class="w-4 h-4" />
                  <span class="text-xs">Aucun itinéraire disponible</span>
                </div>
              </div>

            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGarden } from '@/composables/useGarden';
import { useAssistant } from '@/composables/useAssistant';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { MessageCircleWarning, Info } from 'lucide-vue-next';

const router = useRouter();
const { currentZones } = useGarden();

// Utilisation des zones du jardin actuel
const zones = computed(() => currentZones.value);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

