<template>
  <!-- Drawer pour ajouter/éditer une tâche -->
  <Drawer v-model:open="open" :direction="isDesktop ? 'right' : 'bottom'">
    <DrawerContent :class="isDesktop ? 'h-full w-96 rounded-none ml-auto' : 'max-h-[90vh]'">
      <DrawerHeader>
        <DrawerTitle class="flex items-center gap-2">
          <PlusIcon v-if="!task" class="w-5 h-5" />
          <EditIcon v-else class="w-5 h-5" />
          {{ task ? 'Modifier la tâche' : 'Nouvelle tâche' }}
        </DrawerTitle>
        <DrawerDescription>
          {{ task ? 'Modifiez les détails de votre tâche' : 'Ajoutez une nouvelle tâche à votre calendrier' }}
        </DrawerDescription>
      </DrawerHeader>

      <form @submit.prevent="handleSubmit" class="flex flex-col h-full">
        <div class="p-6 space-y-6 overflow-y-auto flex-1">
          <!-- Titre de la tâche -->
          <div class="space-y-2">
            <label for="task-title" class="text-sm font-medium text-gray-700">
              Titre de la tâche *
            </label>
            <input
              id="task-title"
              v-model="formData.title"
              type="text"
              required
              placeholder="Ex: Arroser les tomates"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Type de tâche -->
          <div class="space-y-2">
            <label for="task-type" class="text-sm font-medium text-gray-700">
              Type de tâche *
            </label>
            <select
              id="task-type"
              v-model="formData.type"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un type</option>
              <option value="arrosage">🚿 Arrosage</option>
              <option value="plantation">🌱 Plantation</option>
              <option value="taille">✂️ Taille</option>
              <option value="fertilisation">✨ Fertilisation</option>
              <option value="traitement">🛡️ Traitement</option>
              <option value="récolte">📦 Récolte</option>
              <option value="observation">👁️ Observation</option>
            </select>
          </div>

          <!-- Date et heure -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="task-date" class="text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                id="task-date"
                v-model="formData.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="space-y-2">
              <label for="task-time" class="text-sm font-medium text-gray-700">
                Heure
              </label>
              <input
                id="task-time"
                v-model="formData.time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Zone -->
          <div class="space-y-2">
            <label for="task-zone" class="text-sm font-medium text-gray-700">
              Zone du jardin *
            </label>
            <select
              id="task-zone"
              v-model="formData.zoneId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner une zone</option>
              <option 
                v-for="zone in zones" 
                :key="zone.id" 
                :value="zone.id"
              >
                {{ zone.name }}
              </option>
            </select>
          </div>

          <!-- Plante (optionnel) -->
          <div class="space-y-2">
            <label for="task-plant" class="text-sm font-medium text-gray-700">
              Plante concernée
            </label>
            <input
              id="task-plant"
              v-model="formData.plantName"
              type="text"
              placeholder="Ex: Tomates cerises"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Priorité -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Priorité</label>
            <div class="flex gap-2">
              <Button
                type="button"
                :variant="formData.priority === 'basse' ? 'default' : 'outline'"
                size="sm"
                @click="formData.priority = 'basse'"
                class="flex-1"
              >
                Basse
              </Button>
              <Button
                type="button"
                :variant="formData.priority === 'moyenne' ? 'default' : 'outline'"
                size="sm"
                @click="formData.priority = 'moyenne'"
                class="flex-1"
              >
                Moyenne
              </Button>
              <Button
                type="button"
                :variant="formData.priority === 'haute' ? 'destructive' : 'outline'"
                size="sm"
                @click="formData.priority = 'haute'"
                class="flex-1"
              >
                Haute
              </Button>
            </div>
          </div>

          <!-- Durée estimée -->
          <div class="space-y-2">
            <label for="task-duration" class="text-sm font-medium text-gray-700">
              Durée estimée (minutes)
            </label>
            <input
              id="task-duration"
              v-model.number="formData.duration"
              type="number"
              min="5"
              max="480"
              step="5"
              placeholder="30"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Notes -->
          <div class="space-y-2">
            <label for="task-notes" class="text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="task-notes"
              v-model="formData.notes"
              rows="3"
              placeholder="Ajoutez des notes ou instructions spécifiques..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Récurrence (future feature) -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Récurrence</label>
            <div class="flex items-center space-x-2">
              <input
                id="task-recurring"
                v-model="formData.isRecurring"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="task-recurring" class="text-sm text-gray-600">
                Répéter cette tâche
              </label>
            </div>
            <div v-if="formData.isRecurring" class="ml-6 space-y-2">
              <select
                v-model="formData.recurringType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
                <option value="seasonal">Saisonnière</option>
              </select>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div class="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              @click="open = false"
              class="flex-1"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              class="flex-1"
              :disabled="!isFormValid"
            >
              {{ task ? 'Modifier' : 'Ajouter' }}
            </Button>
          </div>
        </DrawerFooter>
      </form>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { format } from 'date-fns'
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

import { PlusIcon, EditIcon } from 'lucide-vue-next'

import { type CalendarTask } from '~/mocks/data'

interface Zone {
  id: string
  name: string
  color: string
  description?: string
  area?: number
}

interface TaskFormData {
  title: string
  type: string
  date: string
  time: string
  zoneId: string
  plantName: string
  priority: 'basse' | 'moyenne' | 'haute'
  duration: number | null
  notes: string
  isRecurring: boolean
  recurringType: 'daily' | 'weekly' | 'monthly' | 'seasonal'
}

const props = defineProps<{
  zones: Zone[]
  task?: CalendarTask | null
  selectedDate?: Date | null
}>()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  'save-task': [task: TaskFormData]
  'update-task': [id: string, task: TaskFormData]
}>()

// Détection desktop/mobile
const isDesktop = useMediaQuery('(min-width: 768px)')

// Données du formulaire
const formData = ref<TaskFormData>({
  title: '',
  type: '',
  date: '',
  time: '',
  zoneId: '',
  plantName: '',
  priority: 'moyenne',
  duration: null,
  notes: '',
  isRecurring: false,
  recurringType: 'weekly'
})

// Validation du formulaire
const isFormValid = computed(() => {
  return formData.value.title.trim() !== '' &&
         formData.value.type !== '' &&
         formData.value.date !== '' &&
         formData.value.zoneId !== ''
})

// Initialiser le formulaire avec les données de la tâche ou la date sélectionnée
watch([() => props.task, () => props.selectedDate, open], () => {
  if (open.value) {
    if (props.task) {
      // Mode édition
      formData.value = {
        title: props.task.title,
        type: props.task.type,
        date: props.task.date,
        time: '', // TODO: extraire l'heure de la date
        zoneId: props.task.zoneId,
        plantName: props.task.plantName || '',
        priority: props.task.priority,
        duration: props.task.duration || null,
        notes: props.task.notes || '',
        isRecurring: false,
        recurringType: 'weekly'
      }
    } else {
      // Mode création
      const defaultDate = props.selectedDate || new Date()
      formData.value = {
        title: '',
        type: '',
        date: format(defaultDate, 'yyyy-MM-dd'),
        time: '',
        zoneId: '',
        plantName: '',
        priority: 'moyenne',
        duration: null,
        notes: '',
        isRecurring: false,
        recurringType: 'weekly'
      }
    }
  }
}, { immediate: true })

// Soumission du formulaire
const handleSubmit = () => {
  if (!isFormValid.value) return

  if (props.task) {
    emit('update-task', props.task.id, formData.value)
  } else {
    emit('save-task', formData.value)
  }
  
  open.value = false
}
</script> 