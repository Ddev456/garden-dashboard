<template>
  <div class="md:hidden space-y-4">
    <!-- Filtres rapides -->
    <Card class="bg-white">
      <CardContent class="p-4">
        <div class="space-y-4">
          <!-- Sélection rapide de zones -->
          <div>
            <label class="text-sm font-medium mb-2 block">Zones actives</label>
            <div class="flex flex-wrap gap-2">
              <Button
                :variant="selectedZones.length === 0 ? 'default' : 'outline'"
                size="sm"
                @click="toggleAllZones"
                class="text-xs"
              >
                Toutes
              </Button>
              <Button
                v-for="zone in zones"
                :key="zone.id"
                :variant="selectedZones.includes(zone.id) ? 'default' : 'outline'"
                size="sm"
                @click="toggleZone(zone.id)"
                class="text-xs flex items-center gap-1"
              >
                <div 
                  class="w-2 h-2 rounded-full"
                  :style="{ backgroundColor: zone.color }"
                ></div>
                {{ zone.name }}
              </Button>
            </div>
          </div>

          <!-- Options rapides -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <input
                id="lunar-phases-mobile"
                type="checkbox"
                v-model="showLunarPhases"
                class="rounded border-gray-300"
              />
              <label for="lunar-phases-mobile" class="text-sm flex items-center gap-1">
                <MoonIcon class="w-4 h-4" />
                Phases lunaires
              </label>
            </div>

            <!-- Statistiques rapides -->
            <div class="flex gap-2 text-xs">
              <div class="bg-blue-50 px-2 py-1 rounded">
                <span class="font-medium text-blue-700">{{ monthlyStats.total }}</span>
                <span class="text-blue-600 ml-1">tâches</span>
              </div>
              <div class="bg-green-50 px-2 py-1 rounded">
                <span class="font-medium text-green-700">{{ monthlyStats.zones }}</span>
                <span class="text-green-600 ml-1">zones</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Vue rapide des tâches du jour -->
    <Card v-if="todayTasks.length > 0" class="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent class="p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-medium text-gray-900 flex items-center gap-2">
            <CalendarIcon class="w-4 h-4" />
            Aujourd'hui
          </h3>
          <Badge variant="secondary" class="text-xs">
            {{ todayTasks.length }} tâche{{ todayTasks.length > 1 ? 's' : '' }}
          </Badge>
        </div>
        
        <div class="space-y-2">
          <div
            v-for="task in todayTasks.slice(0, 3)"
            :key="task.id"
            class="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200"
          >
            <component 
              :is="getTaskIcon(task.type)" 
              class="w-4 h-4 flex-shrink-0 text-gray-600" 
            />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium truncate">{{ task.title }}</div>
              <div class="text-xs text-gray-500">{{ task.zoneName }}</div>
            </div>
            <div 
              class="w-3 h-3 rounded-full flex-shrink-0"
              :style="{ backgroundColor: getZoneColor(task.zoneId) }"
            ></div>
          </div>
          
          <div v-if="todayTasks.length > 3" class="text-center">
            <Button variant="ghost" size="sm" class="text-xs">
              Voir {{ todayTasks.length - 3 }} autres tâches
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Actions rapides -->
    <Card class="bg-white">
      <CardContent class="p-4">
        <div class="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" class="flex items-center gap-2">
            <PlusIcon class="w-4 h-4" />
            Ajouter tâche
          </Button>
          <Button variant="outline" size="sm" class="flex items-center gap-2">
            <FilterIcon class="w-4 h-4" />
            Filtres avancés
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, isSameDay } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MoonIcon,
  CalendarIcon,
  PlusIcon,
  FilterIcon,
  DropletIcon,
  SproutIcon,
  ScissorsIcon,
  SparklesIcon,
  ShieldIcon,
  PackageIcon,
  EyeIcon
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
  currentDate: Date
}>()

const selectedZones = defineModel<string[]>('selectedZones', { required: true })
const showLunarPhases = defineModel<boolean>('showLunarPhases', { required: true })

// Gestion des zones
const toggleAllZones = () => {
  if (selectedZones.value.length === 0) {
    selectedZones.value = props.zones.map(z => z.id)
  } else {
    selectedZones.value = []
  }
}

const toggleZone = (zoneId: string) => {
  const index = selectedZones.value.indexOf(zoneId)
  if (index > -1) {
    selectedZones.value.splice(index, 1)
  } else {
    selectedZones.value.push(zoneId)
  }
}

// Statistiques du mois
const monthlyStats = computed(() => {
  const monthStart = startOfMonth(props.currentDate)
  const monthEnd = endOfMonth(props.currentDate)
  
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

// Tâches d'aujourd'hui
const todayTasks = computed(() => {
  const today = new Date()
  return mockCalendarTasks.filter((task: CalendarTask) => {
    try {
      const taskDate = parseISO(task.date)
      return isSameDay(taskDate, today)
    } catch {
      return false
    }
  })
})

// Fonctions utilitaires
const getTaskIcon = (type: string) => {
  switch (type) {
    case 'arrosage': return DropletIcon
    case 'plantation': return SproutIcon
    case 'taille': return ScissorsIcon
    case 'fertilisation': return SparklesIcon
    case 'traitement': return ShieldIcon
    case 'récolte': return PackageIcon
    case 'observation': return EyeIcon
    default: return CalendarIcon
  }
}

const getZoneColor = (zoneId: string) => {
  const zoneColors: Record<string, string> = {
    'zone-1': '#10b981',
    'zone-2': '#3b82f6',
    'zone-3': '#8b5cf6',
    'zone-4': '#f59e0b'
  }
  return zoneColors[zoneId] || '#6b7280'
}
</script> 