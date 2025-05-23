<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Générer des tâches automatiquement</DialogTitle>
        <DialogDescription>
          Voulez-vous créer automatiquement des tâches pour l'itinéraire "{{ itinerary?.name }}" ?
        </DialogDescription>
      </DialogHeader>
      
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium text-blue-900 mb-2">Tâches qui seront créées :</h4>
          <ul class="space-y-1 text-sm text-blue-800">
            <li v-for="task in previewTasks" :key="task.title" class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              {{ task.title }}
            </li>
          </ul>
        </div>
        
        <div class="flex items-center space-x-2">
          <input
            id="also-start"
            v-model="localAlsoStartItinerary"
            type="checkbox"
            class="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label for="also-start" class="text-sm font-medium">
            Démarrer également l'itinéraire
          </label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="handleCancel">
          Annuler
        </Button>
        <Button @click="handleConfirm">
          <Plus class="w-4 h-4 mr-2" />
          Créer les tâches
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

interface Task {
  id: string
  title: string
  description: string
  status: string
  dueDate: string
  priority: string
  relatedItinerary: string
  relatedStep: string
}

interface Itinerary {
  id: string
  name: string
  steps: Array<{
    id: string
    title: string
    description: string
    duration: string
    optimalPeriod: string
    completed: boolean
  }>
}

interface Props {
  open?: boolean
  itinerary?: Itinerary | null
  previewTasks?: Task[]
  alsoStartItinerary?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:alsoStartItinerary', value: boolean): void
  (e: 'confirm', payload: { itinerary: Itinerary; alsoStartItinerary: boolean }): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  itinerary: null,
  previewTasks: () => [],
  alsoStartItinerary: true
})

const emit = defineEmits<Emits>()

// Computed properties pour la liaison bidirectionnelle
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const localAlsoStartItinerary = computed({
  get: () => props.alsoStartItinerary,
  set: (value) => emit('update:alsoStartItinerary', value)
})

// Handlers
const handleConfirm = () => {
  if (props.itinerary) {
    emit('confirm', {
      itinerary: props.itinerary,
      alsoStartItinerary: props.alsoStartItinerary
    })
  }
}

const handleCancel = () => {
  emit('cancel')
  isOpen.value = false
}
</script> 