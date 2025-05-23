<template>
  <div class="space-y-8">
    <!-- Galerie d'images -->
    <div v-if="itinerary.images?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <ImageIcon class="w-5 h-5 text-primary" />
        Galerie photos
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(image, index) in itinerary.images" 
          :key="index"
          class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer"
          @click="openImageModal(image, index)"
        >
          <img 
            :src="image" 
            :alt="`Photo ${index + 1} de ${itinerary.name}`"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
        </div>
      </div>
    </div>

    <!-- Variétés -->
    <div v-if="itinerary.varieties?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <SproutIcon class="w-5 h-5 text-green-600" />
        Variétés recommandées
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          v-for="variety in itinerary.varieties" 
          :key="variety.name"
          class="hover:shadow-md transition-shadow"
        >
          <CardContent class="p-4">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-gray-900">{{ variety.name }}</h4>
              <Badge :variant="getDifficultyVariant(variety.difficulty)" class="text-xs">
                {{ variety.difficulty }}
              </Badge>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ variety.characteristics }}</p>
            <div class="text-xs text-gray-500">
              <ClockIcon class="w-3 h-3 inline mr-1" />
              Récolte : {{ variety.harvestTime }}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Plantes compagnes -->
    <div v-if="itinerary.companions?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <HeartHandshakeIcon class="w-5 h-5 text-purple-600" />
        Plantes compagnes
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="companion in itinerary.companions" 
          :key="companion.plant"
          class="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <LeafIcon class="w-4 h-4 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900">{{ companion.plant }}</h4>
          </div>
          <p class="text-sm text-gray-600 mb-2">{{ companion.benefit }}</p>
          <div class="text-xs text-purple-600 font-medium">
            Distance : {{ companion.distance }}
          </div>
        </div>
      </div>
    </div>

    <!-- Ravageurs -->
    <div v-if="itinerary.pests?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <BugIcon class="w-5 h-5 text-red-600" />
        Ravageurs à surveiller
      </h3>
      <div class="space-y-4">
        <Card 
          v-for="pest in itinerary.pests" 
          :key="pest.name"
          class="border-red-200 hover:shadow-md transition-shadow"
        >
          <CardContent class="p-4">
            <h4 class="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangleIcon class="w-4 h-4" />
              {{ pest.name }}
            </h4>
            <p class="text-sm text-gray-600 mb-3">{{ pest.description }}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 rounded-lg p-3">
                <h5 class="font-medium text-blue-800 mb-1 text-sm">Prévention</h5>
                <p class="text-xs text-blue-700">{{ pest.prevention }}</p>
              </div>
              <div class="bg-green-50 rounded-lg p-3">
                <h5 class="font-medium text-green-800 mb-1 text-sm">Traitement</h5>
                <p class="text-xs text-green-700">{{ pest.treatment }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Maladies -->
    <div v-if="itinerary.diseases?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <ShieldAlertIcon class="w-5 h-5 text-orange-600" />
        Maladies communes
      </h3>
      <div class="space-y-4">
        <Card 
          v-for="disease in itinerary.diseases" 
          :key="disease.name"
          class="border-orange-200 hover:shadow-md transition-shadow"
        >
          <CardContent class="p-4">
            <h4 class="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <AlertCircleIcon class="w-4 h-4" />
              {{ disease.name }}
            </h4>
            <div class="space-y-3">
              <div class="bg-gray-50 rounded-lg p-3">
                <h5 class="font-medium text-gray-800 mb-1 text-sm">Symptômes</h5>
                <p class="text-xs text-gray-700">{{ disease.symptoms }}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-blue-50 rounded-lg p-3">
                  <h5 class="font-medium text-blue-800 mb-1 text-sm">Prévention</h5>
                  <p class="text-xs text-blue-700">{{ disease.prevention }}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-3">
                  <h5 class="font-medium text-green-800 mb-1 text-sm">Traitement</h5>
                  <p class="text-xs text-green-700">{{ disease.treatment }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Bénéfices nutritionnels -->
    <div v-if="itinerary.nutritionalBenefits?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <AppleIcon class="w-5 h-5 text-emerald-600" />
        Bénéfices nutritionnels
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="benefit in itinerary.nutritionalBenefits" 
          :key="benefit.nutrient"
          class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 hover:bg-emerald-100 transition-colors"
        >
          <h4 class="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
            <SparklesIcon class="w-4 h-4" />
            {{ benefit.nutrient }}
          </h4>
          <p class="text-sm text-emerald-700">{{ benefit.description }}</p>
        </div>
      </div>
    </div>

    <!-- Conseils de conservation -->
    <div v-if="itinerary.storageAdvice" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <PackageIcon class="w-5 h-5 text-indigo-600" />
        Conservation et stockage
      </h3>
      <Card class="border-indigo-200">
        <CardContent class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-indigo-800 mb-2">Méthode</h4>
              <p class="text-sm text-gray-600 mb-4">{{ itinerary.storageAdvice.method }}</p>
              <div class="flex items-center gap-2 text-sm text-indigo-600">
                <TimerIcon class="w-4 h-4" />
                <span class="font-medium">{{ itinerary.storageAdvice.duration }}</span>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-indigo-800 mb-2">Conseils pratiques</h4>
              <ul class="space-y-1">
                <li 
                  v-for="tip in itinerary.storageAdvice.tips" 
                  :key="tip"
                  class="text-sm text-gray-600 flex items-start gap-2"
                >
                  <CheckCircleIcon class="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Ressources utiles -->
    <div v-if="itinerary.resources?.length" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <BookOpenIcon class="w-5 h-5 text-blue-600" />
        Ressources utiles
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          v-for="resource in itinerary.resources"
          :key="resource.url"
          :href="resource.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="getResourceBgClass(resource.type)">
            <component :is="getResourceIcon(resource.type)" class="w-5 h-5" :class="getResourceTextClass(resource.type)" />
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ resource.title }}</h4>
            <p class="text-sm text-gray-500 capitalize">{{ resource.type }}</p>
          </div>
          <ExternalLinkIcon class="w-4 h-4 text-gray-400" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ImageIcon,
  SproutIcon,
  HeartHandshakeIcon,
  LeafIcon,
  BugIcon,
  AlertTriangleIcon,
  ShieldAlertIcon,
  AlertCircleIcon,
  AppleIcon,
  SparklesIcon,
  PackageIcon,
  TimerIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  ClockIcon,
  PlayIcon,
  FileTextIcon,
  MessageSquareIcon
} from 'lucide-vue-next'

