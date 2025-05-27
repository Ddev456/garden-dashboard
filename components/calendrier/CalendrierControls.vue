<template>
  <Card class="bg-white">
    <CardHeader>
      <CardTitle class="text-lg flex items-center gap-2">
        <SettingsIcon class="w-5 h-5" />
        Filtres et navigation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Navigation mensuelle -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Navigation</label>
          <div class="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              @click="previousMonth"
              class="flex-shrink-0"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </Button>
            <div class="flex-1 text-center font-medium">
              {{ formatCurrentMonth }}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              @click="nextMonth"
              class="flex-shrink-0"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            @click="goToToday"
            class="w-full text-xs"
          >
            Aujourd'hui
          </Button>
        </div>

        <!-- Filtres par zone -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Zones à afficher</label>
          <div class="space-y-2 max-h-32 overflow-y-auto">
            <div class="flex items-center space-x-2">
              <input
                id="all-zones"
                type="checkbox"
                :checked="selectedZones.length === 0"
                @change="toggleAllZones"
                class="rounded border-gray-300"
              />
              <label for="all-zones" class="text-sm font-medium">
                Toutes les zones
              </label>
            </div>
            <div 
              v-for="zone in zones" 
              :key="zone.id"
              class="flex items-center space-x-2"
            >
              <input
                :id="zone.id"
                type="checkbox"
                :value="zone.id"
                v-model="selectedZones"
                class="rounded border-gray-300"
              />
              <div class="flex items-center gap-2">
                <div 
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: zone.color }"
                ></div>
                <label :for="zone.id" class="text-sm">
                  {{ zone.name }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Options d'affichage -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Options d'affichage</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <input
                id="lunar-phases"
                type="checkbox"
                v-model="showLunarPhases"
                class="rounded border-gray-300"
              />
              <label for="lunar-phases" class="text-sm flex items-center gap-1">
                <MoonIcon class="w-4 h-4" />
                Phases lunaires
              </label>
            </div>
            
            <!-- Statistiques rapides -->
            <div class="pt-2 border-t border-gray-200">
              <div class="text-xs text-gray-500 mb-1">Ce mois-ci</div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="bg-blue-50 p-2 rounded">
                  <div class="font-medium text-blue-700">{{ monthlyStats.total }}</div>
                  <div class="text-blue-600">Tâches</div>
                </div>
                <div class="bg-green-50 p-2 rounded">
                  <div class="font-medium text-green-700">{{ monthlyStats.zones }}</div>
                  <div class="text-green-600">Zones actives</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  SettingsIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MoonIcon 
} from 'lucide-vue-next'
import { mockCalendarTasks, type CalendarTask } from '~/mocks/data'

interface Zone {
  id: string
  name: string
  color: string
  description?: string
  area?: number
}

const props = defineProps<{
  zones: Zone[]
}>()

const currentDate = defineModel<Date>('currentDate', { required: true })
const selectedZones = defineModel<string[]>('selectedZones', { required: true })
const showLunarPhases = defineModel<boolean>('showLunarPhases', { required: true })

// Navigation
const formatCurrentMonth = computed(() => {
  return format(currentDate.value, 'MMMM yyyy', { locale: fr })
})

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

// Gestion des zones
const toggleAllZones = () => {
  if (selectedZones.value.length === 0) {
    selectedZones.value = props.zones.map(z => z.id)
  } else {
    selectedZones.value = []
  }
}

// Statistiques du mois
const monthlyStats = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(currentDate.value)
  
  const monthlyTasks = mockCalendarTasks.filter((task: CalendarTask) => {
    try {
      const taskDate = parseISO(task.date)
      return isWithinInterval(taskDate, { start: monthStart, end: monthEnd })
    } catch {
      return false
    }
  })

  const activeZones = new Set(monthlyTasks.map(task => task.zoneId))

  return {
    total: monthlyTasks.length,
    zones: activeZones.size
  }
})
</script> 