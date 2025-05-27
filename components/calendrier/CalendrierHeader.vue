<template>
  <div class="bg-white border-b border-gray-200" :class="{ 'hidden': !showHeader }">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Titre compact -->
        <div class="flex items-center gap-3">
          <img src="/icons/calendar.svg" class="w-8 h-8" />
          <div>
            <h1 class="text-2xl font-bold text-primary">Calendrier</h1>
            <p class="text-sm text-muted-foreground hidden sm:block">
              Planifiez vos activités de jardinage
            </p>
          </div>
        </div>

        <!-- Actions header -->
        <div class="flex items-center gap-2">
          <!-- Bouton sidebar (desktop uniquement) -->
          <Button 
            variant="outline" 
            size="sm" 
            @click="$emit('toggle-sidebar')"
            class="hidden lg:flex"
          >
            <PanelRightIcon class="w-4 h-4 mr-2" />
            <span class="hidden xl:inline">Panneau</span>
          </Button>
          
          <Button variant="outline" size="sm" @click="$emit('toggle-filters')">
            <SettingsIcon class="w-4 h-4 mr-2" />
            <span class="hidden sm:inline">Filtres</span>
          </Button>
          
          <Button variant="outline" size="sm" @click="$emit('add-task')">
            <PlusIcon class="w-4 h-4 mr-2" />
            <span class="hidden sm:inline">Ajouter</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            @click="$emit('toggle-header')"
            class="text-gray-500"
          >
            <ChevronUpIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>

  <!-- Header minimisé -->
  <div v-if="!showHeader" class="bg-white border-b border-gray-200 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="/icons/calendar.svg" class="w-6 h-6" />
          <span class="font-medium text-gray-900">Calendrier</span>
        </div>
        
        <div class="flex items-center gap-1">
          <Button variant="ghost" size="sm" @click="$emit('toggle-filters')">
            <SettingsIcon class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" @click="$emit('add-task')">
            <PlusIcon class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" @click="$emit('toggle-header')">
            <ChevronDownIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { 
  SettingsIcon, 
  PlusIcon, 
  ChevronUpIcon, 
  ChevronDownIcon,
  PanelRightIcon
} from 'lucide-vue-next'

defineProps<{
  showHeader?: boolean
}>()

defineEmits<{
  'toggle-header': []
  'toggle-filters': []
  'toggle-sidebar': []
  'add-task': []
}>()
</script> 