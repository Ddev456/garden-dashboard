<template>
  <Carousel class="w-full">
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem
        v-for="zone in zones"
        :key="zone.id"
        class="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
      >
      <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
        <div @click="router.push(`/zones/${zone.id}`)" class="relative bg-white rounded-lg p-6 hover:shadow-xl hover:cursor-pointer border-2 border-transparent hover:border-primary hover:border-dashed min-w-[250px] max-w-xs mx-auto">
          <!-- Bouton favori -->
          <button class="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500" @click.stop="toggleFavorite(zone)">
            <Star fill="none" class="w-6 h-6" />
          </button>
          <h2 class="text-primary text-lg font-medium mb-1">{{ zone.name }}</h2>
          
          <!-- Zone visuelle avec couleur -->
          <div class="w-full h-40 rounded-md mb-2 relative overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
            <div class="absolute inset-0 flex items-center justify-center">
              <div 
                class="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                :style="{ backgroundColor: zone.color + '20', color: zone.color }"
              >
              <img :src="zone.icon" class="w-16 h-16" />
              </div>
            </div>
            <div class="absolute bottom-2 left-2 right-2">
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: zone.color }"
              ></div>
            </div>
          </div>
          
          <!-- Badges pour caractéristiques -->
          <div class="flex flex-wrap gap-1 mb-2">
            <Badge variant="secondary" class="text-xs">{{ zone.surface }}</Badge>
            <Badge variant="secondary" class="text-xs">{{ zone.soilType }}</Badge>
          </div>
          
          <!-- Description tronquée avec tooltip shadcn -->
          <p class="mt-1 text-sm text-gray-500 line-clamp-2 cursor-pointer">
            {{ zone.description }}
          </p>
            
          <!-- Statistiques et actions -->
          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs text-gray-400">{{ zone.itineraries.length }} itinéraires</span>
            <button class="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Voir détails
            </button>
          </div>
        </div>
      </TooltipTrigger>
            <TooltipContent class="w-[20rem] bg-white rounded-lg shadow-md p-4 transition-all duration-300 flex flex-col gap-6">
              <p class="text-sm text-primary">{{ zone.description }}</p>
              <div class="space-y-2">
                <p class="text-xs text-slate-500">Itinéraires disponibles : {{ zone.itineraries.length }}</p>
                <div class="text-xs text-slate-500">
                  <div><strong>Surface :</strong> {{ zone.surface }}</div>
                  <div><strong>Sol :</strong> {{ zone.soilType }}</div>
                  <div><strong>Exposition :</strong> {{ zone.sunExposure }}</div>
                  <div><strong>Irrigation :</strong> {{ zone.irrigationType }}</div>
                </div>
              </div>
              <div v-if="zone.itineraries.length > 0" class="flex flex-wrap gap-1">
                <div 
                  v-for="itinerary in zone.itineraries.slice(0, 3)" 
                  :key="itinerary.id"
                  class="p-2 bg-gray-100 rounded-[0.8rem] flex items-center gap-2"
                >
                  <img :src="itinerary.icon" :alt="itinerary.name" class="w-4 h-4" />
                  <span class="text-xs text-primary">{{ itinerary.name }}</span>
                </div>
                <div v-if="zone.itineraries.length > 3" class="text-xs text-gray-500 p-2">
                  +{{ zone.itineraries.length - 3 }} autres
                </div>
              </div>
              <div v-else class="flex items-center gap-1 text-amber-400">
                <MessageCircleWarning class="w-6 h-6" />
                <span>Aucun itinéraire disponible</span>
              </div>
            </TooltipContent>
            </Tooltip>
          </TooltipProvider>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGarden } from '@/composables/useGarden';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { MessageCircleWarning, Star } from 'lucide-vue-next';

const router = useRouter();
const { currentZones } = useGarden();

// Utilisation des zones du jardin actuel
const zones = computed(() => currentZones.value);

const toggleFavorite = (zone: any) => {
  // Fonctionnalité à implémenter plus tard
  console.log('Toggle favorite for zone:', zone.name);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

