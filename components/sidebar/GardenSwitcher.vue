<!-- components/sidebar/GardenSwitcher.vue -->
<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild class="bg-background border-2 border-dashed border-primary">
      <Button variant="ghost" class="w-full">
        <img :src="currentGarden.icon" class="w-6 h-6 mb-1" />
        <span class="hidden sm:flex flex-1 text-left">{{ currentGarden.name }}</span>
        <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Mes Jardins</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="garden in allGardens"
          :key="garden.id"
          @click="selectGarden(garden.id)"
        >
          <img :src="garden.icon" class="w-6 h-6 mb-1" />
          <div class="flex-1">
            <span class="font-medium">{{ garden.name }}</span>
            <div class="text-xs text-gray-500">{{ garden.zones.length }} zones</div>
          </div>
          <Check
            v-if="garden.id === currentGarden.id"
            class="ml-auto h-4 w-4 text-green-600"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Plus class="mr-2 h-4 w-4" />
        <span>Ajouter un jardin</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ChevronDown, Check, Plus } from 'lucide-vue-next'
import { useGarden } from '@/composables/useGarden'

const { currentGarden, allGardens, selectGarden } = useGarden()
</script> 