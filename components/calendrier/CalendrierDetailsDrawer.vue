<template>
  <!-- Drawer pour les détails -->
  <Drawer v-model:open="open" :direction="isDesktop ? 'right' : 'bottom'">
    <DrawerContent :class="isDesktop ? 'h-full w-96 rounded-none ml-auto' : 'max-h-[85vh]'">
      <DrawerHeader>
        <DrawerTitle class="flex items-center gap-2">
          <component 
            v-if="selectedTask"
            :is="getTaskIcon(selectedTask.type)" 
            class="w-5 h-5" 
          />
          <CalendarIcon v-else class="w-5 h-5" />
          {{ title }}
        </DrawerTitle>
        <DrawerDescription v-if="description">
          {{ description }}
        </DrawerDescription>
      </DrawerHeader>

      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        <!-- Détails d'une tâche -->
        <div v-if="selectedTask" class="space-y-4">
          <!-- Informations principales -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <span class="text-sm font-medium text-gray-500">Type</span>
              <div class="flex items-center gap-2">
                <component :is="getTaskIcon(selectedTask.type)" class="w-4 h-4" />
                <span class="text-sm">{{ getTaskTypeLabel(selectedTask.type) }}</span>
              </div>
            </div>
            
            <div class="space-y-1">
              <span class="text-sm font-medium text-gray-500">Priorité</span>
              <Badge :variant="getPriorityVariant(selectedTask.priority)" class="w-fit">
                {{ selectedTask.priority }}
              </Badge>
            </div>
            
            <div class="space-y-1">
              <span class="text-sm font-medium text-gray-500">Zone</span>
              <div class="flex items-center gap-2">
                <div 
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: getZoneColor(selectedTask.zoneId) }"
                ></div>
                <span class="text-sm">{{ selectedTask.zoneName }}</span>
              </div>
            </div>
            
            <div v-if="selectedTask.duration" class="space-y-1">
              <span class="text-sm font-medium text-gray-500">Durée</span>
              <div class="flex items-center gap-1">
                <ClockIcon class="w-4 h-4 text-gray-400" />
                <span class="text-sm">{{ selectedTask.duration }} min</span>
              </div>
            </div>
          </div>

          <!-- Plante associée -->
          <div v-if="selectedTask.plantName" class="p-4 bg-green-50 rounded-lg border border-green-200">
            <div class="flex items-center gap-3">
              <img 
                v-if="selectedTask.plantIcon"
                :src="selectedTask.plantIcon" 
                :alt="selectedTask.plantName"
                class="w-8 h-8"
              />
              <div>
                <div class="font-medium text-green-900">{{ selectedTask.plantName }}</div>
                <div class="text-sm text-green-700">Plante concernée</div>
              </div>
            </div>
          </div>

          <!-- Date et heure -->
          <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <CalendarIcon class="w-4 h-4 text-blue-600" />
              <span class="font-medium text-blue-900">Planification</span>
            </div>
            <div class="text-sm text-blue-700">
              {{ formatTaskDate(selectedTask.date) }}
            </div>
          </div>

          <!-- Notes -->
          <div v-if="selectedTask.notes" class="space-y-2">
            <span class="text-sm font-medium text-gray-500">Notes</span>
            <div class="p-3 bg-gray-50 rounded-lg border">
              <p class="text-sm text-gray-700">{{ selectedTask.notes }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <span class="text-sm font-medium text-gray-500">Actions</span>
            <div class="grid grid-cols-1 gap-2">
              <Button variant="outline" size="sm" class="justify-start">
                <CheckIcon class="w-4 h-4 mr-2" />
                Marquer comme terminé
              </Button>
              <Button variant="outline" size="sm" class="justify-start">
                <EditIcon class="w-4 h-4 mr-2" />
                Modifier la tâche
              </Button>
              <Button variant="outline" size="sm" class="justify-start text-red-600 hover:text-red-700">
                <TrashIcon class="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <!-- Détails d'un jour -->
        <div v-else-if="selectedDay" class="space-y-4">
          <!-- Résumé du jour -->
          <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div 
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    selectedDay.isToday ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ selectedDay.date.getDate() }}
                </div>
                <div>
                  <div class="font-medium">{{ format(selectedDay.date, 'EEEE', { locale: fr }) }}</div>
                  <div class="text-sm text-gray-500">{{ format(selectedDay.date, 'd MMMM yyyy', { locale: fr }) }}</div>
                </div>
              </div>
              <Badge variant="secondary">
                {{ selectedDay.tasks.length }} tâche{{ selectedDay.tasks.length > 1 ? 's' : '' }}
              </Badge>
            </div>
          </div>

          <!-- Liste des tâches du jour -->
          <div v-if="selectedDay.tasks.length > 0" class="space-y-3">
            <span class="text-sm font-medium text-gray-500">Tâches prévues</span>
            <div class="space-y-2">
              <div
                v-for="task in selectedDay.tasks"
                :key="task.id"
                :class="[
                  'p-3 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 transition-colors',
                  getTaskColorClass(task.type)
                ]"
                :style="{ borderLeftColor: getZoneColor(task.zoneId) }"
                @click="selectTask(task)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <component 
                        :is="getTaskIcon(task.type)" 
                        class="w-4 h-4" 
                      />
                      <span class="font-medium text-sm">{{ task.title }}</span>
                      <Badge :variant="getPriorityVariant(task.priority)" class="text-xs">
                        {{ task.priority }}
                      </Badge>
                    </div>
                    
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                      <div class="flex items-center gap-1">
                        <div 
                          class="w-2 h-2 rounded-full"
                          :style="{ backgroundColor: getZoneColor(task.zoneId) }"
                        ></div>
                        {{ task.zoneName }}
                      </div>
                      <span v-if="task.duration">• {{ task.duration }}min</span>
                    </div>
                  </div>
                  <ChevronRightIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          <!-- Jour sans tâches -->
          <div v-else class="text-center py-8">
            <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-500 font-medium">Aucune tâche prévue</p>
            <p class="text-sm text-gray-400 mt-1">Profitez de cette journée libre !</p>
          </div>

          <!-- Actions pour le jour -->
          <div class="space-y-2">
            <span class="text-sm font-medium text-gray-500">Actions</span>
            <div class="grid grid-cols-1 gap-2">
              <Button variant="outline" size="sm" class="justify-start">
                <PlusIcon class="w-4 h-4 mr-2" />
                Ajouter une tâche
              </Button>
              <Button variant="outline" size="sm" class="justify-start">
                <CopyIcon class="w-4 h-4 mr-2" />
                Copier depuis un autre jour
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DrawerFooter>
        <Button @click="open = false" variant="outline" class="w-full">
          Fermer
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO } from 'date-fns'
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
import { Badge } from '@/components/ui/badge'

