<!-- components/sidebar/Sidebar.vue -->
<template>
  <div>
    <!-- Sidebar Desktop -->
    <aside class="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 p-6">
      <div class="flex flex-col flex-grow bg-secondary p-4 rounded-xl shadow-xl border border-primary/80">
        <!-- Logo -->
        <div class="flex items-center h-16 px-4">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="/logo.svg" alt="Carnet Potager" class="size-10 text-green-600" />
            <span>Carnet Potager</span>
          </NuxtLink>
        </div>

        <div class="flex-1 flex flex-col overflow-y-auto">
          <!-- Garden Switcher -->
          <div class="p-4">
            <GardenSwitcher />
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-2 py-4 space-y-1">
            <NuxtLink to="/" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path === '/' ? 'bg-accent' : ''
            ]">
              <img src="/icons/fields.svg" class="w-6 h-6 mb-1" />
              <span
                :class="[
                  'border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path === '/' ? 'border-primary' : 'border-transparent'
                ]"
              >Zones de culture</span>
            </NuxtLink>
            <NuxtLink to="/wiki" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/wiki') ? 'bg-accent' : ''
            ]">
              <img src="/icons/wiki.svg" class="w-6 h-6 mb-1" />
              <span
                :class="[
                  'border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/wiki') ? 'border-primary' : 'border-transparent'
                ]"
              >Wiki des plantes</span>
            </NuxtLink>
            <NuxtLink to="/calendrier" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/calendrier') ? 'bg-accent' : ''
            ]">
              <img src="/icons/calendar.svg" class="w-6 h-6 mb-1" />
              <span
                :class="[
                  'border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/calendrier') ? 'border-primary' : 'border-transparent'
                ]"
              >Calendrier</span>
            </NuxtLink>
            <NuxtLink to="/itineraires" :class="[
            'group flex items-center gap-4 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent',
            route.path.startsWith('/itineraires') ? 'bg-accent' : ''
            ]">
              <img src="/icons/culture-path.svg" class="w-6 h-6 mb-1" />
              <span
                :class="[
                  'border-b-3 border-dashed group-hover:border-primary transition-all',
                  route.path.startsWith('/itineraires') ? 'border-primary' : 'border-transparent'
                ]"
              >Itinéraires</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Dock Mobile -->
    <MobileDock />
  </div>
</template>

<script setup lang="ts">
import GardenSwitcher from './GardenSwitcher.vue';
import MobileDock from './MobileDock.vue';
import { Leaf, BookOpen, CalendarDays, Map } from 'lucide-vue-next';
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.path)
</script> 