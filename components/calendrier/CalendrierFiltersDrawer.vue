<template>
  <!-- Desktop: Drawer latéral -->
  <Drawer v-model:open="open" :direction="isDesktop ? 'left' : 'bottom'">
    <DrawerContent :class="isDesktop ? 'h-full w-80 rounded-none' : 'max-h-[80vh]'">
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
            class="w-full"
          >
            <CalendarIcon class="w-4 h-4 mr-2" />
            Aujourd'hui
          </Button>
        </div>

        <div class="border-t border-gray-200 my-4"></div>

        <!-- Filtres par zone -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Zones à afficher</h3>
          
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input
                id="all-zones"
                type="checkbox"
                :checked="selectedZones.length === 0"
                @change="toggleAllZones"
                class="rounded border-gray-300"
              />
              <label for="all-zones" class="font-medium">
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
                :checked="selectedZones.includes(zone.id)"
                @change="(e) => toggleZone(zone.id, (e.target as HTMLInputElement).checked)"
                class="rounded border-gray-300"
              />
              <div class="flex items-center gap-2 flex-1">
                <div 
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: zone.color }"
                ></div>
                <label :for="zone.id" class="flex-1">
                  {{ zone.name }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 my-4"></div>

        <!-- Options d'affichage -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Options d'affichage</h3>
          
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <input
                id="lunar-phases"
                type="checkbox"
                v-model="showLunarPhases"
                class="rounded border-gray-300"
              />
              <label for="lunar-phases" class="flex items-center gap-2">
                <MoonIcon class="w-4 h-4" />
                Phases lunaires
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="compact-view"
                type="checkbox"
                v-model="compactView"
                class="rounded border-gray-300"
              />
              <label for="compact-view" class="flex items-center gap-2">
                <LayoutGridIcon class="w-4 h-4" />
                Vue compacte
              </label>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 my-4"></div>

        <!-- Statistiques -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Statistiques du mois</h3>
          
          <div class="grid grid-cols-2 gap-3">
            <Card class="p-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ monthlyStats.total }}</div>
                <div class="text-xs text-gray-600">Tâches</div>
              </div>
            </Card>
            <Card class="p-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ monthlyStats.zones }}</div>
                <div class="text-xs text-gray-600">Zones actives</div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Actions rapides</h3>
          
          <div class="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" class="justify-start">
              <PlusIcon class="w-4 h-4 mr-2" />
              Ajouter une tâche
            </Button>
            <Button variant="outline" size="sm" class="justify-start">
              <DownloadIcon class="w-4 h-4 mr-2" />
              Exporter le calendrier
            </Button>
            <Button variant="outline" size="sm" class="justify-start">
              <RefreshCwIcon class="w-4 h-4 mr-2" />
              Synchroniser
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
import { computed, ref } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useMediaQuery } from '@vueuse/core'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { 
  SettingsIcon,
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MoonIcon,
  CalendarIcon,
  LayoutGridIcon,
  PlusIcon,
  DownloadIcon,
  RefreshCwIcon
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

// Détection desktop/mobile
const isDesktop = useMediaQuery('(min-width: 768px)')

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
</script> 