import { 
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  CopyIcon,
  ChevronRightIcon,
  DropletIcon,
  SproutIcon,
  ScissorsIcon,
  SparklesIcon,
  ShieldIcon,
  PackageIcon,
  EyeIcon
} from 'lucide-vue-next'

import { type CalendarTask } from '~/mocks/data'

interface Props {
  selectedTask?: CalendarTask | null
  selectedDay?: any | null
}

const props = defineProps<Props>()

const open = defineModel<boolean>('open', { required: true })

// Détection desktop/mobile
const isDesktop = useMediaQuery('(min-width: 768px)')

// Émissions
const emit = defineEmits<{
  'select-task': [task: CalendarTask]
}>()

// Titre et description dynamiques
const title = computed(() => {
  if (props.selectedTask) {
    return props.selectedTask.title
  }
  if (props.selectedDay) {
    return format(props.selectedDay.date, 'EEEE d MMMM', { locale: fr })
  }
  return 'Détails'
})

const description = computed(() => {
  if (props.selectedTask) {
    return `${props.selectedTask.zoneName} • ${getTaskTypeLabel(props.selectedTask.type)}`
  }
  if (props.selectedDay) {
    const count = props.selectedDay.tasks.length
    return count > 0 ? `${count} tâche${count > 1 ? 's' : ''} prévue${count > 1 ? 's' : ''}` : 'Aucune tâche prévue'
  }
  return ''
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

const getTaskColorClass = (type: string) => {
  switch (type) {
    case 'arrosage': return 'bg-blue-50 text-blue-800 border-blue-200'
    case 'plantation': return 'bg-green-50 text-green-800 border-green-200'
    case 'taille': return 'bg-orange-50 text-orange-800 border-orange-200'
    case 'fertilisation': return 'bg-purple-50 text-purple-800 border-purple-200'
    case 'traitement': return 'bg-red-50 text-red-800 border-red-200'
    case 'récolte': return 'bg-yellow-50 text-yellow-800 border-yellow-200'
    case 'observation': return 'bg-gray-50 text-gray-800 border-gray-200'
    default: return 'bg-gray-50 text-gray-800 border-gray-200'
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

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'haute': return 'destructive'
    case 'moyenne': return 'secondary'
    case 'basse': return 'outline'
    default: return 'outline'
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

const formatTaskDate = (dateStr: string) => {
  try {
    const date = parseISO(dateStr)
    return format(date, 'EEEE d MMMM yyyy', { locale: fr })
  } catch {
    return dateStr
  }
}

const selectTask = (task: CalendarTask) => {
  emit('select-task', task)
}
</script> 