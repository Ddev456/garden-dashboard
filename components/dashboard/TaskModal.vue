<!-- components/dashboard/TaskModal.vue -->
<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ task ? 'Modifier la tâche' : 'Nouvelle tâche' }}</DialogTitle>
        <DialogDescription>
          {{ task ? 'Modifiez les détails de la tâche' : 'Ajoutez une nouvelle tâche à votre jardin' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Titre</Label>
          <Input
            id="title"
            v-model="formData.title"
            placeholder="Ex: Planter les tomates"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="formData.description"
            placeholder="Décrivez la tâche en détail..."
            rows="3"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="priority">Priorité</Label>
            <Select v-model="formData.priority">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haute">Haute</SelectItem>
                <SelectItem value="moyenne">Moyenne</SelectItem>
                <SelectItem value="basse">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="assignee">Assigné à</Label>
            <Select v-model="formData.assigneeId">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un jardinier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="user in mockUsers"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="dueDate">Date d'échéance</Label>
          <Input
            id="dueDate"
            v-model="formData.dueDate"
            type="date"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:isOpen', false)">
            Annuler
          </Button>
          <Button type="submit">
            {{ task ? 'Mettre à jour' : 'Créer' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task'
import { mockUsers } from '~/mocks/data'

const props = defineProps<{
  isOpen: boolean
  task?: Task | null
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'submit': [task: Partial<Task>]
}>()

const formData = ref({
  title: '',
  description: '',
  priority: 'moyenne' as const,
  assigneeId: '',
  dueDate: ''
})

// Remplir le formulaire si on modifie une tâche existante
watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = {
      title: newTask.title,
      description: newTask.description || '',
      priority: newTask.priority,
      assigneeId: newTask.assigneeId,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : ''
    }
  } else {
    // Réinitialiser le formulaire
    formData.value = {
      title: '',
      description: '',
      priority: 'moyenne',
      assigneeId: '',
      dueDate: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', {
    ...formData.value,
    dueDate: formData.value.dueDate ? new Date(formData.value.dueDate) : undefined
  })
  emit('update:isOpen', false)
}
</script> 