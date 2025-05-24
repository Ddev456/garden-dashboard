<template>
  <div class="bg-gray-50 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Notre collection</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center">
        <div class="text-3xl font-bold text-primary">{{ stats.total }}</div>
        <div class="text-sm text-gray-600">Plantes</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-green-600">{{ stats.categories }}</div>
        <div class="text-sm text-gray-600">Catégories</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600">{{ stats.varieties }}</div>
        <div class="text-sm text-gray-600">Variétés</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-purple-600">{{ stats.easyPlants }}</div>
        <div class="text-sm text-gray-600">Faciles</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  total: number
  categories: number
  varieties: number
  easyPlants: number
}

interface Props {
  stats: Stats
}

defineProps<Props>()
</script> 