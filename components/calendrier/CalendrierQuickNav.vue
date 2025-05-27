<template>
  <!-- Navigation rapide mobile -->
  <Card class="bg-white shadow-sm border-gray-200 rounded-xl">
    <CardContent class="p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <CalendarIcon class="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ formatCurrentMonth }}</h2>
            <p class="text-sm text-gray-600">{{ monthlyTasksCount }} tâches ce mois</p>
          </div>
        </div>
        
        <!-- Actions rapides -->
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="$emit('toggle-filters')">
            <SettingsIcon class="w-4 h-4" />
          </Button>
          <Button variant="default" size="sm" @click="$emit('add-task')">
            <PlusIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <!-- Navigation mensuelle -->
      <div class="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          @click="$emit('previous-month')"
          class="flex-shrink-0"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          @click="$emit('go-to-today')"
          class="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <CalendarIcon class="w-4 h-4 mr-2" />
          Aujourd'hui
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          @click="$emit('next-month')"
          class="flex-shrink-0"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
      </div>
      
      <!-- Zones actives (aperçu) -->
      <div v-if="selectedZones.length > 0" class="mt-4 flex flex-wrap gap-2">
        <div 
          v-for="zone in activeZones" 
          :key="zone.id"
          class="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs"
        >
          <div 
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: zone.color }"
          ></div>
          {{ zone.name }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { 
  CalendarIcon,
  SettingsIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'

interface Zone {
  id: string
  name: string
  color: string
  description?: string
  area?: number
}

const props = defineProps<{
  currentDate: Date
  selectedZones: string[]
  zones: Zone[]
}>()

defineEmits<{
  'previous-month': []
  'next-month': []
  'go-to-today': []
  'toggle-filters': []
  'add-task': []
}>()

// Formatage du mois actuel
const formatCurrentMonth = computed(() => {
  return format(props.currentDate, 'MMMM yyyy', { locale: fr })
})

// Zones actives
const activeZones = computed(() => {
  if (props.selectedZones.length === 0) {
    return props.zones
  }
  return props.zones.filter(zone => props.selectedZones.includes(zone.id))
})

// Nombre de tâches du mois (placeholder)
const monthlyTasksCount = computed(() => {
  // TODO: Calculer le vrai nombre de tâches
  return Math.floor(Math.random() * 20) + 5
})
</script> 