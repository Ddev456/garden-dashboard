<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header compact -->
    <CalendrierHeader 
      :show-header="showHeader"
      @toggle-header="showHeader = !showHeader"
      @toggle-filters="toggleFilters"
      @toggle-sidebar="showSidebar = !showSidebar"
      @add-task="handleAddTask"
    />
    
    <!-- Layout principal avec sidebar intégrée -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex gap-6">
        <!-- Contenu principal -->
        <div class="flex-1 space-y-6">
          <!-- Navigation rapide (mobile uniquement) -->
          <CalendrierQuickNav
            v-if="!isDesktop"
            :current-date="currentDate"
            :selected-zones="selectedZones"
            :zones="availableZones"
            @previous-month="previousMonth"
            @next-month="nextMonth"
            @go-to-today="goToToday"
            @toggle-filters="toggleFilters"
            @add-task="handleAddTask"
          />
          
          <!-- Calendrier principal -->
          <CalendrierGrid 
            :current-date="currentDate"
            :selected-zones="selectedZones"
            :show-lunar-phases="showLunarPhases"
            :highlight-weekends="highlightWeekends"
            :compact-view="compactView"
            :tasks="filteredTasks"
            @update:current-date="currentDate = $event"
          />
          
          <!-- Légende et informations Desktop (optionnel) -->
          <CalendrierLegend v-if="showLegend" class="hidden md:block" />
        </div>

        <!-- Sidebar intégrée desktop -->
        <CalendrierSidebar
          v-if="isDesktop && showSidebar"
          v-model:current-date="currentDate"
          v-model:selected-zones="selectedZones"
          v-model:show-lunar-phases="showLunarPhases"
          v-model:compact-view="compactView"
          v-model:highlight-weekends="highlightWeekends"
          :zones="availableZones"
          @toggle-sidebar="showSidebar = false"
          @add-task="handleAddTask"
        />
      </div>
    </div>

    <!-- Drawer mobile pour filtres -->
    <CalendrierMobileFilters
      v-model:open="showMobileFilters"
      v-model:current-date="currentDate"
      v-model:selected-zones="selectedZones"
      v-model:show-lunar-phases="showLunarPhases"
      v-model:compact-view="compactView"
      v-model:highlight-weekends="highlightWeekends"
      :zones="availableZones"
      @add-task="handleAddTask"
    />

    <!-- Formulaire de tâche -->
    <CalendrierTaskForm
      v-model:open="showTaskForm"
      :zones="availableZones"
      :task="selectedTaskForEdit"
      :selected-date="selectedDateForTask"
      @save-task="handleSaveTask"
      @update-task="handleUpdateTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useCalendarKeyboard } from '~/composables/useCalendarKeyboard'
import { mockZones, mockCalendarTasks, type CalendarTask } from '~/mocks/data'
import CalendrierSidebar from '~/components/calendrier/CalendrierSidebar.vue'
import CalendrierMobileFilters from '~/components/calendrier/CalendrierMobileFilters.vue'
import CalendrierQuickNav from '~/components/calendrier/CalendrierQuickNav.vue'
import CalendrierTaskForm from '~/components/calendrier/CalendrierTaskForm.vue'

// Meta données de la page
definePageMeta({
  title: 'Calendrier de jardinage'
})

// Détection desktop/mobile
const isDesktop = useMediaQuery('(min-width: 1024px)')

// États réactifs
const currentDate = ref(new Date())
const selectedZones = ref<string[]>([])
const showLunarPhases = ref(false)
const showHeader = ref(true)
const showSidebar = ref(true)
const showMobileFilters = ref(false)
const showTaskForm = ref(false)
const showLegend = ref(false)
const compactView = ref(false)
const highlightWeekends = ref(false)
const selectedTaskForEdit = ref<CalendarTask | null>(null)
const selectedDateForTask = ref<Date | null>(null)

// Données disponibles
const availableZones = computed(() => mockZones)

// Tâches filtrées par zones sélectionnées
const filteredTasks = computed(() => {
  if (selectedZones.value.length === 0) {
    return mockCalendarTasks
  }
  return mockCalendarTasks.filter((task: CalendarTask) => 
    selectedZones.value.includes(task.zoneId)
  )
})

// Fonctions
const handleAddTask = (date?: Date) => {
  selectedTaskForEdit.value = null
  selectedDateForTask.value = date || new Date()
  showTaskForm.value = true
}

const handleEditTask = (task: CalendarTask) => {
  selectedTaskForEdit.value = task
  selectedDateForTask.value = null
  showTaskForm.value = true
}

const handleSaveTask = (taskData: any) => {
  // TODO: Implémenter la sauvegarde de tâche
  console.log('Sauvegarder tâche:', taskData)
  // Ici on ajouterait la tâche aux données mockées ou on ferait un appel API
}

const handleUpdateTask = (taskId: string, taskData: any) => {
  // TODO: Implémenter la mise à jour de tâche
  console.log('Mettre à jour tâche:', taskId, taskData)
  // Ici on mettrait à jour la tâche dans les données mockées ou on ferait un appel API
}

const toggleFilters = () => {
  if (isDesktop.value) {
    showSidebar.value = !showSidebar.value
  } else {
    showMobileFilters.value = true
  }
}

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
}

// Raccourcis clavier
useCalendarKeyboard({
  onPreviousMonth: previousMonth,
  onNextMonth: nextMonth,
  onToday: goToToday,
  onAddTask: () => handleAddTask(),
  onToggleFilters: toggleFilters,
  onToggleSidebar: () => {
    if (isDesktop.value) {
      showSidebar.value = !showSidebar.value
    }
  }
})
</script> 