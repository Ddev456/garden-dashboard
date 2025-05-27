<template>
  <Card class="bg-white">
    <CardHeader>
      <CardTitle class="text-lg flex items-center gap-2">
        <InfoIcon class="w-5 h-5" />
        Légende
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Types de tâches -->
        <div>
          <h3 class="font-medium text-gray-900 mb-3">Types de tâches</h3>
          <div class="space-y-2">
            <div 
              v-for="taskType in taskTypes" 
              :key="taskType.type"
              class="flex items-center gap-3"
            >
              <div :class="['p-2 rounded', taskType.colorClass]">
                <component :is="taskType.icon" class="w-4 h-4" />
              </div>
              <span class="text-sm">{{ taskType.label }}</span>
            </div>
          </div>
        </div>

        <!-- Zones de jardinage -->
        <div>
          <h3 class="font-medium text-gray-900 mb-3">Zones de jardinage</h3>
          <div class="space-y-2">
            <div 
              v-for="zone in zones" 
              :key="zone.id"
              class="flex items-center gap-3"
            >
              <div 
                class="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                :style="{ backgroundColor: zone.color }"
              ></div>
              <div class="flex-1">
                <span class="text-sm font-medium">{{ zone.name }}</span>
                <div class="text-xs text-gray-500">{{ zone.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations supplémentaires -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
              <CalendarIcon class="w-4 h-4 text-blue-600" />
            </div>
            <span class="text-gray-600">Cliquez sur une tâche pour voir les détails</span>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
              <FilterIcon class="w-4 h-4 text-green-600" />
            </div>
            <span class="text-gray-600">Filtrez par zone pour une vue ciblée</span>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center">
              <MoonIcon class="w-4 h-4 text-purple-600" />
            </div>
            <span class="text-gray-600">Activez les phases lunaires pour le jardinage biodynamique</span>
          </div>
        </div>
      </div>

      <!-- Conseils rapides -->
      <div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <LightbulbIcon class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 class="font-medium text-amber-900 mb-2">Conseils d'utilisation</h4>
            <ul class="text-sm text-amber-800 space-y-1">
              <li>• Planifiez vos arrosages selon la météo et les besoins des plantes</li>
              <li>• Groupez les tâches par zone pour optimiser vos déplacements</li>
              <li>• Respectez les phases lunaires pour les plantations et la taille</li>
              <li>• Notez vos observations pour améliorer vos pratiques</li>
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  InfoIcon,
  CalendarIcon,
  FilterIcon,
  MoonIcon,
  LightbulbIcon,
  DropletIcon,
  SproutIcon,
  ScissorsIcon,
  SparklesIcon,
  ShieldIcon,
  PackageIcon,
  EyeIcon
} from 'lucide-vue-next'

// Types de tâches avec leurs icônes et couleurs
const taskTypes = [
  {
    type: 'arrosage',
    label: 'Arrosage',
    icon: DropletIcon,
    colorClass: 'bg-blue-100 text-blue-800'
  },
  {
    type: 'plantation',
    label: 'Plantation',
    icon: SproutIcon,
    colorClass: 'bg-green-100 text-green-800'
  },
  {
    type: 'taille',
    label: 'Taille',
    icon: ScissorsIcon,
    colorClass: 'bg-orange-100 text-orange-800'
  },
  {
    type: 'fertilisation',
    label: 'Fertilisation',
    icon: SparklesIcon,
    colorClass: 'bg-purple-100 text-purple-800'
  },
  {
    type: 'traitement',
    label: 'Traitement',
    icon: ShieldIcon,
    colorClass: 'bg-red-100 text-red-800'
  },
  {
    type: 'récolte',
    label: 'Récolte',
    icon: PackageIcon,
    colorClass: 'bg-yellow-100 text-yellow-800'
  },
  {
    type: 'observation',
    label: 'Observation',
    icon: EyeIcon,
    colorClass: 'bg-gray-100 text-gray-800'
  }
]

// Zones avec leurs couleurs
const zones = [
  {
    id: 'zone-1',
    name: 'Potager principal',
    description: 'Zone principale pour les légumes de saison',
    color: '#10b981'
  },
  {
    id: 'zone-2',
    name: 'Serre',
    description: 'Espace protégé pour les semis et plantes fragiles',
    color: '#3b82f6'
  },
  {
    id: 'zone-3',
    name: 'Jardin aromatique',
    description: 'Herbes aromatiques et plantes médicinales',
    color: '#8b5cf6'
  },
  {
    id: 'zone-4',
    name: 'Verger',
    description: 'Arbres fruitiers et petits fruits',
    color: '#f59e0b'
  }
]
</script> 