interface Itinerary {
  id: string
  name: string
  images?: string[]
  varieties?: Array<{
    name: string
    characteristics: string
    difficulty: 'facile' | 'moyen' | 'difficile'
    harvestTime: string
  }>
  companions?: Array<{
    plant: string
    benefit: string
    distance: string
  }>
  pests?: Array<{
    name: string
    description: string
    prevention: string
    treatment: string
  }>
  diseases?: Array<{
    name: string
    symptoms: string
    prevention: string
    treatment: string
  }>
  nutritionalBenefits?: Array<{
    nutrient: string
    description: string
  }>
  storageAdvice?: {
    method: string
    duration: string
    tips: string[]
  }
  resources?: Array<{
    title: string
    url: string
    type: 'article' | 'video' | 'guide' | 'forum'
  }>
}

interface Props {
  itinerary: Itinerary
}

interface Emits {
  (e: 'open-image', image: string, index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Utilitaires
const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'facile': return 'secondary'
    case 'moyen': return 'outline'
    case 'difficile': return 'destructive'
    default: return 'secondary'
  }
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video': return PlayIcon
    case 'guide': return FileTextIcon
    case 'forum': return MessageSquareIcon
    default: return FileTextIcon
  }
}

const getResourceBgClass = (type: string) => {
  switch (type) {
    case 'video': return 'bg-red-100'
    case 'guide': return 'bg-blue-100'
    case 'forum': return 'bg-purple-100'
    default: return 'bg-gray-100'
  }
}

const getResourceTextClass = (type: string) => {
  switch (type) {
    case 'video': return 'text-red-600'
    case 'guide': return 'text-blue-600'
    case 'forum': return 'text-purple-600'
    default: return 'text-gray-600'
  }
}

// Handlers
const openImageModal = (image: string, index: number) => {
  emit('open-image', image, index)
}
</script> 