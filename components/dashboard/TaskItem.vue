<!-- components/dashboard/TaskItem.vue -->
<template>
  <Card class="mb-3">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <CardTitle class="text-base font-medium">{{ task.title }}</CardTitle>
          <CardDescription v-if="task.description" class="mt-1">
            {{ task.description }}
          </CardDescription>
        </div>
        <Badge :variant="priorityVariant" class="ml-2">
          {{ task.priority }}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Avatar :src="assignee.avatar" :alt="assignee.name" class="w-8 h-8" />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ assignee.name }}</p>
            <p v-if="task.dueDate" class="text-xs text-gray-500">
              <Calendar class="w-3 h-3 inline mr-1" />
              {{ formatDate(task.dueDate) }}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical class="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Calendar, MoreVertical } from 'lucide-vue-next'
import type { Task } from '~/types/task'
import { mockUsers } from '~/mocks/data'

const props = defineProps<{
  task: Task
}>()

const assignee = computed(() => {
  return mockUsers.find(u => u.id === props.task.assigneeId) || mockUsers[0]
})

const priorityVariant = computed(() => {
  switch (props.task.priority) {
    case 'haute':
      return 'destructive'
    case 'moyenne':
      return 'secondary'
    case 'basse':
      return 'outline'
    default:
      return 'default'
  }
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).format(date)
}
</script> 