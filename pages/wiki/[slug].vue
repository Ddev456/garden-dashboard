<template>
  <div v-if="plant" class="max-w-6xl mx-auto py-8 space-y-8">
    <!-- En-tête de la plante -->
    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8">
      <div class="flex items-start gap-6">
        <div class="relative">
          <div class="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <img :src="plant.icon" :alt="plant.name" class="w-16 h-16" />
          </div>
          <!-- Badge cultivé -->
          <div 
            v-if="plant.userHistory?.hasGrown"
            class="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-2"
            title="Déjà cultivé"
          >
            <CheckCircleIcon class="w-4 h-4" />
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ plant.name }}</h1>
              <p class="text-xl text-gray-600 italic mb-4">{{ plant.scientificName }}</p>
              <p class="text-gray-700 text-lg max-w-2xl">{{ plant.description }}</p>
            </div>
            
            <div class="flex items-start gap-3">
              <Badge 
                :variant="getDifficultyVariant(plant.difficulty)"
                class="text-lg px-4 py-2"
              >
                {{ plant.difficulty }}
              </Badge>
              
              <!-- Note moyenne avec étoiles -->
              <div class="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <StarIcon 
                      v-for="i in 5" 
                      :key="i"
                      :class="[
                        'w-5 h-5',
                        i <= Math.floor(plant.averageRating || 0) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      ]"
                    />
                  </div>
                  <span class="font-semibold">{{ plant.averageRating }}/5</span>
                  <span class="text-gray-500 text-sm">({{ plant.ratingsCount }} avis)</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Informations principales -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div class="bg-white rounded-lg p-3">
              <div class="text-sm text-gray-500 uppercase tracking-wide">Catégorie</div>
              <div class="text-lg font-semibold">{{ formatCategory(plant.category) }}</div>
            </div>
            <div class="bg-white rounded-lg p-3">
              <div class="text-sm text-gray-500 uppercase tracking-wide">Durée</div>
              <div class="text-lg font-semibold">{{ plant.growthDuration }}</div>
            </div>
            <div class="bg-white rounded-lg p-3">
              <div class="text-sm text-gray-500 uppercase tracking-wide">Saisons</div>
              <div class="text-lg font-semibold">{{ plant.seasons.join(', ') }}</div>
            </div>
            <div class="bg-white rounded-lg p-3">
              <div class="text-sm text-gray-500 uppercase tracking-wide">Espacement</div>
              <div class="text-lg font-semibold">{{ plant.spacing }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actions rapides -->
      <div class="flex gap-3 mt-6">
        <Button class="flex-1 md:flex-initial">
          <PlusIcon class="w-4 h-4 mr-2" />
          Ajouter à ma zone
        </Button>
        <Button 
          v-if="plant.relatedItineraries?.length" 
          variant="outline"
          @click="goToItinerary"
        >
          <RouteIcon class="w-4 h-4 mr-2" />
          Voir l'itinéraire
        </Button>
        <Button variant="outline">
          <HeartIcon class="w-4 h-4 mr-2" />
          Favoris
        </Button>
        <Button variant="outline">
          <ShareIcon class="w-4 h-4 mr-2" />
          Partager
        </Button>
      </div>
    </div>

    <!-- Système d'onglets -->
    <div class="bg-white rounded-lg shadow-sm border">
      <!-- Navigation des onglets -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 mr-2 inline" />
            {{ tab.name }}
            <span v-if="tab.badge" class="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {{ tab.badge }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div class="p-6">
        <!-- Onglet Aperçu -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <!-- Caractéristiques principales -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Caractéristiques principales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="characteristic in plant.characteristics" 
                :key="characteristic"
                class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <CheckIcon class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span class="text-gray-700">{{ characteristic }}</span>
              </div>
            </div>
          </div>

          <!-- Informations de culture -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Informations de culture</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <SparklesIcon class="w-4 h-4 text-brown-600" />
                  Semis
                </h4>
                <p class="text-gray-600">{{ plant.sowingPeriod }}</p>
                <p v-if="plant.plantingPeriod" class="text-sm text-gray-500">
                  Plantation : {{ plant.plantingPeriod }}
                </p>
              </div>
              
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <CalendarIcon class="w-4 h-4 text-green-600" />
                  Récolte
                </h4>
                <p class="text-gray-600">{{ plant.harvestPeriod }}</p>
              </div>
              
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <SunIcon class="w-4 h-4 text-yellow-600" />
                  Exposition
                </h4>
                <p class="text-gray-600">{{ plant.exposure }}</p>
              </div>
              
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <MountainIcon class="w-4 h-4 text-gray-600" />
                  Sol
                </h4>
                <p class="text-gray-600">{{ plant.soil }}</p>
              </div>
              
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <DropletIcon class="w-4 h-4 text-blue-600" />
                  Arrosage
                </h4>
                <p class="text-gray-600">{{ plant.watering }}</p>
              </div>
              
              <div class="space-y-3">
                <h4 class="font-medium text-gray-900 flex items-center gap-2">
                  <ThermometerIcon class="w-4 h-4 text-red-600" />
                  Température
                </h4>
                <p class="text-gray-600">{{ plant.temperature.min }}°C - {{ plant.temperature.max }}°C</p>
                <p class="text-sm text-gray-500">Optimal : {{ plant.temperature.optimal }}°C</p>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in plant.tags" 
                :key="tag"
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Onglet Variétés -->
        <div v-if="activeTab === 'varieties'" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900">Variétés disponibles</h3>
          <div v-if="plant.varieties?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              v-for="variety in plant.varieties" 
              :key="variety.id"
              class="hover:shadow-md transition-shadow"
            >
              <CardContent class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h4 class="font-semibold text-lg">{{ variety.name }}</h4>
                  <Badge :variant="getDifficultyVariant(variety.difficulty)">
                    {{ variety.difficulty }}
                  </Badge>
                </div>
                <p class="text-gray-600 mb-4">{{ variety.description }}</p>
                
                <div class="space-y-3">
                  <div>
                    <span class="font-medium text-gray-700">Temps de récolte :</span>
                    <span class="ml-2 text-gray-600">{{ variety.harvestTime }}</span>
                  </div>
                  
                  <div>
                    <span class="font-medium text-gray-700">Caractéristiques :</span>
                    <ul class="mt-1 space-y-1">
                      <li 
                        v-for="char in variety.characteristics" 
                        :key="char"
                        class="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <div class="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        {{ char }}
                      </li>
                    </ul>
                  </div>
                  
                  <div v-if="variety.specialFeatures?.length">
                    <span class="font-medium text-gray-700">Particularités :</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span 
                        v-for="feature in variety.specialFeatures" 
                        :key="feature"
                        class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <SproutIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune variété spécifique répertoriée pour cette plante.</p>
          </div>
        </div>

        <!-- Onglet Compagnons -->
        <div v-if="activeTab === 'companions'" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900">Associations de plantes</h3>
          <div v-if="plant.companions?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="companion in plant.companions" 
              :key="companion.plantId"
              :class="[
                'p-4 rounded-lg border-2 transition-colors',
                companion.type === 'beneficial' ? 'bg-green-50 border-green-200' :
                companion.type === 'neutral' ? 'bg-gray-50 border-gray-200' :
                'bg-red-50 border-red-200'
              ]"
            >
              <div class="flex items-center gap-3 mb-3">
                <img :src="companion.plantIcon" :alt="companion.plantName" class="w-8 h-8" />
                <h4 class="font-semibold">{{ companion.plantName }}</h4>
                <Badge 
                  :variant="companion.type === 'beneficial' ? 'secondary' : companion.type === 'neutral' ? 'outline' : 'destructive'"
                  class="text-xs"
                >
                  {{ companion.type === 'beneficial' ? 'Bénéfique' : companion.type === 'neutral' ? 'Neutre' : 'À éviter' }}
                </Badge>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ companion.benefit }}</p>
              <p class="text-xs text-gray-500">
                <strong>Distance :</strong> {{ companion.distance }}
              </p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <HeartHandshakeIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune association spécifique répertoriée pour cette plante.</p>
          </div>
        </div>

        <!-- Onglet Santé -->
        <div v-if="activeTab === 'health'" class="space-y-8">
          <!-- Ravageurs -->
          <div v-if="plant.pests?.length">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Ravageurs</h3>
            <div class="space-y-4">
              <Card 
                v-for="pest in plant.pests" 
                :key="pest.id"
                class="border-orange-200"
              >
                <CardContent class="p-6">
                  <div class="flex items-start justify-between mb-3">
                    <h4 class="font-semibold text-lg text-orange-800">{{ pest.name }}</h4>
                    <Badge 
                      :variant="pest.severity === 'high' ? 'destructive' : pest.severity === 'medium' ? 'outline' : 'secondary'"
                    >
                      {{ pest.severity === 'high' ? 'Élevé' : pest.severity === 'medium' ? 'Moyen' : 'Faible' }}
                    </Badge>
                  </div>
                  
                  <p class="text-gray-600 mb-4">{{ pest.description }}</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 class="font-medium text-gray-800 mb-2">Symptômes</h5>
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
                      <h5 class="font-medium text-gray-800 mb-2">Prévention</h5>
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
                      <h5 class="font-medium text-gray-800 mb-2">Traitement</h5>
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
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Maladies -->
          <div v-if="plant.diseases?.length">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Maladies</h3>
            <div class="space-y-4">
              <Card 
                v-for="disease in plant.diseases" 
                :key="disease.id"
                class="border-red-200"
              >
                <CardContent class="p-6">
                  <div class="flex items-start justify-between mb-3">
                    <h4 class="font-semibold text-lg text-red-800">{{ disease.name }}</h4>
                    <Badge 
                      :variant="disease.severity === 'high' ? 'destructive' : disease.severity === 'medium' ? 'outline' : 'secondary'"
                    >
                      {{ disease.severity === 'high' ? 'Élevé' : disease.severity === 'medium' ? 'Moyen' : 'Faible' }}
                    </Badge>
                  </div>
                  
                  <p class="text-gray-600 mb-4">{{ disease.description }}</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <h5 class="font-medium text-gray-800 mb-2">Symptômes</h5>
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
                      <h5 class="font-medium text-gray-800 mb-2">Causes</h5>
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
                      <h5 class="font-medium text-gray-800 mb-2">Prévention</h5>
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
                      <h5 class="font-medium text-gray-800 mb-2">Traitement</h5>
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

          <div v-if="!plant.pests?.length && !plant.diseases?.length" class="text-center py-8 text-gray-500">
            <ShieldCheckIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun problème de santé spécifique répertorié pour cette plante.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions en bas -->
    <div class="flex justify-between items-center pt-6">
      <Button 
        variant="outline" 
        @click="$router.go(-1)"
      >
        <ArrowLeftIcon class="w-4 h-4 mr-2" />
        Retour au wiki
      </Button>
      
      <div class="flex gap-3">
        <Button>
          <PlusIcon class="w-4 h-4 mr-2" />
          Ajouter à ma zone
        </Button>
        <Button variant="outline">
          <ShareIcon class="w-4 h-4 mr-2" />
          Partager cette fiche
        </Button>
      </div>
    </div>
  </div>
  
  <!-- Message d'erreur si plante non trouvée -->
  <div v-else class="max-w-4xl mx-auto py-16 text-center">
    <SearchXIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Plante non trouvée</h1>
    <p class="text-gray-600 mb-6">
      La plante "{{ $route.params.slug }}" n'existe pas dans notre base de données.
    </p>
    <Button @click="$router.push('/wiki')">
      <ArrowLeftIcon class="w-4 h-4 mr-2" />
      Retour au wiki
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon,
  StarIcon,
  PlusIcon,
  RouteIcon,
  HeartIcon,
  ShareIcon,
  CheckIcon,
  SparklesIcon,
  CalendarIcon,
  SunIcon,
  MountainIcon,
  DropletIcon,
  ThermometerIcon,
  SproutIcon,
  HeartHandshakeIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  SearchXIcon,
  InfoIcon,
  BugIcon,
  ShieldAlertIcon,
  LeafIcon
} from 'lucide-vue-next'
import { getPlantBySlug } from '@/mocks/plantsWiki'

