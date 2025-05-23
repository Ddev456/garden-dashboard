<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center bg-background border-t px-2 py-1 h-16 lg:hidden">
    <!-- Jardins -->
    <NuxtLink to="/" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path === '/' || route.path.startsWith('/zone') ? 'bg-accent' : ''
            ]">
      <img src="/icons/fields.svg" class="w-6 h-6 mb-1" />
      <span 
      :class="[
                  'hidden sm:flex text-xs border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path === '/' || route.path.startsWith('/zone') ? 'border-primary' : 'border-transparent'
                ]"
      >Zones de culture</span>
    </NuxtLink>

    <!-- Wiki -->
    <NuxtLink to="/wiki" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/wiki') ? 'bg-accent' : ''
            ]">
      <img src="/icons/wiki.svg" class="w-6 h-6 mb-1" />
      <span 
      :class="[
                  'hidden sm:flex text-xs border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/wiki') ? 'border-primary' : 'border-transparent'
                ]"
      >Wiki</span>
    </NuxtLink>

    <!-- Bouton central -->
    <button class="relative flex items-center justify-center -mt-2 bg-primary text-primary-foreground rounded-full shadow-lg w-16 h-16 border-4 border-background focus:outline-none">
      <Search class="w-8 h-8" />
    </button>

    <!-- Calendrier -->
    <NuxtLink to="/calendrier" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/calendrier') ? 'bg-accent' : ''
            ]">
      <img src="/icons/calendar.svg" class="w-6 h-6 mb-1" />
      <span 
      :class="[
                  'hidden sm:flex text-xs border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/calendrier') ? 'border-primary' : 'border-transparent'
                ]"
      >Calendrier</span>
    </NuxtLink>

    <!-- Itinéraires de culture -->
    <NuxtLink to="/itineraires" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/itineraires') ? 'bg-accent' : ''
            ]">
      <img src="/icons/culture-path.svg" class="w-6 h-6 mb-1" />
      <span 
      :class="[
                  'hidden sm:flex text-xs border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/itineraires') ? 'border-primary' : 'border-transparent'
                ]"
      >Itinéraires</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
nav {
  /* Pour s'assurer que le bouton central dépasse du dock */
  height: 64px;
}
button {
  top: -32px;
}
</style> 