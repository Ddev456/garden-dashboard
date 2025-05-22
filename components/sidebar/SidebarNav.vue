<!-- components/sidebar/SidebarNav.vue -->
<template>
  <nav class="flex flex-col space-y-1">
    <NuxtLink
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
      :class="{ 'bg-gray-100': item.path === currentPath }"
    >
      <component :is="item.icon" class="w-5 h-5 mr-3 text-gray-400" />
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import {
  Home,
  Users,
  User,
  Settings,
  FileText,
  Calendar,
  Flower
} from 'lucide-vue-next'

const currentPath = useRoute().path

const navigationItems = [
  { name: 'Tableau de bord', path: '/', icon: Home },
  { name: 'Jardins', path: '/jardins', icon: Flower },
  { name: 'Équipe', path: '/equipe', icon: Users },
  { name: 'Calendrier', path: '/calendrier', icon: Calendar },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Mon Profil', path: '/profil', icon: User },
  { name: 'Paramètres', path: '/parametres', icon: Settings }
]
</script> 