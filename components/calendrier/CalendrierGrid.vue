<template>
  <!-- Vue Desktop/Tablet - Grille mensuelle -->
  <Card class="bg-white hidden md:block shadow-sm border-gray-200 rounded-xl overflow-hidden">
    <CardHeader class="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <CardTitle class="text-xl font-semibold flex items-center gap-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <CalendarIcon class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div class="text-gray-900">{{ formatCurrentMonth }}</div>
            <div class="text-sm font-normal text-gray-600">{{ calendarDays.filter(d => d.isCurrentMonth && d.tasks.length > 0).length }} jours avec tâches</div>
          </div>
        </CardTitle>
        
        <!-- Navigation intégrée -->
        <div class="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            @click="previousMonth"
            class="bg-white/80 hover:bg-white"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            @click="goToToday"
            class="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            Aujourd'hui
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            @click="nextMonth"
            class="bg-white/80 hover:bg-white"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <!-- En-têtes des jours de la semaine -->
      <div class="grid grid-cols-7 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div 
          v-for="day in weekDays" 
          :key="day"
          class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
        >
          {{ day }}
        </div>
      </div>

      <!-- Grille du calendrier -->
      <div class="grid grid-cols-7">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
            props.compactView ? 'min-h-[120px]' : 'min-h-[150px]',
            'border-r border-b border-gray-200 p-4 relative',
            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50/50',
            day.isToday ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-sm' : '',
            day.isWeekend && props.highlightWeekends ? 'bg-gradient-to-br from-orange-50 to-orange-100' : '',
            'hover:bg-gray-50 transition-all duration-200 cursor-pointer group'
          ]"
          @click="selectDay(day)"
        >
          <!-- Numéro du jour -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span 
                :class="[
                  'text-sm font-semibold transition-all',
                  day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                  day.isToday ? 'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md' : ''
                ]"
              >
                {{ day.date.getDate() }}
              </span>
              
              <!-- Indicateur de tâches -->
              <div v-if="day.tasks.length > 0" class="flex items-center gap-1">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-xs text-gray-500 font-medium">{{ day.tasks.length }}</span>
              </div>
            </div>
            
            <!-- Phase lunaire (si activée) -->
            <div v-if="showLunarPhases && day.isCurrentMonth" class="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
              {{ getLunarPhase(day.date) }}
            </div>
          </div>

          <!-- Tâches du jour -->
          <div class="space-y-1.5">
            <div
              v-for="task in day.tasks.slice(0, 4)"
              :key="task.id"
              :class="[
                'text-xs p-2 rounded-md cursor-pointer hover:opacity-80 transition-all',
                getTaskColorClass(task.type),
                'border-l-3 shadow-sm'
              ]"
              :style="{ borderLeftColor: getZoneColor(task.zoneId) }"
              @click.stop="selectTask(task)"
            >
              <div class="flex items-center gap-1.5 mb-1">
                <component 
                  :is="getTaskIcon(task.type)" 
                  class="w-3 h-3 flex-shrink-0" 
                />
                <span class="truncate font-medium">{{ task.title }}</span>
              </div>
              <div v-if="task.plantName" class="text-xs opacity-75 truncate">
                {{ task.plantName }}
              </div>
            </div>
            
            <!-- Indicateur de tâches supplémentaires -->
            <div 
              v-if="day.tasks.length > 4"
              class="text-xs text-gray-500 text-center py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
              @click.stop="selectDay(day)"
            >
              +{{ day.tasks.length - 4 }} autres tâches
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Vue Mobile - Liste des jours -->
  <div class="md:hidden space-y-4">

    <!-- Navigation par semaine -->
    <Card class="bg-white shadow-sm border-gray-200 rounded-xl">
      <CardContent class="p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-gray-900">Semaines du mois</h3>
          <span class="text-sm text-gray-500">{{ formatCurrentMonth }}</span>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button
            v-for="week in weekNavigation"
            :key="week.start.toISOString()"
            :variant="week.isCurrent ? 'default' : 'outline'"
            size="sm"
            class="flex-shrink-0"
            @click="currentWeek = week"
          >
            {{ week.label }}
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Liste des jours de la semaine courante -->
    <div class="space-y-3">
              <div
          v-for="day in currentWeekDays"
          :key="day.date.toISOString()"
          :class="[
            'bg-white rounded-xl border transition-all shadow-sm hover:shadow-md',
            day.isToday ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100' : 'border-gray-200',
            day.tasks.length > 0 ? 'ring-1 ring-blue-100' : ''
          ]"
        >
        <!-- En-tête du jour -->
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                  day.isToday ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                ]"
              >
                {{ day.date.getDate() }}
              </div>
              <div>
                <div class="font-medium text-gray-900">
                  {{ format(day.date, 'EEEE', { locale: fr }) }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ format(day.date, 'd MMMM', { locale: fr }) }}
                </div>
              </div>
            </div>
            
            <!-- Phase lunaire mobile -->
            <div v-if="showLunarPhases" class="text-2xl">
              {{ getLunarPhase(day.date) }}
            </div>
          </div>
        </div>

        <!-- Tâches du jour -->
        <div v-if="day.tasks.length > 0" class="p-4 space-y-3">
          <div
            v-for="task in day.tasks"
            :key="task.id"
            :class="[
              'p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all',
              getTaskColorClass(task.type)
            ]"
            :style="{ borderLeftColor: getZoneColor(task.zoneId) }"
            @click="selectTask(task)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <component 
                    :is="getTaskIcon(task.type)" 
                    class="w-4 h-4 flex-shrink-0" 
                  />
                  <span class="font-medium text-sm">{{ task.title }}</span>
                  <Badge :variant="getPriorityVariant(task.priority)" class="text-xs">
                    {{ task.priority }}
                  </Badge>
                </div>
                
                <div class="space-y-1">
                  <div v-if="task.plantName" class="flex items-center gap-2 text-sm text-gray-600">
                    <img 
                      v-if="task.plantIcon"
                      :src="task.plantIcon" 
                      :alt="task.plantName"
                      class="w-4 h-4"
                    />
                    {{ task.plantName }}
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
              </div>
              
              <ChevronRightIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        <!-- Jour sans tâches -->
        <div v-else class="p-4 text-center text-gray-500 text-sm">
          Aucune tâche prévue
        </div>
      </div>
    </div>
  </div>

  <!-- Drawer de détails -->
  <CalendrierDetailsDrawer
    v-model:open="showDetailsDrawer"
    :selected-task="selectedTask"
    :selected-day="selectedDay"
    @select-task="selectTask"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth,
  parseISO,
  addWeeks,
  startOfDay,
  eachWeekOfInterval,
  addMonths,
  subMonths
} from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CalendrierDetailsDrawer from './CalendrierDetailsDrawer.vue'
import { 
  CalendarIcon,
  DropletIcon,
  SproutIcon,
  ScissorsIcon,
  SparklesIcon,
  ShieldIcon,
  PackageIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import { type CalendarTask } from '~/mocks/data'

interface Props {
  currentDate: Date
  selectedZones: string[]
  showLunarPhases: boolean
  highlightWeekends?: boolean
  compactView?: boolean
  tasks: CalendarTask[]
}

const props = defineProps<Props>()

// États pour les drawers
const showDetailsDrawer = ref(false)
const selectedTask = ref<CalendarTask | null>(null)
const selectedDay = ref<any>(null)

// État pour la navigation mobile
const currentWeek = ref<any>(null)

// Jours de la semaine
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Formatage du mois actuel
const formatCurrentMonth = computed(() => {
  return format(props.currentDate, 'MMMM yyyy', { locale: fr })
})

// Émissions
const emit = defineEmits<{
  'update:currentDate': [date: Date]
}>()

// Navigation
const previousMonth = () => {
  const newDate = subMonths(props.currentDate, 1)
  emit('update:currentDate', newDate)
}

const nextMonth = () => {
  const newDate = addMonths(props.currentDate, 1)
  emit('update:currentDate', newDate)
}

const goToToday = () => {
  emit('update:currentDate', new Date())
}

// Génération des jours du calendrier (desktop)
const calendarDays = computed(() => {
  const monthStart = startOfMonth(props.currentDate)
  const monthEnd = endOfMonth(props.currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  
  return days.map(date => {
    const dayTasks = props.tasks.filter(task => {
      try {
        const taskDate = parseISO(task.date)
        return isSameDay(taskDate, date)
      } catch {
        return false
      }
    })

    return {
      date,
      isCurrentMonth: isSameMonth(date, props.currentDate),
      isToday: isSameDay(date, new Date()),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      tasks: dayTasks
    }
  })
})

// Navigation par semaine (mobile)
const weekNavigation = computed(() => {
  const monthStart = startOfMonth(props.currentDate)
  const monthEnd = endOfMonth(props.currentDate)
  const weeks = eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 }
  )
  
  const today = new Date()
  
  return weeks.map((weekStart, index) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 })
    const isCurrent = isSameDay(weekStart, startOfWeek(today, { weekStartsOn: 1 }))
    
    return {
      start: weekStart,
      end: weekEnd,
      label: `Sem. ${index + 1}`,
      isCurrent
    }
  })
})

