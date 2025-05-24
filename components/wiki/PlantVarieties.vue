<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">Variétés disponibles</h3>
    <div v-if="plant.varieties?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        v-for="variety in plant.varieties" 
        :key="variety.id"
        class="hover:shadow-md transition-shadow"
      >
        <CardContent class="p-6">
          <div class="flex items-start justify-between mb-3">
            <h4 class="font-semibold text-lg">{{ variety.name }}</h4>
            <Badge :variant="getDifficultyVariant(variety.difficulty)">
              {{ variety.difficulty }}
            </Badge>
          </div>
          <p class="text-gray-600 mb-4">{{ variety.description }}</p>
          
          <div class="space-y-3">
            <div>
              <span class="font-medium text-gray-700">Temps de récolte :</span>
              <span class="ml-2 text-gray-600">{{ variety.harvestTime }}</span>
            </div>
            
            <div>
              <span class="font-medium text-gray-700">Caractéristiques :</span>
              <ul class="mt-1 space-y-1">
                <li 
                  v-for="char in variety.characteristics" 
                  :key="char"
                  class="text-sm text-gray-600 flex items-center gap-2"
                >
                  <div class="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  {{ char }}
                </li>
              </ul>
            </div>
            
            <div v-if="variety.specialFeatures?.length">
              <span class="font-medium text-gray-700">Particularités :</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="feature in variety.specialFeatures" 
                  :key="feature"
                  class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <SproutIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>Aucune variété spécifique répertoriée pour cette plante.</p>
      <p class="text-sm mt-2">La variété standard convient parfaitement pour débuter.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SproutIcon } from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
}

defineProps<Props>()

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}
</script> 