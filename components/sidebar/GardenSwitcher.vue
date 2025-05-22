<!-- components/sidebar/GardenSwitcher.vue -->
<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild class="bg-background border-2 border-dashed border-primary">
      <Button variant="ghost" class="w-full">
        <img :src="currentGarden.icon" class="w-6 h-6 mb-1" />
        <span class="flex-1 text-left">{{ currentGarden.name }}</span>
        <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Mes Jardins</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="garden in gardens"
          :key="garden.id"
          @click="selectGarden(garden)"
        >
            <img :src="garden.icon" class="w-6 h-6 mb-1" />
          <span>{{ garden.name }}</span>
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
import { Flower, ChevronDown, Check, Plus } from 'lucide-vue-next'

interface Garden {
  id: string
  name: string
  description?: string
  icon?: string
}

// Mock data pour les jardins
const gardens = ref<Garden[]>([
  {
    id: '1',
    name: 'Jardin Principal',
    description: 'Le jardin principal de la maison',
    icon: '/icons/greenhouse.svg'
  },
  {
    id: '2',
    name: 'Potager Bio',
    description: 'Le potager avec les légumes bio',
    icon: '/icons/plot.svg'
  },
  {
    id: '3',
    name: 'Jardin d\'Herbes',
    description: 'Le jardin des herbes aromatiques',
    icon: '/icons/parcel.svg'
  }
])

const currentGarden = ref(gardens.value[0])

const selectGarden = (garden: Garden) => {
  currentGarden.value = garden
}
</script> 