// Initialiser la semaine courante
if (!currentWeek.value && weekNavigation.value.length > 0) {
  currentWeek.value = weekNavigation.value.find(w => w.isCurrent) || weekNavigation.value[0]
}

// Jours de la semaine courante (mobile)
const currentWeekDays = computed(() => {
  if (!currentWeek.value) return []
  
  const days = eachDayOfInterval({
    start: currentWeek.value.start,
    end: currentWeek.value.end
  })
  
  return days.map(date => {
    const dayTasks = props.tasks.filter(task => {
      try {
        const taskDate = parseISO(task.date)
        return isSameDay(taskDate, date)
      } catch {
        return false
      }
    })

    return {
      date,
      isCurrentMonth: isSameMonth(date, props.currentDate),
      isToday: isSameDay(date, new Date()),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      tasks: dayTasks
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

const getLunarPhase = (date: Date) => {
  const day = date.getDate()
  if (day <= 7) return '🌑'
  if (day <= 14) return '🌓'
  if (day <= 21) return '🌕'
  return '🌗'
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
  selectedTask.value = task
  selectedDay.value = null
  showDetailsDrawer.value = true
}

const selectDay = (day: any) => {
  selectedDay.value = day
  selectedTask.value = null
  showDetailsDrawer.value = true
}
</script> 