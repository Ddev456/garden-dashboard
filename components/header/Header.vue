<!-- components/header/Header.vue -->
<template>
  <header class="sticky top-0 z-40 bg-secondary rounded-xl border border-primary/80">
    <div class="flex h-16 items-center px-4 lg:px-6">

      <!-- Logo mobile -->
      <NuxtLink to="/" class="flex items-center lg:hidden">
        <img src="/logo.svg" class="h-6 w-6 text-green-600" />
        <span class="ml-2 text-lg font-semibold">Carnet Potager</span>
      </NuxtLink>

      <div class="flex-1 lg:hidden flex items-center ml-4 lg:ml-0">
        <GardenSwitcher />
      </div>

      <!-- Search -->
      <div class="hidden flex-1 lg:flex items-center ml-4 lg:ml-0">
        <div class="w-full flex-1 lg:max-w-2xl">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une plante..."
              class="pl-9 w-full lg:w-[300px] bg-background"
            />
            <!-- Résultats de recherche -->
            <div
              v-if="searchQuery && filteredTasks.length > 0"
              class="absolute top-full left-0 right-0 mt-1 bg-popover rounded-md shadow-md border"
            >
              <div class="p-2">
                <div
                  v-for="task in filteredTasks"
                  :key="task.id"
                  class="p-2 hover:bg-accent rounded-sm cursor-pointer"
                  @click="selectTask(task)"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium">{{ task.title }}</p>
                      <p class="text-sm text-muted-foreground">{{ task.description }}</p>
                    </div>
                    <Badge :variant="getPriorityVariant(task.priority)">
                      {{ task.priority }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-2">

        <!-- Assistant -->
        <Button
          @click="openAssistant"
          class="bg-background text-primary hover:border-dashed hover:bg-background/90 border-3 border-dotted border-primary px-4 py-2 text-sm font-medium"
        >
          <div class="flex items-center gap-2">
            <img src="/icons/settings.svg" alt="Assistant" class="size-6" />
            <span class="hidden sm:inline">Assistant</span>
          </div>
        </Button>

        <!-- Notifications -->
        <Button variant="ghost" size="icon" class="relative">
          <Bell class="h-5 w-5" />
          <span class="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
        </Button>

        <!-- Help -->
        <Button variant="ghost" size="icon" class="hidden lg:flex">
          <HelpCircle class="h-5 w-5" />
        </Button>

        <!-- User Menu -->
        <UserMenu />
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue'
import { Search, Plus, Bell, HelpCircle, Menu } from 'lucide-vue-next'
import type { Task, TaskPriority } from '~/types/task'
import { mockTasks } from '~/mocks/data'
import GardenSwitcher from '../sidebar/GardenSwitcher.vue'
import { useAssistant } from '@/composables/useAssistant'

const { openAssistant } = useAssistant()
const searchQuery = ref('')
const isTaskModalOpen = ref(false)

// Filtrer les tâches en fonction de la recherche
const filteredTasks = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return mockTasks.filter(task => 
    task.title.toLowerCase().includes(query) ||
    (task.description?.toLowerCase().includes(query))
  ).slice(0, 5) // Limiter à 5 résultats
})

const getPriorityVariant = (priority: TaskPriority) => {
  switch (priority) {
    case 'haute':
      return 'destructive'
    case 'moyenne':
      return 'secondary'
    case 'basse':
      return 'outline'
    default:
      return 'default'
  }
}

const selectTask = (task: Task) => {
  searchQuery.value = ''
  // Ici vous pourriez naviguer vers la tâche ou ouvrir un modal de détails
  console.log('Selected task:', task)
}

const handleTaskSubmit = (taskData: Partial<Task>) => {
  // Ici vous ajouteriez la logique pour créer une nouvelle tâche
  console.log('New task:', taskData)
}

const toggleMobileMenu = () => {
  // Émettre un événement pour ouvrir/fermer le menu mobile
  emit('toggle-mobile-menu')
}

const emit = defineEmits<{
  'toggle-mobile-menu': []
}>()
</script> 