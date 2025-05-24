<template>
  <div class="space-y-8">
    <!-- Ravageurs -->
    <div v-if="plant.pests?.length">
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BugIcon class="w-5 h-5 text-orange-600" />
        Ravageurs
      </h3>
      <div class="space-y-4">
        <Card 
          v-for="pest in plant.pests" 
          :key="pest.id"
          class="border-orange-200 hover:shadow-md transition-shadow"
        >
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h4 class="font-semibold text-lg text-orange-800">{{ pest.name }}</h4>
              <Badge 
                :variant="pest.severity === 'high' ? 'destructive' : pest.severity === 'medium' ? 'outline' : 'secondary'"
              >
                {{ getSeverityLabel(pest.severity) }}
              </Badge>
            </div>
            
            <p class="text-gray-600 mb-4">{{ pest.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <AlertTriangleIcon class="w-4 h-4 text-orange-600" />
                  Symptômes
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="symptom in pest.symptoms" 
                    :key="symptom"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 shrink-0"></div>
                    {{ symptom }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <ShieldIcon class="w-4 h-4 text-blue-600" />
                  Prévention
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="prevention in pest.prevention" 
                    :key="prevention"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                    {{ prevention }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <ZapIcon class="w-4 h-4 text-green-600" />
                  Traitement
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="treatment in pest.treatment" 
                    :key="treatment"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 shrink-0"></div>
                    {{ treatment }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Saison d'apparition -->
            <div v-if="pest.season?.length" class="mt-4 pt-4 border-t border-orange-200">
              <span class="text-sm text-gray-500">
                <strong>Saison d'apparition :</strong> 
                {{ (pest.season || []).join(', ') }}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Maladies -->
    <div v-if="plant.diseases?.length">
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ShieldAlertIcon class="w-5 h-5 text-red-600" />
        Maladies
      </h3>
      <div class="space-y-4">
        <Card 
          v-for="disease in plant.diseases" 
          :key="disease.id"
          class="border-red-200 hover:shadow-md transition-shadow"
        >
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h4 class="font-semibold text-lg text-red-800">{{ disease.name }}</h4>
              <Badge 
                :variant="disease.severity === 'high' ? 'destructive' : disease.severity === 'medium' ? 'outline' : 'secondary'"
              >
                {{ getSeverityLabel(disease.severity) }}
              </Badge>
            </div>
            
            <p class="text-gray-600 mb-4">{{ disease.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <AlertTriangleIcon class="w-4 h-4 text-red-600" />
                  Symptômes
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="symptom in disease.symptoms" 
                    :key="symptom"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                    {{ symptom }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <SearchIcon class="w-4 h-4 text-yellow-600" />
                  Causes
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="cause in disease.causes" 
                    :key="cause"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 shrink-0"></div>
                    {{ cause }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <ShieldIcon class="w-4 h-4 text-blue-600" />
                  Prévention
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="prevention in disease.prevention" 
                    :key="prevention"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                    {{ prevention }}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <ZapIcon class="w-4 h-4 text-green-600" />
                  Traitement
                </h5>
                <ul class="space-y-1">
                  <li 
                    v-for="treatment in disease.treatment" 
                    :key="treatment"
                    class="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <div class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 shrink-0"></div>
                    {{ treatment }}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Message si aucun problème -->
    <div v-if="!plant.pests?.length && !plant.diseases?.length" class="text-center py-12 text-gray-500">
      <ShieldCheckIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
      <h4 class="text-lg font-semibold text-gray-700 mb-2">Plante résistante</h4>
      <p>Aucun problème de santé spécifique répertorié pour cette plante.</p>
      <p class="text-sm mt-2">Cette plante est généralement robuste et facile à maintenir en bonne santé.</p>
    </div>

    <!-- Conseils généraux -->
    <div v-if="plant.pests?.length || plant.diseases?.length" class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 class="font-semibold text-green-800 mb-2 flex items-center gap-2">
        <InfoIcon class="w-4 h-4" />
        Conseils de prévention généraux
      </h4>
      <div class="space-y-2 text-sm text-green-700">
        <p>• Surveillez régulièrement vos plantes pour détecter les premiers signes</p>
        <p>• Maintenez une bonne hygiène du jardin (élimination des débris, rotation des cultures)</p>
        <p>• Privilégiez les méthodes naturelles et préventives</p>
        <p>• Renforcez les défenses naturelles avec un sol sain et une nutrition équilibrée</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BugIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  ShieldIcon,
  ZapIcon,
  SearchIcon,
  InfoIcon
} from 'lucide-vue-next'
import type { Plant } from '@/types/wiki'

interface Props {
  plant: Plant
}

defineProps<Props>()

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case 'high': return 'Élevé'
    case 'medium': return 'Moyen'
    case 'low': return 'Faible'
    default: return severity
  }
}
</script> 