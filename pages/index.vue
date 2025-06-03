<!-- pages/index.vue -->
<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-primary mb-4">Bienvenue dans Carnet Potager</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Planifiez, suivez et optimisez vos cultures avec notre assistant intelligent. 
        Créez des itinéraires personnalisés pour chaque plante de votre jardin.
      </p>
    </div>

    <!-- Assistant CTA -->
    <div class="max-w-md mx-auto">
      <div class="bg-gradient-to-r from-primary/10 to-green-100 border border-primary/20 rounded-xl p-6 text-center">
        <img src="/icons/settings.svg" alt="Assistant" class="size-14 mx-auto mb-4" />
        <h2 class="text-lg font-semibold text-primary mb-2">Assistant Culture</h2>
        <p class="text-sm text-gray-600 mb-4">
          Laissez-vous guider pour créer l'itinéraire parfait pour vos plantes
        </p>
        <Button @click="openAssistant" class="w-full">
          Démarrer l'assistant
        </Button>
      </div>
    </div>

    <!-- Zones du jardin -->
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Zones de culture : </h2>
        <div class="flex items-center gap-2 text-xl text-gray-700 ml-3">
          <span>{{ currentGarden.name }}</span>
          <img :src="currentGarden.icon" :alt="currentGarden.name" class="w-5 h-5" />
        </div>
      </div>
      
      <!-- Liste des zones -->
      <ZonesList />

      <!-- Message si aucune zone -->
      <div v-if="currentZones.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">🏞️</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune zone configurée</h3>
        <p class="text-gray-500 mb-4">Commencez par créer vos premières zones de culture</p>
        <Button variant="outline">
          <span class="mr-2">➕</span>
          Créer une zone
        </Button>
      </div>
    </div>

    <!-- Test Assistant -->
    <div class="max-w-md mx-auto">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <h3 class="font-medium text-blue-800 mb-2">🧪 Version de test</h3>
        <p class="text-sm text-blue-600 mb-3">
          Accédez à la page de test pour déboguer l'assistant
        </p>
        <NuxtLink to="/test-assistant">
          <Button variant="outline" size="sm">
            Tester l'assistant
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAssistant } from '@/composables/useAssistant'
import { useGarden } from '@/composables/useGarden'
import { Button } from '@/components/ui/button'
import ZonesList from '@/components/dashboard/ZonesList.vue'

const { openAssistant } = useAssistant()
const { currentGarden, currentZones } = useGarden()
</script> 