const route = useRoute()
const router = useRouter()
const plantSlug = route.params.slug as string

// Récupération de la plante
const plant = getPlantBySlug(plantSlug)

// Meta données de la page
useSeoMeta({
  title: plant ? `${plant.name} - Wiki des Plantes` : 'Plante non trouvée - Wiki des Plantes',
  description: plant ? plant.description : 'Cette plante n\'existe pas dans notre base de données.',
})

// État des onglets
const activeTab = ref('overview')

// Configuration des onglets
const tabs = computed(() => [
  { 
    id: 'overview', 
    name: 'Aperçu', 
    icon: InfoIcon
  },
  { 
    id: 'varieties', 
    name: 'Variétés', 
    icon: SproutIcon,
    badge: plant?.varieties?.length || 0
  },
  { 
    id: 'companions', 
    name: 'Compagnons', 
    icon: HeartHandshakeIcon,
    badge: plant?.companions?.length || 0
  },
  { 
    id: 'health', 
    name: 'Santé', 
    icon: ShieldAlertIcon,
    badge: (plant?.pests?.length || 0) + (plant?.diseases?.length || 0)
  }
])

// Utilitaires
const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}

const formatCategory = (category: string) => {
  const categories: Record<string, string> = {
    'légume-fruit': 'Légume-fruit',
    'légume-feuille': 'Légume-feuille',
    'légume-racine': 'Légume-racine',
    'aromate': 'Aromate'
  }
  return categories[category] || category
}

// Actions
const goToItinerary = () => {
  if (plant?.relatedItineraries?.[0]) {
    router.push(`/itineraires/${plant.relatedItineraries[0]}`)
  }
}
</script> 