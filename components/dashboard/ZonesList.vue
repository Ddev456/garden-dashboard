<template>
  <Carousel class="w-full">
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem
        v-for="zone in zones"
        :key="zone.id"
        class="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
      >
        <div class="relative bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:cursor-pointer border-2 border-transparent hover:border-primary hover:border-dashed min-w-[250px] max-w-xs mx-auto">
          <!-- Bouton favori -->
          <button class="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500" @click.stop="toggleFavorite(zone)">
            <Star :fill="zone.favorite ? 'currentColor' : 'none'" class="w-6 h-6" />
          </button>
          <h2 class="text-primary text-lg font-medium mb-1">{{ zone.name }}</h2>
          <img v-if="zone.image" :src="zone.image" :alt="zone.name" class="w-full h-40 object-cover rounded-md mb-2" />
          <div v-else class="w-full h-40 bg-gray-100 rounded-md mb-2 border-2 border-dashed border-gray-300"></div>
          <!-- Badges tags -->
          <div class="flex flex-wrap gap-1 mb-2">
            <Badge v-for="tag in zone.tags" :key="tag" variant="secondary">{{ tag }}</Badge>
          </div>
          <!-- Description tronquée avec tooltip shadcn -->
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <p class="mt-1 text-sm text-gray-500 line-clamp-2 cursor-pointer">
                {{ zone.description }}
              </p>
            </TooltipTrigger>
            <TooltipContent class="max-w-xs">
              {{ zone.description }}
              <p>Plantes de la zone : {{ zone.plantsCount }}</p>
              <div class="flex flex-wrap gap-1">
                <div class="p-2 bg-gray-100 rounded-[0.8rem]" v-for="plant in zone.plants" :key="plant">
                  <img :src="plant" :alt="plant" class="w-6 h-6" />
                </div>
                <div v-if="zone.plantsCount === 0" class="flex items-center gap-1 text-amber-400">
                  <MessageCircleWarning class="w-6 h-6" />
                  <span>Aucune plante ajoutée</span>
                </div>
              </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <!-- Statistiques et actions -->
          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs text-gray-400">{{ zone.plantsCount }} plantes</span>
            <button class="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Voir détails
            </button>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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

const toggleFavorite = (zone: any) => {
  zone.favorite = !zone.favorite;
};

const zones = ref([
  {
    id: '1',
    name: 'Zone de culture 1',
    image: '/images/zone1.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "muscat". Cette zone est idéale pour les cultures précoces et bénéficie d\'un microclimat favorable.',
    tags: ['Serre', 'Bio'],
    plantsCount: 3,
    favorite: false,
    plants: ["/icons/plants/zucchini.svg", "/icons/plants/tomatoes.svg", "/icons/plants/beans.svg" ]
  },
  {
    id: '2',
    name: 'Zone de culture 2',
    image: '/images/zone2.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "cabernet sauvignon". Sol riche et bien drainé, parfait pour les légumes racines.',
    tags: ['Extérieur', 'Argileux'],
    plantsCount: 4,
    favorite: false,
    plants: ["/icons/plants/tomato.svg", "/icons/plants/pumpkin.svg", "/icons/plants/sweet-potato.svg", "/icons/plants/turnip.svg" ]
  },
  {
    id: '3',
    name: 'Zone de culture 3',
    image: '/images/zone3.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "pinot noir". Zone ombragée, idéale pour les plantes aromatiques et les salades.',
    tags: ['Ombre', 'Aromatiques'],
    plantsCount: 4,
    favorite: false,
    plants: ["/icons/plants/tomato.svg", "/icons/plants/pumpkin.svg", "/icons/plants/sweet-potato.svg", "/icons/plants/turnip.svg" ]
  },
  {
    id: '4',
    name: 'Zone de culture 1',
    image: null,
    description: 'Parcelle dans la serre avec la vigne type "muscat"',
    tags: ['Serre'],
    plantsCount: 2,
    favorite: false,
    plants: ["/icons/plants/tomatoes.svg", "/icons/plants/beans.svg" ]
  },
  {
    id: '5',
    name: 'Zone de culture 2',
    image: '/images/zone2.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "cabernet sauvignon"',
    tags: ['Extérieur'],
    plantsCount: 0,
    favorite: false,
  },
  {
    id: '6',
    name: 'Zone de culture 3',
    image: '/images/zone3.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "pinot noir"',
    tags: ['Ombre'],
    plantsCount: 0,
    favorite: false,
  },
  {
    id: '7',
    name: 'Zone de culture 1',
    image: '/images/zone1.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "muscat"',
    tags: ['Serre'],
    plantsCount: 0,
    favorite: false,
  },
  {
    id: '8',
    name: 'Zone de culture 2',
    image: '/images/zone2.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "cabernet sauvignon"',
    tags: ['Extérieur'],
    plantsCount: 0,
    favorite: false,
  },
  {
    id: '9',
    name: 'Zone de culture 3',
    image: '/images/zone3.jpeg',
    description: 'Parcelle dans la serre avec la vigne type "pinot noir"',
    tags: ['Ombre'],
    plantsCount: 0,
    favorite: false,
  },
]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

