<!-- components/dashboard/TaskList.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4" ref="taskContainer">
    <div v-for="col in columns" :key="col.name" class="bg-background rounded-lg p-4 border">
      <h3 class="font-semibold mb-4">{{ col.label }}</h3>
      <div class="space-y-2">
        <div
          v-for="task in col.tasks"
          :key="task.id"
          :data-swapy-slot="task.id"
          class="min-h-[56px] bg-muted/10 rounded-md"
        >
          <div
            :data-swapy-item="task.id"
            class="bg-card p-4 rounded-md cursor-move hover:shadow-md transition-shadow"
          >
            {{ task.title }}
          </div>
        </div>
        <!-- Slot vide pour permettre de déposer dans une colonne vide -->
        <div
          :data-swapy-slot="`${col.name}-empty`"
          class="min-h-[56px] rounded-md border-2 border-dashed border-muted/20"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { createSwapy } from 'swapy'

interface Task {
  id: string
  title: string
  status: 'todo' | 'inProgress' | 'done'
}

const rawTasks = ref<Task[]>([
  { id: '1', title: 'Planter les tomates', status: 'todo' },
  { id: '2', title: 'Arroser les plantes', status: 'inProgress' },
  { id: '3', title: 'Tailler les arbustes', status: 'done' },
])

const columns = computed(() => [
  { name: 'todo', label: 'À faire', tasks: rawTasks.value.filter(t => t.status === 'todo') },
  { name: 'inProgress', label: 'En cours', tasks: rawTasks.value.filter(t => t.status === 'inProgress') },
  { name: 'done', label: 'Terminé', tasks: rawTasks.value.filter(t => t.status === 'done') },
])

const taskContainer = ref<HTMLElement | null>(null)
const swapy = ref<ReturnType<typeof createSwapy> | null>(null)

onMounted(() => {
  if (taskContainer.value) {
    swapy.value = createSwapy(taskContainer.value, {
      animation: 'dynamic'
    })

    swapy.value.onSwap(event => {
      const newSlotItemMap = event.newSlotItemMap.asObject
      Object.entries(newSlotItemMap).forEach(([toSlot, itemId]) => {
        if (!itemId) return
        const task = rawTasks.value.find(t => t.id === itemId)
        if (task) {
          const newStatus = columns.value.find(col => 
            toSlot.startsWith(`${col.name}-`) || toSlot === task.id
          )?.name as Task['status']
          
          if (newStatus) {
            task.status = newStatus
            rawTasks.value = [...rawTasks.value]
          }
        }
      })
    })
  }
})

onUnmounted(() => {
  swapy.value?.destroy()
})
</script>
