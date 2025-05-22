<!-- pages/index.vue -->
<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête de la page -->
      <div class="mb-8 flex justify-between items-center">
        <div class="flex flex-col">
        <h1 class="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p class="mt-1 text-sm text-gray-500">
          Gérez vos tâches et suivez l'avancement de vos projets de jardinage
        </p>
      </div>
        <AddZone />
      </div>
      <ZonesList />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddZone from '@/components/dashboard/AddZone.vue';
import ZonesList from '@/components/dashboard/ZonesList.vue';
</script> 