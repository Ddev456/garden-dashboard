<template>
  <!-- Sidebar intégrée pour desktop -->
  <div class="hidden lg:flex lg:flex-col lg:w-80 lg:bg-gradient-to-b lg:from-gray-50 lg:to-white lg:border lg:border-gray-200 lg:rounded-xl lg:shadow-sm lg:transition-all lg:duration-300">
    <div class="flex grow flex-col gap-y-4 overflow-y-auto p-6">
      <!-- Header du sidebar -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <SettingsIcon class="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Contrôles</h2>
            <p class="text-xs text-gray-500">Personnalisez votre vue</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          @click="$emit('toggle-sidebar')"
          class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <XIcon class="w-4 h-4" />
        </Button>
      </div>

      <!-- Navigation mensuelle -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <CalendarIcon class="w-4 h-4 text-blue-600" />
            Navigation
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              @click="previousMonth"
              class="flex-shrink-0"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </Button>
            <div class="flex-1 text-center">
              <div class="font-semibold text-gray-900">{{ formatCurrentMonth }}</div>
              <div class="text-xs text-gray-500">{{ monthlyStats.total }} tâches</div>
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
            class="w-full text-blue-600 hover:text-blue-700"
          >
            <CalendarIcon class="w-4 h-4 mr-2" />
            Aller à aujourd'hui
          </Button>
        </CardContent>
      </Card>

      <!-- Filtres par zone -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div class="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
            Zones du jardin
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input
                id="all-zones-sidebar"
                type="checkbox"
                :checked="selectedZones.length === 0"
                @change="toggleAllZones"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="all-zones-sidebar" class="font-medium text-sm">
                Toutes les zones
              </label>
            </div>
            
            <div 
              v-for="zone in zones" 
              :key="zone.id"
              class="flex items-center space-x-2"
            >
              <input
                :id="`zone-${zone.id}-sidebar`"
                type="checkbox"
                :checked="selectedZones.includes(zone.id)"
                @change="(e) => toggleZone(zone.id, (e.target as HTMLInputElement).checked)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div class="flex items-center gap-2 flex-1">
                <div 
                  class="w-3 h-3 rounded-full border border-gray-200"
                  :style="{ backgroundColor: zone.color }"
                ></div>
                <label :for="`zone-${zone.id}-sidebar`" class="flex-1 text-sm">
                  {{ zone.name }}
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Options d'affichage -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <LayoutGridIcon class="w-4 h-4 text-purple-600" />
            Affichage
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <input
                id="lunar-phases-sidebar"
                type="checkbox"
                v-model="showLunarPhases"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="lunar-phases-sidebar" class="flex items-center gap-2 text-sm">
                <MoonIcon class="w-4 h-4 text-gray-600" />
                Phases lunaires
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="compact-view-sidebar"
                type="checkbox"
                v-model="compactView"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="compact-view-sidebar" class="flex items-center gap-2 text-sm">
                <LayoutGridIcon class="w-4 h-4 text-gray-600" />
                Vue compacte
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="weekend-highlight-sidebar"
                type="checkbox"
                v-model="highlightWeekends"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="weekend-highlight-sidebar" class="flex items-center gap-2 text-sm">
                <SunIcon class="w-4 h-4 text-gray-600" />
                Surligner week-ends
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Statistiques détaillées -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div class="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
            Statistiques du mois
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div class="text-xl font-bold text-blue-600">{{ monthlyStats.total }}</div>
              <div class="text-xs text-blue-700">Tâches</div>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div class="text-xl font-bold text-green-600">{{ monthlyStats.zones }}</div>
              <div class="text-xs text-green-700">Zones actives</div>
            </div>
          </div>
          
          <!-- Répartition par type de tâche -->
          <div class="space-y-2">
            <div class="text-xs font-medium text-gray-600">Répartition des tâches</div>
            <div class="space-y-1">
              <div 
                v-for="stat in taskTypeStats" 
                :key="stat.type"
                class="flex items-center justify-between text-xs"
              >
                <div class="flex items-center gap-2">
                  <component :is="getTaskIcon(stat.type)" class="w-3 h-3" />
                  <span>{{ getTaskTypeLabel(stat.type) }}</span>
                </div>
                <span class="font-medium">{{ stat.count }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Actions rapides -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div class="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <Button variant="default" size="sm" class="w-full justify-start" @click="$emit('add-task')">
            <PlusIcon class="w-4 h-4 mr-2" />
            Ajouter une tâche
          </Button>
          <Button variant="outline" size="sm" class="w-full justify-start">
            <DownloadIcon class="w-4 h-4 mr-2" />
            Exporter le calendrier
          </Button>
          <Button variant="outline" size="sm" class="w-full justify-start">
            <RefreshCwIcon class="w-4 h-4 mr-2" />
            Synchroniser
          </Button>
          <Button variant="outline" size="sm" class="w-full justify-start">
            <SettingsIcon class="w-4 h-4 mr-2" />
            Paramètres avancés
          </Button>
        </CardContent>
      </Card>

      <!-- Raccourcis clavier -->
      <Card class="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div class="w-4 h-4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full"></div>
            Raccourcis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-1 text-xs text-gray-600">
            <div class="flex justify-between">
              <span>Mois précédent</span>
              <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs">←</kbd>
            </div>
            <div class="flex justify-between">
              <span>Mois suivant</span>
              <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs">→</kbd>
            </div>
            <div class="flex justify-between">
              <span>Aujourd'hui</span>
              <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs">T</kbd>
            </div>
            <div class="flex justify-between">
              <span>Ajouter tâche</span>
              <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs">N</kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { 
  SettingsIcon,
  XIcon,
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MoonIcon,
  CalendarIcon,
  LayoutGridIcon,
  SunIcon,
  PlusIcon,
  DownloadIcon,
  RefreshCwIcon,
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
}>()

const currentDate = defineModel<Date>('currentDate', { required: true })
const selectedZones = defineModel<string[]>('selectedZones', { required: true })
const showLunarPhases = defineModel<boolean>('showLunarPhases', { required: true })
const compactView = defineModel<boolean>('compactView', { default: false })
const highlightWeekends = defineModel<boolean>('highlightWeekends', { default: false })

defineEmits<{
  'toggle-sidebar': []
  'add-task': []
}>()

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

const toggleZone = (zoneId: string, checked: boolean | any) => {
  if (checked) {
    if (!selectedZones.value.includes(zoneId)) {
      selectedZones.value.push(zoneId)
    }
  } else {
    const index = selectedZones.value.indexOf(zoneId)
    if (index > -1) {
      selectedZones.value.splice(index, 1)
    }
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

// Statistiques par type de tâche
const taskTypeStats = computed(() => {
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

  const stats = monthlyTasks.reduce((acc, task) => {
    acc[task.type] = (acc[task.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(stats)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
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

const getTaskTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'arrosage': 'Arrosage',
    'plantation': 'Plantation',
    'taille': 'Taille',
    'fertilisation': 'Fertilisation',
    'traitement': 'Traitement',
    'récolte': 'Récolte',
    'observation': 'Observation'
  }
  return labels[type] || type
}
</script> 