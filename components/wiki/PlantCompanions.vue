<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">Associations de plantes</h3>
    <div v-if="plant.companions?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="companion in plant.companions" 
        :key="companion.plantId"
        :class="[
          'p-4 rounded-lg border-2 transition-colors hover:shadow-md cursor-pointer',
          companion.type === 'beneficial' ? 'bg-green-50 border-green-200 hover:border-green-300' :
          companion.type === 'neutral' ? 'bg-gray-50 border-gray-200 hover:border-gray-300' :
          'bg-red-50 border-red-200 hover:border-red-300'
        ]"
        @click="$emit('view-companion', companion.plantId)"
      >
        <div class="flex items-center gap-3 mb-3">
          <img :src="companion.plantIcon" :alt="companion.plantName" class="w-8 h-8" />
          <h4 class="font-semibold flex-1">{{ companion.plantName }}</h4>
          <Badge 
            :variant="companion.type === 'beneficial' ? 'secondary' : companion.type === 'neutral' ? 'outline' : 'destructive'"
            class="text-xs"
          >
            {{ getAssociationLabel(companion.type) }}
          </Badge>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ companion.benefit }}</p>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span><strong>Distance :</strong> {{ companion.distance }}</span>
          <div class="flex items-center gap-1">
            <AssociationIcon :type="companion.type" />
            <span class="capitalize">{{ companion.type }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <HeartHandshakeIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>Aucune association spécifique répertoriée pour cette plante.</p>
      <p class="text-sm mt-2">Cette plante peut généralement être cultivée seule sans problème.</p>
    </div>

    <!-- Section conseils d'association -->
    <div v-if="plant.companions?.length" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <InfoIcon class="w-4 h-4" />
        Conseils d'association
      </h4>
      <div class="space-y-2 text-sm text-blue-700">
        <p>• Les associations bénéfiques améliorent la croissance et repoussent les nuisibles</p>
        <p>• Respectez les distances recommandées pour éviter la concurrence</p>
        <p>• Évitez les associations négatives qui peuvent inhiber la croissance</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { HeartHandshakeIcon, InfoIcon, CheckIcon, XIcon, MinusIcon } from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
}

interface Emits {
  (e: 'view-companion', plantId: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const getAssociationLabel = (type: string) => {
  switch (type) {
    case 'beneficial': return 'Bénéfique'
    case 'neutral': return 'Neutre'
    case 'avoid': return 'À éviter'
    default: return type
  }
}

// Composant pour l'icône d'association
const AssociationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'beneficial':
      return h(CheckIcon, { class: 'w-3 h-3 text-green-600' })
    case 'neutral':
      return h(MinusIcon, { class: 'w-3 h-3 text-gray-600' })
    case 'avoid':
      return h(XIcon, { class: 'w-3 h-3 text-red-600' })
    default:
      return h(MinusIcon, { class: 'w-3 h-3 text-gray-600' })
  }
}
</script> 