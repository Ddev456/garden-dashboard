<template>
  <!-- Drawer mobile pour filtres -->
  <Drawer v-model:open="open" direction="bottom">
    <DrawerContent class="max-h-[85vh]">
      <DrawerHeader>
        <DrawerTitle class="flex items-center gap-2">
          <SettingsIcon class="w-5 h-5" />
          Filtres et navigation
        </DrawerTitle>
        <DrawerDescription>
          Personnalisez l'affichage de votre calendrier
        </DrawerDescription>
      </DrawerHeader>

      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        <!-- Navigation mensuelle -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Navigation</h3>
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
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Filtres par zone - Version mobile optimisée -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Zones du jardin</h3>
          
          <!-- Boutons de zones pour mobile -->
          <div class="space-y-3">
            <Button
              :variant="selectedZones.length === 0 ? 'default' : 'outline'"
              size="sm"
              @click="toggleAllZones"
              class="w-full justify-start"
            >
              <div class="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              Toutes les zones
            </Button>
            
            <div class="grid grid-cols-2 gap-2">
              <Button
                v-for="zone in zones"
                :key="zone.id"
                :variant="selectedZones.includes(zone.id) ? 'default' : 'outline'"
                size="sm"
                @click="toggleZone(zone.id)"
                class="justify-start text-xs"
              >
                <div 
                  class="w-3 h-3 rounded-full mr-2 border border-gray-200"
                  :style="{ backgroundColor: zone.color }"
                ></div>
                {{ zone.name }}
              </Button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Options d'affichage -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Options d'affichage</h3>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-2">
                <MoonIcon class="w-4 h-4 text-gray-600" />
                <span class="text-sm font-medium">Phases lunaires</span>
              </div>
              <input
                type="checkbox"
                v-model="showLunarPhases"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-2">
                <LayoutGridIcon class="w-4 h-4 text-gray-600" />
                <span class="text-sm font-medium">Vue compacte</span>
              </div>
              <input
                type="checkbox"
                v-model="compactView"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-2">
                <SunIcon class="w-4 h-4 text-gray-600" />
                <span class="text-sm font-medium">Surligner week-ends</span>
              </div>
              <input
                type="checkbox"
                v-model="highlightWeekends"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Statistiques du mois -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Statistiques du mois</h3>
          
          <div class="grid grid-cols-2 gap-3">
            <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div class="text-2xl font-bold text-blue-600">{{ monthlyStats.total }}</div>
              <div class="text-xs text-blue-700">Tâches prévues</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div class="text-2xl font-bold text-green-600">{{ monthlyStats.zones }}</div>
              <div class="text-xs text-green-700">Zones actives</div>
            </div>
          </div>

          <!-- Répartition par type de tâche -->
          <div v-if="taskTypeStats.length > 0" class="space-y-2">
            <div class="text-sm font-medium text-gray-600">Répartition des tâches</div>
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="stat in taskTypeStats.slice(0, 4)" 
                :key="stat.type"
                class="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
              >
                <div class="flex items-center gap-2">
                  <component :is="getTaskIcon(stat.type)" class="w-3 h-3" />
                  <span>{{ getTaskTypeLabel(stat.type) }}</span>
                </div>
                <span class="font-medium">{{ stat.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200"></div>

        <!-- Actions rapides -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Actions rapides</h3>
          
          <div class="grid grid-cols-2 gap-2">
            <Button variant="default" size="sm" class="justify-start" @click="$emit('add-task')">
              <PlusIcon class="w-4 h-4 mr-2" />
              Ajouter
            </Button>
            <Button variant="outline" size="sm" class="justify-start">
              <DownloadIcon class="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" class="justify-start">
              <RefreshCwIcon class="w-4 h-4 mr-2" />
              Sync
            </Button>
            <Button variant="outline" size="sm" class="justify-start">
              <SettingsIcon class="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </div>

      <DrawerFooter>
        <Button @click="open = false" class="w-full">
          Appliquer les filtres
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

import { 
  SettingsIcon,
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

const open = defineModel<boolean>('open', { required: true })
const currentDate = defineModel<Date>('currentDate', { required: true })
const selectedZones = defineModel<string[]>('selectedZones', { required: true })
const showLunarPhases = defineModel<boolean>('showLunarPhases', { required: true })
const compactView = defineModel<boolean>('compactView', { default: false })
const highlightWeekends = defineModel<boolean>('highlightWeekends', { default: false })

defineEmits<{
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